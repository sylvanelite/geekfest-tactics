
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";
import { Network }from '../renderer/network.mjs';
import { Sy_api } from "../state/api.mjs";
import { Terrain } from "../ui/terrain/terrain.mjs";
import { cbt_ENEMY,cbt_PLAYER } from "../state/consts.mjs";
import { MapData,MAP_KIND } from "../ui/map/mapData.mjs";
import { ui_menuCharacter } from "./ui_menuCharacter.mjs";

class ui_menuMap{
	static #sprites = {
		bg_map:Renderer.getSprite(
			'ui/map.png',
			0,0,980,540,0,0
		),
		btn_start:Renderer.getSprite(
			'ui/map.png',
			695,355,267,137,0,0
		),
		btn_multiHost:Renderer.getSprite(
			'ui/map.png',
			719,21,85,46,0,0
		),
		btn_multiJoin:Renderer.getSprite(
			'ui/map.png',
			632,21,85,46,0,0
		),
		
		//TODO: add proper icons for each area
		btn_icon_manga:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,117,32,32,0,0
		),
		btn_icon_comic:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,150,32,32,0,96
		),
		btn_icon_game:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,195,32,32,0,64
		),
		btn_icon_anime:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,240,32,32,0,32
		),
		btn_icon_manga_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,117,32,32,32,0
		),
		btn_icon_comic_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,150,32,32,32,96
		),
		btn_icon_game_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,195,32,32,32,64
		),
		btn_icon_anime_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,240,32,32,32,32
		),
		btn_icon_manga_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,117,32,32,64,0
		),
		btn_icon_comic_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,150,32,32,64,96
		),
		btn_icon_game_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,195,32,32,64,64
		),
		btn_icon_anime_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,240,32,32,64,32
		),
		btn_icon_manga_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,117,32,32,96,0
		),
		btn_icon_comic_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,150,32,32,96,96
		),
		btn_icon_game_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,195,32,32,96,64
		),
		btn_icon_anime_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			413,240,32,32,96,32
		),
	};
	static #hostId = "";
	
	static draw(ctx){
		Renderer.drawSprite(ui_menuMap.#sprites.bg_map,ctx);
		if(Network.isHost()){
			ctx.font="12px monospace";
			ctx.fillStle="black";
			ctx.fillText(ui_menuMap.#hostId,
				ui_menuMap.#sprites.btn_multiHost.x+46,
				ui_menuMap.#sprites.btn_multiHost.y+40.5);
		}
		const nwStatus = Network.getStatus();
		if(nwStatus!="disabled"){
			ctx.fillText(nwStatus,
				ui_menuMap.#sprites.btn_multiHost.x+46+85,
				ui_menuMap.#sprites.btn_multiHost.y+64.5);
			if(nwStatus=="connected"){
				Menu.setMenuState(MENU_STATE.PLAYING);
			}
		}
		
		//draw level selection sprites
		for(let i=0;i<ui_menuMap.#maxLevel;i+=1){
			if(i<=ui_menuMap.#maxMangaUnlocked){
				let spr =(i==ui_menuMap.#maxMangaUnlocked?
							 ui_menuMap.#sprites.btn_icon_manga
							:ui_menuMap.#sprites.btn_icon_manga_cleared);
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_manga_hover;
					spr.x=x+i*33;
				}
				if(ui_menuMap.#selectedArea=='manga'&&
				   ui_menuMap.#selectedLevel==i){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_manga_selected;
					spr.x=x+i*33;
				}
				Renderer.drawSprite(spr,ctx);//TODO: hover over, cleared
				spr.y=y;
				spr.x=x;
			}
			if(i<=ui_menuMap.#maxComicUnlocked){
				let spr =(i==ui_menuMap.#maxComicUnlocked?
							 ui_menuMap.#sprites.btn_icon_comic
							:ui_menuMap.#sprites.btn_icon_comic_cleared);
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_comic_hover;
					spr.x=x+i*33;
				}
				if(ui_menuMap.#selectedArea=='comic'&&
				   ui_menuMap.#selectedLevel==i){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_comic_selected;
					spr.x=x+i*33;
				}
				Renderer.drawSprite(spr,ctx);//TODO: hover over, cleared
				spr.y=y;
				spr.x=x;
			}
			if(i<=ui_menuMap.#maxGameUnlocked){
				let spr =(i==ui_menuMap.#maxGameUnlocked?
							 ui_menuMap.#sprites.btn_icon_game
							:ui_menuMap.#sprites.btn_icon_game_cleared);
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_game_hover;
					spr.x=x+i*33;
				}
				if(ui_menuMap.#selectedArea=='game'&&
				   ui_menuMap.#selectedLevel==i){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_game_selected;
					spr.x=x+i*33;
				}
				Renderer.drawSprite(spr,ctx);//TODO: hover over, cleared
				spr.y=y;
				spr.x=x;
			}
			if(i<=ui_menuMap.#maxAnimeUnlocked){
				let spr =(i==ui_menuMap.#maxAnimeUnlocked?
							 ui_menuMap.#sprites.btn_icon_anime
							:ui_menuMap.#sprites.btn_icon_anime_cleared);
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_anime_hover;
					spr.x=x+i*33;
				}
				if(ui_menuMap.#selectedArea=='anime'&&
				   ui_menuMap.#selectedLevel==i){
					spr.x=x;spr.y=y;
					spr=ui_menuMap.#sprites.btn_icon_anime_selected;
					spr.x=x+i*33;
				}
				Renderer.drawSprite(spr,ctx);//TODO: ohover ver, cleared
				spr.y=y;
				spr.x=x;
			}
		}
	}
	static click(e){
		//check for selecting a map first
		for(let i=0;i<ui_menuMap.#maxLevel;i+=1){
			if(i<=ui_menuMap.#maxMangaUnlocked){
				const spr = ui_menuMap.#sprites.btn_icon_manga;
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					ui_menuMap.#selectArea("manga");
					ui_menuMap.#selectLevel(i);
				}
				spr.y=y;
				spr.x=x;
			}
			if(i<=ui_menuMap.#maxComicUnlocked){
				const spr = ui_menuMap.#sprites.btn_icon_comic;
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					ui_menuMap.#selectArea("comic");
					ui_menuMap.#selectLevel(i);
				}
				spr.y=y;
				spr.x=x;
			}
			if(i<=ui_menuMap.#maxGameUnlocked){
				const spr = ui_menuMap.#sprites.btn_icon_game;
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					ui_menuMap.#selectArea("game");
					ui_menuMap.#selectLevel(i);
				}
				spr.y=y;
				spr.x=x;
			}
			if(i<=ui_menuMap.#maxAnimeUnlocked){
				const spr = ui_menuMap.#sprites.btn_icon_anime;
				const [x,y] = [spr.x,spr.y];
				spr.x=x+i*33;
				if(Renderer.isMouseOver(spr)){
					ui_menuMap.#selectArea("anime");
					ui_menuMap.#selectLevel(i);
				}
				spr.y=y;
				spr.x=x;
			}
		}
		
		
		
		//disable until selecting a map
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_start)){
			if(ui_menuMap.#selectedLevel<0){
				alert("please select a map before starting a game");
				return;
			}
			ui_menuMap.#applyMapData();
			Menu.setMenuState(MENU_STATE.PLAYING);
		}
		//TODO: check if already joining/hosting?
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiHost)){
			if(ui_menuMap.#selectedLevel<0){
				alert("please select a map before hosting a game");
				return;
			}
			ui_menuMap.#applyMapData();
			Sy_api.api_setNetworking(Network);
			ui_menuMap.#hostId = Network.host();
		}
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiJoin)){
			Sy_api.api_setNetworking(Network);
			const hostId = prompt("Enter host ID to join: ");
			if(hostId){
				ui_menuMap.#applyMapData();//data will be overwritten by host, just need some good state here
				Network.join(hostId.toUpperCase());
			}
		}
	}
	
	static #applyMapData(){
			//start game, apply stats
			let levelData = MapData.getMapData(MAP_KIND.MANGA,ui_menuMap.#selectedLevel);
			const nwStatus = Network.getStatus();
			const isLocal = (nwStatus=="disabled");
			switch(ui_menuMap.#selectedArea){
				case 'manga':
					if(isLocal){
						levelData = MapData.getMapData(MAP_KIND.MANGA,ui_menuMap.#selectedLevel);
					}else{
						levelData = MapData.getMapData(MAP_KIND.MANGA_MULTI,ui_menuMap.#selectedLevel);
					}
					break;
				case 'anime':
					if(isLocal){
						levelData = MapData.getMapData(MAP_KIND.ANIME,ui_menuMap.#selectedLevel);
					}else{
						levelData = MapData.getMapData(MAP_KIND.ANIME_MULTI,ui_menuMap.#selectedLevel);
					}
					break;
				case 'game':
					if(isLocal){
						levelData = MapData.getMapData(MAP_KIND.GAME,ui_menuMap.#selectedLevel);
					}else{
						levelData = MapData.getMapData(MAP_KIND.GAME_MULTI,ui_menuMap.#selectedLevel);
					}
					break;
				case 'comic':
					if(isLocal){
						levelData = MapData.getMapData(MAP_KIND.COMIC,ui_menuMap.#selectedLevel);
					}else{
						levelData = MapData.getMapData(MAP_KIND.COMIC_MULTI,ui_menuMap.#selectedLevel);
					}
					break;
			}
			if(levelData.script){
				Script.start(levelData.script);
			}
			Terrain.setTerrainMapData(levelData.display);
			//load player characters into units 
			//NOTE: if you are joining a network game, your characters need to be loaded with state cbt_ENEMY
			const characters = ui_menuCharacter.getCharacters();
			const curPlayer = (Network.getStatus()=='disabled'||Network.isHost()?cbt_PLAYER:cbt_ENEMY);
			const units = levelData.units.filter(x=>{return x.player_state == curPlayer});
			if(units.length!=characters.length){console.warn("mismatch in ch length. lvl:",ui_menuMap.#selectedArea,ui_menuMap.#selectedLevel);}
			for(let i=0;i<characters.length&&i<units.length;i+=1){
				const ch = characters[i];
				const unit = units[i];
				//patch the map units with props from the ch state
				//note, the ch obj has prefixed names while the portrait state does not.
				const keys = Object.keys(ch);
				for(const key of keys){
					unit["sprite_"+key] = ch[key];//TODO: actual stats (not just display attributes)
				}
			}
			
			Sy_api.api_generateRoom(42,levelData.terrain,levelData.units);
	}
	
	static #selectedArea = 'manga';
	static #selectedLevel = -1;//TODO: set to -1 on init?
	//TODO apply levels?
	static #maxMangaUnlocked = 2;//TODO: load/save unlock, and increment on win?
	static #maxAnimeUnlocked = 0;
	static #maxGameUnlocked = 0;
	static #maxComicUnlocked = 0;
	static #selectArea(area){
		if(area==ui_menuMap.#selectedArea){
			return;//already selected, nothing to do
		}
		ui_menuMap.#selectedArea='manga';//default
		if(area=="manga"){
			ui_menuMap.#selectedArea='manga';
			ui_menuMap.#selectLevel(ui_menuMap.#maxMangaUnlocked);
		}
		if(area=="anime"){
			ui_menuMap.#selectedArea='anime';
			ui_menuMap.#selectLevel(ui_menuMap.#maxAnimeUnlocked);
		}
		if(area=="game"){
			ui_menuMap.#selectedArea='game';
			ui_menuMap.#selectLevel(ui_menuMap.#maxGameUnlocked);
		}
		if(area=="comic"){
			ui_menuMap.#selectedArea='comic';
			ui_menuMap.#selectLevel(ui_menuMap.#maxComicUnlocked);
		}
	}
	static #selectLevel(level){
		const area = ui_menuMap.#selectedArea;
		ui_menuMap.#selectedLevel=0;//default
		if(area=="manga"){
			if(level>ui_menuMap.#maxMangaUnlocked){
				level = ui_menuMap.#maxMangaUnlocked;
			}
		}
		if(area=="anime"){
			if(level>ui_menuMap.#maxAnimeUnlocked){
				level = ui_menuMap.#maxAnimeUnlocked;
			}
		}
		if(area=="game"){
			if(level>ui_menuMap.#maxGameUnlocked){
				level = ui_menuMap.#maxGameUnlocked;
			}
		}
		if(area=="comic"){
			if(level>ui_menuMap.#maxComicUnlocked){
				level = ui_menuMap.#maxComicUnlocked;
			}
		}
		ui_menuMap.#selectedLevel=level;
	}
	
	static #maxLevel = 4;//5 levels per area = 0,1,2,3,4
	static clearCurrentLevel(){
		const area=ui_menuMap.#selectedArea;
		if(area=="manga"){
			ui_menuMap.#maxMangaUnlocked+=1;
			if(ui_menuMap.#maxMangaUnlocked>ui_menuMap.#maxLevel){
				ui_menuMap.#maxMangaUnlocked=ui_menuMap.#maxLevel;
			}
		}
		if(area=="anime"){
			ui_menuMap.#maxAnimeUnlocked+=1;
			if(ui_menuMap.#maxAnimeUnlocked>ui_menuMap.#maxLevel){
				ui_menuMap.#maxAnimeUnlocked=ui_menuMap.#maxLevel;
			}
		}
		if(area=="game"){
			ui_menuMap.#maxGameUnlocked+=1;
			if(ui_menuMap.#maxGameUnlocked>ui_menuMap.#maxLevel){
				ui_menuMap.#maxGameUnlocked=ui_menuMap.#maxLevel;
			}
		}
		if(area=="comic"){
			ui_menuMap.#maxComicUnlocked+=1;
			if(ui_menuMap.#maxComicUnlocked>ui_menuMap.#maxLevel){
				ui_menuMap.#maxComicUnlocked=ui_menuMap.#maxLevel;
			}
		}
	}
	
	//TODO: actually set the data based on the map
	static getUnits(){
		
	}
	static getTerrain(){
		
	}
}
//once off init, establish clearing callback
Menu.setEndCallback(ui_menuMap.clearCurrentLevel);

export {ui_menuMap};