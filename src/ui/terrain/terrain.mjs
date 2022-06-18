import iso_auto_fence from "./data/iso_auto_fence.mjs";
import iso_auto_path from "./data/iso_auto_path.mjs";
import iso_auto_roof_hay from "./data/iso_auto_roof_hay.mjs";
import iso_auto_stair_stone from "./data/iso_auto_stair_stone.mjs";
import iso_auto_water_complex from "./data/iso_auto_water_complex.mjs";
import iso_auto_water_simple from "./data/iso_auto_water_simple.mjs";
import iso_sprites from "./data/iso_sprites.mjs";

import { Renderer } from "../../renderer/renderer.mjs";
import { Isometric } from "../../renderer/isometric.mjs";

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
	//TODO: lookup
	
	static getTerrainSprite(x,y,terrain,ctx){
		const screen = Isometric.to_screen_coordinate({x,y});
		
		const sprName = "ISO_Tile_Brick_Brick_02";//TODO: lookup based on ctx;
		
		const spritesheet = terrainAtlas.iso_sprites[sprName];
		const res = [];
		
		res.push(Renderer.getSprite(
			'terrain_spritesheet/iso_sprites.png',
			screen.x-spritesheet.width/2,screen.y,
			spritesheet.width,spritesheet.height,
			spritesheet.x,spritesheet.y
		));
		return res;
	}
}

export { Terrain };