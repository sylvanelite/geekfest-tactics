
import { Sy } from "../state/main.mjs";//todo: remove Sy?
import { GameState,CONTROL_SOURCE } from "../Game.mjs";//todo: remove Game?
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { Terrain } from "./terrain/terrain.mjs";

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
	static #backupFog(){
		//return Sy_api.api_cloneState();//could use save/restore state? overkill for just fog
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		return {fog:Sy.cbt_fog.slice(),curPlayerState};
	}
	static #restoreFog(savedFog){
		//Sy_api.api_setState(save);
		Sy.cbt_fog = savedFog.fog;
		Sy.cbt_CurrentPlayerState = savedFog.curPlayerState;
	}
	static #applyPlayerFog(){
		if(!Sy.FOG_ENABLED ){return;}
		//resets the fog from the point of view of a local player
		//if it's your turn, no change
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		const controlSource = GameState.getControlSourceForPlayer(curPlayerState);
		if(controlSource==CONTROL_SOURCE.LOCAL){return;}
		//otherwise, it's an enemy turn
		//flip the renderer (assume that if control source is non-local, then player is local
		//                  (may not be a good assumption, e.g. if AI v AI?)
		const otherPlayer = (Sy.cbt_CurrentPlayerState==cbt_PLAYER?cbt_ENEMY:cbt_PLAYER);
		Sy.cbt_CurrentPlayerState = otherPlayer;//set it so that the renderer and API think the player is in control
		Sy.resetFog(Sy.FOG_ENABLED);//blank out the controller's fog
		//if it's not your turn, only reveal within 2 spaces of unit
		//note: can't use api get characters, since that has a fog filter built in
		const pCh= Sy.cbt_varCharacters.filter((ch)=>{
			return ch.player_state==otherPlayer;
		});
		for(const ch of pCh){
			const [x,y] = Bit.GET_XY(ch.point_xy);
			Sy.clearFogForCharacter(ch,x,y);
		}
	}
	
	
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
		
		//-- don't reveal fog unless the control source is local for the controller
		const backup = ui_background.#backupFog();
		ui_background.#applyPlayerFog();
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
		ui_background.#restoreFog(backup);
		
		
		
		
		
		
		//--start:iso
		const mouse = Renderer.getMouseIsoCell();
		console.log(mouse);
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				const terrain = Sy.getTerrainForCell(i,j);
				const spr = Terrain.getTerrainSprite(i,j,terrain);
				if(mouse.x == i&&mouse.y==j){
					spr.y-=4;
				}
				Renderer.drawSprite(spr,ctx);
			}
		}
		//--end:iso

	}
	static drawGridEffects(ctx){
		
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		const controlSource = GameState.getControlSourceForPlayer(curPlayerState);
		//render otherwise
		const w = Sy_api.api_getMapWidth();
		const h = Sy_api.api_getMapHeight();
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				ctx.strokeStyle="#ccc";
				ctx.strokeRect(i*Renderer.TILE_SIZE-0.5,j*Renderer.TILE_SIZE-0.5,Renderer.TILE_SIZE,Renderer.TILE_SIZE);
				//if not local, and fog enabled (or always?) don't render attack grid?
				if(Sy.FOG_ENABLED&&controlSource!=CONTROL_SOURCE.LOCAL ){continue;}
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
			//-- don't reveal fog unless the control source is local for the controller
			const backup = ui_background.#backupFog();
			ui_background.#applyPlayerFog();
			const isHidden = (Sy.getFogForCell(Math.floor(x),Math.floor(y))&&ch.player_state!=Sy_api.api_getCurrentPlayerState());
			ui_background.#restoreFog(backup);
			if(isHidden){return;}
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
	static drawUnits(ctx,funcHasCustomDraw,funcCustomDraw){
		//-- don't reveal fog unless the control source is local for the controller
		const backup = ui_background.#backupFog();
		ui_background.#applyPlayerFog();
		const chs = Sy_api.api_get_allCharacters();
		for(const ch of chs){
			if(funcHasCustomDraw!=null&&funcHasCustomDraw(ch)){
				funcCustomDraw(ch)
			}else{
				ui_background.drawUnit(ctx,ch);
			}
		}
		ui_background.#restoreFog(backup);
	}
	
	static draw(ctx){
		ui_background.drawTerrain(ctx);
		ui_background.drawGridEffects(ctx);
		ui_background.drawUnits(ctx);
	}
}
export {ui_background};