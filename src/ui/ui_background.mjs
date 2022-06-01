
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
				const terrain = Sy.getTerrainForCell(i,j);
				ctx.fillStyle="white";
				if(terrain>1){
					ctx.fillStyle= colours[terrain%colours.length];
				}
				if(terrain==TERRAIN_IMPASSIBLE){
					ctx.fillStyle="black";
				}
				ctx.fillRect(i*tileSize,j*tileSize,tileSize,tileSize);
			}
		}
	}
	static drawGridEffects(ctx){
		const w = Sy_api.api_getMapWidth();
		const h = Sy_api.api_getMapHeight();
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				ctx.strokeStyle="#ccc";
				ctx.strokeRect(i*tileSize-0.5,j*tileSize-0.5,tileSize,tileSize);
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
	static drawUnitAtPosition(ctx,ch,x,y){
		if(ch.player_state == cbt_PLAYER){
			ctx.fillStyle="blue";
		}
		if(ch.player_state == cbt_ENEMY){
			ctx.fillStyle="red";
		}
		if(ch.hasMoved){
			ctx.fillStyle="#888";
		}
		ctx.beginPath();
		ctx.arc(x*tileSize+tileSize/2, 
				y*tileSize+tileSize/2,
				tileSize/2, 0, 2 * Math.PI);
		ctx.fill();
	}
	static drawUnit(ctx,ch){
		const [x,y] = Bit.GET_XY(ch.point_xy);
		ui_background.drawUnitAtPosition(ctx,ch,x,y);
	}
	static drawUnits(ctx){
		const chs = Sy_api.api_get_allCharacters();
		for(const ch of chs){
			ui_background.drawUnit(ctx,ch);
		}
	}
	
	static draw(ctx){
		ui_background.drawTerrain(ctx);
		ui_background.drawGridEffects(ctx);
		ui_background.drawUnits(ctx);
	}
}
export {ui_background};