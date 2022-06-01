
import { Sy } from "../state/main.mjs";//todo: remove Sy?
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
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

const tileSize = 16;
class ui_background{
	static drawTerrain(ctx){
		const w = Sy_api.api_getMapWidth();
		const h = Sy_api.api_getMapHeight();
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				ctx.strokeStyle="#ccc";
				ctx.strokeRect(i*tileSize-0.5,j*tileSize-0.5,tileSize,tileSize);
				
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
			}
		}
	}
	static drawUnits(ctx){
		const pCh = Sy_api.api_get_playerCharacters();
		const eCh = Sy_api.api_get_enemyCharacters();
		for(const ch of pCh){
			ctx.fillStyle="blue";
			if(ch.hasMoved){
				ctx.fillStyle="#888";
			}
			ctx.beginPath();
			const [x,y] = Bit.GET_XY(ch.point_xy);
			ctx.arc(x*tileSize+tileSize/2, 
					y*tileSize+tileSize/2,
					tileSize/2, 0, 2 * Math.PI);
			ctx.fill();
		}
		for(const ch of eCh){
			ctx.fillStyle="red";
			if(ch.hasMoved){
				ctx.fillStyle="#888";
			}
			ctx.beginPath();
			const [x,y] = Bit.GET_XY(ch.point_xy);
			ctx.arc(x*tileSize+tileSize/2, 
					y*tileSize+tileSize/2,
					tileSize/2, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
	
	static draw(ctx){
		ui_background.drawTerrain(ctx);
		ui_background.drawUnits(ctx);
	}
}
export {ui_background};