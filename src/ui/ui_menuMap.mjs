
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
	}
	static click(e){
		//TODO: select a map, set terrain
		
		//disable until selecting a map
		if(ui_menuMap.#selectedLevel<0){
			alert("plese select a map before starting a game");
			return;
		}
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_start)){
			ui_menuMap.#applyMapData();
			Menu.setMenuState(MENU_STATE.PLAYING);
		}
		//TODO: check if already joining/hosting?
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiHost)){
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
	static #selectedLevel = 0;//TODO: set to -1 on init?
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
	
	//TODO: actually set the data based on the map
	static getUnits(){
		
	}
	static getTerrain(){
		
	}
}
export {ui_menuMap};