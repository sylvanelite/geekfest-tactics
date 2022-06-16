
import male_cape_back from "./data/male_cape_back.mjs";
import male_cape_front from "./data/male_cape_front.mjs";
import male_cape_side from "./data/male_cape_side.mjs";
import male_eyebrows from "./data/male_eyebrows.mjs";
import male_eyes from "./data/male_eyes.mjs";
import male_facial_hair from "./data/male_facial_hair.mjs";
import male_hair_back from "./data/male_hair_back.mjs";
import male_hair_front from "./data/male_hair_front.mjs";
import male_head from "./data/male_head.mjs";
import male_head_gear from "./data/male_head_gear.mjs";
import male_left_arms from "./data/male_left_arms.mjs";
import male_left_hair from "./data/male_left_hair.mjs";
import male_left_leg from "./data/male_left_leg.mjs";
import male_leg_covers_back from "./data/male_leg_covers_back.mjs";
import male_leg_covers_front from "./data/male_leg_covers_front.mjs";
import male_leg_covers_side from "./data/male_leg_covers_side.mjs";
import male_necklaces from "./data/male_necklaces.mjs";
import male_right_arms from "./data/male_right_arms.mjs";
import male_right_leg from "./data/male_right_leg.mjs";
import male_torso from "./data/male_torso.mjs";
import male_wings from "./data/male_wings.mjs";
import female_cape_back from "./data/female_cape_back.mjs";
import female_cape_front from "./data/female_cape_front.mjs";
import female_cape_side from "./data/female_cape_side.mjs";
import female_earrings from "./data/female_earrings.mjs";
import female_eyebrows from "./data/female_eyebrows.mjs";
import female_eyes from "./data/female_eyes.mjs";
import female_hair_back from "./data/female_hair_back.mjs";
import female_hair_front from "./data/female_hair_front.mjs";
import female_head from "./data/female_head.mjs";
import female_head_gear from "./data/female_head_gear.mjs";
import female_left_arms from "./data/female_left_arms.mjs";
import female_left_hair from "./data/female_left_hair.mjs";
import female_left_leg from "./data/female_left_leg.mjs";
import female_leg_covers_back from "./data/female_leg_covers_back.mjs";
import female_leg_covers_front from "./data/female_leg_covers_front.mjs";
import female_leg_covers_side from "./data/female_leg_covers_side.mjs";
import female_necklaces from "./data/female_necklaces.mjs";
import female_right_arms from "./data/female_right_arms.mjs";
import female_right_leg from "./data/female_right_leg.mjs";
import female_torso from "./data/female_torso.mjs";
import female_wings from "./data/female_wings.mjs";
import { portraitLookup } from "./lookup.mjs";
import { male_data, female_data, portraits } from "./data/portraits.mjs";
import { spriteTilePositions } from "./sprite_offsets.mjs";
import { Renderer } from "../../renderer/renderer.mjs";

const sprites = {male_cape_back,
male_cape_front,
male_cape_side,
male_eyebrows,
male_eyes,
male_facial_hair,
male_hair_back,
male_hair_front,
male_head,
male_head_gear,
male_left_arms,
male_left_hair,
male_left_leg,
male_leg_covers_back,
male_leg_covers_front,
male_leg_covers_side,
male_necklaces,
male_right_arms,
male_right_leg,
male_torso,
male_wings,
female_cape_back,
female_cape_front,
female_cape_side,
female_earrings,
female_eyebrows,
female_eyes,
female_hair_back,
female_hair_front,
female_head,
female_head_gear,
female_left_arms,
female_left_hair,
female_left_leg,
female_leg_covers_back,
female_leg_covers_front,
female_leg_covers_side,
female_necklaces,
female_right_arms,
female_right_leg,
female_torso,
female_wings};

//get sprite by name, TODO:make more efficient by removing linear search
                          //can make a new const above at file-load that lookups by "name" directly
const getSpriteByFilename = (atlas,name)=>{
	if(name.indexOf('.')<0){return null;}
	const nameNoExtension = name.split('.')[0];
	const results = atlas.filter((x)=>{
		return x.name == nameNoExtension;
	});
	if(results.length==0){return null;}
	return results[0];
};

class Composer{
	static compose(ch,direction,frame){//todo:direction,frame
		const result = [];
		for(const imageName of ch.portraits){
			const fileNamePart=imageName.split('/');
			if(fileNamePart.length<2){continue;}//broken ref, skip
			const fileName = fileNamePart[1];
			const src = portraitLookup[ch.gender];
			const spriteSheetIndex = src[fileName];
			if(!spriteSheetIndex){continue;}//sprites with no lookup, e.g. nose, etc
			const lookupData = spriteSheetIndex[direction];
			const spritesheetFolder = lookupData.folder;
			const spritesheetFrames = lookupData.frames;
			if(spritesheetFrames.length==0){continue;}//no data for that image (e.g. looking away from camera)
			const atlasFileName = ch.gender+"_"+spritesheetFolder;
			const renderAtlas = sprites[atlasFileName];
			const frameMod = frame%spritesheetFrames.length;
			for(const spriteName of spritesheetFrames[frameMod]){
				const spr = getSpriteByFilename(renderAtlas,spriteName);
				if(spr){
					result.push({sprite:spr,imageName:atlasFileName+".png",folder:spritesheetFolder});//TODO: depth?
				}
			}			
		}
		return result;
	}

	static generateSpritesForCharacter(ch){
		const result = {};
		const directions = ['left','down','up'];
		const frames = [0,1,3];
		for(const direction of directions){
			result[direction]=[];
			for(const frame of frames){
				const sprite = Composer.generateSprite(ch,direction,frame);
				result[direction].push(sprite);
			}
		}
		return result;
	}
	static generateSprite(ch,direction,frame){
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
		const drawable = [];
		
		//special case: accessories (back)
		if(ch.a_wing>=0){
			const wingBack = "wing_back_"+ch.a_wing+".png";
			const wingFront = "wing_front_"+ch.a_wing+".png";
			const imgBack = getSprData(wingBack,"male");//only M has wing sprites		
			const imgFront = getSprData(wingFront,"male");	
			drawable.push(imgBack.name,imgFront.name);
		}
		if(ch.a_cape>=0){
			const img = (ch.a_cape == 0?
				getSprData("cape_back_0.png",ch.gender):
				getSprData("cape_back_3.png",ch.gender));	
			drawable.push(img.name);
			const imgPatch = (ch.a_cape == 0?
				getSprData("cape_back_patch.png",ch.gender):
				getSprData("cape_back_patch.png",ch.gender));
			drawable.push(imgPatch.name);
			const imgTop = (ch.a_cape == 0?
				getSprData("cape_0_top_back.png",ch.gender):
				getSprData("cape_3_top_back.png",ch.gender));
			drawable.push(imgTop.name);
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
			drawable.push(img.name);
			//special cases, since portrait doesn't have legs, add legs that are the same as the arms
			if(draw == 'back_arm'){
				const back_leg = img.name.replace('back_arm_','leg_back_');
				drawable.push(back_leg);
			}
			if(draw == 'front_arm'){
				const front_leg = img.name.replace('front_arm_','leg_');
				const leg_cover = img.name.replace('front_arm_','leg_cover_');
				drawable.push(front_leg);
				drawable.push(leg_cover);
			}
		}
		//special case: accessories (front)
		if(ch.a_necklace>=0){
			const img = (ch.a_necklace == 0?
				getSprData("necklace_0.png",ch.gender):
				getSprData("necklace_1.png",ch.gender));
			drawable.push(img.name);
			
		}
		if(ch.a_cape>=0){
			const img = (ch.a_cape == 0?
				getSprData("cape_0_top.png",ch.gender):
				getSprData("cape_3_top.png",ch.gender));
			drawable.push(img.name);
		}
		if(ch.a_face>=0){
			const img = (ch.gender=="male"?
				(ch.a_face == 0?getSprData("facial_hair_0.png",ch.gender):getSprData("facial_hair_2.png",ch.gender)):
				(ch.a_face == 0?getSprData("earrings_0.png",ch.gender):getSprData("earrings_1.png",ch.gender)));
			drawable.push(img.name);
		}
		
		const chDraw = {gender:ch.gender,portraits:drawable};
		
		
		
		const spritesheets = Composer.compose(chDraw,direction,Math.floor(frame));

		const [destX,destY] = [0,0];
		const spritesToDraw = [];
		for(const spritesheet of spritesheets){
			let offsetSrc = spriteTilePositions[ch.gender][direction][spritesheet.folder];
			if(spritesheet.folder=='torso'){
				if(spritesheet.sprite.name.indexOf('pelvis')>=0){
					offsetSrc = spriteTilePositions[ch.gender][direction].pelvis;
				}
			}
			if(!offsetSrc){continue;}
			let offsets = {
				abs_x:offsetSrc.abs_x,
				abs_y:offsetSrc.abs_y,
				z_index:offsetSrc.z_index,
				flipped:offsetSrc.abs_scale_x == -1
			};
			
			//kludge: left frames are not equal sizes, apply offsets frame-by-frame
			if(direction == 'left'){
				if(spritesheet.folder=="left_leg"){
					if(Math.floor(frame)%3==2){
						offsets.abs_x=-14;
					}
					if(Math.floor(frame)%3==1){
						offsets.abs_x=-16;
					}
					if(Math.floor(frame)%3==0){
						offsets.abs_x=-28;
					}
				}
				if(spritesheet.folder=="right_leg"){
					if(Math.floor(frame)%3==0){
						offsets.abs_x=-14;
					}
					if(Math.floor(frame)%3==1){
						offsets.abs_x=-16;
					}
					if(Math.floor(frame)%3==2){
						offsets.abs_x=-28;
					}
				}
				if(spritesheet.folder=="left_arms"){
					if(Math.floor(frame)%3==2){
						offsets.abs_x=-16;
					}
					if(Math.floor(frame)%3==1){
						offsets.abs_x=-18;
					}
					if(Math.floor(frame)%3==0){
						offsets.abs_x=-32;
					}
				}
				if(spritesheet.folder=="right_arms"){
					if(Math.floor(frame)%3==0){
						offsets.abs_x=-16;
					}
					if(Math.floor(frame)%3==1){
						offsets.abs_x=-32;
					}
					if(Math.floor(frame)%3==2){
						offsets.abs_x=-18;
					}
				}
			}
			if(direction == 'up'){
				if(spritesheet.folder=="left_leg"&&ch.gender=='male'){
					if(Math.floor(frame)%3==0){
						offsets.abs_x=-34;
					}
				}
				if(spritesheet.folder=="right_leg"&&ch.gender=='male'){
					if(Math.floor(frame)%3==2){
						offsets.abs_x=34;
					}
				}
				if(spritesheet.folder=="left_leg"&&ch.gender=='female'){
					if(Math.floor(frame)%3==0){
						offsets.abs_x=34;
					}
				}
				if(spritesheet.folder=="right_leg"&&ch.gender=='female'){
					if(Math.floor(frame)%3==2){
						offsets.abs_x=-34;
					}
				}
			}
			const sprite = Renderer.getSprite(
				'character_spritesheet/128px/'+spritesheet.imageName,
				destX+offsets.abs_x,destY+(-offsets.abs_y),
				spritesheet.sprite.width,spritesheet.sprite.height,
				spritesheet.sprite.x,spritesheet.sprite.y
			);
			spritesToDraw.push({sprite:sprite,z_index:offsets.z_index,flipped:offsets.flipped});
			if(direction!='left'&&spritesheet.folder=='wings'){//other wing
				const sprite = Renderer.getSprite(
					'character_spritesheet/128px/'+spritesheet.imageName,
					destX-offsets.abs_x,destY+(-offsets.abs_y),
					spritesheet.sprite.width,spritesheet.sprite.height,
					spritesheet.sprite.x,spritesheet.sprite.y
				);
				spritesToDraw.push({sprite:sprite,z_index:offsets.z_index,flipped:!offsets.flipped});

			}
		}
		spritesToDraw.sort((a,b)=>{return a.z_index-b.z_index;});
		return spritesToDraw;
	}
}

export {Composer};

