import iso_auto_fence from "./data/iso_auto_fence.mjs";
import iso_auto_path from "./data/iso_auto_path.mjs";
import iso_auto_roof_hay from "./data/iso_auto_roof_hay.mjs";
import iso_auto_stair_stone from "./data/iso_auto_stair_stone.mjs";
import iso_auto_water_complex from "./data/iso_auto_water_complex.mjs";
import iso_auto_water_simple from "./data/iso_auto_water_simple.mjs";
import iso_sprites from "./data/iso_sprites.mjs";

import { Renderer } from "../../renderer/renderer.mjs";
import { Isometric } from "../../renderer/isometric.mjs";

import { Sy_api } from "../../state/api.mjs";


const terrainAtlas = {
	iso_auto_fence:{},
	iso_auto_path:{},
	iso_auto_roof_hay:{},
	iso_auto_stair_stone:{},
	iso_auto_water_complex:{},
	iso_auto_water_simple:{},
	iso_sprites:{}
};

for(const spritesheet of iso_sprites){
	terrainAtlas.iso_sprites[spritesheet.name]=spritesheet;
}

class Terrain {
	static getTerrainSprite(x,y){
		const screen = Isometric.to_screen_coordinate({x,y});

		const res = [];
		const terrainTiles = Autotiler.getTerrainForTile(x,y);
		for(const sprName of terrainTiles){
			const spritesheet = terrainAtlas.iso_sprites[sprName];
			res.push(Renderer.getSprite(
				'terrain_spritesheet/iso_sprites.png',
				screen.x-(spritesheet.width*Isometric.SCALE)/2,screen.y,
				spritesheet.width,spritesheet.height,
				spritesheet.x,spritesheet.y
			));
		}
		return res;
	}
	
	static setTerrainMapData(mapData){
		map_data = mapData.terrain;
		Isometric.setScale(mapData.scale);
	}
	
	static getTerrainMapData(){
		return {
			terrain: map_data,
			scale: Isometric.SCALE
		};
	}
}


const getIdx = (x,y)=>{
	return (y * Sy_api.api_getMapWidth()) + x; 
};
//TODO: when selecting map, populate terrain images here too
//      when setting map, also shuffle vaules in [tileLookup]
let map_data=[
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
];


const TERRAIN={
    NONE : -1,//todo
    WALL : 99,//todo
    BRICK : 1,
    DIRT : 2,
    FOLIAGE : 3,
    GRASS : 4,
    LAVA : 5,
    LOW : 6,
    OVERLAY : 7,
    SAND : 8,
    SKIN : 9,
    SNOW : 10,
    STONE : 11,
    WATER : 12,//animation sub folder?
    WOOD : 13,
    ROAD : 14,//TODO: autotile
}

const tileLookup = {
	brick:['ISO_Tile_Brick_Brick_02',
			'ISO_Tile_Brick_Brick_03',
			'ISO_Tile_Brick_Brick_04',
			'ISO_Tile_Brick_SandStone_01',
			'ISO_Tile_Brick_Snow_01',
			'ISO_Tile_Brick_Stone_01',
			'ISO_Tile_Brick_Stone_01_02',
			'ISO_Tile_Brick_Stone_01_03',
			'ISO_Tile_Brick_Stone_01_04',
			'ISO_Tile_Brick_Stone_01_05',
			'ISO_Tile_Brick_Stone_02_01'],
	dirt:[//'ISO_Deco_Stairs_01_Dirt-01',
			'ISO_Tile_Dirt_01',
			'ISO_Tile_Dirt_01_ToSnow_01',
			'ISO_Tile_Dirt_01_ToSnow_02',
			'ISO_Tile_Dirt_01_ToStone_01',
			'ISO_Tile_Dirt_01_ToStone_02',
			'ISO_Tile_Dirt_02',
			'ISO_Tile_Dirt_02_ToStone_01',
			'ISO_Tile_Dirt_02_ToStone_02',
			'ISO_Tile_Mud_01',
			'ISO_Tile_Mud_02'],
	foliage:['ISO_Tile_Leafs_01'],
	grass:['ISO_Tile_Dirt_01_GrassPatch_01',
			'ISO_Tile_Dirt_01_GrassPatch_02',
			'ISO_Tile_Dirt_01_GrassPatch_03',
			'ISO_Tile_Dirt_01_Grass_01'],
	lava:['ISO_Tile_LavaCracks_01 1',
			'ISO_Tile_LavaCracks_01',
			'ISO_Tile_LavaStone_01',
			'ISO_Tile_Lava_01',
			'ISO_Tile_Lava_02',
			'ISO_Tile_Mud_03',
			'ISO_Tile_Tar_01',
			'ISO_Tile_Tar_02'],
	low:['ISO_LowTile_DirtToStoneTransition_01',
			'ISO_LowTile_DirtToStoneTransition_02',
			'ISO_LowTile_Dirt_01',
			'ISO_LowTile_Riverbed_01',
			'ISO_LowTile_Riverbed_02',
			'ISO_LowTile_Riverbed_03',
			'ISO_LowTile_Riverbed_04',
			'ISO_LowTile_Sand_01',
			'ISO_LowTile_Sand_02',
			'ISO_LowTile_Sand_03',
			'ISO_LowTile_Stone_01',
			'ISO_LowTile_Stone_02',
			'ISO_LowTile_Stone_03'],
	overlay:['ISO_Overlay_Cracks_01',
			'ISO_Overlay_Cracks_02',
			'ISO_Overlay_Glow_01',
			'ISO_Overlay_Glow_02',
			'ISO_Overlay_Grass_01',
			'ISO_Overlay_Grass_Half_H_01',
			'ISO_Overlay_Grass_Half_H_02',
			'ISO_Overlay_Grass_Half_V_01',
			'ISO_Overlay_Grass_Half_V_02',
			'ISO_Overlay_Grass_Patch_01',
			'ISO_Overlay_Grass_Patch_02',
			'ISO_Overlay_Grass_Patch_02_H_01',
			'ISO_Overlay_Grass_Patch_02_H_02',
			'ISO_Overlay_Grass_Patch_02_V_01',
			'ISO_Overlay_Grass_Patch_02_V_02',
			'ISO_Overlay_Grass_Patch_03',
			'ISO_Overlay_Grass_Patch_03_H_01',
			'ISO_Overlay_Grass_Patch_03_H_02',
			'ISO_Overlay_Grass_Patch_03_V_01',
			'ISO_Overlay_Grass_Patch_03_V_02',
			'ISO_Overlay_Grass_Patch__H_01',
			'ISO_Overlay_Grass_Patch__H_02',
			'ISO_Overlay_Grass_Patch__V_01',
			'ISO_Overlay_Grass_Patch__V_02',
			'ISO_Overlay_Path_Cross',
			'ISO_Overlay_Path_Cross3_01',
			'ISO_Overlay_Path_Cross3_02',
			'ISO_Overlay_Path_Cross3_03',
			'ISO_Overlay_Path_Cross3_04',
			'ISO_Overlay_Path_Curve_01',
			'ISO_Overlay_Path_Curve_02',
			'ISO_Overlay_Path_Curve_03',
			'ISO_Overlay_Path_Curve_04',
			'ISO_Overlay_Path_End_01',
			'ISO_Overlay_Path_End_02',
			'ISO_Overlay_Path_End_03',
			'ISO_Overlay_Path_End_04',
			'ISO_Overlay_Path_Single',
			'ISO_Overlay_Path_Straight_01',
			'ISO_Overlay_Path_Straight_02',
			'ISO_Overlay_Shore_Corner_D',
			'ISO_Overlay_Shore_Corner_L',
			'ISO_Overlay_Shore_Corner_R',
			'ISO_Overlay_Shore_Corner_RU',
			'ISO_Overlay_Shore_Corner_U',
			'ISO_Overlay_Shore_Straight_LD',
			'ISO_Overlay_Shore_Straight_LU',
			'ISO_Overlay_Shore_Straight_RD',
			'ISO_Overlay_Shore_Straight_RU',
			'ISO_Overlay_StonePieces_01',
			'ISO_Overlay_StonePieces_01_Half_H_01',
			'ISO_Overlay_StonePieces_01_Half_H_02',
			'ISO_Overlay_StonePieces_01_Half_V_01',
			'ISO_Overlay_StonePieces_01_Half_V_02',
			'ISO_Overlay_StonePieces_02',
			'ISO_Overlay_StonePieces_02_Half_H_01',
			'ISO_Overlay_StonePieces_02_Half_H_02',
			'ISO_Overlay_StonePieces_02_Half_V_01',
			'ISO_Overlay_StonePieces_02_Half_V_02'],
	sand:['ISO_Tile_Sand_01',
			'ISO_Tile_Sand_01_ToStone_01',
			'ISO_Tile_Sand_01_ToStone_02',
			'ISO_Tile_Sand_02',
			'ISO_Tile_Sand_02_ToStone_01',
			'ISO_Tile_Sand_02_ToStone_02',
			'ISO_Tile_Sand_03',
			'ISO_Tile_Sand_03_ToStone_01',
			'ISO_Tile_Sand_03_ToStone_02',
			'ISO_Tile_Sand_04'],
	skin:['ISO_Deco_Tooth_01_ 1',
			'ISO_Deco_Tooth_01_',
			'ISO_Deco_Tooth_01_Bad_01_ 1',
			'ISO_Deco_Tooth_01_Bad_01_',
			'ISO_Tile_Flesh_01',
			'ISO_Tile_Flesh_01_Var01',
			'ISO_Tile_Skin_01',
			'ISO_Tile_Skin_01_Smooth',
			'ISO_Tile_Skin_01_Smooth_Alt'],
	snow:['ISO_Tile_Ice_01-06',
			'ISO_Tile_Snow_01',
			'ISO_Tile_Snow_01_ToStone_01',
			'ISO_Tile_Snow_01_ToStone_02',
			'ISO_Tile_Snow_02',
			'ISO_Tile_Snow_02_ToStone_01',
			'ISO_Tile_Snow_02_ToStone_02'],
	stone:[
			'ISO_Tile_Stone_01',
			'ISO_Tile_Stone_02',
			'ISO_Tile_Stone_03',
			//'ISO_Deco_Stairs_01_Stone_01',
			'ISO_Tile_Riverbed_01',
			'ISO_Tile_Riverbed_02',
			'ISO_Tile_Riverbed_03',
			'ISO_Tile_Riverbed_04',
			'ISO_Tile_Stone_01',
			'ISO_Tile_Stone_02',
			'ISO_Tile_Stone_03'],
	water:['ISO_Overlay_Water_01',
		'ISO_Overlay_Water_02',
		'ISO_Tile_Water_01'],
	wood:[
		'ISO_Tile_Tree_01',
		'ISO_Tile_Tree_Birch_01',
		'ISO_Tile_Wood_01',
		'ISO_Tile_Wood_02',
		'ISO_Tile_Wood_03',
		'ISO_Tile_Wood_04'],
};

class Autotiler {
	
	static getTerrainForTile(x,y){
		const tileIdx = getIdx(x,y);
		const tiles = map_data[tileIdx];
		const res = [];
		for(const tile of tiles){
			switch(tile){
				//TERRAIN.NONE
				case TERRAIN.WALL://TODO
				break;
				case TERRAIN.BRICK:res.push(tileLookup.brick[0]);
				break;
				case TERRAIN.DIRT:res.push(tileLookup.dirt[0]);
				break;
				case TERRAIN.FOLIAGE:res.push(tileLookup.foliage[0]);
				break;
				case TERRAIN.GRASS:res.push(tileLookup.grass[0]);
				break;
				case TERRAIN.LAVA:res.push(tileLookup.lava[0]);
				break;
				case TERRAIN.LOW://todo
				break;
				case TERRAIN.OVERLAY://todo
				break;
				case TERRAIN.SAND:res.push(tileLookup.sand[0]);
				break;
				case TERRAIN.SKIN:res.push(tileLookup.skin[0]);
				break;
				case TERRAIN.SNOW:res.push(tileLookup.snow[0]);
				break;
				case TERRAIN.STONE:res.push(tileLookup.stone[0]);
				break;
				case TERRAIN.WATER:res.push(tileLookup.water[0]);
				break;
				case TERRAIN.WOOD:res.push(tileLookup.wood[0]);
				break;
				case TERRAIN.ROAD://todo
				break;
			}
		}
		return res;
	}
	
	//TODO:
	static autotileWall(x,y){
		//given a wall cell, work out what its content should be based on its neighbours
		/*
		   W/\N
		   S\/E
		*/
		let N = (x+1<MAP_WIDTH && Sy_api.api_getTerrainTile(x+1,y) == TERRAIN.WALL);
		let S = (x-1>=0 && Sy_api.api_getTerrainTile(x-1,y) == TERRAIN.WALL);
		let E = (y+1<MAP_HEIGHT && Sy_api.api_getTerrainTile(x,y+1) == TERRAIN.WALL);
		let W = (y-1>=0 && Sy_api.api_getTerrainTile(x,y-1) == TERRAIN.WALL);
		if(!N&&!E&&!S&&!W){ return "ISO_Fence_01_M1";}// <none>
		if( N&& E&& S&& W){ return "ISO_Fence_01_C4";} // NSEW
		if( N&& E&&!S&&!W){ return "ISO_Fence_01_C2E";}// NE
		if(!N&& E&& S&&!W){ return "ISO_Fence_01_C2N";}// SE
		if( N&&!E&&!S&& W){ return "ISO_Fence_01_C2S";}// NW
		if(!N&&!E&& S&& W){ return "ISO_Fence_01_C2W";}// SW
		if( N&&!E&& S&& W){ return "ISO_Fence_01_C3-NE";}// SWN
		if( N&& E&&!S&& W){ return "ISO_Fence_01_C3-NW";}// WNE
		if(!N&& E&& S&& W){ return "ISO_Fence_01_C3-SE";}// WSE
		if( N&& E&& S&&!W){ return "ISO_Fence_01_C3-SW";}// NSE
		if(!N&& E&&!S&& W){ return "ISO_Fence_01_S2-NE-SW";}// EW
		if( N&&!E&& S&&!W){ return "ISO_Fence_01_S2-SE-NW";}//NS
		if( N&&!E&&!S&&!W){ return "ISO_Fence_01_S1L_NW";}// N full
		if(!N&&!E&& S&&!W){ return "ISO_Fence_01_S1L_SE";}// S full
		if(!N&&!E&&!S&& W){ return "ISO_Fence_01_S1L-NE";}// W full
		if(!N&& E&&!S&&!W){ return "ISO_Fence_01_S1L-SW";}// E full
		console.warn("not found wall: ",N,S,E,W);
		return 'ISO_Tile_Template_01';
	}
	static autotilePath(x,y){
		//given a path cell, work out what its content should be based on its neighbours
		/*
		   W/\N
		   S\/E
		*/
		let N = (x+1<MAP_WIDTH && Sy_api.api_getTerrainTile(x+1,y) == TERRAIN.ROAD);
		let S = (x-1>=0 && Sy_api.api_getTerrainTile(x-1,y) == TERRAIN.ROAD);
		let E = (y+1<MAP_HEIGHT && Sy_api.api_getTerrainTile(x,y+1) == TERRAIN.ROAD);
		let W = (y-1>=0 && Sy_api.api_getTerrainTile(x,y-1) == TERRAIN.ROAD);
		if(!N&&!E&&!S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_Single";}// <none>
		if( N&& E&& S&& W){ return "ISO_Tile_Dirt_01_GrassPath_4Cross";} // NSEW
		if( N&& E&& S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_3Cross_01";}// NSE
		if( N&&!E&& S&& W){ return "ISO_Tile_Dirt_01_GrassPath_3Cross_02";}// SWN
		if( N&& E&&!S&& W){ return "ISO_Tile_Dirt_01_GrassPath_3Cross_03";}// WNE
		if(!N&& E&& S&& W){ return "ISO_Tile_Dirt_01_GrassPath_3Cross_04";}// WSE
		if( N&& E&&!S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_Curve_01";}// NE
		if(!N&& E&& S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_Curve_02";}// SE
		if(!N&&!E&& S&& W){ return "ISO_Tile_Dirt_01_GrassPath_Curve_03";}// SW
		if( N&&!E&&!S&& W){ return "ISO_Tile_Dirt_01_GrassPath_Curve_04";}// NW
		if(!N&&!E&& S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_End_01";}// S 
		if( N&&!E&&!S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_End_02";}// N 
		if(!N&& E&&!S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_End_03";}// E 
		if(!N&&!E&&!S&& W){ return "ISO_Tile_Dirt_01_GrassPath_End_04";}// W 
		if(!N&& E&&!S&& W){ return "ISO_Tile_Dirt_01_GrassPath_Straight_01";}// EW
		if( N&&!E&& S&&!W){ return "ISO_Tile_Dirt_01_GrassPath_Straight_02";}//NS
		console.warn("not found path: ",N,S,E,W);
		return 'ISO_Tile_Template_01';
	}
	static autotileShore(x,y,inputSprite){
		//given an ocean tile, check if there should be shoreline marks on it
		//note, that sores can be multipple combinations of overlays
		//3 possible cases
		// - all 9 surrounding tiles are water: no overlay to add, return input tile
		// - surrounded by shore on a cardinal direction: for each direction, add "straight" overlay
		// - surrounded by shore on a diagonal direction: for each diagonal, add a "corner" overlay
		/*
		land on:
			   W/\N
			   S\/E
		*/
		const similarTerrain = Sy_api.api_getTerrainTile(x,y);
		let NE = (x+1<MAP_WIDTH && y+1<MAP_HEIGHT &&
				 Sy_api.api_getTerrainTile(x+1,y+1) == similarTerrain);
		let NW = (x+1<MAP_WIDTH && y-1>=0 &&
				 Sy_api.api_getTerrainTile(x+1,y-1) == similarTerrain);
		let SE = (x-1>=0 && y+1<MAP_HEIGHT &&
				 Sy_api.api_getTerrainTile(x-1,y+1) == similarTerrain);
		let SW = (x-1>=0 && y-1>=0 &&
				 Sy_api.api_getTerrainTile(x-1,y-1) == similarTerrain);
		
		let N = (x+1<MAP_WIDTH && Sy_api.api_getTerrainTile(x+1,y) == similarTerrain);
		let S = (x-1>=0 && Sy_api.api_getTerrainTile(x-1,y) == similarTerrain);
		let E = (y+1<MAP_HEIGHT && Sy_api.api_getTerrainTile(x,y+1) == similarTerrain);
		let W = (y-1>=0 && Sy_api.api_getTerrainTile(x,y-1) == similarTerrain);
		if( N && E && S && W &&
		    NE&& NW&& SE&& SW  ){
		   //case 1: noting to do, all surrounding terrain is the same
	   }
	   //case 2: check for cardinal directions
	   if(!N ||!E ||!S ||!W ){
		   const container =  makeSprite("transparent");
		   container.addChild(inputSprite);
		   if(!N){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Straight_RU"));
		   }
		   if(!S){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Straight_LD"));
		   }
		   if(!E){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Straight_RD"));
		   }
		   if(!W){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Straight_LU"));
		   }
		   return container;
	   }
	   //case 3: check diagonals
	   if(!NE ||!NW ||!SE ||!SW ){
		   const container =  makeSprite("transparent");
		   container.addChild(inputSprite);
		   if(!NE){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Corner_R"));
		   }
		   if(!NW){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Corner_U"));
		   }
		   if(!SE){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Corner_D"));
		   }
		   if(!SE){
				container.addChild(
					 makeSprite("Overlay/ISO_Overlay_Shore_Corner_L"));
		   }
	   }
	   
	   console.warn("not found shore:", N , E , S , W , NE, NW, SE, SW);
	   return inputSprite;
		
	}
	
}


export { Terrain,TERRAIN };