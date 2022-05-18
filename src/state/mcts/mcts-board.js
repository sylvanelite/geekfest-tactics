//https://github.com/SethPipho/monte-carlo-tree-search-js
import {Bit} from "./bit.mjs";
import {Sy} from './main.mjs';
import { Sy_AI as ai } from "./ai.mjs";
import { Sy_api as api } from "./api.mjs";
import {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE,
	cbt_STATE_IDLE,
	cbt_STATE_SELECT_WEAPON_TARGET,
	st_Character,
	st_Terrain,
	cbt_NULL_CHARACTER
} from "./consts.mjs";


class SyBoard {
	
	constructor(){
        this.state = this.cloneState();
    }

    getState(){
		/*returns a single object representing game state*/
		return this.cloneState();
	}
    setState(savedState){
		//all globals that aren't const
		Sy.cbt_CurrentState=savedState.local_cbt_CurrentState;//int
		Sy.cbt_CurrentPlayerState=savedState.local_cbt_CurrentPlayerState;//int
		Sy.cbt_xy = savedState.local_cbt_xy;//int
		Sy.cbt_isv_STATE_IDLE_xy = savedState.local_cbt_isv_STATE_IDLE_xy;//int
		Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = savedState.local_cbt_isv_STATE_DISPLAY_MOVE_xy;//int
		//all global arrays
		Sy.cbt_move=savedState.local_cbt_move;
		Sy.cbt_attack=savedState.local_cbt_attack;
		Sy.cbt_varCharacters=savedState.local_cbt_varCharacters;
		Sy.flushChPositionCache();
	}
    cloneState(){
		//deep copy of globals
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
			local_cbt_CurrentState:Sy.cbt_CurrentState,//int
			local_cbt_CurrentPlayerState:Sy.cbt_CurrentPlayerState,//int
			local_cbt_xy:Sy.cbt_xy,//int
			local_cbt_isv_STATE_IDLE_xy:Sy.cbt_isv_STATE_IDLE_xy,//int
			local_cbt_isv_STATE_DISPLAY_MOVE_xy:Sy.cbt_isv_STATE_DISPLAY_MOVE_xy,//int
			local_cbt_move:moveCopy,
			local_cbt_attack:atkCopy,
			local_cbt_varCharacters:chCopy,
		};
	}

    moves(){
		/* returns list of valid moves given current game state*/
		const moves = SyBoard.#getUnorderedMoves();
		//console.log(moves);
		return moves;
	}
    playMove(move){
		/* play a move, move being an element from .moves() list */
		for(const m of move){
			//await Minimax.applyMove(m);
			SyBoard.#applyMoveFast(m);
		}
		Sy.checkEndOfTurn();//--only needed if using "applyMoveFast"
		SyBoard.#fastForwardAI();//--only needed if using "applyMoveFast"
	}
    gameOver(){
		/* true if game is over, false otherwise */
		const pCh = api.api_get_playerCharacters();
		const eCh = api.api_get_enemyCharacters();
		for (const ch of pCh) {
			if(ch.player_state != cbt_NO_PLAYER_STATE ){
				return false;
			}
		}
		for (const em of eCh) {
			if(em.player_state != cbt_NO_PLAYER_STATE ){
				return false;
			}
		}
		return true;
	}
    winner(){
		/* number of winning player, -1 if draw" */
		
		const pCh = api.api_get_playerCharacters();
		const eCh = api.api_get_enemyCharacters();
		for (const ch of pCh) {
			if(ch.player_state != cbt_NO_PLAYER_STATE ){
				return cbt_PLAYER;
			}
		}
		for (const em of eCh) {
			if(em.player_state != cbt_NO_PLAYER_STATE ){
				return cbt_ENEMY;
			}
		}
		return -1;
	}
	
	
	//https://stackoverflow.com/questions/15298912/javascript-generating-combinations-from-n-arrays-with-m-elements
	static cartesianArr(arrayInputs) {
		var r = [], max = arrayInputs.length-1;
		function helper(arr, i) {
			for (var j=0, l=arrayInputs[i].length; j<l; j++) {
				var a = arr.slice(0); // clone arr
				a.push(arrayInputs[i][j]);
				if (i==max)
					r.push(a);
				else
					helper(a, i+1);
			}
		}
		helper([], 0);
		return r;
	};
	static permute (arrayInputs) {
	  var length = arrayInputs.length,
		  result = [arrayInputs.slice()],
		  c = new Array(length).fill(0),
		  i = 1, k, p;

	  while (i < length) {
		if (c[i] < i) {
		  k = i % 2 && c[i];
		  p = arrayInputs[i];
		  arrayInputs[i] = arrayInputs[k];
		  arrayInputs[k] = p;
		  ++c[i];
		  i = 1;
		  result.push(arrayInputs.slice());
		} else {
		  c[i] = 0;
		  ++i;
		}
	  }
	  return result;
	};
static #fastForwardAI(){
	//fast-forward AI
	if(api.api_getCurrentPlayerState() == cbt_ENEMY){
		let maxMoves = Sy.cbt_varEnemyCharacters.length;
		for(let i=0;i<maxMoves*5;i+=1){
			const isRunning = ai.AI();
			if(!isRunning){
				break;
			}
		}
	}
};
static #applyMoveFast(move){
	//method that skips the upkeep that would normally be invloved with player actions
	//e.g. validation, unit selection and intermediate states (idle->move->tgt) are ignored
	//simply assumes the move is valid skips ahead to the final state.
	//this is dangerous, as it could implement impossible moves.
	//assuming the moves input are initially valid, this should be ok
	//actually executing the moves afterward should be done with the regular API methods to check validity
	const ch = Sy.getCharacterAtPosition(Bit.GET_X(move.from),Bit.GET_Y(move.from));
	//Sy.cbt_isv_STATE_IDLE_xy = move.from;//maybe not needed?
	//Sy.cbt_isv_STATE_DISPLAY_MOVE_xy = move.to;//maybe not needed?
	Sy.changeChPosistion(ch,move.to);
	if(move.tgt != move.to){
		const slectedTgt = Sy.getCharacterAtPosition(Bit.GET_X(move.tgt),Bit.GET_Y(move.tgt));
		//someone else has KO'ed the unit, set yourself to wait (choose your "from" destination)
		if(slectedTgt.player_state != cbt_NO_PLAYER_STATE){
			Sy.performBattleCalculation(ch, slectedTgt);
		}
	}
	//Sy.resetMove();//maybe not needed?
	//Sy.resetAttack();
	ch.hasMoved = true;
	Sy.cbt_CurrentState=cbt_STATE_IDLE;
}
//use this if the order of attacks is unimportant
static #getUnorderedMoves(){
	
	let chs = api.api_get_playerCharacters();
	let allCh = [];
	for(let i=0;i< chs.length;i+=1){
		if(chs[i].player_state!=cbt_NO_PLAYER_STATE){
		allCh.push(i);
		}
	}
	const actions = [];
	//TODO: if there are action units...
	const actionMoveCells = [];
	for(const chIdx of allCh){
		const ch = chs[chIdx];
		const actionCells = [];
		Sy.resetAttack();
		Sy.resetMove();
		Sy.fillMoveAndAttackForCharacter(ch);
		const canAttkCell = function(x,y,i,j){
			//if you've moved to cell:x,y see if you can attack anyone at i,j
			const otherCh = Sy.getCharacterAtPosition(i, j);
			if(otherCh.player_state == cbt_ENEMY) {
				return true;
			}
			return false;
		}
		const MAP_WIDTH = api.api_getMapWidth();
		const MAP_HEIGHT = api.api_getMapHeight();
		for (let x = 0; x < MAP_WIDTH; x += 1) {
			for (let y = 0; y < MAP_HEIGHT; y += 1) {
				if(Sy.getMoveForCell(x,y) != 0){
					//move without attacking, tgt == destination (action)
					actionCells.push({
						from:ch.point_xy,
						to:Bit.SET_XY(x,y),
						tgt:Bit.SET_XY(x,y)
					});
					//move with attacking
					
					const min_range = ch.min_range;
					const max_range = ch.max_range;
					const tgtSet = new Set();//use a set, because the below iteration can overlap?
					
					for(let j=max_range;j>=min_range;j-=1){
						for(let i=0;i<j;i+=1){
							//diagonal left-up
							if(x-j+i>=0){
								if(canAttkCell(x,y,x-j+i,y-i)){
									tgtSet.add(Bit.SET_XY(x-j+i,y-i));
								}
							}
							//diagonal down-right
							if(x+j-i<Sy.MAP_WIDTH){
								if(canAttkCell(x,y,x+j-i,y+i)){
									tgtSet.add(Bit.SET_XY(x+j-i,y+i));
								}
							}
							//diagonal top-right
							if(y-j+i>=0){
								if(canAttkCell(x,y,x+i,y-j+i)){
									tgtSet.add(Bit.SET_XY(x+i,y-j+i));
								}
							}
							//diagonal left-down
							if(y+j-i<Sy.MAP_HEIGHT){
								if(canAttkCell(x,y,x-i,y+j-i)){
									tgtSet.add(Bit.SET_XY(x-i,y+j-i));
								}
							}
						}
					}
					
					for(const tgt of tgtSet){
						actionCells.push({
							from:ch.point_xy,
							to:Bit.SET_XY(x,y),
							tgt:tgt
						});
					}
				}
			}
		}
		actionMoveCells.push(actionCells);
	}
	const allactions =  SyBoard.cartesianArr(actionMoveCells);//[[c1,c2][d1,d2]]
	//allactions = [[c1,d1],[c1,d2],[c2,d1],[c1,d2]]
	for(let action of allactions){
		//check rules that it's possible (i.e. no two units are moving into the same cell)
		//sort the array, then duplicate points will be next to each other
		action.sort(function(a,b){
			return a.to-b.to;
		});
		let pointPossible = true;
		for(let i=1;i<action.length;i+=1){
			if(action[i-1].to==action[i].to){
				//multiple units trying to move to the same cell, move invalid
				pointPossible = false;
				break;
			}
		}
		if(!pointPossible){
			continue;
		}
		//got here, now need to check if the order of movement is possible
		const isMoveOrderOk = function(w){
			//need to check that for each entry in order, 
			//that the "to" position does not overlap a "from" posiion of a next unit
			//TODO: use a faster data structure here.
			for(let i=0;i<w.length;i+=1){
				const pointTo = w[i].to;//current unit's desired location
				for(let j=i+1;j<w.length;j+=1){
					const pointFrom = w[j].from;//next unit's current location
					if(pointFrom==pointTo){//overlap, cannot move there without changing the unit order
						return false;
					}
				}
			}
			return true;
		};
		if(!isMoveOrderOk(action)){
			//console.log("not good order: ",action);
			//move order is not ok, that means we need to try swapping the order of units
			//TODO: permute can be done outside the 'allactions' loop, since it just needs to enumerate player order (actionUnitPermutatios = permute(Array.from(actionUnits)))
			const actionOrdering = SyBoard.permute(action);
			let foundGoodOrder = false;
			for(const checkOrder of actionOrdering){
				if(isMoveOrderOk(checkOrder)){
					foundGoodOrder = true;
					//console.log("found good ordering:",checkOrder);
					action = checkOrder;
					break;
				}
			}
			if(!foundGoodOrder){
				continue;
			}
		}
		//if got here all checks passed, can use it
		actions.push(action);
	}
				   // V|swapped      |V
	//actions = [[c1,d1],[d2,c1],[d1,c2],[c1,d2]]
	return actions;
}

}

export {SyBoard};