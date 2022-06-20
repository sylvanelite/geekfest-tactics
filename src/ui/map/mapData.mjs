
const MAP_KIND={
	MANGA:'MANGA',
	ANIME:'ANIME',
	GAME:'GAME',
	COMIC:'COMIC',
	MANGA_MULTI:'MANGA_MULTI',
	ANIME_MULTI:'ANIME_MULTI',
	COMIC_MULTI:'COMIC_MULTI',
	GAME_MULTI:'GAME_MULTI',
	
}

const manga_data = [];
const anime_data = [];
const comic_data = [];
const game_data = [];
const manga_multi_data = {
	script:null,
	//TODO;/..
};
const anime_multi_data = {};
const comic_multi_data = {};
const game_multi_data = {};
/*

	static getUnits(){
		const ch0 = new st_Character();
		const ch1 = new st_Character();
		const ch2 = new st_Character();
		const ch3 = new st_Character();

		ch0.player_state = cbt_PLAYER;
		ch0.point_xy = Bit.SET_XY(3,4);
		ch0.mov=10;
		ch1.player_state = cbt_PLAYER;
		ch1.point_xy = Bit.SET_XY(2,2);
		ch1.mov=4;
		ch2.player_state = cbt_ENEMY;
		ch2.point_xy = Bit.SET_XY(1,4);
		ch2.max_range=1;
		ch2.mov=10;
		ch3.player_state = cbt_ENEMY;
		ch3.point_xy = Bit.SET_XY(8,5);
		ch3.max_range=2;
		
		//TODO: if host or single, load from menuCh -> player characters (x5)
		//      if join, load from menuCh-> enemyCharacters (x5)
		
		return [ch0,ch1,ch2,ch3];
	}
	static getTerrain(){
		return {
			width:9,
			height:6,
			fogEnabled:true,
			terrain:[
			1 ,1 ,1 ,2 ,1 ,4 ,1 ,1 ,1 ,
			99,1 ,99,2 ,5 ,1 ,1 ,1 ,1 ,
			99,1 ,1 ,2 ,1 ,3 ,1 ,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,1 ,1 ,99,
			1 ,1 ,99,1 ,1 ,1 ,1 ,99,1 ,
			]
		};
	}
	
	
	
	const map_data=[
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
];


const TERRAIN_NONE = -1;//todo
const TERRAIN_WALL = 99;//todo
const TERRAIN_BRICK = 1;
const TERRAIN_DIRT = 2;
const TERRAIN_FOLIAGE = 3;
const TERRAIN_GRASS = 4;
const TERRAIN_LAVA = 5;
const TERRAIN_LOW = 6;
const TERRAIN_OVERLAY = 7;
const TERRAIN_SAND = 8;
const TERRAIN_SKIN = 9;
const TERRAIN_SNOW = 10;
const TERRAIN_STONE = 11;
const TERRAIN_WATER = 12;//animation sub folder?
const TERRAIN_WOOD = 13;
const TERRAIN_ROAD = 14;//TODO: autotile
*/


class MapData {
	//TODO: render each as a stack of games?
	//      e.g. pile of manga/comics/dvds/cartidges
	//      can loop between levels that have been previously cleared, 
	//      but not past the top-most unlocked
	static getMapData(kind,level){
		switch(kind){
			case MAP_KIND.MANGA:
				//should not happen, but just in case bounds check
				if(level<0||level>=manga_data.length){ return manga_data[0]; }
				return manga_data[level];
			case MAP_KIND.ANIME:
				if(level<0||level>=anime_data.length){ return anime_data[0]; }
				return anime_data[level];
			case MAP_KIND.GAME:
				if(level<0||level>=game_data.length){ return game_data[0]; }
				return game_data[level];
			case MAP_KIND.COMIC:
				if(level<0||level>=comic_data.length){ return comic_data[0]; }
				return comic_data[level];
			//multi doesn't care about selected level
			case MAP_KIND.MANGA_MULTI:return manga_multi_data;
			case MAP_KIND.ANIME_MULTI:return anime_multi_data;
			case MAP_KIND.COMIC_MULTI:return comic_multi_data;
			case MAP_KIND.GAME_MULTI:return game_multi_data;
			default:
				console.warn("unknown map:",kind,level);
				return manga_multi_data;
		}
	}
};

export { MapData,MAP_KIND };