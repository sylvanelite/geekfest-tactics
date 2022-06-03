
import { Sy_api } from "../state/api.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { ui_background } from "./ui_background.mjs";
import { ui_displayMove } from "./ui_displayMove.mjs";

const TERRAIN_IMPASSIBLE = 99;
	import { 
	cbt_PLAYER,
	cbt_ENEMY
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
	}
	static click(e){
		const cell = Renderer.getMouseCell();
		console.log("click: idle",e,cell);
		if(cell.x>Sy_api.api_getMapWidth()||cell.y>Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			console.log("cell out of bounds: ",cell.x,cell.y);
			return;
		}
		Sy_api.api_idle_selectCharacter(cell.x,cell.y);
		ui_displayMove.clearPath();
	}
}
export {ui_idle};