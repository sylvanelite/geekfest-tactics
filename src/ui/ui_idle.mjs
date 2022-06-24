
import { Sy_api } from "../state/api.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { ui_background } from "./ui_background.mjs";
import { ui_displayMove } from "./ui_displayMove.mjs";

const TERRAIN_IMPASSIBLE = 99;
	import { 
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_NO_PLAYER_STATE
	}from "../state/consts.mjs";

const colours = [
	'salmon',
	'pink',
	'orange',
	'yellow',
	'purple',
	'lavender',
	'magenta',
	'greenyellow',
	'teal',
	'turquoise',
	'bisque'

];
class ui_idle{
	static draw(ctx){
		ui_background.draw(ctx);
		
		for(const chId of ui_idle.#highlightedCharacters){
			ui_background.drawHighlightedCharacter(chId,ctx);
		}
		
		//could probably call drawHighlightedCharacter on hover too
	}
	static click(e){
		const cell = Renderer.getMouseCellTileOrIso(Sy_api.api_getMapWidth(),Sy_api.api_getMapHeight());
		//console.log("click: idle",e,cell);
		if(cell.x>=Sy_api.api_getMapWidth()||cell.y>=Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			console.log("cell out of bounds: ",cell.x,cell.y);
			return;
		}
		
		//check if clicking on enemy, if so, toggle their highlight grid
		const eCh = Sy_api.api_getCharacterAtPosition(cell.x,cell.y);
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		if(eCh.player_state != cbt_NO_PLAYER_STATE && eCh.player_state != curPlayerState){
			ui_idle.#highlightCharacter(eCh);
			return;
		}
		
		Sy_api.api_idle_selectCharacter(cell.x,cell.y);
		ui_displayMove.clearPath();
	}
	
	static #highlightedCharacters = new Set();
	static #highlightCharacter(ch){//toggles the highlight on a given character
		if(ui_idle.#highlightedCharacters.has(ch.id)){
			ui_idle.#highlightedCharacters.delete(ch.id);
		}else{
			ui_idle.#highlightedCharacters.add(ch.id);
		}
	}
	
	static clearEnemyHighlight(){
		ui_idle.#highlightedCharacters.clear();
	}
}
export {ui_idle};