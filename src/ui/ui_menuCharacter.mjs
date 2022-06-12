
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";


class ui_menuCharacter{
	static draw(ctx){
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_shuffle,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_gender,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_start,ctx);
		
		for(let i=0;i<5;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_character;
			spr.x=i*spr.width;
			spr.y=496;
			if(Renderer.isMouseOver(spr)){
				spr.y-=4;
			}
			Renderer.drawSprite(spr,ctx);
			spr.x = 0;
		}
		for(let i=0;i<8;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_icon;
			//front arm
			spr.y=117;
			spr.x=413+i*33;
			Renderer.drawSprite(spr,ctx);
			//back arm
			spr.y=150;
			Renderer.drawSprite(spr,ctx);
			//head
			spr.y=195;
			Renderer.drawSprite(spr,ctx);
			//torso
			spr.y=240;
			Renderer.drawSprite(spr,ctx);
			//back
			spr.y=285;
			Renderer.drawSprite(spr,ctx);
			//reset
			spr.x = 413;
		}
	}
	static click(e){
		
		if(Renderer.isMouseOver(ui_menuCharacter.#sprites.btn_shuffle)){
			ui_menuCharacter.shuffleCharacter();
		}
		if(Renderer.isMouseOver(ui_menuCharacter.#sprites.btn_gender)){
			ui_menuCharacter.swapGender();
		}
		if(Renderer.isMouseOver(ui_menuCharacter.#sprites.btn_start)){
			ui_menuCharacter.start();
		}
		for(let i=0;i<5;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_character;
			spr.x=i*spr.width;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectCharacter(i);
			}
			spr.x = 0;
		}
		for(let i=0;i<8;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_icon;
			//front arm
			spr.y=117;
			spr.x=413+i*33;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectArmFront(i);
			}
			//back arm
			spr.y=150;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectArmBack(i);
			}
			//head
			spr.y=195;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectHead(i);
			}
			//torso
			spr.y=240;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectTorso(i);
			}
			//back
			spr.y=285;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectBack(i);
			}
			//reset
			spr.x = 413;
		}
		
	}
	
	static #sprites = {
		btn_character:Renderer.getSprite(
			'ui/menu_character.png',
			0,496,197,48,0,0
		),
		btn_start:Renderer.getSprite(
			'ui/menu_character.png',
			655,353,275,120,0,47
		),
		btn_shuffle:Renderer.getSprite(
			'ui/menu_character.png',
			0,0,95,66,0,167
		),
		btn_gender:Renderer.getSprite(
			'ui/menu_character.png',
			95,0,130,70,95,167
		),
		btn_icon:Renderer.getSprite(
			'ui/menu_character.png',
			413,117,32,32,243,167
		),
		
	};
	
	static selectCharacter(ch){
		
	}
	static start(){
		Menu.setMenuState(MENU_STATE.MAP);
		//TODO: save characters to localstorage?
	}
	static selectCharacter(ch){
		console.log("switch to ch:",ch);
	}
	static selectArmFront(item){
		console.log("arm f: ",item);		
	}
	static selectArmBack(item){
		console.log("arm b: ",item);
	}
	static selectHead(item){
		console.log("head: ",item);
	}
	static selectTorso(item){
		console.log("torso: ",item);
	}
	static selectBack(item){
		console.log("back: ",item);
	}
	static selectWeapon(item){
		console.log("weapon: ",item);
	}
	static shuffleCharacter(){
		console.log("shuffle");
	}
	static swapGender(){
		console.log("gender");
	}
	
	//selectColour
	
	
	
}
export {ui_menuCharacter};