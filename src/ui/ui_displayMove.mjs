
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
		Sy_api.api_mov_selectDestination(cell.x,cell.y);
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
		if(cell_xy==ch.point_xy){
			//at the user's position, clear movement path
			//this is both the initial state, 
			//and the state when passing back through the ch's cell
			ui_displayMove.#movePath = [];
			return;
		}
		//ensure the path is intialised
		if(!ui_displayMove.#movePath.length){
			ui_displayMove.#movePath = [{
				point_xy:ch.point_xy,
				mov:ch.mov
			}];
		}
		//figure out move cell
		//step 1)
		//track from cell-> last enqueued path point (or ch point if no path)
		//if total cost of enqueued path + tracked cells <= ch mov, enqueue tracked cells
		//otherwise, pathfind from ch starting position->cell and use that as new path
		const lastPoint = ui_displayMove.#movePath[ui_displayMove.#movePath.length-1];
		if(lastPoint.point_xy == cell_xy){
			//nothing to do if already checked this point
			return;
		}
		//helper pathfinding function, given two points 
		//search from start->end and return a valid short path
		//path is capped at ch.mov, but start may not be the ch's start pos
		const getPathFrom = (start_xy,end_xy)=>{
			const movQueue = [{
				point_xy:start_xy,
				path:[]
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
				//TODO: order points by distance to destination.
				//this can help disambiguate paths that have equal cost 
				//by visually shorter length
				//point.sort((a,b)=>{});
				for(const {px,py} of points){
					if (py < mapH && py>=0 && px < mapW && px>=0) {
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
		
		const pathToAppend = getPathFrom(lastPoint,cell_xy);
		const bakupPath = getPathFrom(ch.point_xy,cell_xy);
		if(!bakupPath.length){
			console.warn("could not find backup path",ch.point_xy,cell_xy);
		}
		if(!pathToAppend.length){
			console.log("not found");//reset movement to search target
			ui_displayMove.#movePath = bakupPath;
			console.log(ui_displayMove.#movePath);
			return;
		}
		const userPreferredPath = ui_displayMove.#movePath.concat(pathToAppend);
		//check new path is valid
		let movCost = 0;
		for(const p of userPreferredPath){
			const [px,py] = Bit.GET_XY(p);
			movCost += Sy.getMoveForCell(px,py);
		}
		if(movCost>ch.mov){
			console.log("cost of new path too high:",movCost,ch.mov);
			ui_displayMove.#movePath = bakupPath;
			console.log(ui_displayMove.#movePath);
			return;
		}
		//path is valid, assign it
		ui_displayMove.#movePath = userPreferredPath;
		console.log(ui_displayMove.#movePath);
		
	}
	/*
	
static fillMove( x, y, move, ch) {
	const chCl = ch.movCl;
	Sy.setMoveForCell(x,y,move);
	Sy.#moveQueue[0]= Bit.SET_XY(x,y);
	Sy.#moveQueue[0]= Bit.SET_HIGHER_BYTE(Sy.#moveQueue[0],move);
	let start = 0;
	let end = 1;
	const maxLen = Sy.#moveQueue.length;
    while (start<end&&start<maxLen) {
		const nodeMove = Bit.GET_HIGHER_BYTE(Sy.#moveQueue[start]);
		const [nodeX,nodeY] = Bit.GET_XY(Sy.#moveQueue[start]);
		start+=1;
		const points = [
			{px:nodeX,py:nodeY+1},
			{px:nodeX,py:nodeY-1},
			{px:nodeX+1,py:nodeY},
			{px:nodeX-1,py:nodeY}
		];
		for(const {px,py} of points){
			if (py < Sy.MAP_HEIGHT && py>=0 && px < Sy.MAP_WIDTH && px>=0) {
				const xy = Bit.SET_XY(px, py);
				const terrain = Sy.getTerrainForCell(px, py);
				const cost = Sy.getCostForTerrain(chCl,terrain);
				const nodeCost = nodeMove-cost;
				if (nodeCost > 0 && Sy.getMoveForCell(px, py) < nodeCost) {
					if (Sy.#canMoveThroughCell(xy,ch.player_state)) {
						Sy.setMoveForCell(px, py, nodeCost);
						Sy.#moveQueue[end]=xy;
						Sy.#moveQueue[end]=Bit.SET_HIGHER_BYTE(Sy.#moveQueue[end],nodeCost);
						end+=1;
					}
				}
			}
		}
    }
	//return the end index of the array so that 'fill attack' can traverse it later
	return end;
}
	*/
}

export {ui_displayMove};