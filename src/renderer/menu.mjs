import {Network} from "./network.mjs";

const MENU_STATE={
	SPLASH:"splash",
	CHARACTER:"character",
	MAP:"map",
	PLAYING:"playing"//not a menu state
}


class Menu{
	static #menuState = MENU_STATE.SPLASH;
	
	static setMenuState(newState){
		Menu.#menuState = newState;		
	}
	
	static getMenuState(){
		return Menu.#menuState;
	}
	
	static isInMenu(){
		return Menu.#menuState != MENU_STATE.PLAYING;
	}
	
	static endGame(victory){
		Menu.setMenuState(MENU_STATE.CHARACTER);
		const nwStatus = Network.getStatus();
		const isLocal = (nwStatus=="disabled");
		if(!isLocal){
			Menu.endCallback();
		}
		Network.endNetwork();//disconnect, safe to call even if NW is not initiated
	}
	//need to call ui_menuMap.clearCurrentLevel on end game
	//but can't call directly since ui_menuMap depends on menu
	//instead establish a callback at runtime to avoid circular references
	endCallback = ()=>{};//can't be private because it's a func reference?
	static setEndCallback(callback){
		Menu.endCallback = callback;
	}
}


export {Menu,MENU_STATE};