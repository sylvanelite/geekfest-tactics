
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { ui_background } from "./ui_background.mjs";
import { ui_idle } from "./ui_idle.mjs";
import { cbt_NO_PLAYER_STATE } from "../state/consts.mjs";
import { Audio,BGM,SFX } from "../renderer/audio.mjs";

class ui_displayMove{
	static draw(ctx){
		ui_background.draw(ctx);
		ui_background.drawMovementPath(ui_displayMove.#movePath,ctx);
		ui_idle.drawHighlightedCharacters(ctx);
	}
	static click(e){
		const cell = Renderer.getMouseCellTileOrIso(Sy_api.api_getMapWidth(),Sy_api.api_getMapHeight());
		ui_displayMove.move();//ensure pathfinding is updated
		if(e.button == 2){//right click
			ui_displayMove.clearPath();//turf out the user path for next time
			Sy_api.api_mov_cancel();
			Audio.PlaySFX(SFX.cursorCancel);
			return;
		}
		if(cell.x>=Sy_api.api_getMapWidth()||cell.y>=Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			ui_displayMove.clearPath();//turf out the user path for next time
			Sy_api.api_mov_cancel();
			Audio.PlaySFX(SFX.cursorCancel);
			return;
		}
		if(!Sy_api.api_isValidMoveCell(cell.x,cell.y,ui_displayMove.#movePath)){
			ui_displayMove.clearPath();//turf out the user path for next time
			Sy_api.api_mov_cancel();
			Audio.PlaySFX(SFX.cursorCancel);
			return;
		}
		Sy_api.api_mov_selectDestination(cell.x,cell.y,ui_displayMove.#movePath);
		Audio.PlaySFX(SFX.cursorSelect);
	}
	//a movement path suggested by the user
	static #movePath = [];
	
	static clearPath(){
		ui_displayMove.#movePath = [];
	}
	static getPath(){
		return [...ui_displayMove.#movePath];
	}
	static move(){
		const cell = Renderer.getMouseCellTileOrIso(Sy_api.api_getMapWidth(),Sy_api.api_getMapHeight());
		if(cell.x>=Sy_api.api_getMapWidth()||cell.y>=Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			return;//cell out of bounds
		}
		const [chx,chy] = Bit.GET_XY(Sy_api.api_getCurrentChPosition());
		const ch = Sy_api.api_getCharacterAtPosition(chx,chy);
		const [x,y] = Bit.GET_XY(ch.point_xy);
		const cell_xy = Bit.SET_XY(cell.x,cell.y);
		//ensure the path is intialised
		if(!ui_displayMove.#movePath.length){
			//console.log("empty, init path to:",ch.point_xy);
			ui_displayMove.#movePath = [ch.point_xy];
		}
		if(ui_displayMove.#movePath[0]!=ch.point_xy){
			//console.log("not at start set path to:",ch.point_xy);
			ui_displayMove.#movePath = [ch.point_xy];
		}
		//check if trying to move to a targeting cell
		//if so, see if the current movement path can hit that cell
		//if it can, retain it. If it can't, reset it to an attack cell
		const lastPoint = ui_displayMove.#movePath[ui_displayMove.#movePath.length-1];
		const [lastX,lastY] = Bit.GET_XY(lastPoint);
		if(!Sy_api.api_getMoveForCell(cell.x,cell.y) && 
			Sy_api.api_getAttackForCell(cell.x,cell.y)){
			const eCh = Sy_api.api_getCharacterAtPosition(cell.x,cell.y);
			if(eCh.player_state != cbt_NO_PLAYER_STATE && eCh.player_state != ch.player_state){
			   if(!(Math.abs(lastX-cell.x)+Math.abs(lastY-cell.y)>=ch.min_range&&
				    Math.abs(lastX-cell.x)+Math.abs(lastY-cell.y)<=ch.max_range)){
					//if target is not in range
					//reset to a valid attack path
					const movCell = Sy_api.api_getMoveCellFromAttack(cell.x,cell.y,ch);
					const defaultAtkPath = Sy_api.api_getMovePath(ch,ch.point_xy,movCell);
					ui_displayMove.#movePath = defaultAtkPath;
					return;
			   }else{
					//else, the target is in range, check if you've blocked the path with another unit
					const blockCh = Sy_api.api_getCharacterAtPosition(lastX,lastY);
					if(blockCh.player_state != cbt_NO_PLAYER_STATE){
						//reset to a valid attack path
						const movCell = Sy_api.api_getMoveCellFromAttack(cell.x,cell.y,ch);
						const defaultAtkPath = Sy_api.api_getMovePath(ch,ch.point_xy,movCell);
						ui_displayMove.#movePath = defaultAtkPath;
						return;
					}
			   }
			}
		}
		
		//update the user-selected movement path
		if(!Sy_api.api_getMoveForCell(cell.x,cell.y)){
			//moved off a blue tile, don't update
			return;
		}
		if(lastPoint == cell_xy){
			//nothing to do if already checked this point
			return;
		}
		if(ch.point_xy == cell_xy){
			//hovering over ch, can reset path
			ui_displayMove.#movePath = [ch.point_xy];
			return;
		}
		const defaultMovPath = Sy_api.api_getMovePath(ch,ch.point_xy,cell_xy);
		if(!Sy_api.api_checkPathIsValid(ch,defaultMovPath)){
			console.warn("bakup path invalid",defaultMovPath);//should not get here
			return;
		}
		//figure out move cell
		//incrementally build up a path
		//check if it's valid, if so, use it
		//if not, reset it to a known-good path
		//resolve snapping, can be done if hovering off the grid or backtracking through ch
		if((Math.abs(lastX-cell.x)+Math.abs(lastY-cell.y) > 1)){
			//moved more than 1 cell, reset path
			ui_displayMove.#movePath = defaultMovPath;
			return;
		}
		//check if cell is currently in the path, disallow backtracking
		for(let i=0;i<ui_displayMove.#movePath.length;i+=1){
			if(ui_displayMove.#movePath[i]==cell_xy){//truncate the path to that cell
				ui_displayMove.#movePath.splice(i+1);//keep cell_xy, splice out anything after that
				return;
			}
		}
		//generate new path, and check if it's valid
		const userPreferredPath = [...ui_displayMove.#movePath,cell_xy];
		if(!Sy_api.api_checkPathIsValid(ch,userPreferredPath)){
			//attempting to build up a path that's too long, reset it
			ui_displayMove.#movePath = defaultMovPath;
			return;
		}
		//otherwise all checks paased, path is valid, assign it
		ui_displayMove.#movePath = userPreferredPath;
		
	}
}

export {ui_displayMove};