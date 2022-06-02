
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
			console.log("empty, init path to:",ch.point_xy);
			ui_displayMove.#movePath = [ch.point_xy];
		}
		if(ui_displayMove.#movePath[0]!=ch.point_xy){
			console.log("not at start set path to:",ch.point_xy);
			ui_displayMove.#movePath = [ch.point_xy];
			return;
		}
		//figure out move cell
		//step 1)
		//track from cell-> last enqueued path point (or ch point if no path)
		//if total cost of enqueued path + tracked cells <= ch mov, enqueue tracked cells
		//otherwise, pathfind from ch starting position->cell and use that as new path
		const lastPoint = ui_displayMove.#movePath[ui_displayMove.#movePath.length-1];
		if(lastPoint == cell_xy){
			//nothing to do if already checked this point
			return;
		}
		//check if cell is currently in the path, disallow backtracking
		for(let i=ui_displayMove.#movePath.length-2;i>=0;i-=1){
			const p = ui_displayMove.#movePath[i];
			if(p==cell_xy){//truncate the path to that cell
				//+1 is to keep the current cell, and splice out everything after that
				ui_displayMove.#movePath.splice(i+1);
				console.log("splice");
				return;
			}
		}
		
		
		//helper pathfinding function, given two points 
		//search from start->end and return a valid short path
		//path is capped at ch.mov, but start may not be the ch's start pos
		const getPathFrom = (start_xy,end_xy,move)=>{
			move+=1;
			const movQueue = [{
				point_xy:start_xy,
				move:move,
				path:[start_xy]
			}];
			const moveCells = new Map();
			moveCells.set(start_xy,{
				moveCost:move,
				path:[start_xy]
			});
			//max move grid is ~a mov*mov square
			const maxLen = (ch.mov+1)*(ch.mov+1);
			let start = 0;
			let end = 1;
			const mapW = Sy_api.api_getMapWidth();
			const mapH = Sy_api.api_getMapHeight();
			while (start<end&&start<maxLen) {
				const point_xy = movQueue[start].point_xy;
				const path = movQueue[start].path;
				const nodeMove = movQueue[start].move;
				const [nodeX,nodeY] = Bit.GET_XY(point_xy);
				start+=1;
				const points = [
					{px:nodeX,py:nodeY+1},
					{px:nodeX,py:nodeY-1},
					{px:nodeX+1,py:nodeY},
					{px:nodeX-1,py:nodeY}
				];
				for(const {px,py} of points){
					if (py < mapH && py>=0 && px < mapW && px>=0) {
						const xy = Bit.SET_XY(px, py);
						const cost = Sy_api.api_getCostForTerrain(ch,px,py);
						const nodeCost = nodeMove-cost;
						const curPath = [...path];
						curPath.push(xy);
						const nextCost = (moveCells.has(xy)?moveCells.get(xy).moveCost:0);
						if (nodeCost > 0 && nextCost < nodeCost &&Sy_api.api_getMoveForCell(px, py)) {
							if(xy==end_xy){
								return curPath;
							}
							moveCells.set(xy,{
								moveCost:nodeCost,
								path:curPath
							});
							movQueue.push({
								point_xy:xy,
								move:nodeCost,
								path:curPath
							});
							end+=1;
						}
					}
				}
			}
			//return the end index of the array so that 'fill attack' can traverse it later
			console.log("not found");
			return [];
			
			
			
			
		};
		const checkCostOfPath = (path)=>{
			let movCost = 0;
			for(const p of path){
				const [px,py] = Bit.GET_XY(p);
				if(p==ch.point_xy){continue;}//don't consider start cell
				const cost = Sy_api.api_getCostForTerrain(ch,px,py);
				movCost += cost;
			}
			return (movCost<=ch.mov+1);
		};
		
		const pathToAppend = getPathFrom(lastPoint,cell_xy,ch.mov);//TODO: should be mov after considering current path
		const backupPath = getPathFrom(ch.point_xy,cell_xy,ch.mov);
		if(!checkCostOfPath(backupPath)){
			console.warn("bakup path cost too high",backupPath);
		}
		if(!backupPath.length){
			console.warn("could not find backup path",ch.point_xy,cell_xy);
		}
		if(!pathToAppend.length){
			console.log("not found");//reset movement to search target
			ui_displayMove.#movePath = backupPath;
			return;
		}
		const userPreferredPath = ui_displayMove.#movePath.concat(pathToAppend);
		//check new path is valid
		if(!checkCostOfPath(userPreferredPath)){
			console.log("cost of new path too high:",userPreferredPath,backupPath);
			ui_displayMove.#movePath = backupPath;
			return;
		}
		//path is valid, assign it
		ui_displayMove.#movePath = userPreferredPath;
		
	}
}

export {ui_displayMove};