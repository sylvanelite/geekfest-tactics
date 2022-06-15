//comment out all hair_ because it doesn't fit nicely with hats
const spriteTilePositions = {
	female:{
		down:{
			wings :{abs_x:62 ,abs_y:119 ,abs_scale_x:-1 ,z_index:1},
			//wings :{abs_x:-62 ,abs_y:120 ,z_index:2},
			cape_back:{abs_x:-64 ,abs_y:128 ,z_index:3},
			//hair_back :{abs_x:-64 ,abs_y:128 ,z_index:4},
			torso:{abs_x:-26 ,abs_y:83 ,z_index:5},//chest
			//torso :{abs_x:-26 ,abs_y:47 ,z_index:6},//pelvis
			left_leg :{abs_x:-31 ,abs_y:40 ,z_index:7},
			forward_arm_0 :{abs_x:-47 ,abs_y:88 ,z_index:8},
			left_arms :{abs_x:30 ,abs_y:40 ,abs_scale_x:-1 ,z_index:9},
			leg_covers_front :{abs_x:-33 ,abs_y:37 ,z_index:10},
			right_arms :{abs_x:47 ,abs_y:87 ,abs_scale_x:-1 ,z_index:11},
			necklaces :{abs_x:-39.5 ,abs_y:98 ,z_index:12},
			cape_front :{abs_x:-64 ,abs_y:128 ,z_index:13},
			head :{abs_x:-35 ,abs_y:126 ,z_index:16},
			//head :{abs_x:-35 ,abs_y:93 ,z_index:17},//elf ears
			earrings :{abs_x:-35 ,abs_y:107.5 ,z_index:18},
			eyes :{abs_x:-34 ,abs_y:126 ,z_index:20},
			eyebrows :{abs_x:-34 ,abs_y:126 ,z_index:21},
			////hair_back :{abs_x:-67 ,abs_y:125 ,z_index:22},
			//hair_front :{abs_x:-69 ,abs_y:124 ,z_index:23},
			head_gear :{abs_x:-64 ,abs_y:120.5 ,z_index:24},
		},
		left:{
			wings :{abs_x:59 ,abs_y:117 ,abs_scale_x:-1 ,z_index:2},
			left_leg :{abs_x:-34.5 ,abs_y:38 ,z_index:3},
			left_arms :{abs_x:1 ,abs_y:93.5 ,z_index:4},
			torso :{abs_x:-18 ,abs_y:81 ,z_index:5},//chest
			//torso :{abs_x:-12 ,abs_y:45.5 ,z_index:6},//pelvis
			necklaces :{abs_x:-38.5 ,abs_y:95 ,z_index:7},
			right_leg :{abs_x:-12 ,abs_y:37.5 ,z_index:8},
			leg_covers_side :{abs_x:-36 ,abs_y:41.5 ,z_index:9},
			cape_back :{abs_x:-5.5 ,abs_y:128 ,z_index:10},
			//hair_back :{abs_x:-10.5 ,abs_y:129 ,z_index:11},
			head :{abs_x:-26 ,abs_y:115 ,z_index:12},
			eyes :{abs_x:-26 ,abs_y:115 ,z_index:14},
			eyebrows :{abs_x:-26 ,abs_y:115 ,z_index:15},
			//left_//hair_0 :{abs_x:-62 ,abs_y:127 ,z_index:16},
			//hair_front :{abs_x:-58 ,abs_y:127 ,z_index:17},
			head_gear :{abs_x:-64 ,abs_y:125.5 ,z_index:18},
			//head :{abs_x:-5.5 ,abs_y:95.5 ,z_index:19},//elf ears
			earrings :{abs_x:-32 ,abs_y:107.5 ,z_index:20},
			//wings :{abs_x:57 ,abs_y:117 ,abs_scale_x:-1 ,z_index:21},
			cape_side :{abs_x:-64 ,abs_y:128 ,z_index:22},
			right_arms :{abs_x:-37 ,abs_y:82 ,z_index:23},
		},
		up:{
			//hair_front :{abs_x:-63 ,abs_y:124 ,z_index:3},
			left_arms :{abs_x:-47.5 ,abs_y:85.5 ,z_index:4},
			torso :{abs_x:-18 ,abs_y:80 ,z_index:5},//chest
			torso :{abs_x:-18 ,abs_y:42 ,z_index:6},//pelvis
			left_leg :{abs_x:-26.5 ,abs_y:40 ,z_index:7},
			right_arms :{abs_x:46 ,abs_y:83 ,abs_scale_x:-1 ,z_index:8},
			right_leg :{abs_x:35 ,abs_y:36.5 ,abs_scale_x:-1 ,z_index:9},
			leg_covers_back :{abs_x:-44 ,abs_y:42 ,z_index:10},
			necklaces :{abs_x:-39.5 ,abs_y:88 ,z_index:11},
			cape_back :{abs_x:-64 ,abs_y:128 ,z_index:12},
			cape_front :{abs_x:-64 ,abs_y:128 ,z_index:13},
			earrings :{abs_x:-34 ,abs_y:107.5 ,z_index:14},
			head :{abs_x:-33 ,abs_y:131 ,z_index:15},
			//hair_front :{abs_x:-63 ,abs_y:125 ,z_index:17},
			//hair_back :{abs_x:-62 ,abs_y:126 ,z_index:18},
			head_gear :{abs_x:-64 ,abs_y:124.5 ,z_index:19},
			//head :{abs_x:-33 ,abs_y:100.5 ,z_index:20},//elf_ears_back
			wings :{abs_x:-62 ,abs_y:120 ,z_index:21},
			//wings :{abs_x:62 ,abs_y:117 ,abs_scale_x:-1 ,z_index:22},
		},	 
	}, 
	male:{
		down:{
			wings :{abs_x:62 ,abs_y:125 ,abs_scale_x:-1 ,z_index:1},
			//wings :{abs_x:-62 ,abs_y:127 ,z_index:2},
			cape_back :{abs_x:-64 ,abs_y:128 ,z_index:3},
			//hair_back :{abs_x:-64 ,abs_y:128 ,z_index:4},
			torso :{abs_x:-26.407208 ,abs_y:86.33412 ,z_index:5},//chest
			//torso :{abs_x:-26 ,abs_y:50 ,z_index:6},//pelvis
			left_leg :{abs_x:-30 ,abs_y:40 ,z_index:7},
			left_arms :{abs_x:-47 ,abs_y:89 ,z_index:8},
			right_leg :{abs_x:30 ,abs_y:40 ,abs_scale_x:-1 ,z_index:9},
			leg_covers_front :{abs_x:-33 ,abs_y:40 ,z_index:10},
			right_arms :{abs_x:47 ,abs_y:89 ,abs_scale_x:-1 ,z_index:11},
			necklaces :{abs_x:-39.5 ,abs_y:98 ,z_index:12},
			cape_front :{abs_x:-64 ,abs_y:128 ,z_index:13},
			//forward_arm2_0_000 :{abs_x:-47 ,abs_y:89 ,z_index:14},
			//forward_arm2_2 :{abs_x:47 ,abs_y:89 ,abs_scale_x:-1 ,z_index:15},
			head :{abs_x:-34.407208 ,abs_y:129.33412 ,z_index:18},
			eyes :{abs_x:-34 ,abs_y:129 ,z_index:20},
			eyebrows :{abs_x:-34 ,abs_y:129 ,z_index:21},
			facial_hair :{abs_x:-40 ,abs_y:92 ,z_index:22},
			//hair_base :{abs_x:-66 ,abs_y:128 ,z_index:23},
			//head :{abs_x:-34 ,abs_y:101 ,z_index:24},//elf ears
			hair_front :{abs_x:-66 ,abs_y:128 ,z_index:25},
			head_gear :{abs_x:-64 ,abs_y:123.5 ,z_index:26},
		},
		left:{
			wings :{abs_x:59 ,abs_y:119 ,abs_scale_x:-1 ,z_index:2},
			left_leg :{abs_x:-34.5 ,abs_y:38 ,z_index:3},
			left_arms :{abs_x:-1 ,abs_y:91.5 ,z_index:4},
			torso :{abs_x:-21 ,abs_y:80 ,z_index:5},//chest
			//torso :{abs_x:-14 ,abs_y:45.5 ,z_index:6},//pelvis
			necklaces :{abs_x:-41.5 ,abs_y:94 ,z_index:7},
			right_leg :{abs_x:-13 ,abs_y:37.5 ,z_index:8},
			leg_covers_side :{abs_x:-36 ,abs_y:41.5 ,z_index:9},
			cape_back :{abs_x:-5.5 ,abs_y:128 ,z_index:10},
			//hair_back :{abs_x:-10.5 ,abs_y:128 ,z_index:11},
			head :{abs_x:-28 ,abs_y:116 ,z_index:12},
			eyes :{abs_x:-28 ,abs_y:116 ,z_index:14},
			eyebrows :{abs_x:-28 ,abs_y:116 ,z_index:15},
			facial_hair :{abs_x:-62 ,abs_y:92 ,z_index:16},
			left_hair:{abs_x:-64 ,abs_y:128 ,z_index:17},
			//left_front//hair_0_000 :{abs_x:-60 ,abs_y:128 ,z_index:18},
			head_gear :{abs_x:-64 ,abs_y:124.5 ,z_index:19},
			//head :{abs_x:-9.5 ,abs_y:94 ,z_index:20},//elf ears
			//wings :{abs_x:57 ,abs_y:119 ,abs_scale_x:-1 ,z_index:21},
			right_arms :{abs_x:-42 ,abs_y:80 ,z_index:22},
			cape_side :{abs_x:-63 ,abs_y:128 ,z_index:23},
			//side_arm2_0_000 :{abs_x:-42 ,abs_y:79 ,z_index:24},
		},
		up:{
			facial_hair :{abs_x:-40 ,abs_y:122 ,z_index:3},
			//hair_back :{abs_x:-64 ,abs_y:127 ,z_index:4},
			left_arms :{abs_x:-50.5 ,abs_y:89.5 ,z_index:5},
			torso :{abs_x:-18 ,abs_y:86 ,z_index:6},//chest
			//torso :{abs_x:-17.5 ,abs_y:44 ,z_index:7},//pelvis
			left_leg :{abs_x:-26.5 ,abs_y:40 ,z_index:8},
			right_arms :{abs_x:46 ,abs_y:87 ,abs_scale_x:-1 ,z_index:9},
			right_leg :{abs_x:35 ,abs_y:36.5 ,abs_scale_x:-1 ,z_index:10},
			leg_covers_side :{abs_x:-44 ,abs_y:42 ,z_index:11},
			necklaces :{abs_x:-39.5 ,abs_y:94 ,z_index:12},
			cape_back :{abs_x:-64 ,abs_y:128 ,z_index:13},
			cape_front :{abs_x:-64 ,abs_y:128 ,z_index:14},
			head :{abs_x:-34 ,abs_y:134 ,z_index:15},
			hair_back :{abs_x:-64 ,abs_y:128 ,z_index:17},
			//head :{abs_x:-34 ,abs_y:103 ,z_index:18},//elf_ears_back
			//hair_front :{abs_x:-64 ,abs_y:128 ,z_index:19},
			head_gear :{abs_x:-64 ,abs_y:124.5 ,z_index:20},
			wings :{abs_x:-62 ,abs_y:126 ,z_index:21},
			//wings :{abs_x:62 ,abs_y:124 ,abs_scale_x:-1 ,z_index:22},
		}
	}
};


export { spriteTilePositions};

