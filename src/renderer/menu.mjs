
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
	}
}


export {Menu,MENU_STATE};