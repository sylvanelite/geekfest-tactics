
import { Sy_api } from "../state/api.mjs";
import { Sy } from "../state/main.mjs";
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
		for(let j=0;j<Sy.MAP_HEIGHT;j+=1){
			for(let i=0;i<Sy.MAP_WIDTH;i+=1){
				
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
					ctx.strokeStyle="2px solid red";
					ctx.strokeRect(i*tileSize,j*tileSize,tileSize,tileSize);
				}
				if(Sy_api.api_getMoveForCell(i,j)){
					ctx.strokeStyle="2px solid blue";
					ctx.strokeRect(i*tileSize,j*tileSize,tileSize,tileSize);
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
	}
}
export {ui_idle};