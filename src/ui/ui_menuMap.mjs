
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { st_Character, cbt_ENEMY,cbt_PLAYER } from "../state/consts.mjs";

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
	};
	
	static draw(ctx){
		Renderer.drawSprite(ui_menuMap.#sprites.bg_map,ctx);
	}
	static click(e){
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_start)){
			//start game, apply stats
			const terrain = ui_menuMap.getTerrain();
			const units = ui_menuMap.getUnits();
			Sy_api.api_generateRoom(42,terrain,units);
			Menu.setMenuState(MENU_STATE.PLAYING);
		}
	}
	//TODO: actually set the data based on the map
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
}
export {ui_menuMap};