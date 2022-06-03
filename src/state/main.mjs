import {Bit} from "./bit.mjs";
import {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE,
	cbt_STATE_IDLE,
	cbt_STATE_SELECT_WEAPON_TARGET,
	st_Character,
	cbt_NULL_CHARACTER
} from "./consts.mjs";
const SIZE_OF_INT = 32;//number of bits in Uint32Array. Used for the dimensions of cbt_attack's bitmask.
class Sy  {

//level data
static MAP_WIDTH = 36;//each dimension should be less than a byte (0-255)
static MAP_HEIGHT = 12;
//these could be const, but if changing the world size, these should be variable
static cbt_terrain = new Uint32Array(Sy.MAP_WIDTH*Sy.MAP_HEIGHT);
static cbt_move = new Uint32Array(Sy.MAP_WIDTH*Sy.MAP_HEIGHT);
static cbt_attack = new Uint32Array(Math.ceil((Sy.MAP_WIDTH*Sy.MAP_HEIGHT)/SIZE_OF_INT));//bit mask of which cells can be attacked. 
static cbt_fog = new Uint32Array(Math.ceil((Sy.MAP_WIDTH*Sy.MAP_HEIGHT)/SIZE_OF_INT));//bit mask of hidden cells
static FOG_ENABLED = false;
static cbt_varCharacters = [];//array to hold st_Character()
static cbt_CurrentState= cbt_STATE_IDLE;//state machine: idle->display move->select target
static cbt_CurrentPlayerState= cbt_PLAYER;
static cbt_isv_STATE_IDLE_xy=0;//'isv' means 'internal state value'
static cbt_isv_STATE_DISPLAY_MOVE_xy=0;
static #chPositionCache = new Map();//cache to allow quick lookup of character positions
//move queue is used for breadth-first-search when filling move grid
//queue max size should be ~ room width*height at most
//alternatively, should be (max_move+1)^2, whichever is smaller
static #moveQueue = new Int32Array(Sy.MAP_WIDTH * Sy.MAP_HEIGHT);

static flushChPositionCache(){
	//cache character positions so that they can be looked up quickly.
	//position changes should only be done using changeChPosistion() to ensure the cache is kept up to date
	Sy.#chPositionCache.clear();
	for (const ch of Sy.cbt_varCharacters){
        if (ch.player_state != cbt_NO_PLAYER_STATE) {
			Sy.#chPositionCache.set(ch.point_xy,ch);
        }
	}
}

static setMapSize(width,height){
	if(Sy.MAP_WIDTH == width&&Sy.MAP_HEIGHT==height){
		return;//nothing to do
	}
	//flush variables that depend on dimensions
	//NOTE: this depends on being in the idle state.
	Sy.MAP_WIDTH = width;
	Sy.MAP_HEIGHT = height;
	Sy.cbt_terrain = new Uint32Array(Sy.MAP_WIDTH*Sy.MAP_HEIGHT);
	Sy.cbt_move = new Uint32Array(Sy.MAP_WIDTH*Sy.MAP_HEIGHT);
	Sy.cbt_attack =  new Uint32Array(Math.ceil((Sy.MAP_WIDTH*Sy.MAP_HEIGHT)/SIZE_OF_INT));
	Sy.#moveQueue = new Int32Array(Sy.MAP_WIDTH * Sy.MAP_HEIGHT);
}

static #cellIsFree(position_xy){
	const [x,y] = Bit.GET_XY(position_xy);
	return Sy.getCharacterAtPosition(x,y).player_state == cbt_NO_PLAYER_STATE;
	//return !Sy.#chPositionCache.has(position_xy);
}
static changeChPosistion(ch,position_xy){
	const old_xy = ch.point_xy;//clear old cache entry
	Sy.#chPositionCache.delete(old_xy);
	//only re-add them if they are still an active player state
	if (ch.player_state != cbt_NO_PLAYER_STATE) {
		ch.point_xy = position_xy;//change position
		Sy.#chPositionCache.set(position_xy,ch);//update cache
	}
}
static cbtDoMove(ch) {
	//update character location to the final spot
	Sy.changeChPosistion(ch,Sy.cbt_isv_STATE_DISPLAY_MOVE_xy);
	Sy.resetAttack();
	Sy.resetMove();
	Sy.fillAttack(Bit.GET_X(ch.point_xy), Bit.GET_Y(ch.point_xy),ch.min_range,ch.max_range);
	Sy.cbt_CurrentState=cbt_STATE_SELECT_WEAPON_TARGET;
}
static getCharacterAtPosition(x, y){
	let res = cbt_NULL_CHARACTER;
	const point_xy = Bit.SET_XY(x,y);
	if(Sy.#chPositionCache.has(point_xy)){
		res= Sy.#chPositionCache.get(point_xy);
	}
	//fog, can always see the unit if it's one of your own 
	if(Sy.FOG_ENABLED && Sy.getFogForCell(x,y)){
		if(res.player_state!=Sy.cbt_CurrentPlayerState){
			res= cbt_NULL_CHARACTER;
		}
	}
	return res;
}
static checkEndOfTurn(){
    let endOfTurn = true;
	let src = Sy.cbt_varCharacters.filter((x)=>{
		return x.player_state == Sy.cbt_CurrentPlayerState;
	});
	for (const ch of src){
		if (ch.player_state!=cbt_NO_PLAYER_STATE && !ch.hasMoved) {
			endOfTurn = false;
			break;
		}
	}
    if (endOfTurn) {
        Sy.endTurn();
    }
	return endOfTurn;
}
static endTurn() {
    //end turn
    //reset moved units
    for (const ch of Sy.cbt_varCharacters){
        ch.hasMoved = false;
    }
    //toggle the player
    if (Sy.cbt_CurrentPlayerState == cbt_PLAYER) {
        Sy.cbt_CurrentPlayerState= cbt_ENEMY;
    } else {
        Sy.cbt_CurrentPlayerState= cbt_PLAYER;
    }
    Sy.cbt_CurrentState=cbt_STATE_IDLE;
	Sy.fillFog();
    return;
}
static getMoveForCell( x, y){
	const idx = y*Sy.MAP_WIDTH+x;
	return Sy.cbt_move[idx];
}
static setMoveForCell( x, y, move){
	const idx = y*Sy.MAP_WIDTH+x;
	Sy.cbt_move[idx] = move;
}
static resetMove(){
	for(let i=0;i<Sy.cbt_move.length;i+=1){
		Sy.cbt_move[i] = 0;
	}
}
static resetAttack(){
	for(let i=0;i<Sy.cbt_attack.length;i+=1){
		Sy.cbt_attack[i] = 0;
	}
}
static resetFog(isHidden){
	const fillval = (isHidden?0xFFFFFFFF:0);
	for(let i=0;i<Sy.cbt_fog.length;i+=1){
		Sy.cbt_fog[i] = fillval;
	}
}
static setFogEnabled(enabled){
	Sy.FOG_ENABLED = enabled;
	Sy.resetFog(Sy.FOG_ENABLED);
}
static clearFogForCharacter(character,x,y){
	if(Sy.FOG_ENABLED){
		Sy.setFogForCell(x,y,false);
		const min_vision=1;
		const max_vision=2;
		//TODO: use ch.movCl to adjust vision? or other stats?
		for(let j=max_vision;j>=min_vision;j-=1){
			for(let i=0;i<j;i+=1){
				const upX = x-j+i;
				const downX = x+j-i;
				const rightY = y-j+i;
				const leftY = y+j-i; 
				if(upX>=0&&upX<Sy.MAP_WIDTH&&y-i>=0){
					Sy.setFogForCell(upX,y-i,false);
				}
				if(downX>=0&&downX<Sy.MAP_WIDTH&&y+i<Sy.MAP_HEIGHT){
					Sy.setFogForCell(downX,y+i,false);
				}
				if(rightY>=0&&rightY<Sy.MAP_HEIGHT&&x+i<Sy.MAP_WIDTH){
					Sy.setFogForCell(x+i,rightY,false);
				}
				if(leftY>=0&&leftY<Sy.MAP_HEIGHT&&x-i>=0){
					Sy.setFogForCell(x-i,leftY,false);
				}
			}
		}
	}
}
static fillFog(){
	if(Sy.FOG_ENABLED){
		Sy.resetFog(Sy.FOG_ENABLED);
		for (const ch of Sy.cbt_varCharacters){
			if(ch.player_state == Sy.cbt_CurrentPlayerState){
				const [x,y] = Bit.GET_XY(ch.point_xy);
				Sy.clearFogForCharacter(ch,x,y);
			}
		}
	}
}
static setFogForCell(x, y,isHidden){
	const mapIdx = y*Sy.MAP_WIDTH+x;
	const bitIdx = Math.floor(mapIdx/SIZE_OF_INT);
	const remainder = mapIdx%(SIZE_OF_INT);
	if(isHidden){
		Sy.cbt_fog[bitIdx]=Bit.BIT_SET(Sy.cbt_fog[bitIdx],remainder);
	}else{
		Sy.cbt_fog[bitIdx]=Bit.BIT_CLEAR(Sy.cbt_fog[bitIdx],remainder);
	}
}
static getFogForCell( x, y){
	const mapIdx = y*Sy.MAP_WIDTH+x;
	const bitIdx = Math.floor(mapIdx/SIZE_OF_INT);
	const remainder = mapIdx%(SIZE_OF_INT);
	return Bit.BIT_CHECK(Sy.cbt_fog[bitIdx],remainder)
}
static setAttackForCell( x, y){
	const mapIdx = y*Sy.MAP_WIDTH+x;
	const bitIdx = Math.floor(mapIdx/SIZE_OF_INT);
	const remainder = mapIdx%(SIZE_OF_INT);
	Sy.cbt_attack[bitIdx]=Bit.BIT_SET(Sy.cbt_attack[bitIdx],remainder);
}
static getAttackForCell( x, y){
	const mapIdx = y*Sy.MAP_WIDTH+x;
	const bitIdx = Math.floor(mapIdx/SIZE_OF_INT);
	const remainder = mapIdx%(SIZE_OF_INT);
	return Bit.BIT_CHECK(Sy.cbt_attack[bitIdx],remainder)
}
static getTerrainForCell(x,y){
	const idx = y*Sy.MAP_WIDTH+x;
	return Sy.cbt_terrain[idx];
}
static setTerrainForCell(x, y, terrain){
	const idx = y*Sy.MAP_WIDTH+x;
	Sy.cbt_terrain[idx] = terrain;
}
static getMoveCellFromAttack( attackX,  attackY, ch){
	const min_range = ch.min_range;
	const max_range = ch.max_range;
	const chX = Bit.GET_X(ch.point_xy);
	const chY = Bit.GET_Y(ch.point_xy);
	let retx = chX;
	let rety = chY;
	let cost = 999;
	const startX = (attackX-max_range-1>=0?attackX-max_range-1:0);
	const startY = (attackY-max_range-1>=0?attackY-max_range-1:0);
	const endX = (attackX+max_range+1<Sy.MAP_WIDTH?attackX+max_range+1:Sy.MAP_WIDTH);
	const endY = (attackY+max_range+1<Sy.MAP_HEIGHT?attackY+max_range+1:Sy.MAP_HEIGHT);
	for (let i = startX; i < endX; i += 1) {
        for (let j = startY; j < endY; j += 1) {
			//is in range
			const range = Math.abs(i-attackX)+Math.abs(j-attackY);
            //can move here
            if (Sy.getMoveForCell(i,j) != 0 && range>=min_range && range<=max_range){
				const xy = Bit.SET_XY(i,j) ;
				if( Sy.#cellIsFree(xy) || ch.point_xy == xy) {
					const cellCost= Math.abs(i-chX)+Math.abs(j-chY);//prioritise moving fewer spaces
					if(cellCost<cost){
						cost = cellCost;
						retx = i;
						rety = j;
					}
				}
			}
        }
    }
	return Bit.SET_XY(retx,rety);
}
static performBattleCalculation( ch, enemy){
	//TODO: real formula here
	//1 way attack
	let dmg = ch.atk;
	if(dmg>enemy.hp){
		enemy.hp = 0;
	}else{
		enemy.hp -= dmg;
	}
	//commit 1st damage
	if(enemy.hp<1){
		enemy.player_state = cbt_NO_PLAYER_STATE;
		//remove unit from lookup cache
		Sy.changeChPosistion(enemy,enemy.point_xy);
	}
}
static getCostForTerrain(chCl,terrainBaseCost){
	//TODO: check chCl against a bit flag of skills for that ch to determine movement.
	return terrainBaseCost;
}
static #canMoveThroughCell(xy,player_state){
	if(Sy.#cellIsFree(xy)){
		return true;
	}
	//cell not free, need to check if it's an ally
	const [x,y] = Bit.GET_XY(xy);
	const occupiedChState = Sy.getCharacterAtPosition(x, y).player_state;
	if(occupiedChState != player_state){
		return false;
	}
	return true;
}
static fillMove( x, y, move, ch) {
	const chCl = ch.movCl;
	Sy.setMoveForCell(x,y,move);
	Sy.#moveQueue[0]= Bit.SET_XY(x,y);
	Sy.#moveQueue[0]= Bit.SET_HIGHER_BYTE(Sy.#moveQueue[0],move);
	let start = 0;
	let end = 1;
	const maxLen = Sy.#moveQueue.length;
    while (start<end&&start<maxLen) {
		const nodeMove = Bit.GET_HIGHER_BYTE(Sy.#moveQueue[start]);
		const [nodeX,nodeY] = Bit.GET_XY(Sy.#moveQueue[start]);
		start+=1;
		const points = [
			{px:nodeX,py:nodeY+1},
			{px:nodeX,py:nodeY-1},
			{px:nodeX+1,py:nodeY},
			{px:nodeX-1,py:nodeY}
		];
		for(const {px,py} of points){
			if (py < Sy.MAP_HEIGHT && py>=0 && px < Sy.MAP_WIDTH && px>=0) {
				const xy = Bit.SET_XY(px, py);
				const terrain = Sy.getTerrainForCell(px, py);
				const cost = Sy.getCostForTerrain(chCl,terrain);
				const nodeCost = nodeMove-cost;
				if (nodeCost > 0 && Sy.getMoveForCell(px, py) < nodeCost) {
					if (Sy.#canMoveThroughCell(xy,ch.player_state)) {
						Sy.setMoveForCell(px, py, nodeCost);
						Sy.#moveQueue[end]=xy;
						Sy.#moveQueue[end]=Bit.SET_HIGHER_BYTE(Sy.#moveQueue[end],nodeCost);
						end+=1;
					}
				}
			}
		}
    }
	//return the end index of the array so that 'fill attack' can traverse it later
	return end;
}
static fillAttack( x, y, min_range, max_range) {
	for(let j=max_range;j>=min_range;j-=1){
		for(let i=0;i<j;i+=1){
			const upX = x-j+i;
			const downX = x+j-i;
			const rightY = y-j+i;
			const leftY = y+j-i; 
			if(upX>=0&&upX<Sy.MAP_WIDTH&&y-i>=0){
				Sy.setAttackForCell(upX,y-i);
			}
			if(downX>=0&&downX<Sy.MAP_WIDTH&&y+i<Sy.MAP_HEIGHT){
				Sy.setAttackForCell(downX,y+i);
			}
			if(rightY>=0&&rightY<Sy.MAP_HEIGHT&&x+i<Sy.MAP_WIDTH){
				Sy.setAttackForCell(x+i,rightY);
			}
			if(leftY>=0&&leftY<Sy.MAP_HEIGHT&&x-i>=0){
				Sy.setAttackForCell(x-i,leftY);
			}
		}
	}
}
static fillMoveAndAttackForCharacter(ch) {
	const min_range = ch.min_range;
	const max_range = ch.max_range;
	const [chX,chY] = Bit.GET_XY(ch.point_xy);
    const queueEnd = Sy.fillMove(chX, chY, ch.mov + 1, ch);
	//#moveQueue is filled with the cells that were marked as movable, can iterate over them to fill atk
    for (let  i = 0; i < queueEnd; i += 1) {
		const node_xy = Sy.#moveQueue[i];
		const [nodeX,nodeY] = Bit.GET_XY(node_xy);
		//don't fill if there's an enemy or ally in that cell
		if ((ch.point_xy==node_xy)||Sy.#cellIsFree(node_xy)) {
			Sy.fillAttack(nodeX, nodeY, min_range, max_range);
		}
	}
}

}

export { Sy };
