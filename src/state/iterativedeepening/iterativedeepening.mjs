import {Bit} from "../bit.mjs";
import {Sy} from '../main.mjs';
import { Sy_AI as ai } from "../ai.mjs";
import { Sy_api } from "../api.mjs";
import {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE,
	cbt_STATE_IDLE,
	cbt_STATE_SELECT_WEAPON_TARGET,
	st_Character,
	cbt_NULL_CHARACTER
} from "../consts.mjs";

/*
iterative deeping
//https://gist.github.com/samcorcos/09912fcf596dad52842db9edf7b60a69

1)
fill tree a state, 
if state is not terminal, children = and a list of moves->new states
*/

const RESULT={
	WIN:'WIN',
	LOSE:'LOSE',
	NOT_FOUND:'NOT_FOUND'
};

class IterativeDeepening {
	static applyMove(move){
		/* play a move, move being an element from .moves() list */
		for(const m of move){
			//await Minimax.applyMove(m);
			SyBoard.applyMoveFast(m);
		}
		Sy.checkEndOfTurn();//--only needed if using "applyMoveFast"
		SyBoard.fastForwardAI();//--only needed if using "applyMoveFast"
	}
	//TODO: currently just finds any terminal state
	//      need to find winning states
	static evaluate(node){
		Sy_api.api_setState(node.state);
		/* true if game is over, false otherwise */
		const pCh = Sy_api.api_get_playerCharacters();
		const eCh = Sy_api.api_get_enemyCharacters();
		let pAlive = false;
		let eAlive = false;
		for (const ch of pCh) {
			if(ch.player_state != cbt_NO_PLAYER_STATE ){
				pAlive=true;
				break;
			}
		}
		for (const em of eCh) {
			if(em.player_state != cbt_NO_PLAYER_STATE ){
				eAlive=true;
				break;
			}
		}
		node.isTerminal = !pAlive||!eAlive;
		node.isPlayerWin = pAlive&&!eAlive;
		return node.isTerminal;
	}
	static populateChildren(node){
		if(node.children){return;}//already initialised
		node.children = [];
		Sy_api.api_setState(node.state);
		const moves = SyBoard.getUnorderedMoves();
		for(const move of moves){
			//to ensure the node's state doesn't get mutated, get a deep copy of it
			Sy_api.api_setState(node.state);
			Sy_api.api_setState(Sy_api.api_cloneState());
			IterativeDeepening.applyMove(move);
			node.children.push({
				state:Sy_api.api_cloneState()
			});
		}
	}

	static truncatedDFS(node, maxDepth, currentDepth = 1){
	  if (IterativeDeepening.evaluate(node)){
		  if(node.isPlayerWin){
			  return RESULT.WIN;
		  }
		  return RESULT.LOSE;
	  }
	  IterativeDeepening.populateChildren(node);
	  for (const child of node.children) {
		if (currentDepth < maxDepth) {
			const found = IterativeDeepening.truncatedDFS(child, maxDepth, currentDepth + 1);
			//can short-circuit on a win
			if (found == RESULT.WIN) {
				return RESULT.WIN;
			}
			//TODO: how to handle lose?
			//at the moment, just treat it the same as 'not found'
			//i.e. keep searching until all children exhausted
		}
	  }
	  return RESULT.NOT_FOUND;
	}

	static search(MAX_DEPTH){//return true/false depending on if win is found (todo: use best score instead)
	  const initialState = Sy_api.api_cloneState();
	  const node = {
			state:Sy_api.api_cloneState()
		};
	  let depth = 1;
	  while (depth < MAX_DEPTH) {
		const found = IterativeDeepening.truncatedDFS(node, MAX_DEPTH, depth);
		console.log("depth:"+depth+" "+found);
		if(found== RESULT.WIN){
			Sy_api.api_setState(initialState);
			console.log(node);
			return RESULT.WIN;
		}
		depth += 1;
	  }
	  Sy_api.api_setState(initialState);
			console.log(node);
	  return RESULT.NOT_FOUND;// didn't find anything
	}

}


class SyBoard {
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
	static fastForwardAI(){
		//fast-forward AI
		if(Sy_api.api_getCurrentPlayerState() == cbt_ENEMY){
			let maxMoves = Sy.cbt_varCharacters.length;
			for(let i=0;i<maxMoves*5;i+=1){
				const isRunning = ai.AI();
				if(!isRunning){
					break;
				}
			}
		}
	};
	static applyMoveFast(move){
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
	static getUnorderedMoves(){
	
	let chs = Sy_api.api_get_playerCharacters();
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
		const MAP_WIDTH = Sy_api.api_getMapWidth();
		const MAP_HEIGHT = Sy_api.api_getMapHeight();
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
							const upX = x-j+i;
							const downX = x+j-i;
							const rightY = y-j+i;
							const leftY = y+j-i; 
							if(upX>=0&&upX<Sy.MAP_WIDTH&&y-i>=0){
								if(canAttkCell(x,y,upX,y-i)){
									tgtSet.add(Bit.SET_XY(upX,y-i));
								}
							}
							if(downX>=0&&downX<Sy.MAP_WIDTH&&y+i<Sy.MAP_HEIGHT){
								if(canAttkCell(x,y,downX,y+i)){
									tgtSet.add(Bit.SET_XY(downX,y+i));
								}
							}
							if(rightY>=0&&rightY<Sy.MAP_HEIGHT&&x+i<Sy.MAP_WIDTH){
								if(canAttkCell(x,y,x+i,rightY)){
									tgtSet.add(Bit.SET_XY(x+i,rightY));
								}
							}
							if(leftY>=0&&leftY<Sy.MAP_HEIGHT&&x-i>=0){
								if(canAttkCell(x,y,x-i,leftY)){
									tgtSet.add(Bit.SET_XY(x-i,leftY));
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

export {IterativeDeepening,SyBoard};















