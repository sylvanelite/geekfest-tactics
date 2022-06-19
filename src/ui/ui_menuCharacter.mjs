
import { Renderer,PALETTE } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";
import { Composer } from "./character/composer.mjs";
import { male_data, female_data, portraits } from "./character/data/portraits.mjs";

class ui_menuCharacter{
	static draw(ctx){
		
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_shuffle,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_gender,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_start,ctx);
		ui_menuCharacter.drawCharacterPortrait(ui_menuCharacter.#selectedChIdx,ctx);//TODO: ch idx
		
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
			//arm
			spr.y=117;
			spr.x=413+i*33;
			Renderer.drawSprite(spr,ctx);
			spr.y=150;
			Renderer.drawSprite(spr,ctx);
			//head
			spr.y=195;
			Renderer.drawSprite(spr,ctx);
			//torso
			spr.y=240;
			Renderer.drawSprite(spr,ctx);
			spr.y=273;
			Renderer.drawSprite(spr,ctx);
			//accessories
			spr.y=318;
			Renderer.drawSprite(spr,ctx);
			//reset
			spr.x = 413;
		}
		
		
		//--
		ui_menuCharacter.drawCharacterSprites(ctx);
		//--
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
			//arm
			spr.y=117;
			spr.x=413+i*33;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectArm(i);
			}
			spr.y=150;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectArm(i+8);
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
			spr.y=273;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectTorso(i+8);
			}
			//accessories
			spr.y=318;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectAccessory(i);
			}
			//reset
			spr.x = 413;
		}
		
	}
	
	static #selectedChIdx = 0;
	static #ch = [{
		gender:'female',
		front_arm:0,
		back_arm:0,
		torso:0,
		back:0,
		weapon:0,
		headgear:0,
		
		base_hair:0,
		back_hair:0,
		front_hair:0,
		ear:0,
		eyebrow:0,
		eyes:0,
		mouth:0,
		nose:0,
		head:0,

		a_wing:0,
		a_necklace:0,
		a_cape:0,
		a_face:0,
		
		sprites:null
		
	},{
		gender:'male',
		front_arm:1,
		back_arm:1,
		torso:1,
		back:1,
		weapon:1,
		headgear:1,
		
		base_hair:1,
		back_hair:1,
		front_hair:1,
		ear:1,
		eyebrow:1,
		eyes:1,
		mouth:1,
		nose:1,
		head:1,

		a_wing:1,
		a_necklace:1,
		a_cape:1,
		a_face:1,
		
		sprites:null
	},{
		gender:'male',
		front_arm:2,
		back_arm:2,
		torso:2,
		back:2,
		weapon:2,
		headgear:2,
		
		base_hair:2,
		back_hair:2,
		front_hair:2,
		ear:2,
		eyebrow:2,
		eyes:2,
		mouth:2,
		nose:2,
		head:2,

		a_wing:-1,
		a_necklace:-1,
		a_cape:-1,
		a_face:-1,
		
		sprites:null
	},{
		gender:'male',
		front_arm:3,
		back_arm:3,
		torso:3,
		back:3,
		weapon:3,
		headgear:3,
		
		base_hair:3,
		back_hair:3,
		front_hair:3,
		ear:3,
		eyebrow:3,
		eyes:3,
		mouth:3,
		nose:3,
		head:3,

		a_wing:-1,
		a_necklace:-1,
		a_cape:-1,
		a_face:-1,
		
		sprites:null
	},{
		gender:'male',
		front_arm:4,
		back_arm:4,
		torso:4,
		back:4,
		weapon:4,
		headgear:4,
		
		base_hair:4,
		back_hair:4,
		front_hair:4,
		ear:4,
		eyebrow:4,
		eyes:4,
		mouth:4,
		nose:4,
		head:4,

		a_wing:-1,
		a_necklace:-1,
		a_cape:-1,
		a_face:-1,
		
		sprites:null
	},
		
	];
	
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
	
	static start(){
		Menu.setMenuState(MENU_STATE.MAP);
		//TODO: save characters to localstorage?
	}
	static selectCharacter(ch){
		console.log("switch to ch:",ch);
		//TODO: if unlocked...
		ui_menuCharacter.#selectedChIdx = ch;
		
		
		const pals = [PALETTE.GB ,PALETTE.MANGA,PALETTE.COMIC,PALETTE.ANIME];
		Renderer.setRenderPalette(pals[ch%pals.length]);
		ui_menuCharacter.refreshSprites();
	}
	static selectArm(item){
		console.log("arm f: ",item);//TODO: "if unlocked"
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		const sprList = portraits.front_arm[ch.gender];
		ch.front_arm=item;
		ch.back_arm=item;
		ui_menuCharacter.refreshSprites();
	}
	static selectHead(item){
		console.log("head: ",item);
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		const sprList = portraits.headgear[ch.gender];
		ch.headgear=item;
		ui_menuCharacter.refreshSprites();
	}
	static selectTorso(item){
		console.log("torso: ",item);
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		const sprList = portraits.torso[ch.gender];
		ch.torso=item;
		ui_menuCharacter.refreshSprites();
	}
	static selectAccessory(item){
		console.log("accessory: ",item);
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		if(item == 0||item == 1){//wing
			if(ch.a_wing == item){
				ch.a_wing = -1;//clear selection
			}else{
				ch.a_wing = item;//set selection
			}			
		}
		if(item == 2||item == 3){//necklace
			if(ch.a_necklace == item-2){
				ch.a_necklace = -1;//clear selection
			}else{
				ch.a_necklace = item-2;//set selection
			}	
		}
		if(item == 4||item == 5){//cape
			if(ch.a_cape == item-4){
				ch.a_cape = -1;//clear selection
			}else{
				ch.a_cape = item-4;//set selection
			}			
		}
		if(item == 6||item == 7){//face
			if(ch.a_face == item-6){
				ch.a_face = -1;//clear selection
			}else{
				ch.a_face = item-6;//set selection
			}			
		}
		ui_menuCharacter.refreshSprites();
	}
	static selectWeapon(item){
		console.log("weapon: ",item);
	}
	static shuffleCharacter(){
		console.log("shuffle");
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		const drawOrder = [//'back_arm','torso','front_arm','headgear'
		'back_hair','head','base_hair',
					  'eyes','nose','eyebrow','mouth','ear',
					  'front_hair'];
		for(const draw of drawOrder){
			const sprList = portraits[draw][ch.gender];
			const sprIdx = Math.floor(Math.random()*sprList.length);
			ch[draw]=sprIdx;
		}
		ui_menuCharacter.refreshSprites();
	}
	static swapGender(){
		console.log("gender");
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		if(ch.gender == 'male'){
			ch.gender = 'female';
		}else{
			ch.gender = 'male';
		}
		ui_menuCharacter.refreshSprites();
	}
	
	//selectColour
	
	static drawCharacterPortrait(chIdx,ctx){
		const character = ui_menuCharacter.#ch[chIdx];
		if(!character.portrait){
			return;
		}
		for(const sprite of character.portrait){
			Renderer.drawSprite(sprite,ctx);
		}
	}
	static composeCharacterPortrait(chIdx){
		const ch = ui_menuCharacter.#ch[chIdx];
		ch.portrait = [];
		
		//from abs_x above...
		const offsets = {
			female:{
				'back_hair':{x:-722,y:1227},
				'back_arm':{x:-31,y:641},
				'torso':{x:-353.941834,y:683.037442},
				'head':{x:-192,y:910},//aprox:162,-224 relative to torso
				'front_arm':{x:-478,y:665},
				'mouth':{x:-27.08839,y:591.026974},
				'eyes':{x:-67,y:754},
				'eyebrow':{x:-65,y:754},
				'nose':{x:19.968252,y:658.266716},
				'base_hair':{x:-358,y:1175},
				'ear':{x:-254.000016,y:860.99999},
				'front_hair':{x:-303,y:1044},
				'headgear':{x:-310,y:1023},
			},
			male:{
				'back_hair':{x:-293.948416,y:974.511},
				'back_arm':{x:41.00015,y:532.999776},
				'torso':{x:-320.677944,y:760.809035},
				'head':{x:-59.999917,y:858.999872},//aprox:162,-224 relative to torso
				'front_arm':{x:-414.9998,y:637.99978},
				'mouth':{x:56.00005,y:616.000033},
				'eyes':{x:59.00008,y:722.000036},
				'eyebrow':{x:32.000092,y:761.000024},
				'nose':{x:107.999936,y:695.000054},
				'base_hair':{x:-328.194154,y:1044.862415},
				'ear':{x:-139.00004,y:770.000036},
				'front_hair':{x:-303,y:1044},
				'headgear':{x:-448.962599,y:1406.98906},
			}
		};
		
		
		const getSprData = (name,gender)=>{
			const source = (gender == 'male'?male_data:female_data);
			const folder = (gender == 'male'?"male_portraits":"female_portraits");
			const search = folder+"/"+name;
			//TODO: use map instead of linear lookup
			for(const portrait of source.file){
				if(portrait.name == search){
					return {
						folder:folder,
						name:name
					};
				}
			}
			
		};
		const scale = 0.33;
		const sprY = 500;
		const sprX = 128;
		//special case: accessories (back)
		if(ch.a_wing>=0){
			const [bx,by] = (ch.gender=="male"?[-54,1020]:[-84,920]);
			const [fx,fy] = (ch.gender=="male"?[-640,1031]:[-601,943]);
			const wingBack = "wing_back_"+ch.a_wing;
			const wingFront = "wing_front_"+ch.a_wing;
			const imgBack = getSprData(wingBack,"male");//only M has wing sprites		
			const imgFront = getSprData(wingFront,"male");	
			for(const imgObj of [{i:imgBack,x:bx,y:by},{i:imgFront,x:fx,y:fy}]){
				const img = imgObj.i;
				const x = sprX+imgObj.x*scale;//353,683 are dims of torso?
				const y = sprY+(-imgObj.y)*scale;
				const sprite = Composer.composePortrait(img,x,y,scale);
				ch.portrait.push(sprite);
			}
		}
		if(ch.a_cape>=0){
			const [ix,iy] = (ch.gender=="male"?[-401.965024,518]:[-463,520.732936]);
			const img = (ch.a_cape == 0?
				getSprData("cape_back_0",ch.gender):
				getSprData("cape_back_3",ch.gender));
			const x = sprX+ix*scale;//353,683 are dims of torso?
			const y = sprY+(-iy)*scale;
			const sprite = Composer.composePortrait(img,x,y,scale);
			ch.portrait.push(sprite);
			
			const [px,py] = (ch.gender=="male"?[-274,538]:[-343.181818,522.727273]);
			const imgPatch = (ch.a_cape == 0?
				getSprData("cape_back_patch",ch.gender):
				getSprData("cape_back_patch",ch.gender));
			const xPatch = sprX+px*scale;//353,683 are dims of torso?
			const yPatch = sprY+(-py)*scale;
			const spritePatch = Composer.composePortrait(imgPatch,xPatch,yPatch,scale);
			ch.portrait.push(sprite);
			
		}
		
		//draw portrait
		const drawOrder = ['back_arm','back_hair','torso','head','base_hair',
					  'eyes','nose','eyebrow','mouth','ear',
					  'headgear','front_arm'];
		for(const draw of drawOrder){
			if(draw=='base_hair' && ch.gender == 'female'){
				ch.base_hair = portraits.base_hair.female.length-1;
			}
			//TODO: female base hair=headgear?
			const sprList = portraits[draw][ch.gender];
			const sprIdx = ch[draw]%sprList.length;
			//if(ch[draw]>=sprList.length){console.log("out of range...");}
			const sprName = sprList[sprIdx]
			const img = getSprData(sprName,ch.gender);
			
			const x = sprX+(offsets[ch.gender][draw].x)*scale;//353,683 are dims of torso?
			const y = sprY+(-offsets[ch.gender][draw].y)*scale;
			
			const sprite = Composer.composePortrait(img,x,y,scale);
			ch.portrait.push(sprite);
		}
		//special case: accessories (front)
		if(ch.a_necklace>=0){
			const [ix,iy] = (ch.gender=="male"?[-192,621]:[-282,615.5]);
			const img = (ch.a_necklace == 0?
				getSprData("necklace_0",ch.gender):
				getSprData("necklace_1",ch.gender));
			const x = sprX+ix*scale;//353,683 are dims of torso?
			const y = sprY+(-iy)*scale;
			const sprite = Composer.composePortrait(img,x,y,scale);
			ch.portrait.push(sprite);
			
		}
		if(ch.a_cape>=0){
			const [ix,iy] = (ch.gender=="male"?[-400.849312,691.857728]:[-468,679]);
			const img = (ch.a_cape == 0?
				getSprData("cape_0_top",ch.gender):
				getSprData("cape_3_top",ch.gender));
			const x = sprX+ix*scale;//353,683 are dims of torso?
			const y = sprY+(-iy)*scale;
			const sprite = Composer.composePortrait(img,x,y,scale);
			ch.portrait.push(sprite);
		}
		if(ch.a_face>=0){
			const [ix,iy] = (ch.gender=="male"?[-126,717]:[-238,829]);
			const img = (ch.gender=="male"?
				(ch.a_face == 0?getSprData("facial_hair_0",ch.gender):getSprData("facial_hair_2",ch.gender)):
				(ch.a_face == 0?getSprData("earrings_0",ch.gender):getSprData("earrings_1",ch.gender)));
			const x = sprX+ix*scale;//353,683 are dims of torso?
			const y = sprY+(-iy)*scale;
			const sprite = Composer.composePortrait(img,x,y,scale);
			ch.portrait.push(sprite);
		}
	}
	
	static #frameCount = 0;
	static drawCharacterSprites(ctx){
		ui_menuCharacter.#frameCount +=0.1;
		let direction = "down";
		if(Math.floor(ui_menuCharacter.#frameCount)%40>10){
			direction="left";
		}
		if(Math.floor(ui_menuCharacter.#frameCount)%40>20){
			direction="up";
		}
		if(Math.floor(ui_menuCharacter.#frameCount)%40>30){
			direction="right";
		}
		for(let chIdx=0;chIdx<5;chIdx+=1){
			const ch = ui_menuCharacter.#ch[chIdx];
			if(!ch.canvases){
				return;
			}
			const drawDir = (direction!="right"?direction:"left");
			const frameLength = ch.canvases[drawDir].length;
			const frameIdx = Math.floor(ui_menuCharacter.#frameCount)%frameLength;
			const canvToDraw = ch.canvases[drawDir][frameIdx];
			if(!canvToDraw){return;}
			const ybouce = (frameIdx==1?4:0);
				const x = 300+chIdx*100;
				const y = 200+ybouce;
			if(direction!="right"){
				Renderer.drawCanvasSprite(canvToDraw,x,y,ctx);
			}else{
				//right = flipped
				Renderer.drawCanvasSpriteFlippedH(canvToDraw,x,y,ctx);
			}
		}
	}
	
	static composeCharacterSprite(ch){
		//NOTE: compose these sprites, and save the result against ch.
		//      that way, ch can be a lookup
		//      this code is not particularly fast.
		const sprites = Composer.generateSpritesForCharacter(ch);
		//compose down to a canvas
		ch.canvases = null;
		ch.canvases = {};
		
		const directions = ['left','down','up'];
		const frames = [0,1,2];
		let allLoaded = false;
		for(const direction of directions){
			ch.canvases[direction]=[];
			for(const frame of frames){
				const canvas = document.createElement('canvas');
				canvas.width = 128;
				canvas.height = 128;
				const context = canvas.getContext('2d');
				const spritesToDraw = sprites[direction][frame];
				for(const sprite of spritesToDraw){
					sprite.sprite.x+=canvas.width/2;
					sprite.sprite.y+=canvas.height;
					if(sprite.flipped){
						allLoaded=Renderer.drawSpriteFlippedH(sprite.sprite,canvas.width,context);
						continue;
					}
					allLoaded=Renderer.drawSprite(sprite.sprite,context);
				}
				Renderer.paletteShiftCanvas(canvas);
				ch.canvases[direction].push(canvas);
			}
		}
		//images not loaded, could flush the cache?
		if(!allLoaded){
			//ch.canvases = null;
		}
	}
	
	static refreshSprites(){
		for(let i=0;i<5;i+=1){
			const ch = ui_menuCharacter.#ch[i];
			ui_menuCharacter.composeCharacterSprite(ch);
		}
		ui_menuCharacter.composeCharacterPortrait(ui_menuCharacter.#selectedChIdx);
	}
}
//init sprites based on portraits
ui_menuCharacter.refreshSprites();//TODO: call this after images have finished loading

//sprite packer:
//https://www.leshylabs.com/apps/sstool/


export {ui_menuCharacter};