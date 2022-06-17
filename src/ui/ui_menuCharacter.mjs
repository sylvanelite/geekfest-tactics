
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";
import { Composer } from "./character/composer.mjs";
import { male_data, female_data, portraits } from "./character/data/portraits.mjs";

class ui_menuCharacter{
	static draw(ctx){
		
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_shuffle,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_gender,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_start,ctx);
		ui_menuCharacter.drawCharacter(ui_menuCharacter.#selectedChIdx,ctx);//TODO: ch idx
		
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
		isUnlocked:true,
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
		isUnlocked:true,
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
		isUnlocked:true,
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
		isUnlocked:true,
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
		isUnlocked:true,
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
	
	static selectCharacter(ch){
		
	}
	static start(){
		Menu.setMenuState(MENU_STATE.MAP);
		//TODO: save characters to localstorage?
	}
	static selectCharacter(ch){
		console.log("switch to ch:",ch);
		//TODO: if unlocked...
		ui_menuCharacter.#selectedChIdx = ch;
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
	
	static drawCharacter(chIdx,ctx){
		
		/*
		female:
				   <object_ref id="6" name="back_headgear_1_000" folder="22" file="21" abs_x="-461" abs_y="927" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="11" key="0" z_index="6"/>
                    <object_ref id="16" name="head_scar_0" folder="22" file="101" abs_x="-162" abs_y="867.5" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="23" key="0" z_index="16"/>
                    <object_ref id="23" name="front_arm_10x" folder="22" file="66" abs_x="-477" abs_y="669" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="20" key="0" z_index="23"/>
    
		*/
		/*
		male:     
                    <object_ref id="10" name="torso_2_overlay_000" folder="23" file="41" abs_x="-321" abs_y="757" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="22" key="0" z_index="10"/>
                    <object_ref id="13" name="head_shading_0" folder="23" file="32" abs_x="-60" abs_y="867" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="20" key="0" z_index="13"/>
                    <object_ref id="14" name="head_scar_0" folder="23" file="108" abs_x="-83" abs_y="857.5" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="24" key="0" z_index="14"/>
             		<object_ref id="24" name="front_arm_2" folder="23" file="39" abs_x="-414.9998" abs_y="637.99978" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="21" key="0" z_index="24"/>
					<object_ref id="22" name="hair_front_0" folder="23" file="6" abs_x="-409.615716" abs_y="1063.305619" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="10" key="0" z_index="22"/>

		*/                    

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
		
		const ch = ui_menuCharacter.#ch[chIdx];
		
		const getSprData = (name,gender)=>{
			const source = (gender == 'male'?male_data:female_data);
			const search = (gender == 'male'?"male_portraits":"female_portraits")+"/"+name;
			//TODO: use map instead of linear lookup
			for(const portrait of source.file){
				if(portrait.name == search){
					const width = parseInt(portrait.width,10);
					const height = parseInt(portrait.height,10);
					return {
						name:portrait.name,
						width,height
					};
				}
			}
			
		};
		const scale = 0.35;
		const sprY = 500;
		const sprX = 128;
		//special case: accessories (back)
		if(ch.a_wing>=0){
			const [bx,by] = (ch.gender=="male"?[-54,1020]:[-84,920]);
			const [fx,fy] = (ch.gender=="male"?[-640,1031]:[-601,943]);
			const wingBack = "wing_back_"+ch.a_wing+".png";
			const wingFront = "wing_front_"+ch.a_wing+".png";
			const imgBack = getSprData(wingBack,"male");//only M has wing sprites		
			const imgFront = getSprData(wingFront,"male");	
			for(const imgObj of [{i:imgBack,x:bx,y:by},{i:imgFront,x:fx,y:fy}]){
				const img = imgObj.i;
				const x = imgObj.x*scale;//353,683 are dims of torso?
				const y = (-imgObj.y)*scale;
				const sprite = Renderer.getSprite(
					'RPG_Heroes_Pack/RPG_pack_128/'+img.name,
					x+sprX,y+sprY,img.width,img.height,0,0
				);
				Renderer.drawSpriteScaled(sprite,img.width*scale,img.height*scale,ctx);
			}
		}
		if(ch.a_cape>=0){
			const [ix,iy] = (ch.gender=="male"?[-401.965024,518]:[-463,520.732936]);
			const img = (ch.a_cape == 0?
				getSprData("cape_back_0.png",ch.gender):
				getSprData("cape_back_3.png",ch.gender));
			const x = ix*scale;//353,683 are dims of torso?
			const y = (-iy)*scale;
			const sprite = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+img.name,
				x+sprX,y+sprY,img.width,img.height,0,0
			);
			Renderer.drawSpriteScaled(sprite,img.width*scale,img.height*scale,ctx);
			
			const [px,py] = (ch.gender=="male"?[-274,538]:[-343.181818,522.727273]);
			const imgPatch = (ch.a_cape == 0?
				getSprData("cape_back_patch.png",ch.gender):
				getSprData("cape_back_patch.png",ch.gender));
			const xPatch = px*scale;//353,683 are dims of torso?
			const yPatch = (-py)*scale;
			const spritePatch = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+imgPatch.name,
				xPatch+sprX,yPatch+sprY,imgPatch.width,imgPatch.height,0,0
			);
			Renderer.drawSpriteScaled(spritePatch,imgPatch.width*scale,imgPatch.height*scale,ctx);
			
			//f,m
			
			const [tx,ty] = (ch.gender=="male"?[-407,696]:[-477,682]);
			const imgTop = (ch.a_cape == 0?
				getSprData("cape_0_top_back.png",ch.gender):
				getSprData("cape_3_top_back.png",ch.gender));
			const xTop = tx*scale;//353,683 are dims of torso?
			const yTop = (-ty)*scale;
			const spriteTop = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+imgTop.name,
				xTop+sprX,yTop+sprY,imgTop.width,imgTop.height,0,0
			);
			Renderer.drawSpriteScaled(spriteTop,imgTop.width*scale,imgTop.height*scale,ctx);
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
			
			const x = (offsets[ch.gender][draw].x)*scale;//353,683 are dims of torso?
			const y = (-offsets[ch.gender][draw].y)*scale;
			
			const sprite = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+img.name,
				x+sprX,y+sprY,img.width,img.height,0,0
			);
			Renderer.drawSpriteScaled(sprite,img.width*scale,img.height*scale,ctx);
		}
		//special case: accessories (front)
		if(ch.a_necklace>=0){
			const [ix,iy] = (ch.gender=="male"?[-192,621]:[-282,615.5]);
			const img = (ch.a_necklace == 0?
				getSprData("necklace_0.png",ch.gender):
				getSprData("necklace_1.png",ch.gender));
			const x = ix*scale;//353,683 are dims of torso?
			const y = (-iy)*scale;
			const sprite = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+img.name,
				x+sprX,y+sprY,img.width,img.height,0,0
			);
			Renderer.drawSpriteScaled(sprite,img.width*scale,img.height*scale,ctx);
			
		}
		if(ch.a_cape>=0){
			const [ix,iy] = (ch.gender=="male"?[-400.849312,691.857728]:[-468,679]);
			const img = (ch.a_cape == 0?
				getSprData("cape_0_top.png",ch.gender):
				getSprData("cape_3_top.png",ch.gender));
			const x = ix*scale;//353,683 are dims of torso?
			const y = (-iy)*scale;
			const sprite = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+img.name,
				x+sprX,y+sprY,img.width,img.height,0,0
			);
			Renderer.drawSpriteScaled(sprite,img.width*scale,img.height*scale,ctx);
		}
		if(ch.a_face>=0){
			const [ix,iy] = (ch.gender=="male"?[-126,717]:[-238,829]);
			const img = (ch.gender=="male"?
				(ch.a_face == 0?getSprData("facial_hair_0.png",ch.gender):getSprData("facial_hair_2.png",ch.gender)):
				(ch.a_face == 0?getSprData("earrings_0.png",ch.gender):getSprData("earrings_1.png",ch.gender)));
			const x = ix*scale;//353,683 are dims of torso?
			const y = (-iy)*scale;
			const sprite = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+img.name,
				x+sprX,y+sprY,img.width,img.height,0,0
			);
			Renderer.drawSpriteScaled(sprite,img.width*scale,img.height*scale,ctx);
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
				ctx.drawImage(canvToDraw,x,y);
			}else{
				//right = flipped
				ctx.save();
				ctx.translate(x, 0);
				ctx.scale(-1, 1);
				ctx.drawImage(canvToDraw,-canvToDraw.width,y);
				ctx.restore();
			}
		}
	}
	
	static composeCharacterSprite(chIdx){
		//NOTE: compose these sprites, and save the result against ch.
		//      that way, ch can be a lookup
		//      this code is not particularly fast.
		const ch = ui_menuCharacter.#ch[chIdx];
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
				ch.canvases[direction].push(canvas);
			}
		}
		//images not loaded, could flush the cache?
		if(!allLoaded){
			//ch.canvases = null;
		}
	}
	
	static refreshSprites(){
		ui_menuCharacter.composeCharacterSprite(0);
		ui_menuCharacter.composeCharacterSprite(1);
		ui_menuCharacter.composeCharacterSprite(2);
		ui_menuCharacter.composeCharacterSprite(3);
		ui_menuCharacter.composeCharacterSprite(4);
	}
}
//init sprites based on portraits
ui_menuCharacter.refreshSprites();//TODO: call this after images have finished loading

//https://www.leshylabs.com/apps/sstool/
//https://www.codeandweb.com/free-sprite-sheet-packer
//https://draeton.github.io/stitches/
//https://amakaseev.github.io/sprite-sheet-packer/
//48px size


export {ui_menuCharacter};