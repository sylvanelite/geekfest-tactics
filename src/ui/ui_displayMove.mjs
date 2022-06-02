
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
		const getPathFrom = (start_xy,end_xy)=>{
			const movQueue = [{
				point_xy:start_xy,
				path:[start_xy]
			}];
			//max move grid is ~a mov*mov square
			const maxLen = (ch.mov+1)*(ch.mov+1);
			let start = 0;
			let end = 1;
			const mapW = Sy_api.api_getMapWidth();
			const mapH = Sy_api.api_getMapHeight();
			//https://gist.github.com/DanDiplo/30528387da41332ff22b
			//make sure the cell is not one that's already visited by the search
			const notIn = (xy)=>{
				for(const point of movQueue){
					if(point.point_xy == xy){
						return false;
					}
				}
				return true;
			}
			
			while (start<end&&start<maxLen) {
				const [nodeX,nodeY] = Bit.GET_XY(movQueue[start].point_xy);
				const curPath = movQueue[start].path;
				const points = [
					{px:nodeX,py:nodeY+1},
					{px:nodeX,py:nodeY-1},
					{px:nodeX+1,py:nodeY},
					{px:nodeX-1,py:nodeY}
				];
				//order by cost, this will attempt to make this pathfinding obey terrain costs
				//TODO: confirm this is correct? it will still prioritise fewer hops over cost
				points.sort((a,b)=>{
					let costA = 999;
					let costB = 999;
					if(a.py < mapH && a.py>=0 && a.px < mapW && a.px>=0){
						costA = Sy_api.api_getCostForTerrain(ch,a.px,a.py);
					}
					if(b.py < mapH && b.py>=0 && b.px < mapW && b.px>=0){
						costB = Sy_api.api_getCostForTerrain(ch,b.px,b.py);
					}
					return costA-costB;
				});
				
				for(const {px,py} of points){
					if (py < mapH && py>=0 && px < mapW && px>=0 && Sy.getMoveForCell(px,py)) {
						const xy = Bit.SET_XY(px, py);
						const nextPath = [...curPath];
						nextPath.push(xy);
						if(xy==end_xy){
							//found, return the path
							return nextPath;
						}
						if(notIn(xy)){
							movQueue.push({
								point_xy:xy,
								path:nextPath
							});
							end+=1;
						}
					}
				}
				start+=1;
			}
			//not found.
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
			return (movCost<=ch.mov);
		};
		
		const pathToAppend = getPathFrom(lastPoint,cell_xy);
		const backupPath = getPathFrom(ch.point_xy,cell_xy);
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