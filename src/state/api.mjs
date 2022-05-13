import {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE,
	cbt_STATE_IDLE,
	cbt_STATE_DISPLAY_MOVE,
	cbt_STATE_SELECT_WEAPON_TARGET,
	st_Character,
	st_Terrain
} from "./consts.mjs";
import { Sy } from "./main.mjs";
import { Bit } from "./bit.mjs";
import { PRNG } from "./prng.mjs";

class Sy_api {
	static #renderer = null;
	//NOTE: need a guard check when calling these to ensure it's the correct turn & x,y in bounds
	//async calls return true/false depending on success.
	//returning false should not fail, it's just a notice that the state did not change.
	static api_idle_selectCharacter(x,y){
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
	static api_mov_selectDestination(x,y){
		const selected_xy=Bit.SET_XY(x,y);
		const ch = Sy.getCharacterAtPosition(x,y);
		const prevCh = Sy.getCharacterAtPosition(Bit.GET_X(Sy.cbt_isv_STATE_IDLE_xy), 
											   Bit.GET_Y(Sy.cbt_isv_STATE_IDLE_xy));
		if ((ch.player_state == cbt_NO_PLAYER_STATE || selected_xy == prevCh.point_xy) &&
			Sy.getMoveForCell(x,y) != 0) { //'a' on a blue square
			Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = selected_xy;
			if(prevCh.point_xy!=selected_xy){
				if(Sy_api.#renderer){
					Sy_api.#renderer.drawMovement(prevCh.point_xy,selected_xy);
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
					Sy_api.#renderer.drawMovement(prevCh.point_xy,attackPosition);
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
	static api_tgt_selectTarget(x,y){
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
				Sy_api.#renderer.drawBattle(ch, slectedTgt);
			}
			Sy.performBattleCalculation(ch, slectedTgt);
		}
		Sy.cbt_CurrentState=cbt_STATE_IDLE;
		if(Sy.checkEndOfTurn()){
			if(Sy_api.#renderer){
				Sy_api.#renderer.drawTurnToggle();
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


///////helper methods
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
	static api_getTerrainCost(x,y){
		return Sy.getTerrain(x,y).cost;
	}
	//seed for generating random data
	//data = 2d array of initial terrain
	static api_generateRoom(seed=0,terrainData=null,unitData=null){
		Sy.cbt_CurrentState= cbt_STATE_IDLE;
		Sy.cbt_CurrentPlayerState= cbt_PLAYER;
		Sy.cbt_isv_STATE_IDLE_xy=0;
		Sy.cbt_isv_STATE_DISPLAY_MOVE_xy=0;
		Sy.resetMove();
		Sy.resetAttack();
		PRNG.RNG_A=42+seed;
		PRNG.RNG_B=1234+seed*4;
		PRNG.RNG_C=5678+seed*2;
		PRNG.RNG_D=9001+seed*3;
		for(let i=0;i<Sy.MAP_WIDTH;i+=1){
			for(let j=0;j<Sy.MAP_HEIGHT;j+=1){
				Sy.setTerrain(i,j,new st_Terrain());
			}
		}
		if(terrainData){
			for(let i=0;i<Sy.MAP_WIDTH;i+=1){
				for(let j=0;j<Sy.MAP_HEIGHT;j+=1){
					Sy.setTerrain(i,j,terrainData[i][j]);
				}
			}
		}
		if(unitData){
			Sy.cbt_varCharacters = JSON.parse(JSON.stringify(unitData));
		}
		Sy.flushChPositionCache();
	}
	static api_render(){
		Sy_api.#renderer.render();
	}
	static api_setRenderer(renderer){
		Sy_api.#renderer = renderer;
	}
}
export { Sy_api };
