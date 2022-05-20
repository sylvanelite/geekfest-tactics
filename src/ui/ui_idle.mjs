
import { Sy } from "../state/main.mjs";//todo: remove Sy?
import { Sy_api } from "../state/api.mjs";
import { Renderer } from "../renderer/renderer.mjs";

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
		const tileSize = 16;
		const w = Sy_api.api_getMapWidth();
		const h = Sy_api.api_getMapHeight();
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				
				const terrain = Sy.getTerrainForCell(i,j);
				ctx.fillStyle="white";
				if(terrain>1){
					ctx.fillStyle= colours[terrain%colours.length];
				}
				if(terrain==TERRAIN_IMPASSIBLE){
					ctx.fillStyle="black";
				}
				ctx.fillRect(i*tileSize,j*tileSize,tileSize,tileSize);
				
				if(Sy_api.api_getAttackForCell(i,j)){
					ctx.lineWidth = 1;
					ctx.strokeStyle="red";
					ctx.strokeRect(i*tileSize-0.5,j*tileSize-0.5,tileSize,tileSize);
				}
				if(Sy_api.api_getMoveForCell(i,j)){
					ctx.lineWidth = 1;
					ctx.strokeStyle="blue";
					ctx.strokeRect(i*tileSize-0.5,j*tileSize-0.5,tileSize,tileSize);
				}
				const pState = Sy_api.api_getCharacterAtPosition(i,j).player_state;
				if(pState == cbt_PLAYER){
					ctx.fillStyle="blue";
					ctx.beginPath();
					ctx.arc(i*tileSize+tileSize/2, 
							j*tileSize+tileSize/2,
							tileSize/2, 0, 2 * Math.PI);
					ctx.fill();
				}
				if(pState == cbt_ENEMY){
					ctx.fillStyle="red";
					ctx.beginPath();
					ctx.arc(i*tileSize+tileSize/2, 
							j*tileSize+tileSize/2,
							tileSize/2, 0, 2 * Math.PI);
					ctx.fill();
				}
			}
		}
		
	}
	static click(e){
		console.log("click: idle",e);
		const cell = Renderer.getMouseCell();
		console.log(cell)
		if(cell.x>Sy_api.api_getMapWidth()||cell.y>Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			console.log("cell out of bounds: ",cell.x,cell.y);
			return;
		}
		Sy_api.api_idle_selectCharacter(cell.x,cell.y);
	}
}
export {ui_idle};