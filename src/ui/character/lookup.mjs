

//convert a portrait sprite, to a 48px map sprite
const portraitLookup = {
	male:{
		//torso
		
		"torso_2.png":{side:[],up:[],down:[]},
		"torso_2x.png":{side:[],up:[],down:[]},
		"torso_1.png":{side:[],up:[],down:[]},
		"torso_3.png":{side:[],up:[],down:[]},
		"torso_3x.png":{side:[],up:[],down:[]},
		"torso_4.png":{side:[],up:[],down:[]},
		"torso_4x.png":{side:[],up:[],down:[]},
		"torso_5.png":{side:[],up:[],down:[]},
		"torso_5x.png":{side:[],up:[],down:[]},
		"torso_6.png":{side:[],up:[],down:[]},
		"torso_7.png":{side:[],up:[],down:[]},
		"torso_8.png":{side:[],up:[],down:[]},
		"torso_9.png":{side:[],up:[],down:[]},
		"torso_9x.png":{side:[],up:[],down:[]},
		"torso_10.png":{side:[],up:[],down:[]},
		"torso_11.png":{side:[],up:[],down:[]},
		"torso_0.png":{side:[],up:[],down:[]},
		
		//back arm
		"back_arm_2.png":{side:[],up:[],down:[]},
		"back_arm_2x.png":{side:[],up:[],down:[]},
		"back_arm_1.png":{side:[],up:[],down:[]},
		"back_arm_1x.png":{side:[],up:[],down:[]},
		"back_arm_3.png":{side:[],up:[],down:[]},
		"back_arm_3x.png":{side:[],up:[],down:[]},
		"back_arm_4.png":{side:[],up:[],down:[]},
		"back_arm_4x.png":{side:[],up:[],down:[]},
		"back_arm_5.png":{side:[],up:[],down:[]},
		"back_arm_5x.png":{side:[],up:[],down:[]},
		"back_arm_6.png":{side:[],up:[],down:[]},
		"back_arm_7.png":{side:[],up:[],down:[]},
		"back_arm_7x.png":{side:[],up:[],down:[]},
		"back_arm_8.png":{side:[],up:[],down:[]},
		"back_arm_8x.png":{side:[],up:[],down:[]},
		"back_arm_9.png":{side:[],up:[],down:[]},
		"back_arm_9x.png":{side:[],up:[],down:[]},
		"back_arm_10.png":{side:[],up:[],down:[]},
		"back_arm_11.png":{side:[],up:[],down:[]},
		"back_arm_0.png":{side:[],up:[],down:[]},
		
		//front_arm
		"front_arm_2.png":{side:[],up:[],down:[]},
		"front_arm_2x.png":{side:[],up:[],down:[]},
		"front_arm_1.png":{side:[],up:[],down:[]},
		"front_arm_1x.png":{side:[],up:[],down:[]},
		"front_arm_3.png":{side:[],up:[],down:[]},
		"front_arm_3x.png":{side:[],up:[],down:[]},
		"front_arm_4.png":{side:[],up:[],down:[]},
		"front_arm_4x.png":{side:[],up:[],down:[]},
		"front_arm_5.png":{side:[],up:[],down:[]},
		"front_arm_5x.png":{side:[],up:[],down:[]},
		"front_arm_6.png":{side:[],up:[],down:[]},
		"front_arm_7.png":{side:[],up:[],down:[]},
		"front_arm_7x.png":{side:[],up:[],down:[]},
		"front_arm_8.png":{side:[],up:[],down:[]},
		"front_arm_8x.png":{side:[],up:[],down:[]},
		"front_arm_9.png":{side:[],up:[],down:[]},
		"front_arm_9x.png":{side:[],up:[],down:[]},
		"front_arm_10.png":{side:[],up:[],down:[]},
		"front_arm_11.png":{side:[],up:[],down:[]},
		"front_arm_0.png":{side:[],up:[],down:[]},
		
		//ear
		"elf_ear_0.png":{side:[],up:[],down:[]},
		"front_ear_0.png":{side:[],up:[],down:[]},
		
		//head
		"head_0.png":{side:[],up:[],down:[]},
		
		//eyes
		"eyes_0.png":{side:[],up:[],down:[]},
		
		//base_hair
		"base_hair_0.png":{side:[],up:[],down:[]},
		"base_hair_2.png":{side:[],up:[],down:[]},
		"base_hair_3.png":{side:[],up:[],down:[]},
		"base_hair_4.png":{side:[],up:[],down:[]},
		"base_hair_6.png":{side:[],up:[],down:[]},
		"base_hair_7.png":{side:[],up:[],down:[]},
		
		//back_hair
		"hair_back_0.png":{side:[],up:[],down:[]},
		"hair_back_4.png":{side:[],up:[],down:[]},
		"hair_back_7.png":{side:[],up:[],down:[]},
		
		//eyebrow
		"eyebrows_0.png":{side:[],up:[],down:[]},
		"eyebrows_1.png":{side:[],up:[],down:[]},
		"eyebrows_2.png":{side:[],up:[],down:[]},
		
		//front_hair (N/A)
		
		//headgear
		
		"headgear_0.png":{side:[],up:[],down:[]},
		"headgear_1.png":{side:[],up:[],down:[]},
		"headgear_2.png":{side:[],up:[],down:[]},
		"headgear_7.png":{side:[],up:[],down:[]},
		"headgear_8.png":{side:[],up:[],down:[]},
		"headgear_9.png":{side:[],up:[],down:[]},
		"headgear_10.png":{side:[],up:[],down:[]},
		"headgear_11.png":{side:[],up:[],down:[]},
		
		"cape_0_top.png":{side:[],up:[],down:[]},
		"cape_3_top.png":{side:[],up:[],down:[]},
		"facial_hair_0.png":{side:[],up:[],down:[]},
		"facial_hair_2.png":{side:[],up:[],down:[]},
		"necklace_1.png":{side:[],up:[],down:[]},
		"necklace_0.png":{side:[],up:[],down:[]},
		"cape_0_top_back.png":{side:[],up:[],down:[]},
		"cape_back_patch.png":{side:[],up:[],down:[]},
		"cape_back_0.png":{side:[],up:[],down:[]},
		"cape_back_3.png":{side:[],up:[],down:[]},
		"wing_front_0.png":{side:[],up:[],down:[]},
		"wing_front_1.png":{side:[],up:[],down:[]},
		"wing_back_0.png":{side:[],up:[],down:[]},
		"wing_back_1.png":{side:[],up:[],down:[]},
		"cape_3_top_back.png":{side:[],up:[],down:[]},


		
	},
	female:{
		//torso
		"torso_2.png":{side:[],up:[],down:[]},
		"torso_2x.png":{side:[],up:[],down:[]},
		"torso_1.png":{side:[],up:[],down:[]},
		"torso_3.png":{side:[],up:[],down:[]},
		"torso_4.png":{side:[],up:[],down:[]},
		"torso_4x.png":{side:[],up:[],down:[]},
		"torso_5.png":{side:[],up:[],down:[]},
		"torso_6.png":{side:[],up:[],down:[]},
		"torso_7.png":{side:[],up:[],down:[]},
		"torso_7x.png":{side:[],up:[],down:[]},
		"torso_8.png":{side:[],up:[],down:[]},
		"torso_8x.png":{side:[],up:[],down:[]},
		"torso_9.png":{side:[],up:[],down:[]},
		"torso_10.png":{side:[],up:[],down:[]},
		"torso_10x.png":{side:[],up:[],down:[]},
		"torso_11.png":{side:[],up:[],down:[]},
		"torso_11x.png":{side:[],up:[],down:[]},
		"torso_12.png":{side:[],up:[],down:[]},
		"torso_0.png":{side:[],up:[],down:[]},
		
		//back_arm
		"back_arm_2.png":{side:[],up:[],down:[]},
		"back_arm_2x.png":{side:[],up:[],down:[]},
		"back_arm_1.png":{side:[],up:[],down:[]},
		"back_arm_3.png":{side:[],up:[],down:[]},
		"back_arm_4.png":{side:[],up:[],down:[]},
		"back_arm_4x.png":{side:[],up:[],down:[]},
		"back_arm_5.png":{side:[],up:[],down:[]},
		"back_arm_6.png":{side:[],up:[],down:[]},
		"back_arm_7.png":{side:[],up:[],down:[]},
		"back_arm_7x.png":{side:[],up:[],down:[]},
		"back_arm_8.png":{side:[],up:[],down:[]},
		"back_arm_8x.png":{side:[],up:[],down:[]},
		"back_arm_9.png":{side:[],up:[],down:[]},
		"back_arm_10.png":{side:[],up:[],down:[]},
		"back_arm_10x.png":{side:[],up:[],down:[]},
		"back_arm_11.png":{side:[],up:[],down:[]},
		"back_arm_11x.png":{side:[],up:[],down:[]},
		"back_arm_12.png":{side:[],up:[],down:[]},
		"back_arm_0.png":{side:[],up:[],down:[]},
		
		//front_arm
		"front_arm_2.png":{side:[],up:[],down:[]},
		"front_arm_2x.png":{side:[],up:[],down:[]},
		"front_arm_1.png":{side:[],up:[],down:[]},
		"front_arm_3.png":{side:[],up:[],down:[]},
		"front_arm_4.png":{side:[],up:[],down:[]},
		"front_arm_4x.png":{side:[],up:[],down:[]},
		"front_arm_5.png":{side:[],up:[],down:[]},
		"front_arm_6.png":{side:[],up:[],down:[]},
		"front_arm_7.png":{side:[],up:[],down:[]},
		"front_arm_7x.png":{side:[],up:[],down:[]},
		"front_arm_8.png":{side:[],up:[],down:[]},
		"front_arm_8x.png":{side:[],up:[],down:[]},
		"front_arm_9.png":{side:[],up:[],down:[]},
		"front_arm_10.png":{side:[],up:[],down:[]},
		"front_arm_10x.png":{side:[],up:[],down:[]},
		"front_arm_11.png":{side:[],up:[],down:[]},
		"front_arm_11x.png":{side:[],up:[],down:[]},
		"front_arm_12.png":{side:[],up:[],down:[]},
		"front_arm_0.png":{side:[],up:[],down:[]},
		
		//ear
		"front_ear_0.png":{side:[],up:[],down:[]},
		"front_ear_1.png":{side:[],up:[],down:[]},
		
		//head
		"head_0.png":{side:[],up:[],down:[]},
		
		//eyes
		"eyes_0.png":{side:[],up:[],down:[]},
		
		//base_hair
		"base_hair_for_helmets.png":{side:[],up:[],down:[]},
		
		//back_hair
		"backhair_0.png":{side:[],up:[],down:[]},
		"backhair_1.png":{side:[],up:[],down:[]},
		"backhair_5.png":{side:[],up:[],down:[]},
		"backhair_6.png":{side:[],up:[],down:[]},
		
		//eyebrows
		"eyebrows_0.png":{side:[],up:[],down:[]},
		"eyebrows_1.png":{side:[],up:[],down:[]},
		"eyebrows_2.png":{side:[],up:[],down:[]},
		
		//front_hair
		"front_hair_0.png":{side:[],up:[],down:[]},
		"front_hair_1.png":{side:[],up:[],down:[]},
		"front_hair_5.png":{side:[],up:[],down:[]},
		
		//headgear
		"headgear_0.png":{side:[],up:[],down:[]},
		"headgear_1.png":{side:[],up:[],down:[]},
		"headgear_7.png":{side:[],up:[],down:[]},
		"headgear_8.png":{side:[],up:[],down:[]},
		"headgear_9.png":{side:[],up:[],down:[]},
		"headgear_11.png":{side:[],up:[],down:[]},
		"headgear_12.png":{side:[],up:[],down:[]},
		
		"cape_0_top.png":{side:[],up:[],down:[]},
		"cape_3_top.png":{side:[],up:[],down:[]},
		"earrings_0.png":{side:[],up:[],down:[]},
		"earrings_1.png":{side:[],up:[],down:[]},
		"necklace_1.png":{side:[],up:[],down:[]},
		"necklace_0.png":{side:[],up:[],down:[]},
		"cape_0_top_back.png":{side:[],up:[],down:[]},
		"cape_back_patch.png":{side:[],up:[],down:[]},
		"cape_back_0.png":{side:[],up:[],down:[]},
		"cape_back_3.png":{side:[],up:[],down:[]},
		"wing_back_0.png":{side:[],up:[],down:[]},
		"wing_back_1.png":{side:[],up:[],down:[]},
		"wing_front_0.png":{side:[],up:[],down:[]},
		"wing_front_1.png":{side:[],up:[],down:[]},
		"cape_3_top_back.png":{side:[],up:[],down:[]},
		
	}
};
	
	
	