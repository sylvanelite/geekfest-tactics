
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";

import { Script } from "../renderer/script.mjs";
import { ui_menuMap } from "./ui_menuMap.mjs";
import { ui_menuCharacter } from "./ui_menuCharacter.mjs";
import { Audio,BGM,SFX } from "../renderer/audio.mjs";



class ui_menuSplash{
	
	static #preload = [
	'font/boxy_bold_font.png',
	
	'ui/lvl_icons.png',
	'ui/menu_character.png',
	'ui/script_bg.png',
	'ui/script_bubble.png',
	'ui/script_ch.png',
	'ui/turn_toggle.png',
	'ui/game_over.png',
	'ui/screen_map.png',
	'ui/screen_character.png',
	'ui/f_icons.png',
	'ui/m_icons.png',
	//'ui/screen_splash.png',
	
	'character_spritesheet/portrait/female_portraits.png',
	'character_spritesheet/portrait/male_portraits.png',
	
	'character_spritesheet/128px/male_cape_back.png',
	'character_spritesheet/128px/male_cape_front.png',
	'character_spritesheet/128px/male_cape_side.png',
	'character_spritesheet/128px/male_eyebrows.png',
	'character_spritesheet/128px/male_eyes.png',
	'character_spritesheet/128px/male_facial_hair.png',
	'character_spritesheet/128px/male_hair_back.png',
	'character_spritesheet/128px/male_hair_front.png',
	'character_spritesheet/128px/male_head.png',
	'character_spritesheet/128px/male_head_gear.png',
	'character_spritesheet/128px/male_left_arms.png',
	'character_spritesheet/128px/male_left_hair.png',
	'character_spritesheet/128px/male_left_leg.png',
	'character_spritesheet/128px/male_leg_covers_back.png',
	'character_spritesheet/128px/male_leg_covers_front.png',
	'character_spritesheet/128px/male_leg_covers_side.png',
	'character_spritesheet/128px/male_necklaces.png',
	'character_spritesheet/128px/male_right_arms.png',
	'character_spritesheet/128px/male_right_leg.png',
	'character_spritesheet/128px/male_torso.png',
	'character_spritesheet/128px/male_wings.png',
	'character_spritesheet/128px/female_cape_back.png',
	'character_spritesheet/128px/female_cape_front.png',
	'character_spritesheet/128px/female_cape_side.png',
	'character_spritesheet/128px/female_eyebrows.png',
	'character_spritesheet/128px/female_eyes.png',
	'character_spritesheet/128px/female_earrings.png',
	'character_spritesheet/128px/female_hair_back.png',
	'character_spritesheet/128px/female_hair_front.png',
	'character_spritesheet/128px/female_head.png',
	'character_spritesheet/128px/female_head_gear.png',
	'character_spritesheet/128px/female_left_arms.png',
	'character_spritesheet/128px/female_left_hair.png',
	'character_spritesheet/128px/female_left_leg.png',
	'character_spritesheet/128px/female_leg_covers_back.png',
	'character_spritesheet/128px/female_leg_covers_front.png',
	'character_spritesheet/128px/female_leg_covers_side.png',
	'character_spritesheet/128px/female_necklaces.png',
	'character_spritesheet/128px/female_right_arms.png',
	'character_spritesheet/128px/female_right_leg.png',
	'character_spritesheet/128px/female_torso.png',
	'character_spritesheet/128px/female_wings.png',

	'terrain_spritesheet/iso_sprites.png',
	'terrain_spritesheet/iso_auto_fence.png',
	'terrain_spritesheet/iso_auto_path.png',
	'terrain_spritesheet/iso_auto_roof_hay.png',
	'terrain_spritesheet/iso_auto_stair_stone.png',
	'terrain_spritesheet/iso_auto_water_complex.png',
	'terrain_spritesheet/iso_auto_water_simple.png',
	'terrain_spritesheet/move.png',
	'terrain_spritesheet/obscured.png',
	'terrain_spritesheet/target.png',
	'terrain_spritesheet/tile.png',
	
	'effects/hit_yellow.png',
	'effects/fade_out.png',
	];
	static #numberToLoad=ui_menuSplash.#preload.length;
	static preload=()=>{
		const getBatch = ()=>{
			const res = [];
			const batchSize=4;
			for(let i=0;i<batchSize;i+=1){
				if(!ui_menuSplash.#preload.length){
					break;
				}
				res.push(ui_menuSplash.#preload.pop());
			}
			return res;
		};
		
		const batchLoaded = ()=>{
			if(ui_menuSplash.#preload.length){
				load();
			}
		};
		const load=()=>{
			const batch = getBatch();
			Renderer.preload(batch,batchLoaded);
		};
		load();
	};
	
	static #sprites = {
		background:Renderer.getSprite("ui/screen_splash.png",0,0,Renderer.width,Renderer.height,0,0),
		play:Renderer.getSprite("ui/screen_splash.png",332,401,
			331,81,331,81
		),
		load:Renderer.getSprite("ui/screen_splash.png",
			801,429,91,64,91,64)
	}
	
	
	static draw(ctx){
		const spr = ui_menuSplash.#sprites.background;
		Renderer.drawSprite(spr,ctx);
		const loadingAmount = ("loading: "+
			Math.floor(100*((ui_menuSplash.#numberToLoad-ui_menuSplash.#preload.length)/ui_menuSplash.#numberToLoad))+"% ("+
			(ui_menuSplash.#numberToLoad-ui_menuSplash.#preload.length)+"/"+ui_menuSplash.#numberToLoad+")");
		ctx.font = "14pt monospace";
		ctx.fillStyle="black";
		ctx.fillText(loadingAmount,Renderer.width/2-64,Renderer.height/2+64);
		
		ctx.fillStyle="rgba(200,200,200,0.7)";
		if(Renderer.isMouseOver(ui_menuSplash.#sprites.play)){
			ctx.fillRect(
				ui_menuSplash.#sprites.play.x,
				ui_menuSplash.#sprites.play.y,
				ui_menuSplash.#sprites.play.width,
				ui_menuSplash.#sprites.play.height);
		}
		if(Renderer.isMouseOver(ui_menuSplash.#sprites.load)){
			ctx.fillRect(
				ui_menuSplash.#sprites.load.x,
				ui_menuSplash.#sprites.load.y,
				ui_menuSplash.#sprites.load.width,
				ui_menuSplash.#sprites.load.height);
		}
	}
	static #skipIntro = false;
	static click(e){
		
		if(Renderer.isMouseOver(ui_menuSplash.#sprites.load)){
			const savedDataStr = window.localStorage.getItem('savedata');
			if(savedDataStr){
				const saveData = JSON.parse(savedDataStr);
				ui_menuMap.loadUnlock(saveData);
				ui_menuCharacter.loadCharacters(saveData);
				ui_menuSplash.#skipIntro = true;
				alert("successfully loaded");
			}else{
				alert("no saved data to load");
			}
		}
		
		if(Renderer.isMouseOver(ui_menuSplash.#sprites.play)){
			Audio.StartBGM(BGM.menu);
			//--intro script
			if(!ui_menuSplash.#skipIntro){
			Script.start([
			`{
				"text":"abc def, etc",
				"speech":"talk",
				"left":"chA",
				"right":"chB",
				"talk":"left"
			}`,
			`{
				"text":"some other text",
				"speech":"talk",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"exclaim!!",
				"speech":"exclaim",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"... now thinking ...",
				"speech":"think",
				"left":"chA",
				"right":"chB",
				"talk":"left"
			}`
			]);
			}
			
			
			ui_menuCharacter.refreshSprites();
			
			Menu.setMenuState(MENU_STATE.CHARACTER);
		}
	}
}
ui_menuSplash.preload();


export {ui_menuSplash};