
import { Sy_api } from './state/api.js';
import {Network}from './renderer/network.mjs';
import {Menu,MENU_STATE}from './renderer/menu.mjs';
window.Network=Network;//TODO: use this...


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
	BATTLE_TARGET: cbt_STATE_SELECT_WEAPON_TARGET,
	
	//... these should be ints to be consistent with above. maybe put into consts.js?
	MENU_SPLASH:MENU_STATE.SPLASH,
	MENU_CHARACTER:MENU_STATE.CHARACTER,
	MENU_MAP:MENU_STATE.MAP
	
};

const CONTROL_SOURCE={
	LOCAL:'LOCAL',
	AI:'AI',
	NETWORK:'NETWORK',
	AWAIT:'AWAIT',
};

class GameState {
	static getCurrentState(){
		//if not in battle, return non-battle states.
		if(Menu.isInMenu()){
			return Menu.getMenuState();
		}
		return Sy_api.api_getCurrentState();
	}
	static getControlSource(){
		//check if in the menu
		if(Menu.isInMenu()){
			return CONTROL_SOURCE.LOCAL;
		}
		if(Sy_api.api_isAwaiting()){
			return CONTROL_SOURCE.AWAIT;
		}
		//in game, return player control sources
		const playerState = Sy_api.api_getCurrentPlayerState();
		if(playerState==cbt_PLAYER){
			return GameState.getControlSourceForPlayer(playerState);
		}
		if(playerState==cbt_ENEMY){
			//check network, local, etc
			return GameState.getControlSourceForPlayer(playerState);
		}
		//default: local
		return CONTROL_SOURCE.LOCAL;
	}
	static getControlSourceForPlayer(playerState){
		if(Network.isEnabled()){
			if(Network.isHost()){
				if(playerState==cbt_PLAYER){
					return CONTROL_SOURCE.LOCAL;
				}
				if(playerState==cbt_ENEMY){
					return CONTROL_SOURCE.NETWORK;
				}
			}else{
				if(playerState==cbt_PLAYER){
					return CONTROL_SOURCE.NETWORK;
				}
				if(playerState==cbt_ENEMY){
					return CONTROL_SOURCE.LOCAL;
				}
			}
		}
		//local play against AI (TODO: local pvp?)
		if(playerState==cbt_PLAYER){
			return CONTROL_SOURCE.LOCAL;
		}
		if(playerState==cbt_ENEMY){
			return CONTROL_SOURCE.AI;
		}
	}
}

export { GameState,GAME_STATE,CONTROL_SOURCE };

