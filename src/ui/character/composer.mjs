
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
	static compose(ch,direction='down',frame=0){//todo:direction,frame
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
			frame%=spritesheetFrames.length;
			for(const spriteName of spritesheetFrames[frame]){
				const spr = getSpriteByFilename(renderAtlas,spriteName);
				if(spr){
					result.push({sprite:spr,imageName:atlasFileName+".png",folder:spritesheetFolder});//TODO: depth?
				}
			}			
		}
		return result;
	}
}

export {Composer};

