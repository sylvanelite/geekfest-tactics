
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";
import { Network }from '../renderer/network.mjs';
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
	static #selectedMap = 0;
	
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
		if(ui_menuMap.#selectedMap<0){
			alert("plese select a map before starting a game");
			return;
		}
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_start)){
			//start game, apply stats
			const terrain = ui_menuMap.getTerrain();
			const units = ui_menuMap.getUnits();
			Sy_api.api_generateRoom(42,terrain,units);
			Menu.setMenuState(MENU_STATE.PLAYING);
		}
		//TODO: check if already joining/hosting?
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiHost)){
			Sy_api.api_setNetworking(Network);
			ui_menuMap.#hostId = Network.host();
		}
		if(Renderer.isMouseOver(ui_menuMap.#sprites.btn_multiJoin)){
			Sy_api.api_setNetworking(Network);
			const hostId = prompt("Enter host ID to join: ");
			if(hostId){
				Network.join(hostId.toUpperCase());
			}
		}
	}
	//TODO: host/join NW implementation buttons
	
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