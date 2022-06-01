
import { Sy_api } from './state/api.js';

import {
	cbt_STATE_IDLE,
	cbt_STATE_DISPLAY_MOVE,
	cbt_STATE_SELECT_WEAPON_TARGET
} from './state/consts.mjs';

const GAME_STATE={
	BATTLE_IDLE: cbt_STATE_IDLE,
	BATTLE_MOVE: cbt_STATE_DISPLAY_MOVE,
	BATTLE_TARGET: cbt_STATE_SELECT_WEAPON_TARGET
};

class GameState {
	static getCurrentState(){
		//todo: if not in battle, return non-battle states.
		return Sy_api.api_getCurrentState();
	}
}

export { GameState,GAME_STATE };

