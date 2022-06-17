

//convert a portrait sprite, to a 48px map sprite
//file name can be, e.g.
// cape_back (folder, looking down)
//    cape_back0 // part of file name, 'back' indiciates it's rendered behind the ch
//              _0,_1 //part of file name, indicates animation frame
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
			['chest_back_'+base+'',
			'pelvis_back_'+base.replace('x','')+'']
		]},
		down:{folder:'torso',frames:[
			['chest_front_'+base+'',
			'pelvis_front_'+base.replace('x','')+'']
		]},
		left:{folder:'torso',frames:[
			['chest_side_'+base+'',
			'pelvis_side_'+base.replace('x','')+'']
		]},
	};
};
const getBackArm = (base)=>{//'back' is the left arm
	if(base == "1x"){
		return {
			up:{folder:'left_arms',frames:[
				['back_arm1_0x'],
				['back_arm1_1x'],
				['back_arm1_2x'],
			]},
			down:{folder:'left_arms',frames:[
				['forward_arm1_0x'],
				['forward_arm1_1x'],
				['forward_arm1_2x'],
			]},
			left:{folder:'left_arms',frames:[
				['side_arm1_0x'],
				['side_arm1_1x'],
				['side_arm1_2x'],
			]},
		};
	}
	if(base == "2x"){
		return {
			up:{folder:'left_arms',frames:[
				['back_arm2_0x'],
				['back_arm2_1x'],
				['back_arm2_2x'],
			]},
			down:{folder:'left_arms',frames:[
				['forward_arm2_0x'],
				['forward_arm2_1x'],
				['forward_arm2_2x'],
			]},
			left:{folder:'left_arms',frames:[
				['side_arm2_0x'],
				['side_arm2_1x'],
				['side_arm2_2x'],
			]},
		};
	}
	if(base == "2xF"){//female 2x does work given the name
		base='2x';
	}
	
	return {
		up:{folder:'left_arms',frames:[
			['back_arm'+base+'_0'],
			['back_arm'+base+'_1'],
			['back_arm'+base+'_2'],
		]},
		down:{folder:'left_arms',frames:[
			['forward_arm'+base+'_0'],
			['forward_arm'+base+'_1'],
			['forward_arm'+base+'_2'],
		]},
		left:{folder:'left_arms',frames:[
			['side_arm'+base+'_0'],
			['side_arm'+base+'_1'],
			['side_arm'+base+'_2'],
		]},
	};
};
const getFrontArm = (base)=>{//'front' is the right arm
	if(base == "1x"){
		return {
			up:{folder:'right_arms',frames:[
				['back_arm1_2x'],
				['back_arm1_0x'],
				['back_arm1_1x'],
			]},
			down:{folder:'right_arms',frames:[
				['forward_arm1_2x'],
				['forward_arm1_0x'],
				['forward_arm1_1x'],
			]},
			left:{folder:'right_arms',frames:[
				['side_arm1_2x'],
				['side_arm1_0x'],
				['side_arm1_1xg'],
			]},
		};
	}
	if(base == "2x"){
		return {
			up:{folder:'right_arms',frames:[
				['back_arm2_2x'],
				['back_arm2_0x'],
				['back_arm2_1x'],
			]},
			down:{folder:'right_arms',frames:[
				['forward_arm2_2x'],
				['forward_arm2_0x'],
				['forward_arm2_1x'],
			]},
			left:{folder:'right_arms',frames:[
				['side_arm2_2x'],
				['side_arm2_0x'],
				['side_arm2_1xg'],
			]},
		};
	}
	if(base == "2xF"){//female 2x does work given the name
		base='2x';
	}
	return {
		up:{folder:'right_arms',frames:[
			['back_arm'+base+'_2'],
			['back_arm'+base+'_0'],
			['back_arm'+base+'_1'],
		]},
		down:{folder:'right_arms',frames:[
			['forward_arm'+base+'_2'],
			['forward_arm'+base+'_0'],
			['forward_arm'+base+'_1'],
		]},
		left:{folder:'right_arms',frames:[
			['side_arm'+base+'_2'],
			['side_arm'+base+'_0'],
			['side_arm'+base+'_1'],
		]},
	};
};
const getEar = (base)=>{//'front' is the right arm
	if(base.indexOf('elf')>-1){
		return {
			folder:'head',
			up:{folder:'head',frames:[
				['elf_ears_back'],
			]},
			down:{folder:'head',frames:[
				['elf_ears_front'],
			]},
			left:{folder:'head',frames:[
				['elf_ears_side'],
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
		up:{folder:'head',frames:[['head_back']]},
		down:{folder:'head',frames:[['head_front']]},
		left:{folder:'head',frames:[['head_side']]},
	};
};
const getEyes = ()=>{
	return {
		up:{folder:'eyes',frames:[]},//obscured?
		down:{folder:'eyes',frames:[['eyes_forward_0','eyes_down_0']]},
		left:{folder:'eyes',frames:[['eyes_side_0']]},
	};
};
const getBaseHair = (base)=>{
	//TODO: are these supposed to be the same regardless of direction?
	//      it sits behind the face, so maybe?
	return {
		up:{folder:'hair_back',frames:[
			['hair_back_'+base+''],
		]},
		down:{folder:'hair_back',frames:[
			['hair_back_'+base+'a'],
		]},
		left:{folder:'hair_back',frames:[
			['hair_back_'+base+'a'],
		]},
	};
};
const getBackhairF = (base)=>{
	return {
		up:{folder:'hair_back',frames:[
			['hair_backhair_'+base+''],
		]},
		down:{folder:'hair_back',frames:[]},//obscured?
		left:{folder:'hair_back',frames:[
			['hair_backhair_'+base+'a'],
		]},
	};
};
const getBackhairM = (base)=>{
	//TODO: these don't see to match (at low res +helmet it probably doesn't matter)
	/*
		"hair_back_0":,
		"hair_back_4":,
		"hair_back_7":,
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
		down:{folder:'eyebrows',frames:[['eyebrows_forward_0']]},
		left:{folder:'eyebrows',frames:[['eyebrows_side_0']]},
	};
};
const getHairfront = (base)=>{
	return {
		up:{folder:'hair_front',frames:[['hair_front_'+base+'']]},
		down:{folder:'hair_front',frames:[]},
		left:{folder:'hair_front',frames:[['hair_front_'+base+'a']]},
	};
};
const getHeadgear = (base)=>{
	if(base=='2'){//only M has headgear 2, sprite does not exist. return hair instead
		return {
			up:{folder:'hair_back',frames:[['hair_back_3a']]},
			down:{folder:'hair_front',frames:[['hair_base_3']]},
			left:{folder:'left_hair',frames:[['left_hair_3a']]},
		};
	}
	return {
		up:{folder:'head_gear',frames:[['headgear_back_'+base+'']]},
		down:{folder:'head_gear',frames:[['headgear_front_'+base+'']]},
		left:{folder:'head_gear',frames:[['helmet_side_'+base+'']]},
	};
};
const getCape = (base)=>{
	return {
		up:{
			folder:'cape_back',
			frames:[
				['cape_back_'+base+"_0",'cape_front_'+base+"_0"],
				['cape_back_'+base+"_1",'cape_front_'+base+"_1"]
		]},
		down:{
			folder:'cape_front',
			frames:[
				['cape_back_'+base+"_0",'cape_front_'+base+"_0"],
				['cape_back_'+base+"_1",'cape_front_'+base+"_1"]
		]},
		left:{
			folder:'cape_side',
			frames:[
				['cape_back_'+base+"_0",'cape_right_'+base+"_0"],
				['cape_back_'+base+"_1",'cape_right_'+base+"_1"]
		]},
	};
};
const getFacehair = (base)=>{
	return {
		up:{folder:'facial_hair',frames:[['Facial_hair_back_'+base+'']]},
		down:{folder:'facial_hair',frames:[['Facial_hair_front_'+base+'']]},
		left:{folder:'facial_hair',frames:[['Facial_hair_side'+base+'']]},
	};
};
const getNecklace = (base)=>{
	return {
		up:{folder:'necklaces',frames:[['necklace_back_'+base+'']]},
		down:{folder:'necklaces',frames:[['necklace_front_'+base+'']]},
		left:{folder:'necklaces',frames:[['necklace_side_'+base+'']]},
	};
};
const getWingBack = (base)=>{
	return {
		up:{folder:'wings',frames:[['wings_back_'+base+'']]},
		down:{folder:'wings',frames:[['wings_front_'+base+'']]},
		left:{folder:'wings',frames:[['wings_side_'+base+'']]},
	};
};
const getWingFront = (base)=>{//TODO: flip the wing?
	return {
		up:{folder:'wings',frames:[['wings_back_'+base+'']]},
		down:{folder:'wings',frames:[['wings_front_'+base+'']]},
		left:{folder:'wings',frames:[['wings_side_'+base+'']]},
	};
};

//NOTE: legs are not included in the portrait.
//      assume they will match the arms
const getBackLeg = (base)=>{//'back' is the left leg
	return {
		up:{folder:'left_leg',frames:[
			['leg_back'+base+'_2'],
			['leg_back'+base+'_1'],
			['leg_back'+base+'_0'],
		]},
		down:{folder:'left_leg',frames:[
			['leg_front'+base+'_2'],
			['leg_front'+base+'_1'],
			['leg_front'+base+'_0'],
		]},
		left:{folder:'left_leg',frames:[
			['leg_side'+base+'_2'],
			['leg_side'+base+'_1'],
			['leg_side'+base+'_0'],
		]},
	};
};
const getFrontLeg = (base)=>{//'front' is the right leg
	return {
		up:{folder:'right_leg',frames:[
			['leg_back'+base+'_0'],
			['leg_back'+base+'_1'],
			['leg_back'+base+'_2'],
		]},
		down:{folder:'right_leg',frames:[
			['leg_front'+base+'_0'],
			['leg_front'+base+'_1'],
			['leg_front'+base+'_2'],
		]},
		left:{folder:'right_leg',frames:[
			['leg_side'+base+'_0'],
			['leg_side'+base+'_1'],
			['leg_side'+base+'_2'],
		]},
	};
};
const getLegCover = (base)=>{
	return {
		up:{folder:'leg_covers_back',frames:[
			['leg_covers'+base+'_0'],
			['leg_covers'+base+'_1'],
			['leg_covers'+base+'_2'],
		]},
		down:{folder:'leg_covers_front',frames:[
			['leg_covers'+base+'_0'],
			['leg_covers'+base+'_1'],
			['leg_covers'+base+'_2'],
		]},
		left:{folder:'leg_covers_side',frames:[
			['leg_covers'+base+'_0'],
			['leg_covers'+base+'_1'],
			['leg_covers'+base+'_2'],
		]},
	};
};


const portraitLookup = {
	male:{
		//torso
		"torso_2":getTorso('2'),
		"torso_2x":getTorso('2x'),
		"torso_1":getTorso('1'),
		"torso_3":getTorso('3'),
		"torso_3x":getTorso('3x'),
		"torso_4":getTorso('2'),
		"torso_4x":getTorso('4x'),
		"torso_5":getTorso('5'),
		"torso_5x":getTorso('5x'),
		"torso_6":getTorso('6'),
		"torso_7":getTorso('7'),
		"torso_8":getTorso('8'),
		"torso_9":getTorso('9'),
		"torso_9x":getTorso('9x'),
		"torso_10":getTorso('10'),
		"torso_11":getTorso('11'),
		"torso_0":getTorso('0'),
		
		//back arm
		"back_arm_2":getBackArm('2'),
		"back_arm_2x":getBackArm('2x'),
		"back_arm_1":getBackArm('1'),
		"back_arm_1x":getBackArm('1x'),
		"back_arm_3":getBackArm('3'),
		"back_arm_3x":getBackArm('3x'),
		"back_arm_4":getBackArm('4'),
		"back_arm_4x":getBackArm('4x'),
		"back_arm_5":getBackArm('5'),
		"back_arm_5x":getBackArm('5x'),
		"back_arm_6":getBackArm('6'),
		"back_arm_7":getBackArm('7'),
		"back_arm_7x":getBackArm('7x'),
		"back_arm_8":getBackArm('8'),
		"back_arm_8x":getBackArm('8x'),
		"back_arm_9":getBackArm('9'),
		"back_arm_9x":getBackArm('9x'),
		"back_arm_10":getBackArm('10'),
		"back_arm_11":getBackArm('11'),
		"back_arm_0":getBackArm('0'),
		
		//front_arm
		"front_arm_2":getFrontArm('2'),
		"front_arm_2x":getFrontArm('2x'),
		"front_arm_1":getFrontArm('1'),
		"front_arm_1x":getFrontArm('1x'),
		"front_arm_3":getFrontArm('3'),
		"front_arm_3x":getFrontArm('3x'),
		"front_arm_4":getFrontArm('4'),
		"front_arm_4x":getFrontArm('4x'),
		"front_arm_5":getFrontArm('5'),
		"front_arm_5x":getFrontArm('5x'),
		"front_arm_6":getFrontArm('6'),
		"front_arm_7":getFrontArm('7'),
		"front_arm_7x":getFrontArm('7x'),
		"front_arm_8":getFrontArm('8'),
		"front_arm_8x":getFrontArm('8x'),
		"front_arm_9":getFrontArm('9'),
		"front_arm_9x":getFrontArm('9x'),
		"front_arm_10":getFrontArm('10'),
		"front_arm_11":getFrontArm('11'),
		"front_arm_0":getFrontArm('0'),
		//leg
		"leg_2":getFrontLeg('2'),
		"leg_2x":getFrontLeg('2'),
		"leg_1":getFrontLeg('1'),
		"leg_1x":getFrontLeg('1x'),
		"leg_3":getFrontLeg('3'),
		"leg_3x":getFrontLeg('3'),
		"leg_4":getFrontLeg('4'),
		"leg_4x":getFrontLeg('4'),
		"leg_5":getFrontLeg('5'),
		"leg_5x":getFrontLeg('5'),
		"leg_6":getFrontLeg('6'),
		"leg_7":getFrontLeg('7'),
		"leg_7x":getFrontLeg('7'),
		"leg_8":getFrontLeg('8'),
		"leg_8x":getFrontLeg('8'),
		"leg_9":getFrontLeg('9'),
		"leg_9x":getFrontLeg('9'),
		"leg_10":getFrontLeg('10'),
		"leg_11":getFrontLeg('11'),
		"leg_0":getFrontLeg('0'),
		//leg
		"leg_back_2":getBackLeg('2'),
		"leg_back_2x":getBackLeg('2'),
		"leg_back_1":getBackLeg('1'),
		"leg_back_1x":getBackLeg('1x'),
		"leg_back_3":getBackLeg('3'),
		"leg_back_3x":getBackLeg('3'),
		"leg_back_4":getBackLeg('4'),
		"leg_back_4x":getBackLeg('4'),
		"leg_back_5":getBackLeg('5'),
		"leg_back_5x":getBackLeg('5'),
		"leg_back_6":getBackLeg('6'),
		"leg_back_7":getBackLeg('7'),
		"leg_back_7x":getBackLeg('7'),
		"leg_back_8":getBackLeg('8'),
		"leg_back_8x":getBackLeg('8'),
		"leg_back_9":getBackLeg('9'),
		"leg_back_9x":getBackLeg('9'),
		"leg_back_10":getBackLeg('10'),
		"leg_back_11":getBackLeg('11'),
		"leg_back_0":getBackLeg('0'),
		//leg cover
		"leg_cover_2":getLegCover('2'),
		"leg_cover_2x":getLegCover('2'),
		"leg_cover_1":getLegCover('1'),
		"leg_cover_1x":getLegCover('1x'),
		"leg_cover_3":getLegCover('3'),
		"leg_cover_3x":getLegCover('3'),
		"leg_cover_4":getLegCover('4'),
		"leg_cover_4x":getLegCover('4'),
		"leg_cover_5":getLegCover('5'),
		"leg_cover_5x":getLegCover('5'),
		"leg_cover_6":getLegCover('6'),
		"leg_cover_7":getLegCover('7'),
		"leg_cover_7x":getLegCover('7'),
		"leg_cover_8":getLegCover('8'),
		"leg_cover_8x":getLegCover('8'),
		"leg_cover_9":getLegCover('9'),
		"leg_cover_9x":getLegCover('9'),
		"leg_cover_10":getLegCover('10'),
		"leg_cover_11":getLegCover('11'),
		"leg_cover_0":getLegCover('0'),
		
		//ear
		"elf_ear_0":getEar('elf'),
		"front_ear_0":getEar(''),
		
		//head
		"head_0":getHead(),
		
		//eyes
		"eyes_0":getEyes(),
		
		//base_hair
		"base_hair_0":getBaseHair('0'),
		"base_hair_2":getBaseHair('2'),
		"base_hair_3":getBaseHair('3'),
		"base_hair_4":getBaseHair('4'),
		"base_hair_6":getBaseHair('6'),
		"base_hair_7":getBaseHair('7'),
		
		//back_hair
		"hair_back_0":getBackhairM('0'),
		"hair_back_4":getBackhairM('4'),
		"hair_back_7":getBackhairM('7'),
		
		//eyebrow
		"eyebrows_0":getEyebrows('0'),
		"eyebrows_1":getEyebrows('1'),
		"eyebrows_2":getEyebrows('2'),
		
		//front_hair (N/A)
		
		//headgear
		
		"headgear_0":getHeadgear('0'),
		"headgear_1":getHeadgear('1'),
		"headgear_2":getHeadgear('2'),
		"headgear_7":getHeadgear('7'),
		"headgear_8":getHeadgear('8'),
		"headgear_9":getHeadgear('9'),
		"headgear_10":getHeadgear('10'),
		"headgear_11":getHeadgear('11'),
		
		"cape_0_top":getCape('0'),
		"cape_3_top":getCape('3'),
		"facial_hair_0":getFacehair('0'),
		"facial_hair_2":getFacehair('2'),
		"necklace_0":getNecklace('0'),
		"necklace_1":getNecklace('1'),
		"wing_front_0":getWingFront('0'),
		"wing_front_1":getWingFront('1'),
		"wing_back_0":getWingBack('0'),
		"wing_back_1":getWingBack('1'),


		
	},
	female:{
		//torso
		"torso_2":getTorso('2'),
		"torso_2x":getTorso('2x'),
		"torso_1":getTorso('1'),
		"torso_3":getTorso('3'),
		"torso_4":getTorso('4'),
		"torso_4x":getTorso('4x'),
		"torso_5":getTorso('5'),
		"torso_6":getTorso('6'),
		"torso_7":getTorso('7'),
		"torso_7x":getTorso('7x'),
		"torso_8":getTorso('8'),
		"torso_8x":getTorso('8x'),
		"torso_9":getTorso('9'),
		"torso_10":getTorso('10'),
		"torso_10x":getTorso('10x'),
		"torso_11":getTorso('11'),
		"torso_11x":getTorso('11x'),
		"torso_12":getTorso('12'),
		"torso_0":getTorso('0'),
		
		//back_arm
		"back_arm_2":getBackArm('2'),
		"back_arm_2x":getBackArm('2xF'),
		"back_arm_1":getBackArm('1'),
		"back_arm_3":getBackArm('3'),
		"back_arm_4":getBackArm('4'),
		"back_arm_4x":getBackArm('4x'),
		"back_arm_5":getBackArm('5'),
		"back_arm_6":getBackArm('6'),
		"back_arm_7":getBackArm('7'),
		"back_arm_7x":getBackArm('7x'),
		"back_arm_8":getBackArm('8'),
		"back_arm_8x":getBackArm('8x'),
		"back_arm_9":getBackArm('9'),
		"back_arm_10":getBackArm('10'),
		"back_arm_10x":getBackArm('10x'),
		"back_arm_11":getBackArm('11'),
		"back_arm_11x":getBackArm('11x'),
		"back_arm_12":getBackArm('12'),
		"back_arm_0":getBackArm('0'),
		
		//front_arm
		"front_arm_2":getFrontArm('2'),
		"front_arm_2x":getFrontArm('2xF'),
		"front_arm_1":getFrontArm('1'),
		"front_arm_3":getFrontArm('3'),
		"front_arm_4":getFrontArm('4'),
		"front_arm_4x":getFrontArm('4x'),
		"front_arm_5":getFrontArm('5'),
		"front_arm_6":getFrontArm('6'),
		"front_arm_7":getFrontArm('7'),
		"front_arm_7x":getFrontArm('7x'),
		"front_arm_8":getFrontArm('8'),
		"front_arm_8x":getFrontArm('8x'),
		"front_arm_9":getFrontArm('9'),
		"front_arm_10":getFrontArm('10'),
		"front_arm_10x":getFrontArm('10x'),
		"front_arm_11":getFrontArm('11'),
		"front_arm_11x":getFrontArm('11x'),
		"front_arm_12":getFrontArm('12'),
		"front_arm_0":getFrontArm('0'),
		
		//leg
		"leg_2":getFrontLeg('2'),
		"leg_2x":getFrontLeg('2'),
		"leg_1":getFrontLeg('1'),
		"leg_3":getFrontLeg('3'),
		"leg_4":getFrontLeg('4'),
		"leg_4x":getFrontLeg('4'),
		"leg_5":getFrontLeg('5'),
		"leg_6":getFrontLeg('6'),
		"leg_7":getFrontLeg('7'),
		"leg_7x":getFrontLeg('7'),
		"leg_8":getFrontLeg('8'),
		"leg_8x":getFrontLeg('8'),
		"leg_9":getFrontLeg('9'),
		"leg_10":getFrontLeg('10'),
		"leg_10x":getFrontLeg('10'),
		"leg_11":getFrontLeg('11'),
		"leg_11x":getFrontLeg('11'),
		"leg_12":getFrontLeg('12'),
		"leg_0":getFrontLeg('0'),
		
		//leg
		"leg_back_2":getBackLeg('2'),
		"leg_back_2x":getBackLeg('2'),
		"leg_back_1":getBackLeg('1'),
		"leg_back_3":getBackLeg('3'),
		"leg_back_4":getBackLeg('4'),
		"leg_back_4x":getBackLeg('4'),
		"leg_back_5":getBackLeg('5'),
		"leg_back_6":getBackLeg('6'),
		"leg_back_7":getBackLeg('7'),
		"leg_back_7x":getBackLeg('7'),
		"leg_back_8":getBackLeg('8'),
		"leg_back_8x":getBackLeg('8'),
		"leg_back_9":getBackLeg('9'),
		"leg_back_10":getBackLeg('10'),
		"leg_back_10x":getBackLeg('10'),
		"leg_back_11":getBackLeg('11'),
		"leg_back_11x":getBackLeg('11'),
		"leg_back_12":getBackLeg('12'),
		"leg_back_0":getBackLeg('0'),
		//leg
		"leg_cover_2":getLegCover('2'),
		"leg_cover_2x":getLegCover('2'),
		"leg_cover_1":getLegCover('1'),
		"leg_cover_3":getLegCover('3'),
		"leg_cover_4":getLegCover('4'),
		"leg_cover_4x":getLegCover('4'),
		"leg_cover_5":getLegCover('5'),
		"leg_cover_6":getLegCover('6'),
		"leg_cover_7":getLegCover('7'),
		"leg_cover_7x":getLegCover('7'),
		"leg_cover_8":getLegCover('8'),
		"leg_cover_8x":getLegCover('8'),
		"leg_cover_9":getLegCover('9'),
		"leg_cover_10":getLegCover('10'),
		"leg_cover_10x":getLegCover('10'),
		"leg_cover_11":getLegCover('11'),
		"leg_cover_11x":getLegCover('11'),
		"leg_cover_12":getLegCover('12'),
		"leg_cover_0":getLegCover('0'),
		
		//ear
		"front_ear_0":getEar(''),
		"front_ear_1":getEar('elf'),
		
		//head
		"head_0":getHead(),
		
		//eyes
		"eyes_0":getEyes(),
		
		//base_hair
		"base_hair_for_helmets":getBaseHair('0'),
		
		//back_hair
		"backhair_0":getBackhairF('0'),
		"backhair_1":getBackhairF('1'),
		"backhair_5":getBackhairF('5'),
		"backhair_6":getBackhairF('6'),
		
		//eyebrows
		"eyebrows_0":getEyebrows('0'),
		"eyebrows_1":getEyebrows('1'),
		"eyebrows_2":getEyebrows('2'),
		
		//front_hair
		"front_hair_0":getHairfront('0'),
		"front_hair_1":getHairfront('1'),
		"front_hair_5":getHairfront('5'),
		
		//headgear
		"headgear_0":getHeadgear('0'),
		"headgear_1":getHeadgear('1'),
		"headgear_7":getHeadgear('7'),
		"headgear_8":getHeadgear('8'),
		"headgear_9":getHeadgear('9'),
		"headgear_11":getHeadgear('11'),
		"headgear_12":getHeadgear('12'),
		
		"cape_0_top":getCape('0'),
		"cape_3_top":getCape('3'),
		//"earrings_0":,//skip, probably too small to worry about
		//"earrings_1":,
		"necklace_0":getNecklace('0'),
		"necklace_1":getNecklace('1'),
		"wing_front_0":getWingFront('0'),
		"wing_front_1":getWingFront('1'),
		"wing_back_0":getWingBack('0'),
		"wing_back_1":getWingBack('1'),
		
	}
};
	
	
export {portraitLookup};