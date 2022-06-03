
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { ui_background } from "./ui_background.mjs";

class ui_displayMove{
	static draw(ctx){
		ui_background.draw(ctx);
		//draw user movement path
		
		for(const p of ui_displayMove.#movePath){
			const [x,y] = Bit.GET_XY(p);
			ctx.fillStyle="#000";
			ctx.beginPath();
			ctx.arc(x*Renderer.TILE_SIZE+Renderer.TILE_SIZE/2, 
					y*Renderer.TILE_SIZE+Renderer.TILE_SIZE/2,
					Renderer.TILE_SIZE/4, 0, 2 * Math.PI);
			ctx.fill();
		}
		
		
		
	}
	static click(e){
		const cell = Renderer.getMouseCell();
		console.log("click: mov",e,cell);
		if(e.button == 2){//right click
			ui_displayMove.#movePath = [];//turf out the user path for next time
			Sy_api.api_mov_cancel();
			return;
		}
		if(cell.x>Sy_api.api_getMapWidth()||cell.y>Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			console.log("cell out of bounds: ",cell.x,cell.y);
			return;
		}
		Sy_api.api_mov_selectDestination(cell.x,cell.y,ui_displayMove.#movePath);
		ui_displayMove.#movePath = [];//turf out the user path for next time
	}
	//a movement path suggested by the user
	static #movePath = [];
	
	static move(e){
		const cell = Renderer.getMouseCell();
		if(cell.x>Sy_api.api_getMapWidth()||cell.y>Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			return;//cell out of bounds
		}
		//TODO: check if trying to move to a targeting cell
		
		
		//update the user-selected movement path
		if(!Sy_api.api_getMoveForCell(cell.x,cell.y)){
			//moved off a blue tile, don't update
			return;
		}
		const [chx,chy] = Bit.GET_XY(Sy_api.api_getCurrentChPosition());
		const ch = Sy_api.api_getCharacterAtPosition(chx,chy);
		const [x,y] = Bit.GET_XY(ch.point_xy);
		const cell_xy = Bit.SET_XY(cell.x,cell.y);
		//ensure the path is intialised
		if(!ui_displayMove.#movePath.length){
			//console.log("empty, init path to:",ch.point_xy);
			ui_displayMove.#movePath = [ch.point_xy];
			return;
		}
		if(ui_displayMove.#movePath[0]!=ch.point_xy){
			//console.log("not at start set path to:",ch.point_xy);
			ui_displayMove.#movePath = [ch.point_xy];
			return;
		}
		//figure out move cell
		//track from cell-> last enqueued path point (or ch point if no path)
		//if total cost of enqueued path + tracked cells <= ch mov, enqueue tracked cells
		//otherwise, pathfind from ch starting position->cell and use that as new path
		const lastPoint = ui_displayMove.#movePath[ui_displayMove.#movePath.length-1];
		if(lastPoint == cell_xy){
			//nothing to do if already checked this point
			return;
		}
		//check if cell is currently in the path, disallow backtracking
		for(let i=0;i<ui_displayMove.#movePath.length;i+=1){
			if(ui_displayMove.#movePath[i]==cell_xy){//truncate the path to that cell
				ui_displayMove.#movePath.splice(i+1);//keep cell_xy, splice out anything after that
				return;
			}
		}
		
		const pathToAppend = Sy_api.api_getMovePath(ch,lastPoint,cell_xy);
		const backupPath = Sy_api.api_getMovePath(ch,ch.point_xy,cell_xy);
		//should not happen, backup path should always be valid
		if(!Sy_api.api_checkPathIsValid(ch,backupPath)){
			console.warn("bakup path invalid",backupPath);
			return;
		}
		const userPreferredPath = ui_displayMove.#movePath.concat(pathToAppend);
		//check new path is valid
		if(!Sy_api.api_checkPathIsValid(ch,userPreferredPath)){
			//attempting to build up a path that's too long, reset it
			ui_displayMove.#movePath = backupPath;
			return;
		}
		//otherwise all checks paased, path is valid, assign it
		ui_displayMove.#movePath = userPreferredPath;
		
	}
}

export {ui_displayMove};