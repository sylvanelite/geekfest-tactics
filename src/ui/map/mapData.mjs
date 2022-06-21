import { manga_multi_data,manga_data } from "./dataManga.mjs";
import { anime_multi_data,anime_data } from "./dataAnime.mjs";
import { comic_multi_data,comic_data } from "./dataComic.mjs";
import { game_multi_data,game_data } from "./dataGame.mjs";

const MAP_KIND={
	MANGA:'MANGA',
	ANIME:'ANIME',
	GAME:'GAME',
	COMIC:'COMIC',
	MANGA_MULTI:'MANGA_MULTI',
	ANIME_MULTI:'ANIME_MULTI',
	COMIC_MULTI:'COMIC_MULTI',
	GAME_MULTI:'GAME_MULTI'
};

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