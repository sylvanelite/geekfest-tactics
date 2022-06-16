

//convert a portrait sprite, to a 48px map sprite
//file name can be, e.g.
// cape_back (folder, looking down)
//    cape_back0 // part of file name, 'back' indiciates it's rendered behind the ch
//              _0.png,_1.png //part of file name, indicates animation frame
//        _front0 // part of file name, 'front' indicates it's rendered in front of the ch

//should resolve to:
//folder + file, which can be used as variable + lookup to get the sprite out of the spritesheet

//for each input image, return an object with:{back:[],middle:[],front:[]}
//inside the arrays are folder+file combos which lookup into sprite sheet
//arrays specify animation


/*
How-to...

for input image+direction,
return array of [folder,[[files]xframes]] 
extract by destructin
flag file for flip using stirng:_flip_

*/


//want to avoid annotating all the files (error prone)
//try using functions

//for now, assume left = flip of right
// this isn't always true, e.g. cape has L and R different

const getTorso = (base)=>{
	return {
		up:{folder:'torso',frames:[
			['chest_back_'+base+'.png',
			'pelvis_back_'+base.replace('x','')+'.png']
		]},
		down:{folder:'torso',frames:[
			['chest_front_'+base+'.png',
			'pelvis_front_'+base.replace('x','')+'.png']
		]},
		left:{folder:'torso',frames:[
			['chest_side_'+base+'.png',
			'pelvis_side_'+base.replace('x','')+'.png']
		]},
	};
};
const getBackArm = (base)=>{//'back' is the left arm
	if(base == "1x"){
		return {
			up:{folder:'left_arms',frames:[
				['back_arm1_0x.png'],
				['back_arm1_1x.png'],
				['back_arm1_2x.png'],
			]},
			down:{folder:'left_arms',frames:[
				['forward_arm1_0x.png'],
				['forward_arm1_1x.pngg'],
				['forward_arm1_2x.png'],
			]},
			left:{folder:'left_arms',frames:[
				['side_arm1_0x.png'],
				['side_arm1_1x.png'],
				['side_arm1_2x.pngg'],
			]},
		};
	}
	if(base == "2x"){
		return {
			up:{folder:'left_arms',frames:[
				['back_arm2_0x.png'],
				['back_arm2_1x.png'],
				['back_arm2_2x.png'],
			]},
			down:{folder:'left_arms',frames:[
				['forward_arm2_0x.png'],
				['forward_arm2_1x.pngg'],
				['forward_arm2_2x.png'],
			]},
			left:{folder:'left_arms',frames:[
				['side_arm2_0x.png'],
				['side_arm2_1x.png'],
				['side_arm2_2x.pngg'],
			]},
		};
	}
	if(base == "2xF"){//female 2x does work given the name
		base='2x';
	}
	
	return {
		up:{folder:'left_arms',frames:[
			['back_arm'+base+'_0.png'],
			['back_arm'+base+'_1.png'],
			['back_arm'+base+'_2.png'],
		]},
		down:{folder:'left_arms',frames:[
			['forward_arm'+base+'_0.png'],
			['forward_arm'+base+'_1.png'],
			['forward_arm'+base+'_2.png'],
		]},
		left:{folder:'left_arms',frames:[
			['side_arm'+base+'_0.png'],
			['side_arm'+base+'_1.png'],
			['side_arm'+base+'_2.png'],
		]},
	};
};
const getFrontArm = (base)=>{//'front' is the right arm
	if(base == "1x"){
		return {
			up:{folder:'right_arms',frames:[
				['back_arm1_2x.png'],
				['back_arm1_0x.png'],
				['back_arm1_1x.png'],
			]},
			down:{folder:'right_arms',frames:[
				['forward_arm1_2x.png'],
				['forward_arm1_0x.pngg'],
				['forward_arm1_1x.png'],
			]},
			left:{folder:'right_arms',frames:[
				['side_arm1_2x.png'],
				['side_arm1_0x.png'],
				['side_arm1_1x.pngg'],
			]},
		};
	}
	if(base == "2x"){
		return {
			up:{folder:'right_arms',frames:[
				['back_arm2_2x.png'],
				['back_arm2_0x.png'],
				['back_arm2_1x.png'],
			]},
			down:{folder:'right_arms',frames:[
				['forward_arm2_2x.png'],
				['forward_arm2_0x.pngg'],
				['forward_arm2_1x.png'],
			]},
			left:{folder:'right_arms',frames:[
				['side_arm2_2x.png'],
				['side_arm2_0x.png'],
				['side_arm2_1x.pngg'],
			]},
		};
	}
	if(base == "2xF"){//female 2x does work given the name
		base='2x';
	}
	return {
		up:{folder:'right_arms',frames:[
			['back_arm'+base+'_2.png'],
			['back_arm'+base+'_0.png'],
			['back_arm'+base+'_1.png'],
		]},
		down:{folder:'right_arms',frames:[
			['forward_arm'+base+'_2.png'],
			['forward_arm'+base+'_0.png'],
			['forward_arm'+base+'_1.png'],
		]},
		left:{folder:'right_arms',frames:[
			['side_arm'+base+'_2.png'],
			['side_arm'+base+'_0.png'],
			['side_arm'+base+'_1.png'],
		]},
	};
};
const getEar = (base)=>{//'front' is the right arm
	if(base.indexOf('elf')>-1){
		return {
			folder:'head',
			up:{folder:'head',frames:[
				['elf_ears_back.png'],
			]},
			down:{folder:'head',frames:[
				['elf_ears_front.png'],
			]},
			left:{folder:'head',frames:[
				['elf_ears_side.png'],
			]},
		};
	};
	return {
		up:{folder:'head',frames:[]},
		down:{folder:'head',frames:[]},
		left:{folder:'head',frames:[]},//built in to head sprite, nothing to do
	};
};
const getHead = ()=>{
	return {
		up:{folder:'head',frames:[['head_back.png']]},
		down:{folder:'head',frames:[['head_front.png']]},
		left:{folder:'head',frames:[['head_side.png']]},
	};
};
const getEyes = ()=>{
	return {
		up:{folder:'eyes',frames:[]},//obscured?
		down:{folder:'eyes',frames:[['eyes_forward_0.png','eyes_down_0.png']]},
		left:{folder:'eyes',frames:[['eyes_side_0.png']]},
	};
};
const getBaseHair = (base)=>{
	//TODO: are these supposed to be the same regardless of direction?
	//      it sits behind the face, so maybe?
	return {
		up:{folder:'hair_back',frames:[
			['hair_back_'+base+'.png'],
		]},
		down:{folder:'hair_back',frames:[
			['hair_back_'+base+'a.png'],
		]},
		left:{folder:'hair_back',frames:[
			['hair_back_'+base+'a.png'],
		]},
	};
};
const getBackhairF = (base)=>{
	return {
		up:{folder:'hair_back',frames:[
			['hair_backhair_'+base+'.png'],
		]},
		down:{folder:'hair_back',frames:[]},//obscured?
		left:{folder:'hair_back',frames:[
			['hair_backhair_'+base+'a.png'],
		]},
	};
};
const getBackhairM = (base)=>{
	//TODO: these don't see to match (at low res +helmet it probably doesn't matter)
	/*
		"hair_back_0.png":,
		"hair_back_4.png":,
		"hair_back_7.png":,
	*/
	return {
		up:{folder:'hair_back',frames:[ ]},
		down:{folder:'hair_back',frames:[ ]},
		left:{folder:'hair_back',frames:[ ]},
	};
};
const getEyebrows = ()=>{
	return {//F: doesn't have eyebrows 1,2 so just return 0 for all
		up:{folder:'eyebrows',frames:[ ]},
		down:{folder:'eyebrows',frames:[['eyebrows_forward_0.png']]},
		left:{folder:'eyebrows',frames:[['eyebrows_side_0.png']]},
	};
};
const getHairfront = (base)=>{
	return {
		up:{folder:'hair_front',frames:[['hair_front_'+base+'.png']]},
		down:{folder:'hair_front',frames:[]},
		left:{folder:'hair_front',frames:[['hair_front_'+base+'a.png']]},
	};
};
const getHeadgear = (base)=>{
	if(base=='2'){//only M has headgear 2, sprite does not exist. return hair instead
		return {
			up:{folder:'hair_back',frames:[['hair_back_3a.png']]},
			down:{folder:'hair_front',frames:[['hair_base_3.png']]},
			left:{folder:'left_hair',frames:[['left_hair_3a.png']]},
		};
	}
	return {
		up:{folder:'head_gear',frames:[['headgear_back_'+base+'.png']]},
		down:{folder:'head_gear',frames:[['headgear_front_'+base+'.png']]},
		left:{folder:'head_gear',frames:[['helmet_side_'+base+'.png']]},
	};
};
const getCape = (base)=>{
	return {
		up:{
			folder:'cape_back',
			frames:[
				['cape_back_'+base+"_0.png",'cape_front_'+base+"_0.png"],
				['cape_back_'+base+"_1.png",'cape_front_'+base+"_1.png"]
		]},
		down:{
			folder:'cape_front',
			frames:[
				['cape_back_'+base+"_0.png",'cape_front_'+base+"_0.png"],
				['cape_back_'+base+"_1.png",'cape_front_'+base+"_1.png"]
		]},
		left:{
			folder:'cape_side',
			frames:[
				['cape_back_'+base+"_0.png",'cape_right_'+base+"_0.png"],
				['cape_back_'+base+"_1.png",'cape_right_'+base+"_1.png"]
		]},
	};
};
const getFacehair = (base)=>{
	return {
		up:{folder:'facial_hair',frames:[['Facial_hair_back_'+base+'.png']]},
		down:{folder:'facial_hair',frames:[['Facial_hair_front_'+base+'.png']]},
		left:{folder:'facial_hair',frames:[['Facial_hair_side'+base+'.png']]},
	};
};
const getNecklace = (base)=>{
	return {
		up:{folder:'necklaces',frames:[['necklace_back_'+base+'.png']]},
		down:{folder:'necklaces',frames:[['necklace_front_'+base+'.png']]},
		left:{folder:'necklaces',frames:[['necklace_side_'+base+'.png']]},
	};
};
const getWingBack = (base)=>{
	return {
		up:{folder:'wings',frames:[['wings_back_'+base+'.png']]},
		down:{folder:'wings',frames:[['wings_front_'+base+'.png']]},
		left:{folder:'wings',frames:[['wings_side_'+base+'.png']]},
	};
};
const getWingFront = (base)=>{//TODO: flip the wing?
	return {
		up:{folder:'wings',frames:[['wings_back_'+base+'.png']]},
		down:{folder:'wings',frames:[['wings_front_'+base+'.png']]},
		left:{folder:'wings',frames:[['wings_side_'+base+'.png']]},
	};
};

//NOTE: legs are not included in the portrait.
//      assume they will match the arms
const getBackLeg = (base)=>{//'back' is the left leg
	return {
		up:{folder:'left_leg',frames:[
			['leg_back'+base+'_2.png'],
			['leg_back'+base+'_1.png'],
			['leg_back'+base+'_0.png'],
		]},
		down:{folder:'left_leg',frames:[
			['leg_front'+base+'_2.png'],
			['leg_front'+base+'_1.png'],
			['leg_front'+base+'_0.png'],
		]},
		left:{folder:'left_leg',frames:[
			['leg_side'+base+'_2.png'],
			['leg_side'+base+'_1.png'],
			['leg_side'+base+'_0.png'],
		]},
	};
};
const getFrontLeg = (base)=>{//'front' is the right leg
	return {
		up:{folder:'right_leg',frames:[
			['leg_back'+base+'_2.png'],
			['leg_back'+base+'_0.png'],
			['leg_back'+base+'_1.png'],
		]},
		down:{folder:'right_leg',frames:[
			['leg_front'+base+'_2.png'],
			['leg_front'+base+'_0.png'],
			['leg_front'+base+'_1.png'],
		]},
		left:{folder:'right_leg',frames:[
			['leg_side'+base+'_2.png'],
			['leg_side'+base+'_0.png'],
			['leg_side'+base+'_1.png'],
		]},
	};
};
const getLegCover = (base)=>{
	return {
		up:{folder:'leg_covers_back',frames:[
			['leg_covers'+base+'_0.png'],
			['leg_covers'+base+'_1.png'],
			['leg_covers'+base+'_2.png'],
		]},
		down:{folder:'leg_covers_front',frames:[
			['leg_covers'+base+'_0.png'],
			['leg_covers'+base+'_1.png'],
			['leg_covers'+base+'_2.png'],
		]},
		left:{folder:'leg_covers_side',frames:[
			['leg_covers'+base+'_0.png'],
			['leg_covers'+base+'_1.png'],
			['leg_covers'+base+'_2.png'],
		]},
	};
};


const portraitLookup = {
	male:{
		//torso
		"torso_2.png":getTorso('2'),
		"torso_2x.png":getTorso('2x'),
		"torso_1.png":getTorso('1'),
		"torso_3.png":getTorso('3'),
		"torso_3x.png":getTorso('3x'),
		"torso_4.png":getTorso('2'),
		"torso_4x.png":getTorso('4x'),
		"torso_5.png":getTorso('5'),
		"torso_5x.png":getTorso('5x'),
		"torso_6.png":getTorso('6'),
		"torso_7.png":getTorso('7'),
		"torso_8.png":getTorso('8'),
		"torso_9.png":getTorso('9'),
		"torso_9x.png":getTorso('9x'),
		"torso_10.png":getTorso('10'),
		"torso_11.png":getTorso('11'),
		"torso_0.png":getTorso('0'),
		
		//back arm
		"back_arm_2.png":getBackArm('2'),
		"back_arm_2x.png":getBackArm('2x'),
		"back_arm_1.png":getBackArm('1'),
		"back_arm_1x.png":getBackArm('1x'),
		"back_arm_3.png":getBackArm('3'),
		"back_arm_3x.png":getBackArm('3x'),
		"back_arm_4.png":getBackArm('4'),
		"back_arm_4x.png":getBackArm('4x'),
		"back_arm_5.png":getBackArm('5'),
		"back_arm_5x.png":getBackArm('5x'),
		"back_arm_6.png":getBackArm('6'),
		"back_arm_7.png":getBackArm('7'),
		"back_arm_7x.png":getBackArm('7x'),
		"back_arm_8.png":getBackArm('8'),
		"back_arm_8x.png":getBackArm('8x'),
		"back_arm_9.png":getBackArm('9'),
		"back_arm_9x.png":getBackArm('9x'),
		"back_arm_10.png":getBackArm('10'),
		"back_arm_11.png":getBackArm('11'),
		"back_arm_0.png":getBackArm('0'),
		
		//front_arm
		"front_arm_2.png":getFrontArm('2'),
		"front_arm_2x.png":getFrontArm('2x'),
		"front_arm_1.png":getFrontArm('1'),
		"front_arm_1x.png":getFrontArm('1x'),
		"front_arm_3.png":getFrontArm('3'),
		"front_arm_3x.png":getFrontArm('3x'),
		"front_arm_4.png":getFrontArm('4'),
		"front_arm_4x.png":getFrontArm('4x'),
		"front_arm_5.png":getFrontArm('5'),
		"front_arm_5x.png":getFrontArm('5x'),
		"front_arm_6.png":getFrontArm('6'),
		"front_arm_7.png":getFrontArm('7'),
		"front_arm_7x.png":getFrontArm('7x'),
		"front_arm_8.png":getFrontArm('8'),
		"front_arm_8x.png":getFrontArm('8x'),
		"front_arm_9.png":getFrontArm('9'),
		"front_arm_9x.png":getFrontArm('9x'),
		"front_arm_10.png":getFrontArm('10'),
		"front_arm_11.png":getFrontArm('11'),
		"front_arm_0.png":getFrontArm('0'),
		//leg
		"leg_2.png":getFrontLeg('2'),
		"leg_2x.png":getFrontLeg('2'),
		"leg_1.png":getFrontLeg('1'),
		"leg_1x.png":getFrontLeg('1x'),
		"leg_3.png":getFrontLeg('3'),
		"leg_3x.png":getFrontLeg('3'),
		"leg_4.png":getFrontLeg('4'),
		"leg_4x.png":getFrontLeg('4'),
		"leg_5.png":getFrontLeg('5'),
		"leg_5x.png":getFrontLeg('5'),
		"leg_6.png":getFrontLeg('6'),
		"leg_7.png":getFrontLeg('7'),
		"leg_7x.png":getFrontLeg('7'),
		"leg_8.png":getFrontLeg('8'),
		"leg_8x.png":getFrontLeg('8'),
		"leg_9.png":getFrontLeg('9'),
		"leg_9x.png":getFrontLeg('9'),
		"leg_10.png":getFrontLeg('10'),
		"leg_11.png":getFrontLeg('11'),
		"leg_0.png":getFrontLeg('0'),
		//leg
		"leg_back_2.png":getBackLeg('2'),
		"leg_back_2x.png":getBackLeg('2'),
		"leg_back_1.png":getBackLeg('1'),
		"leg_back_1x.png":getBackLeg('1x'),
		"leg_back_3.png":getBackLeg('3'),
		"leg_back_3x.png":getBackLeg('3'),
		"leg_back_4.png":getBackLeg('4'),
		"leg_back_4x.png":getBackLeg('4'),
		"leg_back_5.png":getBackLeg('5'),
		"leg_back_5x.png":getBackLeg('5'),
		"leg_back_6.png":getBackLeg('6'),
		"leg_back_7.png":getBackLeg('7'),
		"leg_back_7x.png":getBackLeg('7'),
		"leg_back_8.png":getBackLeg('8'),
		"leg_back_8x.png":getBackLeg('8'),
		"leg_back_9.png":getBackLeg('9'),
		"leg_back_9x.png":getBackLeg('9'),
		"leg_back_10.png":getBackLeg('10'),
		"leg_back_11.png":getBackLeg('11'),
		"leg_back_0.png":getBackLeg('0'),
		//leg cover
		"leg_cover_2.png":getLegCover('2'),
		"leg_cover_2x.png":getLegCover('2'),
		"leg_cover_1.png":getLegCover('1'),
		"leg_cover_1x.png":getLegCover('1x'),
		"leg_cover_3.png":getLegCover('3'),
		"leg_cover_3x.png":getLegCover('3'),
		"leg_cover_4.png":getLegCover('4'),
		"leg_cover_4x.png":getLegCover('4'),
		"leg_cover_5.png":getLegCover('5'),
		"leg_cover_5x.png":getLegCover('5'),
		"leg_cover_6.png":getLegCover('6'),
		"leg_cover_7.png":getLegCover('7'),
		"leg_cover_7x.png":getLegCover('7'),
		"leg_cover_8.png":getLegCover('8'),
		"leg_cover_8x.png":getLegCover('8'),
		"leg_cover_9.png":getLegCover('9'),
		"leg_cover_9x.png":getLegCover('9'),
		"leg_cover_10.png":getLegCover('10'),
		"leg_cover_11.png":getLegCover('11'),
		"leg_cover_0.png":getLegCover('0'),
		
		//ear
		"elf_ear_0.png":getEar('elf'),
		"front_ear_0.png":getEar(''),
		
		//head
		"head_0.png":getHead(),
		
		//eyes
		"eyes_0.png":getEyes(),
		
		//base_hair
		"base_hair_0.png":getBaseHair('0'),
		"base_hair_2.png":getBaseHair('2'),
		"base_hair_3.png":getBaseHair('3'),
		"base_hair_4.png":getBaseHair('4'),
		"base_hair_6.png":getBaseHair('6'),
		"base_hair_7.png":getBaseHair('7'),
		
		//back_hair
		"hair_back_0.png":getBackhairM('0'),
		"hair_back_4.png":getBackhairM('4'),
		"hair_back_7.png":getBackhairM('7'),
		
		//eyebrow
		"eyebrows_0.png":getEyebrows('0'),
		"eyebrows_1.png":getEyebrows('1'),
		"eyebrows_2.png":getEyebrows('2'),
		
		//front_hair (N/A)
		
		//headgear
		
		"headgear_0.png":getHeadgear('0'),
		"headgear_1.png":getHeadgear('1'),
		"headgear_2.png":getHeadgear('2'),
		"headgear_7.png":getHeadgear('7'),
		"headgear_8.png":getHeadgear('8'),
		"headgear_9.png":getHeadgear('9'),
		"headgear_10.png":getHeadgear('10'),
		"headgear_11.png":getHeadgear('11'),
		
		"cape_0_top.png":getCape('0'),
		"cape_3_top.png":getCape('3'),
		"facial_hair_0.png":getFacehair('0'),
		"facial_hair_2.png":getFacehair('2'),
		"necklace_0.png":getNecklace('0'),
		"necklace_1.png":getNecklace('1'),
		"wing_front_0.png":getWingFront('0'),
		"wing_front_1.png":getWingFront('1'),
		"wing_back_0.png":getWingBack('0'),
		"wing_back_1.png":getWingBack('1'),


		
	},
	female:{
		//torso
		"torso_2.png":getTorso('2'),
		"torso_2x.png":getTorso('2x'),
		"torso_1.png":getTorso('1'),
		"torso_3.png":getTorso('3'),
		"torso_4.png":getTorso('4'),
		"torso_4x.png":getTorso('4x'),
		"torso_5.png":getTorso('5'),
		"torso_6.png":getTorso('6'),
		"torso_7.png":getTorso('7'),
		"torso_7x.png":getTorso('7x'),
		"torso_8.png":getTorso('8'),
		"torso_8x.png":getTorso('8x'),
		"torso_9.png":getTorso('9'),
		"torso_10.png":getTorso('10'),
		"torso_10x.png":getTorso('10x'),
		"torso_11.png":getTorso('11'),
		"torso_11x.png":getTorso('11x'),
		"torso_12.png":getTorso('12'),
		"torso_0.png":getTorso('0'),
		
		//back_arm
		"back_arm_2.png":getBackArm('2'),
		"back_arm_2x.png":getBackArm('2xF'),
		"back_arm_1.png":getBackArm('1'),
		"back_arm_3.png":getBackArm('3'),
		"back_arm_4.png":getBackArm('4'),
		"back_arm_4x.png":getBackArm('4x'),
		"back_arm_5.png":getBackArm('5'),
		"back_arm_6.png":getBackArm('6'),
		"back_arm_7.png":getBackArm('7'),
		"back_arm_7x.png":getBackArm('7x'),
		"back_arm_8.png":getBackArm('8'),
		"back_arm_8x.png":getBackArm('8x'),
		"back_arm_9.png":getBackArm('9'),
		"back_arm_10.png":getBackArm('10'),
		"back_arm_10x.png":getBackArm('10x'),
		"back_arm_11.png":getBackArm('11'),
		"back_arm_11x.png":getBackArm('11x'),
		"back_arm_12.png":getBackArm('12'),
		"back_arm_0.png":getBackArm('0'),
		
		//front_arm
		"front_arm_2.png":getFrontArm('2'),
		"front_arm_2x.png":getFrontArm('2xF'),
		"front_arm_1.png":getFrontArm('1'),
		"front_arm_3.png":getFrontArm('3'),
		"front_arm_4.png":getFrontArm('4'),
		"front_arm_4x.png":getFrontArm('4x'),
		"front_arm_5.png":getFrontArm('5'),
		"front_arm_6.png":getFrontArm('6'),
		"front_arm_7.png":getFrontArm('7'),
		"front_arm_7x.png":getFrontArm('7x'),
		"front_arm_8.png":getFrontArm('8'),
		"front_arm_8x.png":getFrontArm('8x'),
		"front_arm_9.png":getFrontArm('9'),
		"front_arm_10.png":getFrontArm('10'),
		"front_arm_10x.png":getFrontArm('10x'),
		"front_arm_11.png":getFrontArm('11'),
		"front_arm_11x.png":getFrontArm('11x'),
		"front_arm_12.png":getFrontArm('12'),
		"front_arm_0.png":getFrontArm('0'),
		
		//leg
		"leg_2.png":getFrontLeg('2'),
		"leg_2x.png":getFrontLeg('2'),
		"leg_1.png":getFrontLeg('1'),
		"leg_3.png":getFrontLeg('3'),
		"leg_4.png":getFrontLeg('4'),
		"leg_4x.png":getFrontLeg('4'),
		"leg_5.png":getFrontLeg('5'),
		"leg_6.png":getFrontLeg('6'),
		"leg_7.png":getFrontLeg('7'),
		"leg_7x.png":getFrontLeg('7'),
		"leg_8.png":getFrontLeg('8'),
		"leg_8x.png":getFrontLeg('8'),
		"leg_9.png":getFrontLeg('9'),
		"leg_10.png":getFrontLeg('10'),
		"leg_10x.png":getFrontLeg('10'),
		"leg_11.png":getFrontLeg('11'),
		"leg_11x.png":getFrontLeg('11'),
		"leg_12.png":getFrontLeg('12'),
		"leg_0.png":getFrontLeg('0'),
		
		//leg
		"leg_back_2.png":getBackLeg('2'),
		"leg_back_2x.png":getBackLeg('2'),
		"leg_back_1.png":getBackLeg('1'),
		"leg_back_3.png":getBackLeg('3'),
		"leg_back_4.png":getBackLeg('4'),
		"leg_back_4x.png":getBackLeg('4'),
		"leg_back_5.png":getBackLeg('5'),
		"leg_back_6.png":getBackLeg('6'),
		"leg_back_7.png":getBackLeg('7'),
		"leg_back_7x.png":getBackLeg('7'),
		"leg_back_8.png":getBackLeg('8'),
		"leg_back_8x.png":getBackLeg('8'),
		"leg_back_9.png":getBackLeg('9'),
		"leg_back_10.png":getBackLeg('10'),
		"leg_back_10x.png":getBackLeg('10'),
		"leg_back_11.png":getBackLeg('11'),
		"leg_back_11x.png":getBackLeg('11'),
		"leg_back_12.png":getBackLeg('12'),
		"leg_back_0.png":getBackLeg('0'),
		//leg
		"leg_cover_2.png":getLegCover('2'),
		"leg_cover_2x.png":getLegCover('2'),
		"leg_cover_1.png":getLegCover('1'),
		"leg_cover_3.png":getLegCover('3'),
		"leg_cover_4.png":getLegCover('4'),
		"leg_cover_4x.png":getLegCover('4'),
		"leg_cover_5.png":getLegCover('5'),
		"leg_cover_6.png":getLegCover('6'),
		"leg_cover_7.png":getLegCover('7'),
		"leg_cover_7x.png":getLegCover('7'),
		"leg_cover_8.png":getLegCover('8'),
		"leg_cover_8x.png":getLegCover('8'),
		"leg_cover_9.png":getLegCover('9'),
		"leg_cover_10.png":getLegCover('10'),
		"leg_cover_10x.png":getLegCover('10'),
		"leg_cover_11.png":getLegCover('11'),
		"leg_cover_11x.png":getLegCover('11'),
		"leg_cover_12.png":getLegCover('12'),
		"leg_cover_0.png":getLegCover('0'),
		
		//ear
		"front_ear_0.png":getEar(''),
		"front_ear_1.png":getEar('elf'),
		
		//head
		"head_0.png":getHead(),
		
		//eyes
		"eyes_0.png":getEyes(),
		
		//base_hair
		"base_hair_for_helmets.png":getBaseHair('0'),
		
		//back_hair
		"backhair_0.png":getBackhairF('0'),
		"backhair_1.png":getBackhairF('1'),
		"backhair_5.png":getBackhairF('5'),
		"backhair_6.png":getBackhairF('6'),
		
		//eyebrows
		"eyebrows_0.png":getEyebrows('0'),
		"eyebrows_1.png":getEyebrows('1'),
		"eyebrows_2.png":getEyebrows('2'),
		
		//front_hair
		"front_hair_0.png":getHairfront('0'),
		"front_hair_1.png":getHairfront('1'),
		"front_hair_5.png":getHairfront('5'),
		
		//headgear
		"headgear_0.png":getHeadgear('0'),
		"headgear_1.png":getHeadgear('1'),
		"headgear_7.png":getHeadgear('7'),
		"headgear_8.png":getHeadgear('8'),
		"headgear_9.png":getHeadgear('9'),
		"headgear_11.png":getHeadgear('11'),
		"headgear_12.png":getHeadgear('12'),
		
		"cape_0_top.png":getCape('0'),
		"cape_3_top.png":getCape('3'),
		//"earrings_0.png":,//skip, probably too small to worry about
		//"earrings_1.png":,
		"necklace_0.png":getNecklace('0'),
		"necklace_1.png":getNecklace('1'),
		"wing_front_0.png":getWingFront('0'),
		"wing_front_1.png":getWingFront('1'),
		"wing_back_0.png":getWingBack('0'),
		"wing_back_1.png":getWingBack('1'),
		
	}
};
	
	
export {portraitLookup};