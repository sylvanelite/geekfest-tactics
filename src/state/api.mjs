import {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE,
	cbt_STATE_IDLE,
	cbt_STATE_DISPLAY_MOVE,
	cbt_STATE_SELECT_WEAPON_TARGET,
	st_Character
} from "./consts.mjs";
import { Sy } from "./main.mjs";
import { Bit } from "./bit.mjs";
import { PRNG } from "./prng.mjs";

class Sy_api {
	static #renderer = null;
	static #rendererBlocked=false;
//////////////gameplay methods
	//NOTE: need a guard check when calling these to ensure it's the correct turn & x,y in bounds
	//async calls return true/false depending on success.
	//returning false should not fail, it's just a notice that the state did not change.
	static async api_idle_selectCharacter(x,y){
		//return true if selecting a ch, false if selecting an unused square
		const selected_xy=Bit.SET_XY(x,y);
		const ch = Sy.getCharacterAtPosition(x,y);
		//'a' on usable character
		if (ch.player_state == Sy.cbt_CurrentPlayerState && ch.hasMoved == false) {
			Sy.resetMove();
			Sy.resetAttack();
			Sy.fillMoveAndAttackForCharacter(ch);
			Sy.cbt_isv_STATE_IDLE_xy = selected_xy;
			Sy.cbt_CurrentState=cbt_STATE_DISPLAY_MOVE;
			return true;
		}
		console.log("invalid idle select");
		Sy.checkEndOfTurn();
		return false;
	}
	static async api_mov_selectDestination(x,y,preferredPath){//TODO:preferredPath
		const selected_xy=Bit.SET_XY(x,y);
		const ch = Sy.getCharacterAtPosition(x,y);
		const prevCh = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_IDLE_xy), 
											   Bit.GET_Y(Sy.cbt_isv_STATE_IDLE_xy));
		if ((ch.player_state == cbt_NO_PLAYER_STATE || selected_xy == prevCh.point_xy) &&
			Sy.getMoveForCell(x,y) != 0) { //'a' on a blue square
			Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = selected_xy;
			if(prevCh.point_xy!=selected_xy){
				if(Sy_api.#renderer){
					Sy_api.#rendererBlocked = true;
					await Sy_api.#renderer.enqueue_drawMovement(prevCh.point_xy,selected_xy);
					Sy_api.#rendererBlocked = false;
				}
			}
			Sy.cbtDoMove(prevCh);
			return true;
		}
		//'a' on an enemy, move to a position that the unit can attack from
		if (ch.player_state != Sy.cbt_CurrentPlayerState  &&
			ch.player_state != cbt_NO_PLAYER_STATE  &&
			Sy.getAttackForCell(x,y) != 0) {
			const attackPosition = Sy.getMoveCellFromAttack(x, y, prevCh);
			//set the mov cursor to the spot the player moves from, but leave the currnet cursor on the target
			Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = attackPosition;
			if(prevCh.point_xy!=selected_xy){
				if(Sy_api.#renderer){
					Sy_api.#rendererBlocked = true;
					await Sy_api.#renderer.enqueue_drawMovement(prevCh.point_xy,attackPosition);
					Sy_api.#rendererBlocked = false;
				}
			}
			Sy.cbtDoMove(prevCh);
			return true;
		}
		console.log("invalid mov cell");
		//TODO: invalid movement...  could also call Sy_api.api_mov_cancel()?
		return false;
	}
	static api_mov_cancel(){
		//'b' or 'a' on space with no movement/attack target
		//clear out movement grid and reset the cursor position
		//the character wouldn't have moved yet
		Sy.resetMove();
		Sy.resetAttack();
		Sy.cbt_CurrentState=cbt_STATE_IDLE;
		return true;
	}
	static async api_tgt_selectTarget(x,y){
		const slectedTgt = Sy.getCharacterAtPosition(x,y);
		if(slectedTgt.player_state == cbt_NO_PLAYER_STATE){
			console.log("invalid target cell",x,y);
			return false;//TODO: invalid target...  could also call Sy_api.api_tgt_cancel()?
		}
		const ch = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy),
										   Bit.GET_Y(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy));
		Sy.resetMove();
		Sy.resetAttack();
		ch.hasMoved = true;
		//'a' on target
		if (slectedTgt.point_xy != ch.point_xy) { 
			if(Sy_api.#renderer){
				Sy_api.#rendererBlocked = true;
				await Sy_api.#renderer.enqueue_drawBattle(ch, slectedTgt);
				Sy_api.#rendererBlocked = false;
			}
			Sy.performBattleCalculation(ch, slectedTgt);
		}
		Sy.cbt_CurrentState=cbt_STATE_IDLE;
		if(Sy.checkEndOfTurn()){
			if(Sy_api.#renderer){
				Sy_api.#rendererBlocked = true;
				await Sy_api.#renderer.enqueue_drawTurnToggle();
				Sy_api.#rendererBlocked = false;
			}
		}
		return true;
	}
	static api_tgt_cancel(){
		//'b' or 'a' on invalid target
		const ch = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy),
										   Bit.GET_Y(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy));
		Sy.changeChPosistion(ch,Sy.cbt_isv_STATE_IDLE_xy);
		Sy.resetMove();
		Sy.resetAttack();
		Sy.fillMoveAndAttackForCharacter(ch);
		Sy.cbt_CurrentState=cbt_STATE_DISPLAY_MOVE;
		return true;
	}


//////////////helper methods
	//read only properties for rendering, ai, etc
	static api_get_playerCharacters(){
		return Sy.cbt_varCharacters.filter((x)=>{
			return x.player_state == cbt_PLAYER;
		});
	}
	static api_get_enemyCharacters(){
		return Sy.cbt_varCharacters.filter((x)=>{
			return x.player_state == cbt_ENEMY;
		});
	}
	static api_get_allCharacters(){
		return Sy.cbt_varCharacters.filter((x)=>{
			return x.player_state != cbt_NO_PLAYER_STATE;
		});
	}
	
	
	static api_getCurrentPlayerState(){
		return Sy.cbt_CurrentPlayerState;
	}
	static api_getCurrentState(){
		return Sy.cbt_CurrentState;
	}
	static api_getAttackForCell(x,y){
		return Sy.getAttackForCell(x,y);
	}
	static api_getMoveForCell(x,y){
		return Sy.getMoveForCell(x,y);
	}
	static api_getCharacterAtPosition(x,y){
		return Sy.getCharacterAtPosition(x,y);
	}
	static api_getCostForTerrain(ch,x,y){
		const terrain = Sy.getTerrainForCell(x, y);
		const cost = Sy.getCostForTerrain(ch.movCl,terrain);
		return cost;
	}
	static api_getCurrentChPosition(){
		switch (Bit.GET_LOW_BYTE(Sy.cbt_CurrentState)) {
			case cbt_STATE_IDLE:
			case cbt_STATE_DISPLAY_MOVE:
				//ch is under the cursor
				return Sy.cbt_isv_STATE_IDLE_xy;
			case cbt_STATE_SELECT_WEAPON_TARGET:
				//cursor is the tgt, ch is the internal state var
				return Sy.cbt_isv_STATE_DISPLAY_MOVE_xy;
			default:
				console.log("err: could not get position");
				return 0;
		}		
	}
	static api_getMapWidth(){
		return Sy.MAP_WIDTH;
	}
	static api_getMapHeight(){
		return Sy.MAP_HEIGHT;
	}
	static api_getTargets(){
		//by default, add 'wait' as an option
		const res = [Sy_api.api_getCurrentChPosition()];
		if(Sy.cbt_CurrentState != cbt_STATE_SELECT_WEAPON_TARGET){
			console.log("err: no target state");
			return;
		}
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		let source = Sy_api.api_get_enemyCharacters();
		if(curPlayerState == cbt_ENEMY){
			source =  Sy_api.api_get_playerCharacters();
		}
		for(const ch of source){
			const [x,y] = Bit.GET_XY(ch.point_xy);
			if(Sy_api.api_getAttackForCell(x,y) && ch.player_state != cbt_NO_PLAYER_STATE){
				const moveCell = Bit.SET_XY(x,y);
				res.push(moveCell);
			}
		}
		return res;
	}
	//seed for generating random data
	//data = 2d array of initial terrain
	static api_generateRoom(seed=0,terrainData=null,unitData=null){
		Sy.cbt_CurrentState= cbt_STATE_IDLE;
		Sy.cbt_CurrentPlayerState= cbt_PLAYER;
		Sy.cbt_isv_STATE_IDLE_xy=0;
		Sy.cbt_isv_STATE_DISPLAY_MOVE_xy=0;
		PRNG.RNG_A=42+seed;
		PRNG.RNG_B=1234+seed*4;
		PRNG.RNG_C=5678+seed*2;
		PRNG.RNG_D=9001+seed*3;
		for(let i=0;i<Sy.MAP_WIDTH;i+=1){
			for(let j=0;j<Sy.MAP_HEIGHT;j+=1){
				Sy.setTerrainForCell(i,j,1);
			}
		}
		if(terrainData){
			Sy.setMapSize(terrainData.width,terrainData.height);
			Sy.cbt_terrain = terrainData.terrain;
		}
		if(unitData){
			Sy.cbt_varCharacters = unitData;
		}
		Sy.resetMove();
		Sy.resetAttack();
		//establish deep copy to decouple state
		Sy_api.api_setState(Sy_api.api_cloneState());
		Sy.flushChPositionCache();
	}

//////////////extension methods
	//given a filled movement grid state, and two points on the move grid
	//finds a path that the character could possibly traverse
	//note: if the starting point is not exactly on the character's position
	//      then the returned result may be invalid, or not found
	//      in that case, the caller should check for validity
	static api_getMovePath(ch,start_xy,end_xy){
			const move = ch.mov+1;
			const movQueue = [{
				point_xy:start_xy,
				move:move,
				path:[start_xy]
			}];
			const moveCells = new Map();
			moveCells.set(start_xy,move);
			//max move grid is ~a mov*mov square
			const maxLen = move*move;
			let start = 0;
			const mapW = Sy_api.api_getMapWidth();
			const mapH = Sy_api.api_getMapHeight();
			while (start<movQueue.length&&start<maxLen) {
				const cell =  movQueue[start];
				const [nodeX,nodeY] = Bit.GET_XY(cell.point_xy);
				start+=1;
				const points = [ {px:nodeX,py:nodeY+1}, {px:nodeX,py:nodeY-1},
					             {px:nodeX+1,py:nodeY}, {px:nodeX-1,py:nodeY} ];
				for(const {px,py} of points){
					if (py < mapH && py>=0 && px < mapW && px>=0) {
						const xy = Bit.SET_XY(px, py);
						const nodeCost = cell.move-Sy_api.api_getCostForTerrain(ch,px,py);
						const curPath = [...cell.path,xy];
						const nextCost = (moveCells.has(xy)?moveCells.get(xy):0);
						if (nodeCost > 0 && nextCost < nodeCost &&Sy_api.api_getMoveForCell(px, py)) {
							if(xy==end_xy){
								return curPath;
							}
							moveCells.set(xy,nodeCost);
							movQueue.push({
								point_xy:xy,
								move:nodeCost,
								path:curPath
							});
						}
					}
				}
			}
			return [];
	}
	//return true/false if a path is actually valid
	//       used to tell if a user is trying to draw a path that's
	//       greater than ch's mov, without leaving the mov grid
	static api_checkPathIsValid(ch,path){
		//check the path has any data (if not, a destination may not have been found)
		if(!path.length){
			return false;
		}
		//check the total cost of the path over the terrain being traversed
		let movCost = 0;
		for(const p of path){
			const [px,py] = Bit.GET_XY(p);
			if(p==ch.point_xy){continue;}//don't consider start cell
			if(Sy.getMoveForCell(px,py) == 0) {return false;}//tried to move over invalid tile
			const cost = Sy_api.api_getCostForTerrain(ch,px,py);
			movCost += cost;
		}
		return (movCost<=ch.mov+1);
	}
	
	//used to save/restore/sync state
	static api_cloneState(){
		//deep copy of globals
		const terrainCopy=Sy.cbt_terrain.slice();
		const moveCopy=Sy.cbt_move.slice();
		const atkCopy = Sy.cbt_attack.slice();//slice is shallow copy, should be ok since it's ints
		//ch needs deep copy
		const chCopy = Array(Sy.cbt_varCharacters.length);
		let i=0;
		for(const ch of Sy.cbt_varCharacters){
			const copy = new st_Character();
			const keys = Object.keys(copy);
			for(const key of keys){
				copy[key] = ch[key];
			}
			chCopy[i] = copy;
			i+=1;
		}
		return{
			width:Sy.MAP_WIDTH,
			height:Sy.MAP_HEIGHT,
			currentState:Sy.cbt_CurrentState,//int
			currentPlayerState:Sy.cbt_CurrentPlayerState,//int
			xy:Sy.cbt_xy,//int
			isv_STATE_IDLE_xy:Sy.cbt_isv_STATE_IDLE_xy,//int
			isv_STATE_DISPLAY_MOVE_xy:Sy.cbt_isv_STATE_DISPLAY_MOVE_xy,//int
			terrain:terrainCopy,
			move:moveCopy,
			attack:atkCopy,
			varCharacters:chCopy,
			rngA:PRNG.RNG_A,
			rngB:PRNG.RNG_B,
			rngC:PRNG.RNG_C,
			rngD:PRNG.RNG_D,
		};
	}
	static api_setState(savedState){
		//set map dimensions (must be done before setting attack, etc)
		Sy.setMapSize(savedState.width,savedState.height);
		//all globals that aren't const
		Sy.cbt_CurrentState=savedState.currentState;//int
		Sy.cbt_CurrentPlayerState=savedState.currentPlayerState;//int
		Sy.cbt_xy = savedState.xy;//int
		Sy.cbt_isv_STATE_IDLE_xy = savedState.isv_STATE_IDLE_xy;//int
		Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = savedState.isv_STATE_DISPLAY_MOVE_xy;//int
		//all global arrays
		Sy.cbt_terrain = savedState.terrain;
		Sy.cbt_move = savedState.move;
		Sy.cbt_attack = savedState.attack;
		Sy.cbt_varCharacters = savedState.varCharacters;
		PRNG.RNG_A = savedState.rngA;
		PRNG.RNG_B = savedState.rngB;
		PRNG.RNG_C = savedState.rngC;
		PRNG.RNG_D = savedState.rngD;
		Sy.flushChPositionCache();
	}

//////////////methods configuring the API layer itself
	static api_render(){
		Sy_api.#renderer.render();
	}
	static api_setRenderer(renderer){
		Sy_api.#renderer = renderer;
	}
	static api_isAwaiting(){
		return (Sy_api.#renderer && Sy_api.#rendererBlocked);
	}
}
export { Sy_api };
