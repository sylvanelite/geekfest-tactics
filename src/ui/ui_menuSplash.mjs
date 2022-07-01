
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";

import { Script } from "../renderer/script.mjs";
import { ui_menuMap } from "./ui_menuMap.mjs";
import { ui_menuCharacter } from "./ui_menuCharacter.mjs";


class ui_menuSplash{
	
	static #preload = [
	'font/boxy_bold_font.png',
	
	'ui/lvl_icons.png',
	'ui/map.png',
	'ui/menu_character.png',
	'ui/script_bg.png',
	'ui/script_bubble.png',
	'ui/script_ch.png',
	'ui/turn_toggle.png',
	
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
	
	
	
	static draw(ctx){
		const loadingAmount = ("loading: "+
			Math.floor(100*((ui_menuSplash.#numberToLoad-ui_menuSplash.#preload.length)/ui_menuSplash.#numberToLoad))+"% ("+
			(ui_menuSplash.#numberToLoad-ui_menuSplash.#preload.length)+"/"+ui_menuSplash.#numberToLoad+")");
		ctx.fillText("Splash"+loadingAmount,32,32);
	}
	static click(e){
		
		//TODO: if mouse is over load button
		const savedDataStr = window.localStorage.getItem('savedata');
		if(savedDataStr){
			const saveData = JSON.parse(savedDataStr);
			ui_menuMap.loadUnlock(saveData);
			ui_menuCharacter.loadCharacters(saveData);
			console.log("loaded:",saveData);
		}
		//--intro script
		if(!savedDataStr){
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
ui_menuSplash.preload();


export {ui_menuSplash};