import {
	cbt_ENEMY,
	cbt_PLAYER,
	cbt_NO_PLAYER_STATE,
	cbt_STATE_IDLE,
	cbt_STATE_DISPLAY_MOVE,
	cbt_STATE_SELECT_WEAPON_TARGET
} from "./consts.mjs";
import { Sy_api } from "./api.mjs";
import { Bit } from "./bit.mjs";

class Sy_AI {
	
	static #preferredPath = [];
	
	
	static #getPlayerCharacters(){
		const ch = Sy_api.api_get_allCharacters();
		return ch.filter((x)=>{
			return x.player_state == cbt_PLAYER;
		});
	}
	static #getEnemyCharacters(){
		const ch = Sy_api.api_get_allCharacters();
		return ch.filter((x)=>{
			return x.player_state == cbt_ENEMY;
		});
	}
	
	static AI(){
		//only do AI if it's the enemy turn
		if(Sy_api.api_getCurrentPlayerState() != cbt_ENEMY){//TODO: remove hard-coded 'enemy' state, check control source instead?
			console.log("not AI turn");
			return false;//returns true/false if it's the AI's turn (i.e. if a continue is needed)
		}
		switch (Bit.GET_LOW_BYTE(Sy_api.api_getCurrentState())) {
			case cbt_STATE_IDLE:
				Sy_AI.#STATE_IDLE();
				break;
			case cbt_STATE_DISPLAY_MOVE:
				Sy_AI.#STATE_DISPLAY_MOVE();
				break;
			case cbt_STATE_SELECT_WEAPON_TARGET:
				Sy_AI.#STATE_SELECT_WEAPON_TARGET();
				break;
			default:
				break;
		}
		return (Sy_api.api_getCurrentPlayerState() == cbt_ENEMY);
	
	}
	static #STATE_IDLE() {
		Sy_AI.#preferredPath = [];
		const eChara = Sy_AI.#getEnemyCharacters();
		for (const ch of eChara){
			if (!(ch.hasMoved) && ch.player_state != cbt_NO_PLAYER_STATE) {
				//found a valid unit, select them:
				Sy_api.api_idle_selectCharacter(Bit.GET_X(ch.point_xy),Bit.GET_Y(ch.point_xy));
				return;
			}
		}
	};
	static #STATE_DISPLAY_MOVE() {
		const start_xy = Sy_api.api_getCurrentChPosition();
		const currentCh = Sy_api.api_getCharacterAtPosition(Bit.GET_X(start_xy),Bit.GET_Y(start_xy));
		//see if there is an opponent in range.
		//if yes, press 'a' on them
		const pChara = Sy_AI.#getPlayerCharacters();
		for (const playerTgt of pChara){
			if(playerTgt.player_state != cbt_NO_PLAYER_STATE &&
			   Sy_api.api_getAttackForCell(Bit.GET_X(playerTgt.point_xy),Bit.GET_Y(playerTgt.point_xy))){
					//found target, select	
					const [atk_x,atk_y] = Bit.GET_XY(playerTgt.point_xy);
					const movCell = Sy_api.api_getMoveCellFromAttack(atk_x,atk_y,currentCh);
					Sy_AI.#preferredPath = Sy_api.api_getMovePath(currentCh,start_xy,movCell);
				    Sy_api.api_mov_selectDestination(Bit.GET_X(playerTgt.point_xy),Bit.GET_Y(playerTgt.point_xy),
													Sy_AI.#preferredPath);
				    return;//TODO: randomise target choice if multiple are in range? could use i = offset + random() % length while iterating?
			}
		}
		//did not find target in range, pathfind
		let tgt_xy = start_xy;//by default target yourself
		let cursor_xy = start_xy;//if no target found, will try move 0/1 square usually (min distance)
		let cellCost=999;
		//find closest character to target
		for (const playerTgt of pChara){
			if(playerTgt.player_state != cbt_NO_PLAYER_STATE){
				const dist = Math.abs(Bit.GET_X(playerTgt.point_xy)-Bit.GET_X(cursor_xy))+
										Math.abs(Bit.GET_Y(playerTgt.point_xy)-Bit.GET_Y(cursor_xy));
				if(dist<cellCost){
					cellCost = dist;
					tgt_xy = playerTgt.point_xy;
				}
			}
		}
		cellCost = 999;
		let movCost = 999;
		//now we have which cell we ant to move to, find the closest movement square to it
		//this isn't proper pathfinding, since it won't navigate around long walls.
		//relies on the small map so that getting roughly closer will eventually have the targeting grid overlap
		const tgtX = Bit.GET_X(tgt_xy);
		const tgtY = Bit.GET_Y(tgt_xy);
		const mapWidth = Sy_api.api_getMapWidth();
		const mapHeight = Sy_api.api_getMapHeight();
		for (let i = 0; i < mapWidth; i += 1) {
			for (let j = 0; j < mapHeight; j += 1) {
				const mov = Sy_api.api_getMoveForCell(i,j);
				if(mov){
					const dist = Math.abs(i-tgtX)+Math.abs(j-tgtY);
					//if cells are tied on distance, use the lowest 'mov'
					//this is a heuristic that makes the AI move further, maybe avoiding obsticals in the process
					if(dist<cellCost||(dist == cellCost && mov<movCost)){
						//ensure point is free of other units
						const otherCh = Sy_api.api_getCharacterAtPosition(i, j);//do this check inside because it's O(N)
						if(otherCh.player_state == cbt_NO_PLAYER_STATE){
							cellCost = dist;
							movCost = mov;
							cursor_xy=Bit.SET_XY(i,j);
						}
					}
				}
			}
		}
		Sy_AI.#preferredPath = Sy_api.api_getMovePath(currentCh,start_xy,cursor_xy);
		Sy_api.api_mov_selectDestination(Bit.GET_X(cursor_xy),Bit.GET_Y(cursor_xy),Sy_AI.#preferredPath);
	};
	static #STATE_SELECT_WEAPON_TARGET() {
		//AI works by pointing cursor at target if one is in range, 
		//can just press 'a' here to commit the action
		const current_xy = Sy_api.api_getCurrentChPosition();
		const currentCh = Sy_api.api_getCharacterAtPosition(Bit.GET_X(current_xy),Bit.GET_Y(current_xy));
		const tgts = Sy_api.api_getTargets();
		let tgt_xy = tgts[tgts.length-1];
		let lowestHp = 999;
		for(const tgt of tgts){
			if(tgt!=current_xy){
				const x = Bit.GET_X(tgt_xy);
				const y = Bit.GET_Y(tgt_xy);
				const tgtCh =  Sy_api.api_getCharacterAtPosition(x,y);
				const dmgHP = tgtCh.hp-currentCh.atk;
				//first priortise KO, can just choose the 1st then break
				if(dmgHP<=0){
					tgt_xy = tgt;
					break;
				}
				//otherwise, whatever would leave the player on lowest HP
				if(dmgHP<lowestHp){
					lowestHp = dmgHP;
					tgt_xy = tgt;
				}
			}
		}
		//TODO: could improve AI by iterating over targets and choosing the best one to hit
		Sy_api.api_tgt_selectTarget(Bit.GET_X(tgt_xy),Bit.GET_Y(tgt_xy),Sy_AI.#preferredPath);
		Sy_AI.#preferredPath=[];
	};
}

export {Sy_AI};