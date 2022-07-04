
import { Sy } from "../state/main.mjs";//todo: remove Sy?
import { GameState,CONTROL_SOURCE } from "../Game.mjs";//todo: remove Game?
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { Text } from "../renderer/text.mjs";
import { Isometric } from "../renderer/isometric.mjs";
import { Terrain } from "./terrain/terrain.mjs";
import { Audio,BGM,SFX } from "../renderer/audio.mjs";

import { ui_menuCharacter } from "./ui_menuCharacter.mjs";

const TERRAIN_IMPASSIBLE = 99;
	import { 
	cbt_NO_PLAYER_STATE,
	cbt_PLAYER,
	cbt_ENEMY,
	cbt_STATE_SELECT_WEAPON_TARGET,
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
//full dimensions of iso sprites
const ISO_TILE_WIDTH=148;
const ISO_TILE_HEIGHT=164;

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
	
	static drawHighlightedCharacter(chId,ctx){
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		const controlSource = GameState.getControlSourceForPlayer(curPlayerState);
		//used for player to see enemy attack range while in their idle state
		if(controlSource!=CONTROL_SOURCE.LOCAL){return;}//don't render during AI or enemy turn
		

		//-- don't show attack range if unit is in fog
		const backup = ui_background.#backupFog();
		ui_background.#applyPlayerFog();
		const chs = Sy_api.api_get_allCharacters();
		for(const ch of chs){
			//need to search by id, since the position might change between turns
			if(ch.id == chId){
				//generate the mov/atk range
				//could split this into multiple funcs, one to get the move/atk per ch
				//another to render the combined grid
				//this would stop overlapping grids being re-rendered many times
				
				const moveCopy= Array.from(Sy.cbt_move);
				const atkCopy = Array.from(Sy.cbt_attack);
				Sy.resetMove();
				Sy.resetAttack();
				Sy.fillMoveAndAttackForCharacter(ch);
				//--render the mov/atk range
				
				//change the colour of highlight
				ctx.globalCompositeOperation='difference';
				ui_background.drawGridEffects(ctx);
				ctx.globalCompositeOperation='source-over';
				
				//--finish render, restore from backup
				Sy.cbt_move = moveCopy;
				Sy.cbt_attack = atkCopy;
				
				break;
			}
		}
		ui_background.#restoreFog(backup);
		
	}
	
	static drawTerrain(ctx){
		//background
		ctx.fillStyle = "rgba(50,50,50,1)";
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
		
		//2d minimap
		const w = Sy_api.api_getMapWidth();
		const h = Sy_api.api_getMapHeight();
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				const terrain = Sy.getTerrainForCell(i,j);
				ctx.fillStyle="rgba(0,0,0,0)";
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
					ctx.fillStyle="rgba(128,128,128,0.7)";
					ctx.fillRect(i*Renderer.TILE_SIZE,j*Renderer.TILE_SIZE,Renderer.TILE_SIZE,Renderer.TILE_SIZE);
				}
			}
		}
		ui_background.#restoreFog(backup);
		
		
		//--start:iso
		const mouse = Renderer.getMouseIsoCell();
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				const sprList = Terrain.getTerrainSprite(i,j);
				for(const spr of sprList){
					if(mouse.x == i&&mouse.y==j){
						spr.y-=4;
					}
					//static drawSpriteScaled(sprite,destW,destH,ctx){
					Renderer.drawSpriteScaled(spr,
						ISO_TILE_WIDTH*Isometric.SCALE,
						ISO_TILE_HEIGHT*Isometric.SCALE,
						ctx);
				}
			}
		}
		const backupIso = ui_background.#backupFog();
		ui_background.#applyPlayerFog();
		//TODO, wrap fog with api...
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				const fog = Sy.getFogForCell(i,j);
				if(fog){
					const iso = Isometric.to_screen_coordinate({x:i,y:j});
					const tileMov = (Renderer.getSprite(
						'terrain_spritesheet/obscured.png',
						iso.x-(ISO_TILE_WIDTH*Isometric.SCALE)/2,iso.y,
						ISO_TILE_WIDTH,ISO_TILE_HEIGHT,
						0,0
					));
					Renderer.drawSpriteScaled(tileMov,
						ISO_TILE_WIDTH*Isometric.SCALE,
						ISO_TILE_HEIGHT*Isometric.SCALE,
						ctx);
				}
			}
		}
		ui_background.#restoreFog(backupIso);
		//--end:iso

	}
	static drawMovementPath(path,ctx){
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		const controlSource = GameState.getControlSourceForPlayer(curPlayerState);
		if(controlSource!=CONTROL_SOURCE.LOCAL){return;}//don't need to draw the path for NW or AI
		//draw user movement path 
		for(const p of path){
			const [x,y] = Bit.GET_XY(p);
			ctx.fillStyle="#000";
			ctx.beginPath();
			ctx.arc(x*Renderer.TILE_SIZE+Renderer.TILE_SIZE/2, 
					y*Renderer.TILE_SIZE+Renderer.TILE_SIZE/2,
					Renderer.TILE_SIZE/4, 0, 2 * Math.PI);
			ctx.fill();
		}
		//draw user movement path (iso)
		for(const p of path){
			const [x,y] = Bit.GET_XY(p);
			const iso = Isometric.to_screen_coordinate({x,y});
			ctx.fillStyle="rgba(200,200,200,0.7)";
			ctx.beginPath();
			const radius = 20*Isometric.SCALE;
			ctx.arc(iso.x+24*Isometric.SCALE-radius, 
					iso.y+48*Isometric.SCALE-radius,
					radius, 0, 2 * Math.PI);
					/*
					
		ctx.ellipse(iso.x-64*Isometric.SCALE+128*Isometric.SCALE/2,
					iso.y-16-64*Isometric.SCALE+128*Isometric.SCALE,
				48, 6, 0, 0, 2 * Math.PI);//TODO: should 48,6 be *Isometric.SCALE?
					*/
			ctx.fill();
		}
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
		//--start iso
		for(let j=0;j<h;j+=1){
			for(let i=0;i<w;i+=1){
				const iso = Isometric.to_screen_coordinate({x:i,y:j});
				//if not local, and fog enabled (or always?) don't render attack grid?
				if(Sy.FOG_ENABLED&&controlSource!=CONTROL_SOURCE.LOCAL ){continue;}
				if(Sy_api.api_getMoveForCell(i,j)){
					const tileMov = (Renderer.getSprite(
						'terrain_spritesheet/move.png',
						iso.x-(ISO_TILE_WIDTH*Isometric.SCALE)/2,iso.y,
						ISO_TILE_WIDTH,ISO_TILE_HEIGHT,
						0,0
					));
					Renderer.drawSpriteScaled(tileMov,
						ISO_TILE_WIDTH*Isometric.SCALE,
						ISO_TILE_HEIGHT*Isometric.SCALE,
						ctx);
					continue;
				}
				if(Sy_api.api_getAttackForCell(i,j)){
					const tileAtk = (Renderer.getSprite(
						'terrain_spritesheet/target.png',
						iso.x-(ISO_TILE_WIDTH*Isometric.SCALE)/2,iso.y,
						ISO_TILE_WIDTH,ISO_TILE_HEIGHT,
						0,0
					));
					Renderer.drawSpriteScaled(tileAtk,
						ISO_TILE_WIDTH*Isometric.SCALE,
						ISO_TILE_HEIGHT*Isometric.SCALE,
						ctx);
					continue;
				}
			}
		}
		//--end iso
		//draw selected stats (player phase only)
		if(controlSource==CONTROL_SOURCE.LOCAL){
			const [selx,sely] = Bit.GET_XY(Sy_api.api_getCurrentChPosition());
			const selectedCh = Sy_api.api_getCharacterAtPosition(selx,sely);
			if(selectedCh.player_state!=cbt_NO_PLAYER_STATE){
				const textX = 680;
				Text.drawBitmapText(ctx,"HP: "+selectedCh.hp+"/"+selectedCh.max_hp,textX,16);
				Text.drawBitmapText(ctx,"ATK: "+selectedCh.atk,textX,32);
				Text.drawBitmapText(ctx,"MOVE: "+selectedCh.mov,textX,48);
				Text.drawBitmapText(ctx,"RANGE: "+selectedCh.min_range+"-"+selectedCh.max_range,textX,64);
			}
		}
	}
	static drawBattleHitEffect(ctx,x,y,dmg,frame){
		const iso = Isometric.to_screen_coordinate({x,y});
		const frames = [
		{x:0,y:0},
		{x:128,y:0},
		{x:256,y:0},
		{x:384,y:0},
		{x:0,y:128},
		{x:128,y:128},
		{x:256,y:128},
		{x:384,y:128},
		{x:0,y:256},
		{x:128,y:256},
		{x:256,y:256},
		{x:384,y:256},
		{x:0,y:384},
		{x:128,y:384},
		{x:256,y:384},
		{x:384,y:384},
		];
		const spr = Renderer.getSprite(
			'effects/hit_yellow.png',
			iso.x-128/2,iso.y-128/2,128,128,frames[frame].x,frames[frame].y
		);
		if(frame>8){
			//Text.drawBitmapText(ctx,""+dmg,iso.x-128/2,iso.y-frame);
		}
		Renderer.drawSprite(spr,ctx);
		if(frame==0){
			Audio.PlaySFX(SFX.attack);
		}
	}
	static drawBattleDieEffect(ctx,x,y,frame){
		const iso = Isometric.to_screen_coordinate({x,y});
		//8 frames
		const spr = Renderer.getSprite(
			'effects/fade_out.png',
			iso.x-64*Isometric.SCALE,iso.y-16-64*Isometric.SCALE,128,128,
			Math.floor(frame/2)*128,0
		);
		Renderer.drawSpriteScaled(spr,128*Isometric.SCALE,128*Isometric.SCALE,ctx);
		if(frame==4){
			Audio.PlaySFX(SFX.die);
		}
	}
	static drawToggleTurnEffect(ctx,player_state,frame){
		const alpha = Math.sin(Math.PI*frame/33)/3;
		//draw BG
		ctx.fillStyle="rgba(50,50,50,"+alpha+")";
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
		//draw BG gradient
		
		var gradient = ctx.createLinearGradient(Renderer.width/2,Renderer.height/2-64,
											Renderer.width/2,Renderer.height/2+64);
		gradient.addColorStop(0, "rgba(50,50,50,"+alpha+")");
		gradient.addColorStop(.5, (player_state==cbt_PLAYER?'blue':'red'));
		gradient.addColorStop(1, "rgba(50,50,50,"+alpha+")");
		ctx.fillStyle = gradient;
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
		
		const spr = Renderer.getSprite(
			'ui/turn_toggle.png',
			Renderer.width/2-128,
			Renderer.height/2-64,256,128,0,(player_state==cbt_PLAYER?0:128)
		);
		Renderer.drawSprite(spr,ctx);
		if(frame==1){
			Audio.PlaySFX(SFX.toggleTurn);
		}
	}
	static drawGameOverEffect(ctx){
		//need to deduce if you won/lost
		//could check for which player has units alive
		//but since there's no counterattack phase, the winner will be the current turn's player
		//toggle turn is done after the gameover check.
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		const controlSource = GameState.getControlSourceForPlayer(curPlayerState);
		//can additionally shortcut the check here
		//just need to know if the person who won/lost is the local player
		//don't need to check their actual assigned state
		
		//draw BG
		ctx.fillStyle="rgba(50,50,50,0.6)";
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
		//draw BG gradient
		
		const spr = Renderer.getSprite(
			'ui/game_over.png',
			Renderer.width/2-128,
			Renderer.height/2-64,256,128,0,(controlSource==CONTROL_SOURCE.LOCAL?0:128)
		);
		Renderer.drawSprite(spr,ctx);
	}
	static drawUnitAtPosition(ctx,ch,x,y,direction="down",frameIdx=0){
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
		//--start ISO
		if(!ch.sprite){
			//regen sprite cache
			ch.sprite = ui_menuCharacter.composeCharacterSprite({
				gender:ch.sprite_gender,
				front_arm:ch.sprite_front_arm,
				back_arm:ch.sprite_back_arm,
				torso:ch.sprite_torso,
				back:ch.sprite_back,
				weapon:ch.sprite_weapon,
				headgear:ch.sprite_headgear,
				base_hair:ch.sprite_base_hair,
				back_hair:ch.sprite_back_hair,
				front_hair:ch.sprite_front_hair,
				ear:ch.sprite_ear,
				eyebrow:ch.sprite_eyebrow,
				eyes:ch.sprite_eyes,
				mouth:ch.sprite_mouth,
				nose:ch.sprite_nose,
				head:ch.sprite_head,
				a_wing:ch.sprite_a_wing,
				a_necklace:ch.sprite_a_necklace,
				a_cape:ch.sprite_a_cape,
				a_face:ch.sprite_a_face,
			});
		}
		const iso = Isometric.to_screen_coordinate({x,y});
		if(!ch.sprite){
			return;
		}
		const dirToDraw = (direction=='right'?'left':direction);
		const frameLength = ch.sprite[dirToDraw].length;
		const canvToDraw = ch.sprite[dirToDraw][frameIdx];
		if(!canvToDraw){return;}
		if(ch.player_state == cbt_PLAYER){
			ctx.fillStyle="rgba(0,0,200,0.7)";
		}
		if(ch.player_state == cbt_ENEMY){
			ctx.fillStyle="rgba(200,0,0,0.7)";
		}
		if(ch.hasMoved){
			ctx.fillStyle="rgba(200,200,200,0.7)";
		}
		//draw ellipse shadow to identify character owner
		ctx.beginPath();
		ctx.ellipse(iso.x-64*Isometric.SCALE+128*Isometric.SCALE/2,
					iso.y-16-64*Isometric.SCALE+128*Isometric.SCALE,
				48, 6, 0, 0, 2 * Math.PI);//TODO: should 48,6 be *Isometric.SCALE?
		ctx.fill();
		
		
		//64 = character size /2 (128x128px)
		//64 = height of iso vertical iso tile face, 16 = 1/4 of that
		if(direction=='right'){
			Renderer.drawCanvasSpriteScaledFlippedH(canvToDraw,iso.x-64*Isometric.SCALE,
												   iso.y-16-64*Isometric.SCALE,
										128*Isometric.SCALE,
										128*Isometric.SCALE,
										ctx);
		}else{
			Renderer.drawCanvasSpriteScaled(canvToDraw,iso.x-64*Isometric.SCALE,
												   iso.y-16-64*Isometric.SCALE,
										128*Isometric.SCALE,
										128*Isometric.SCALE,
										ctx);
		}
		//HP
		if(ch.player_state == cbt_PLAYER){
			ctx.fillStyle="rgba(0,0,200,0.7)";
		}
		if(ch.player_state == cbt_ENEMY){
			ctx.fillStyle="rgba(200,0,0,0.7)";
		}
		ctx.beginPath();
		ctx.strokeStyle="#000000";
		ctx.strokeRect(iso.x-64*Isometric.SCALE,iso.y-16-64*Isometric.SCALE,128*Isometric.SCALE,16);
		ctx.fillRect(iso.x-64*Isometric.SCALE,iso.y-16-64*Isometric.SCALE,
			(128*Isometric.SCALE)*(ch.hp/ch.max_hp),16);
		//battle preview (player only)
		const curPlayerState = Sy_api.api_getCurrentPlayerState();
		const controlSource = GameState.getControlSourceForPlayer(curPlayerState);
		const gameState = Sy_api.api_getCurrentState();
		if(controlSource==CONTROL_SOURCE.LOCAL && gameState==cbt_STATE_SELECT_WEAPON_TARGET &&
			ch.player_state != curPlayerState){//check the currently drawn ch is not a player unit
			//now see if the mouse is over the currently draw unit
			const cell = Renderer.getMouseCellTileOrIso(Sy_api.api_getMapWidth(),Sy_api.api_getMapHeight());
			if(!(cell.x>=Sy_api.api_getMapWidth()||cell.y>=Sy_api.api_getMapHeight()||cell.x<0||cell.y<0)){
				if(Sy_api.api_isValidTargetCell(cell.x,cell.y)){				
					const tgt_xy = Bit.SET_XY(cell.x,cell.y);
					if(ch.point_xy == tgt_xy){
						//hovering over target, calc preview
						const [selx,sely] = Bit.GET_XY(Sy_api.api_getCurrentChPosition());
						const selectedCh = Sy_api.api_getCharacterAtPosition(selx,sely);
						const dmgStart = Math.max(0,ch.hp-selectedCh.atk)/ch.max_hp;
						const barX = iso.x-64*Isometric.SCALE;
						const previewX = barX+dmgStart*(128*Isometric.SCALE);
						const previewWidth = (128*Isometric.SCALE)*(Math.min(ch.max_hp,selectedCh.atk)/ch.max_hp);
						ctx.fillStyle="rgba(200,200,0,1)";
						ctx.fillRect(previewX,iso.y-16-64*Isometric.SCALE,
							previewWidth,16);
					}
				}
			}
		}
		//enemy preview on hover
		if(controlSource==CONTROL_SOURCE.LOCAL && ch.player_state != curPlayerState){
			//now see if the mouse is over the currently draw unit
			const cell = Renderer.getMouseCellTileOrIso(Sy_api.api_getMapWidth(),Sy_api.api_getMapHeight());
			if(!(cell.x>=Sy_api.api_getMapWidth()||cell.y>=Sy_api.api_getMapHeight()||cell.x<0||cell.y<0)){
				const tgt_xy = Bit.SET_XY(cell.x,cell.y);
				if(ch.point_xy == tgt_xy){
					//hovering over target, show stats
					if(ch.player_state!=cbt_NO_PLAYER_STATE){
						const textX = 820;
						Text.drawBitmapText(ctx,"HP: "+ch.hp+"/"+ch.max_hp,textX,16);
						Text.drawBitmapText(ctx,"ATK: "+ch.atk,textX,32);
						Text.drawBitmapText(ctx,"MOVE: "+ch.mov,textX,48);
						Text.drawBitmapText(ctx,"RANGE: "+ch.min_range+"-"+ch.max_range,textX,64);
					}
					
				}
			}
		}
		
		//--end ISO
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
		chs.sort((a,b)=>{
			const [ax,ay] = Bit.GET_XY(a.point_xy);
			const [bx,by] = Bit.GET_XY(b.point_xy);
			const isoA = Isometric.to_screen_coordinate({x:ax,y:ay});
			const isoB = Isometric.to_screen_coordinate({x:bx,y:by});
			return isoA.y-isoB.y;
		});
		
		for(const ch of chs){
			if(funcHasCustomDraw!=null&&funcHasCustomDraw(ch)){
				funcCustomDraw(ch);
				//Audio.PlaySFX(SFX.footsteps);
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