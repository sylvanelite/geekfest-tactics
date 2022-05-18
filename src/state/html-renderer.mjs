
import { Sy_api } from "./api.mjs";
import { Sy } from "./main.mjs";
const TERRAIN_IMPASSIBLE = 99;
	import { 
	cbt_PLAYER,
	cbt_ENEMY
	}from "./consts.mjs";

class HtmlRenderer{

	static #getTextDescription(){
		let res = "";
		for(let j=0;j<Sy.MAP_HEIGHT;j+=1){
			for(let i=0;i<Sy.MAP_WIDTH;i+=1){
				let ch = " ";
				const terrain = Sy.getTerrainForCell(i,j);
				if(!terrain){
					ch="?";
				}
				if(terrain==TERRAIN_IMPASSIBLE){
					ch="█";
				}
				
				if(Sy_api.api_getAttackForCell(i,j)){
					ch="X";
				}
				if(Sy_api.api_getMoveForCell(i,j)){
					ch="░";
				}
				const pState = Sy_api.api_getCharacterAtPosition(i,j).player_state;
				if(pState == cbt_PLAYER){
					ch="A";
				}
				if(pState == cbt_ENEMY){
					ch="B";
				}
				res+=ch;
			}
			res+="|\n";
		}
		return res;
	}
	static consoleRender(){
		const res = HtmlRenderer.#getTextDescription();
		console.log(res);
	}
	
}

export { HtmlRenderer };