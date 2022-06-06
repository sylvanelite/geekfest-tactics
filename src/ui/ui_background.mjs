
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
		//NOTE: assumes that the local player is always cbt_PLAYER
		//      could use if control source == local, but then control source == await is problematic
		//      also don't explicity know if source == local, who the opponent is 
		//      this means fog won't work correctly for 1-on-1 on local console
		//could implement a check, getContorlSourceForPlayer?
		if(curPlayerState==cbt_PLAYER){return;}
		Sy.cbt_CurrentPlayerState = cbt_PLAYER;//set it so that the renderer and API think the player is in control
		Sy.resetFog(Sy.FOG_ENABLED);//blank out the controller's fog
		//if it's not your turn, only reveal within 2 spaces of unit
		//note: can't use api get characters, since that has a fog filter built in
		const pCh= Sy.cbt_varCharacters.filter((ch)=>{
			return ch.player_state==cbt_PLAYER;
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
			//-- don't reveal fog unless the control source is local for the controller
			const backup = ui_background.#backupFog();
			ui_background.#applyPlayerFog();
			const isHidden = (Sy.getFogForCell(x,y)&&ch.player_state!=Sy_api.api_getCurrentPlayerState());
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
	static drawUnits(ctx){
		//-- don't reveal fog unless the control source is local for the controller
		const backup = ui_background.#backupFog();
		ui_background.#applyPlayerFog();
		const chs = Sy_api.api_get_allCharacters();
		for(const ch of chs){
			ui_background.drawUnit(ctx,ch);
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