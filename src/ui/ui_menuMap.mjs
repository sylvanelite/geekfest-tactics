
import { Renderer,PALETTE } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";
import { Network }from '../renderer/network.mjs';
import { Sy_api } from "../state/api.mjs";
import { Terrain } from "../ui/terrain/terrain.mjs";
import { cbt_ENEMY,cbt_PLAYER } from "../state/consts.mjs";
import { MapData,MAP_KIND } from "../ui/map/mapData.mjs";
import { ui_menuCharacter } from "./ui_menuCharacter.mjs";
import { ui_idle } from "./ui_idle.mjs";
import { ui_displayMove } from "./ui_displayMove.mjs";
import { Audio,BGM,SFX } from "../renderer/audio.mjs";


class ui_menuMap{
	static #sprites = {
		bg_map:Renderer.getSprite(
			"ui/screen_map.png",
			0,0,Renderer.width,Renderer.height,0,0
		),
		btn_start:Renderer.getSprite(
			'ui/screen_map.png',
			784,359,151,64,784,359
		),
		btn_multiHost:Renderer.getSprite(
			"ui/screen_map.png",
			602,12,140,75,602,12
		),
		btn_multiJoin:Renderer.getSprite(
			"ui/screen_map.png",
			750,12,140,75,750,12
		),
		//TODO: spread icons out in an area
		
		/*
		Manga:
		x68,y289
		w197,h136

		Anime:
		x327,y213
		w154,h:107

		Games:
		x368,y334
		w193,h75

		Comic:
		x631,y247
		w117,h89

		*/
		btn_icon_manga:Renderer.getSprite(
			'ui/lvl_icons.png',
			68,299,32,32,0,0
		),
		btn_icon_comic:Renderer.getSprite(
			'ui/lvl_icons.png',
			631,257,32,32,0,96
		),
		btn_icon_game:Renderer.getSprite(
			'ui/lvl_icons.png',
			368,334,32,32,0,64
		),
		btn_icon_anime:Renderer.getSprite(
			'ui/lvl_icons.png',
			327,223,32,32,0,32
		),
		btn_icon_manga_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			68,299,32,32,32,0
		),
		btn_icon_comic_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			631,257,32,32,32,96
		),
		btn_icon_game_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			368,334,32,32,32,64
		),
		btn_icon_anime_selected:Renderer.getSprite(
			'ui/lvl_icons.png',
			327,223,32,32,32,32
		),
		btn_icon_manga_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			68,299,32,32,64,0
		),
		btn_icon_comic_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			631,257,32,32,64,96
		),
		btn_icon_game_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			368,334,32,32,64,64
		),
		btn_icon_anime_cleared:Renderer.getSprite(
			'ui/lvl_icons.png',
			327,223,32,32,64,32
		),
		btn_icon_manga_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			68,299,32,32,96,0
		),
		btn_icon_comic_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			631,257,32,32,96,96
		),
		btn_icon_game_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			368,334,32,32,96,64
		),
		btn_icon_anime_hover:Renderer.getSprite(
			'ui/lvl_icons.png',
			327,223,32,32,96,32
		),
	};
	static #hostId = "";
	
	static draw(ctx){
		Renderer.drawSprite(ui_menuMap.#sprites.bg_map,ctx);
		const nwStatus = Network.getStatus();
		if(nwStatus!="disabled"){
			ctx.fillStyle="black";
			ctx.fillRect(
				ui_menuMap.#sprites.btn_multiHost.x+46,
				ui_menuMap.#sprites.btn_multiHost.y+64,
				350,
				80
			);
			ctx.fillStyle="red";
			ctx.fillText(nwStatus,
				ui_menuMap.#sprites.btn_multiHost.x+55,
				ui_menuMap.#sprites.btn_multiHost.y+112.5);
			if(nwStatus=="connected"){
				const bgm = [BGM.levelA,BGM.levelB,BGM.levelC];
				Audio.StartBGM(bgm[Math.floor(Math.random()*bgm.length)]);
				Menu.setMenuState(MENU_STATE.PLAYING);
			}
		if(Network.isHost()){
			ctx.font="16pt monospace";
			ctx.fillText("HOST: "+ui_menuMap.#hostId,
				ui_menuMap.#sprites.btn_multiHost.x+55,
				ui_menuMap.#sprites.btn_multiHost.y+88.5);
		}
		}
		
		ctx.fillStyle="rgba(200,200,200,0.7)";
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_start)){
			ctx.fillRect(
				ui_menuMap.#sprites.btn_start.x,
				ui_menuMap.#sprites.btn_start.y,
				ui_menuMap.#sprites.btn_start.width,
				ui_menuMap.#sprites.btn_start.height);
		}
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiHost)){
			ctx.fillRect(
				ui_menuMap.#sprites.btn_multiHost.x,
				ui_menuMap.#sprites.btn_multiHost.y,
				ui_menuMap.#sprites.btn_multiHost.width,
				ui_menuMap.#sprites.btn_multiHost.height);
		}
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiJoin)){
			ctx.fillRect(
				ui_menuMap.#sprites.btn_multiJoin.x,
				ui_menuMap.#sprites.btn_multiJoin.y,
				ui_menuMap.#sprites.btn_multiJoin.width,
				ui_menuMap.#sprites.btn_multiJoin.height);
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
					Audio.PlaySFX(SFX.select);
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
					Audio.PlaySFX(SFX.select);
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
					Audio.PlaySFX(SFX.select);
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
					Audio.PlaySFX(SFX.select);
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
			const bgm = [BGM.levelA,BGM.levelB,BGM.levelC];
			Audio.StartBGM(bgm[Math.floor(Math.random()*bgm.length)]);
			Menu.setMenuState(MENU_STATE.PLAYING);
		}
		//TODO: check if already joining/hosting?
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiHost)){
			if(ui_menuMap.#selectedLevel<0){
				alert("please select a map before hosting a game");
				return;
			}
			ui_menuMap.#applyMapData(false);
			Sy_api.api_setNetworking(Network);
			ui_menuMap.#hostId = Network.host();
		}
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiJoin)){
			Sy_api.api_setNetworking(Network);
			const hostId = prompt("Enter host ID to join: ");
			if(hostId){
				ui_menuMap.#applyMapData(false);//data will be overwritten by host, just need some good state here
				Network.join(hostId.toUpperCase());
			}
		}
	}
	static #applyStatsToCh(ch){
		ch.max_hp=5;
		ch.atk=3;
		ch.mov=3;
		ch.min_range=1;
		ch.max_range=2;
		ch.hp = ch.max_hp;
	}
	static #applyMapData(isLocal=true){
		ui_idle.clearEnemyHighlight();
		//start game, apply stats
		let levelData = MapData.getMapData(MAP_KIND.MANGA,ui_menuMap.#selectedLevel);
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
			ui_menuMap.#applyStatsToCh(unit);
		}
		
		Audio.PlaySFX(SFX.beginMap);
		Sy_api.api_generateRoom(42,levelData.terrain,levelData.units);//TODO: pass in terrain.display for sync...
		
		ui_menuMap.#save();
	}
	
	static #selectedArea = 'anime';
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
			Renderer.setRenderPalette(PALETTE.MANGA);
		}
		if(area=="anime"){
			ui_menuMap.#selectedArea='anime';
			ui_menuMap.#selectLevel(ui_menuMap.#maxAnimeUnlocked);
			Renderer.setRenderPalette(PALETTE.ANIME);
		}
		if(area=="game"){
			ui_menuMap.#selectedArea='game';
			ui_menuMap.#selectLevel(ui_menuMap.#maxGameUnlocked);
			Renderer.setRenderPalette(PALETTE.GB);
		}
		if(area=="comic"){
			ui_menuMap.#selectedArea='comic';
			ui_menuMap.#selectLevel(ui_menuMap.#maxComicUnlocked);
			Renderer.setRenderPalette(PALETTE.COMIC);
		}
		//ui_menuCharacter.refreshSprites();//TODO: is this needed?
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
	static clearCurrentLevel(localVictory){
		ui_idle.clearEnemyHighlight();
		ui_displayMove.clearPath();
		ui_menuMap.#selectedLevel=-1;
		if(localVictory){
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
		ui_menuMap.#save();
		Audio.StartBGM(BGM.menu);

		//ui_menuMap.#selectedArea="anime";//todo: reset palette to anime?
	}
	static #save(){
		//save the current selections to local storage
		const characters = ui_menuCharacter.getCharacters();
		//TODO: move this into a save/load class?
		const storage = {
			version:1,//TODO: could be used in conjuction with localStorave.clearStorage() if data format changes
			characters:characters,
			mangaUnlocked:ui_menuMap.#maxMangaUnlocked,
			animeUnlocked:ui_menuMap.#maxAnimeUnlocked,
			gameUnlocked:ui_menuMap.#maxGameUnlocked,
			comicUnlocked:ui_menuMap.#maxComicUnlocked,
		};
		const storageStr = JSON.stringify(storage);
		window.localStorage.setItem('savedata',storageStr);
	}
	static loadUnlock(load){
		ui_menuMap.#maxMangaUnlocked = load.mangaUnlocked;
		ui_menuMap.#maxAnimeUnlocked = load.animeUnlocked;
		ui_menuMap.#maxGameUnlocked = load.gameUnlocked;
		ui_menuMap.#maxComicUnlocked = load.comicUnlocked;
	}
}
//once off init, establish clearing callback
Menu.setEndCallback(ui_menuMap.clearCurrentLevel);

export {ui_menuMap};