//comment out all hair_ because it doesn't fit nicely with hats
const spriteTilePositions = {
	female:{
		down:{
			wings :{abs_x:62 ,abs_y:119 ,abs_scale_x:-1 ,z_index:1},
			//wings :{abs_x:-62 ,abs_y:120 ,z_index:2},
			cape_back:{abs_x:-64 ,abs_y:128 ,z_index:3},
			//hair_back :{abs_x:-64 ,abs_y:128 ,z_index:4},
			torso:{abs_x:-26 ,abs_y:83 ,z_index:5},//chest
			pelvis :{abs_x:-26 ,abs_y:47 ,z_index:6},//pelvis
			left_leg :{abs_x:-31 ,abs_y:40 ,z_index:7},
			left_arms :{abs_x:-47 ,abs_y:88 ,z_index:8},
			right_leg :{abs_x:30 ,abs_y:40 ,abs_scale_x:-1 ,z_index:9},
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
			left_leg :{abs_x:-24 ,abs_y:38 ,z_index:3},//{abs_x:-34.5 ,abs_y:38 ,z_index:3},
			left_arms :{abs_x:-37 ,abs_y:82 ,z_index:4},//{abs_x:1 ,abs_y:93.5 ,z_index:4},
			torso :{abs_x:-18 ,abs_y:81 ,z_index:5},//chest
			pelvis :{abs_x:-12 ,abs_y:45.5 ,z_index:6},//pelvis
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
			right_leg :{abs_x:-26.5 ,abs_y:40 ,z_index:7},
			right_arms :{abs_x:47.5 ,abs_y:85.5 ,abs_scale_x:-1 ,z_index:8},//{abs_x:46 ,abs_y:83 ,abs_scale_x:-1 ,z_index:8},
			left_leg :{abs_x:26.5 ,abs_y:40 ,z_index:9,abs_scale_x:-1},//{abs_x:35 ,abs_y:36.5 ,abs_scale_x:-1 ,z_index:9},
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
			pelvis :{abs_x:-26 ,abs_y:50 ,z_index:6},//pelvis
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
			left_leg :{abs_x:-24 ,abs_y:38 ,z_index:3},//{abs_x:-34.5 ,abs_y:38 ,z_index:3},
			left_arms :{abs_x:-42 ,abs_y:80 ,z_index:4},//{abs_x:-1 ,abs_y:91.5 ,z_index:4},
			torso :{abs_x:-21 ,abs_y:80 ,z_index:5},//chest
			pelvis :{abs_x:-14 ,abs_y:45.5 ,z_index:6},//pelvis
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
			pelvis :{abs_x:-17.5 ,abs_y:44 ,z_index:7},//pelvis
			left_leg :{abs_x:-26.5 ,abs_y:40 ,z_index:8},
			right_arms :{abs_x:50.5 ,abs_y:89.5 ,abs_scale_x:-1 ,z_index:9},//{abs_x:46 ,abs_y:87 ,abs_scale_x:-1 ,z_index:9},
			right_leg :{abs_x:26.5 ,abs_y:40 ,z_index:10,abs_scale_x:-1},//{abs_x:35 ,abs_y:36.5 ,abs_scale_x:-1 ,z_index:10},
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
			
			/*
<object_ref id="0" name="128x128_001" folder="21" file="0" abs_x="-64" abs_y="128" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="16" key="0" z_index="0"/>
<object_ref id="1" name="l_back_shield0_0" folder="24" file="6" abs_x="10" abs_y="86" abs_angle="0" abs_scale_x="-1" abs_scale_y="1" abs_a="1" timeline="20" key="0" z_index="1"/>
<object_ref id="2" name="r_back_shield0_2" folder="24" file="9" abs_x="3" abs_y="74" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="24" key="0" z_index="2"/>
<object_ref id="3" name="Facial_hair_back_0_000" folder="15" file="2" abs_x="-40" abs_y="122" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="15" key="0" z_index="3"/>
<object_ref id="4" name="hair_front_0_001" folder="7" file="4" abs_x="-64" abs_y="127" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="10" key="0" z_index="4"/>
<object_ref id="5" name="back_arm_0" folder="4" file="3" abs_x="-50.5" abs_y="89.5" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="2" key="0" z_index="5"/>
<object_ref id="6" name="chest_back_0_000" folder="2" file="2" abs_x="-18" abs_y="86" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="0" key="0" z_index="6"/>
<object_ref id="7" name="pelvis_back_0_000" folder="2" file="3" abs_x="-17.5" abs_y="44" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="1" key="0" z_index="7"/>
<object_ref id="8" name="leg_back_0" folder="3" file="3" abs_x="-26.5" abs_y="40" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="3" key="0" z_index="8"/>
<object_ref id="9" name="back_arm_0_000" folder="5" file="5" abs_x="46" abs_y="87" abs_angle="0" abs_scale_x="-1" abs_scale_y="1" abs_a="1" timeline="4" key="0" z_index="9"/>
<object_ref id="10" name="leg_back_0_000" folder="6" file="4" abs_x="35" abs_y="36.5" abs_angle="0" abs_scale_x="-1" abs_scale_y="1" abs_a="1" timeline="5" key="0" z_index="10"/>
<object_ref id="11" name="leg_covers0_0_001" folder="18" file="0" abs_x="-44" abs_y="42" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="11" key="0" z_index="11"/>
<object_ref id="12" name="necklace_back_0_000" folder="11" file="2" abs_x="-39.5" abs_y="94" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="14" key="0" z_index="12"/>
<object_ref id="13" name="cape_back0_0_002" folder="19" file="3" abs_x="-64" abs_y="128" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="13" key="0" z_index="13"/>
<object_ref id="14" name="cape_front0_0_001" folder="19" file="0" abs_x="-64" abs_y="128" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="12" key="0" z_index="14"/>
<object_ref id="15" name="head_back_000" folder="0" file="1" abs_x="-34" abs_y="134" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="6" key="0" z_index="15"/>
<object_ref id="16" name="scar_back_0" folder="20" file="0" abs_x="-34" abs_y="134" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="17" key="0" z_index="16"/>
<object_ref id="17" name="hair_back_0_001" folder="7" file="0" abs_x="-64" abs_y="128" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="7" key="0" z_index="17"/>
<object_ref id="18" name="elf_ears_back" folder="0" file="3" abs_x="-34" abs_y="103" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="28" key="0" z_index="18"/>
<object_ref id="19" name="hair_backhair_0_000" folder="7" file="2" abs_x="-64" abs_y="128" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="8" key="0" z_index="19"/>
<object_ref id="20" name="headgear_back_0_000" folder="17" file="2" abs_x="-64" abs_y="124.5" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="9" key="0" z_index="20"/>
<object_ref id="21" name="wings_back_0_000" folder="22" file="0" abs_x="-62" abs_y="126" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="18" key="0" z_index="21"/>
<object_ref id="22" name="wings_back_0_001" folder="22" file="0" abs_x="62" abs_y="124" abs_angle="0" abs_scale_x="-1" abs_scale_y="1" abs_a="1" timeline="19" key="0" z_index="22"/>
               
			*/
		}
	}
};


export { spriteTilePositions};

