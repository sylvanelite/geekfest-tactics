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
	static #networking = null;
	static #renderer = null;
	static #menu = null;
	static #rendererBlocked=false;
//////////////gameplay methods

	//return true/false for state cell selection
	//used to determine if selection is a cancel action
	//not used to strictly enforce validity
	//in theory these are the same as the responses from the regular state actions
	//but those are async, these return immediately
	static api_isValidIdleCell(x,y){
		const selected_xy=Bit.SET_XY(x,y);
		const ch = Sy.getCharacterAtPosition(x,y);
		if (ch.player_state == Sy.cbt_CurrentPlayerState && ch.hasMoved == false) {
			return true;
		}
		return false;
	}
	static api_isValidMoveCell(x,y,preferredPath){
		const selected_xy=Bit.SET_XY(x,y);
		const cellCh = Sy.getCharacterAtPosition(x,y);
		const prevCh = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_IDLE_xy), 
											   Bit.GET_Y(Sy.cbt_isv_STATE_IDLE_xy));
		if(preferredPath && preferredPath.length>0){
			const lastCell = preferredPath[preferredPath.length-1];
			const [lastX,lastY] = Bit.GET_XY(lastCell);
			const pathChCell = Sy.getCharacterAtPosition(lastX,lastY);
			if(lastCell!=prevCh.point_xy){
				//if moving the character, check it's a blue cell with no other player in it
				if(Sy.getMoveForCell(lastX,lastY) == 0||
				  pathChCell.player_state!=cbt_NO_PLAYER_STATE){
					  return false;
				}
			}
		}
		//'a' on a blue square
		if ((cellCh.player_state == cbt_NO_PLAYER_STATE || selected_xy == prevCh.point_xy) &&
			Sy.getMoveForCell(x,y) != 0) { 
			return true;
		}
		//'a' on an enemy, move to a position that the unit can attack from
		if (cellCh.player_state != Sy.cbt_CurrentPlayerState  &&
			cellCh.player_state != cbt_NO_PLAYER_STATE  &&
			Sy.getAttackForCell(x,y) != 0) {
			return true;
		}
		return false;
	}
	static api_isValidTargetCell(x,y){
		const slectedTgt = Sy.getCharacterAtPosition(x,y);
		//if not clicking on the unit, need to check player state for visible opponents
		if(slectedTgt.player_state == cbt_NO_PLAYER_STATE){
			return false;
		}
		const ch = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy),
										   Bit.GET_Y(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy));
		if(slectedTgt.player_state!=cbt_NO_PLAYER_STATE && 
			!Sy_api.api_getAttackForCell(x,y) &&
			slectedTgt.point_xy != ch.point_xy ){
			return false;
		}
		if(slectedTgt.player_state == ch.player_state&&
			slectedTgt.point_xy != ch.point_xy){
			return false;
		}
		return true;
	}

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
	static async api_mov_selectDestination(x,y,preferredPath){
		const selected_xy=Bit.SET_XY(x,y);
		const cellCh = Sy.getCharacterAtPosition(x,y);
		const prevCh = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_IDLE_xy), 
											   Bit.GET_Y(Sy.cbt_isv_STATE_IDLE_xy));
		//validate that the preferredPath last cell is movable
		if(preferredPath && preferredPath.length>0){
			const lastCell = preferredPath[preferredPath.length-1];
			const [lastX,lastY] = Bit.GET_XY(lastCell);
			const pathChCell = Sy.getCharacterAtPosition(lastX,lastY);
			if(lastCell!=prevCh.point_xy){
				//if moving the character, check it's a blue cell with no other player in it
				if(Sy.getMoveForCell(lastX,lastY) == 0||
				  pathChCell.player_state!=cbt_NO_PLAYER_STATE){
					console.log("blocked mov path cell");
					  return false;
				}
			}
		}
		
		const movePathfind = async (final_xy)=>{
			Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = final_xy;
			Sy_api.#rendererBlocked = true;
			if(preferredPath&&preferredPath.length>1){
				Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = preferredPath[preferredPath.length-1];
				for(let i=0;i<preferredPath.length-1;i+=1){
					const from = preferredPath[i];
					const to = preferredPath[i+1];
					//check for !! movement
					//temporarily reveal the fog, check for collsion, then hide it again
					const [to_x,to_y]=Bit.GET_XY(to);
					const fogCovered = Sy.getFogForCell(to_x,to_y);
					Sy.setFogForCell(to_x,to_y,false);
					const occupiedState = Sy.getCharacterAtPosition(to_x,to_y).player_state;
					Sy.setFogForCell(to_x,to_y,fogCovered);
					if(occupiedState!=cbt_NO_PLAYER_STATE&&occupiedState!=prevCh.player_state){
						//trying to move through enemy ch, do !
						//TODO: await enqueue_!! animation
						prevCh.hasMoved = true;
						Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = from;
						preferredPath.splice(i+1);//truncate path to traversed section
						break;//check .hasMoved after path call to see if !! happened
					}
					await Sy_api.#renderer.enqueue_drawMovement(prevCh.point_xy,from,to);
				}
			}else{
				console.log("moving with no path supplied");
				await Sy_api.#renderer.enqueue_drawMovement(prevCh.point_xy,prevCh.point_xy,final_xy);
			}
			Sy_api.#rendererBlocked = false;
		};
		if ((cellCh.player_state == cbt_NO_PLAYER_STATE || selected_xy == prevCh.point_xy) &&
			Sy.getMoveForCell(x,y) != 0) { //'a' on a blue square
			Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = selected_xy;
			if(prevCh.point_xy!=selected_xy){
				if(Sy_api.#renderer){
					await movePathfind(selected_xy);
				}
			}
			Sy.cbtDoMove(prevCh);
			if(prevCh.hasMoved){//path cut short by !!
				if(Sy_api.#networking){
					Sy_api.#networking.send({
						kind:'move',
						idle_select:Sy.cbt_isv_STATE_IDLE_xy,
						move_destination:selected_xy,
						preferred_path:preferredPath,
						target_select:prevCh.point_xy
					});
				}
				const eot = Sy.cbtSetUnitToWaitAndCheck(prevCh,preferredPath);
				if(Sy_api.#checkGameOver()){
					if(Sy_api.#renderer){
						Sy_api.#rendererBlocked = true;
						await Sy_api.#renderer.enqueue_gameOver();
						Sy_api.#rendererBlocked = false;
					}
					if(Sy_api.#menu){
						Sy_api.#menu.endGame(Sy.cbt_CurrentPlayerState==cbt_PLAYER);
					}
					return true;
				}
				if(eot && Sy_api.#renderer){
					Sy_api.#rendererBlocked = true;
					await Sy_api.#renderer.enqueue_drawTurnToggle();
					Sy_api.#rendererBlocked = false;
				}
			}
			return true;
		}
		//'a' on an enemy, move to a position that the unit can attack from
		if (cellCh.player_state != Sy.cbt_CurrentPlayerState  &&
			cellCh.player_state != cbt_NO_PLAYER_STATE  &&
			Sy.getAttackForCell(x,y) != 0) {
			const attackPosition = Sy.getMoveCellFromAttack(x, y, prevCh);
			console.log(attackPosition,preferredPath);
			//set the mov cursor to the spot the player moves from, but leave the currnet cursor on the target
			Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = attackPosition;
			if(prevCh.point_xy!=selected_xy){
				if(Sy_api.#renderer){
					await movePathfind(attackPosition);
				}
			}
			Sy.cbtDoMove(prevCh);
			if(prevCh.hasMoved){//path cut short by !!
				if(Sy_api.#networking){
					Sy_api.#networking.send({
						kind:'move',
						idle_select:Sy.cbt_isv_STATE_IDLE_xy,
						move_destination:selected_xy,
						preferred_path:preferredPath,
						target_select:prevCh.point_xy
					});
				}
				const eot = Sy.cbtSetUnitToWaitAndCheck(prevCh,preferredPath);
				if(Sy_api.#checkGameOver()){
					if(Sy_api.#renderer){
						Sy_api.#rendererBlocked = true;
						await Sy_api.#renderer.enqueue_gameOver();
						Sy_api.#rendererBlocked = false;
					}
					if(Sy_api.#menu){
						Sy_api.#menu.endGame(Sy.cbt_CurrentPlayerState==cbt_PLAYER);
					}
					return true;
				}
				if(eot && Sy_api.#renderer){
					Sy_api.#rendererBlocked = true;
					await Sy_api.#renderer.enqueue_drawTurnToggle();
					Sy_api.#rendererBlocked = false;
				}
			}
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
	static async api_tgt_selectTarget(x,y,preferredPath){
		const slectedTgt = Sy.getCharacterAtPosition(x,y);
		if(slectedTgt.player_state == cbt_NO_PLAYER_STATE){//if not clicking on the unit, need to check player state for visible opponents
			console.log("invalid target cell",x,y);
			return false;//TODO: invalid target...  could also call Sy_api.api_tgt_cancel()?
		}
		const ch = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy),
										   Bit.GET_Y(Sy.cbt_isv_STATE_DISPLAY_MOVE_xy));
		if(slectedTgt.player_state!=cbt_NO_PLAYER_STATE && 
			!Sy_api.api_getAttackForCell(x,y) &&
			slectedTgt.point_xy != ch.point_xy ){
			console.log("unit target cell out of range",x,y);
			return false;
		}
		if(slectedTgt.player_state == ch.player_state&&
			slectedTgt.point_xy != ch.point_xy){
			console.log("targeting ally",x,y);
			return false;
		}
		//'a' on target
		if (slectedTgt.point_xy != ch.point_xy) { 
			if(Sy_api.#renderer){
				Sy_api.#rendererBlocked = true;
				await Sy_api.#renderer.enqueue_drawBattle(ch, slectedTgt);
				Sy_api.#rendererBlocked = false;
			}
			Sy.performBattleCalculation(ch, slectedTgt);//TODO: battle tgt can be ally
			if(slectedTgt.hp<=0){ 
				if(Sy_api.#renderer){
					Sy_api.#rendererBlocked = true;
					const [tgtx,tgty]=Bit.GET_XY(slectedTgt.point_xy);
					await Sy_api.#renderer.enqueue_dieEffect(tgtx,tgty);
					Sy_api.#rendererBlocked = false;
				}	
			}
		}
		if(Sy_api.#networking){
			Sy_api.#networking.send({
				kind:'move',
				idle_select:Sy.cbt_isv_STATE_IDLE_xy,
				move_destination:Sy.cbt_isv_STATE_DISPLAY_MOVE_xy,
				target_select:Bit.SET_XY(x,y),
				preferred_path:preferredPath
			});
		}
		const eot = Sy.cbtSetUnitToWaitAndCheck(ch,preferredPath);
		if(Sy_api.#checkGameOver()){
			if(Sy_api.#renderer){
				Sy_api.#rendererBlocked = true;
				await Sy_api.#renderer.enqueue_gameOver();
				Sy_api.#rendererBlocked = false;
			}
			if(Sy_api.#menu){
				Sy_api.#menu.endGame(Sy.cbt_CurrentPlayerState==cbt_PLAYER);
			}
			return true;
		}
		if(eot&&Sy_api.#renderer){
			Sy_api.#rendererBlocked = true;
			await Sy_api.#renderer.enqueue_drawTurnToggle();
			Sy_api.#rendererBlocked = false;
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
	static api_get_allCharacters(){
		return Sy.cbt_varCharacters.filter((ch)=>{
			if(Sy.FOG_ENABLED && ch.player_state!=Sy.cbt_CurrentPlayerState){
				const [fog_x,fog_y] = Bit.GET_XY(ch.point_xy);
				if(Sy.getFogForCell(fog_x,fog_y)){
					return false;
				}
			}
			return ch.player_state != cbt_NO_PLAYER_STATE;
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
		switch (Sy.cbt_CurrentState) {
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
		let enemies = Sy_api.api_get_allCharacters().filter((x)=>{
			return x.player_state != cbt_NO_PLAYER_STATE && x.player_state!=curPlayerState;
		});
		for(const ch of enemies){
			const [x,y] = Bit.GET_XY(ch.point_xy);
			if(Sy_api.api_getAttackForCell(x,y) && ch.player_state != cbt_NO_PLAYER_STATE){
				const moveCell = Bit.SET_XY(x,y);
				res.push(moveCell);
			}
		}
		return res;
	}
	static api_getMoveCellFromAttack(x, y, ch){
		return Sy.getMoveCellFromAttack(x, y, ch);
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
			Sy.setFogEnabled(terrainData.fogEnabled);
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
		Sy.fillFog();
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
		if(start_xy!=end_xy){
			console.warn("no mov path found",start_xy,end_xy,
						Bit.GET_XY(start_xy),Bit.GET_XY(end_xy));
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
		for(let i=0;i<path.length;i+=1){
			const p = path[i];
			const [px,py] = Bit.GET_XY(p);
			if(p==ch.point_xy){continue;}//don't consider start cell
			if(Sy.getMoveForCell(px,py) == 0) {return false;}//tried to move over invalid tile
			const cost = Sy_api.api_getCostForTerrain(ch,px,py);
			movCost += cost;
		}
		return (movCost<=ch.mov);
	}
	
	//used to save/restore/sync state
	static api_cloneState(){
		//deep copy of globals
		const terrainCopy=Array.from(Sy.cbt_terrain);//Uint32Array doesn't serailiase well, convert to plain array
		const moveCopy= Array.from(Sy.cbt_move);
		const atkCopy = Array.from(Sy.cbt_attack);
		const fogCopy = Array.from(Sy.cbt_fog);
		//ch needs deep copy
		const chCopy = Array(Sy.cbt_varCharacters.length);
		let i=0;
		for(const ch of Sy.cbt_varCharacters){
			const copy = new st_Character();
			const keys = Object.keys(copy);
			for(const key of keys){
				if(typeof ch[key] === 'object'){continue;}//ignore complex props (specifally sprites)
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
			isv_STATE_IDLE_xy:Sy.cbt_isv_STATE_IDLE_xy,//int
			isv_STATE_DISPLAY_MOVE_xy:Sy.cbt_isv_STATE_DISPLAY_MOVE_xy,//int
			terrain:terrainCopy,
			move:moveCopy,
			attack:atkCopy,
			fog:fogCopy,
			fogEnabled:Sy.FOG_ENABLED,
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
		Sy.cbt_isv_STATE_IDLE_xy = savedState.isv_STATE_IDLE_xy;//int
		Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = savedState.isv_STATE_DISPLAY_MOVE_xy;//int
		//all global arrays
		Sy.cbt_terrain = Uint32Array.from(savedState.terrain);//convert plain array back to int views
		Sy.cbt_move = Uint32Array.from(savedState.move);
		Sy.cbt_attack = Uint32Array.from(savedState.attack);
		Sy.setFogEnabled(savedState.fogEnabled);
		Sy.cbt_fog = Uint32Array.from(savedState.fog);
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
	static api_isAwaiting(){
		return (Sy_api.#renderer && Sy_api.#rendererBlocked);
	}
	
	static api_setRenderer(renderer){
		Sy_api.#renderer = renderer;
	}
	static api_setNetworking(networking){
		Sy_api.#networking = networking;
	}
	static api_setMenu(menu){
		Sy_api.#menu = menu;
	}
	
	static #checkGameOver(){
		const playerAlive =  Sy.cbt_varCharacters.some((ch)=>{
			return ch.player_state == cbt_PLAYER;
		});
		const enemyAlive =  Sy.cbt_varCharacters.some((ch)=>{
			return ch.player_state == cbt_ENEMY;
		});
		if(playerAlive && enemyAlive){
			return false;
		}
		return true;
	}
}
export { Sy_api };
