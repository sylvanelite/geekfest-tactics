
import { Sy } from "../state/main.mjs";//todo: remove Sy?
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { Renderer } from "../renderer/renderer.mjs";
const TERRAIN_IMPASSIBLE = 99;
	import { 
	cbt_NO_PLAYER_STATE,
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
				ctx.fillRect(i*Renderer.TILE_SIZE,j*Renderer.TILE_SIZE,Renderer.TILE_SIZE,Renderer.TILE_SIZE);
			}
		}
		
		
		//TODO, wrap fog with api...
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				const fog = Sy.getFogForCell(i,j);
				if(fog){
					ctx.fillStyle="rgba(200,200,200,0.7)";
					ctx.fillRect(i*Renderer.TILE_SIZE,j*Renderer.TILE_SIZE,Renderer.TILE_SIZE,Renderer.TILE_SIZE);
				}
			}
		}
	}
	static drawGridEffects(ctx){
		const w = Sy_api.api_getMapWidth();
		const h = Sy_api.api_getMapHeight();
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				ctx.strokeStyle="#ccc";
				ctx.strokeRect(i*Renderer.TILE_SIZE-0.5,j*Renderer.TILE_SIZE-0.5,Renderer.TILE_SIZE,Renderer.TILE_SIZE);
				if(Sy_api.api_getAttackForCell(i,j)){
					ctx.lineWidth = 1;
					ctx.strokeStyle="red";
					ctx.strokeRect(i*Renderer.TILE_SIZE-0.5,j*Renderer.TILE_SIZE-0.5,Renderer.TILE_SIZE,Renderer.TILE_SIZE);
				}
				if(Sy_api.api_getMoveForCell(i,j)){
					ctx.lineWidth = 1;
					ctx.strokeStyle="blue";
					ctx.strokeRect(i*Renderer.TILE_SIZE-0.5,j*Renderer.TILE_SIZE-0.5,Renderer.TILE_SIZE,Renderer.TILE_SIZE);
				}
			}
		}
	}
	static drawUnitAtPosition(ctx,ch,x,y){
		if(Sy.FOG_ENABLED){
			if(Sy.getFogForCell(x,y)&&ch.player_state!=Sy_api.api_getCurrentPlayerState()){
				return;
			}
		}
		if(ch.player_state == cbt_NO_PLAYER_STATE){
			return;
		}
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
		ctx.arc(x*Renderer.TILE_SIZE+Renderer.TILE_SIZE/2, 
				y*Renderer.TILE_SIZE+Renderer.TILE_SIZE/2,
				Renderer.TILE_SIZE/2, 0, 2 * Math.PI);
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