
import { Sy_api } from './state/api.js';

import {
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_STATE_IDLE,
	cbt_STATE_DISPLAY_MOVE,
	cbt_STATE_SELECT_WEAPON_TARGET
} from './state/consts.mjs';

const GAME_STATE={
	BATTLE_IDLE: cbt_STATE_IDLE,
	BATTLE_MOVE: cbt_STATE_DISPLAY_MOVE,
	BATTLE_TARGET: cbt_STATE_SELECT_WEAPON_TARGET
};

const CONTROL_SOURCE={
	LOCAL:'LOCAL',
	AI:'AI',
	NETWORK:'NETWORK'
};

class GameState {
	static getCurrentState(){
		//todo: if not in battle, return non-battle states.
		return Sy_api.api_getCurrentState();
	}
	static getControlSource(){
		const playerState = Sy_api.api_getCurrentPlayerState();
		//TODO: check if in battle
		if(playerState==cbt_PLAYER){
			return CONTROL_SOURCE.LOCAL;
		}
		if(playerState==cbt_ENEMY){
			return CONTROL_SOURCE.AI;
		}
		//default: local
		return CONTROL_SOURCE.LOCAL;
	}
}

export { GameState,GAME_STATE,CONTROL_SOURCE };

