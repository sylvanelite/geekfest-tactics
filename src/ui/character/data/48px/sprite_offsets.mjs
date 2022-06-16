
const spriteTilePositions = {
	/*M:
	                    <object_ref id=16 name=Facial_hair_side_0_000 folder=15 file=1 abs_x=-22.5 abs_y=34.5 abs_angle=0 abs_scale_x=1 abs_scale_y=1 abs_a=1 timeline=15 key=0 z_index=16/>
                    <object_ref id=3 name=Facial_hair_back_0_000 folder=15 file=2 abs_x=-13.5 abs_y=42.5 abs_angle=0 abs_scale_x=1 abs_scale_y=1 abs_a=1 timeline=15 key=0 z_index=3/>
                    <object_ref id=22 name=Facial_hair_front_0_000 folder=15 file=0 abs_x=-13.5 abs_y=32.5 abs_angle=0 abs_scale_x=1 abs_scale_y=1 abs_a=1 timeline=16 key=0 z_index=22/>
*/

left:{
	//folder name: {file_name?}
  //torso  :{abs_x:20 , abs_y:41  , abs_scale_x:-1, z_index:2},
  left_armss :{abs_x:-0 , abs_y:32 , z_index:4},
  right_armss :{abs_x:-13 , abs_y:28.5 , z_index:22},
  //torso :{abs_x:-4 , abs_y:16 , z_index:6},//pelvis
  ear :{abs_x:-3 , abs_y:36 , z_index:19},
  head :{abs_x:-9 , abs_y:40.5 , z_index:12},
  eyes :{abs_x:-10 , abs_y:41.5 , z_index:14},
  
  hair_back :{abs_x:-4 , abs_y:45 , z_index:11},
  //hair_back :{abs_x:-22 , abs_y:44 , z_index:16},//backhair
  hair_front :{abs_x:-21 , abs_y:45 , z_index:17},
  eyebrows :{abs_x:-10 , abs_y:41.5 , z_index:15},
  head_gear :{abs_x:-22 , abs_y:44 , z_index:18},
  
  wings :{abs_x:20 , abs_y:41  , abs_scale_x:-1, z_index:21},
  right_leg :{abs_x:-10 , abs_y:13 , z_index:3},
  torso :{abs_x:-6.5 , abs_y:29.5 , z_index:5},
  necklaces :{abs_x:-13.5 , abs_y:33.5 , z_index:7},
  right_leg :{abs_x:-4 , abs_y:13.5 , z_index:8},
  leg_covers :{abs_x:-12 , abs_y:15 , z_index:9},
  cape_back :{abs_x:-2 , abs_y:45 , z_index:10},
  earrings :{abs_x:-14 , abs_y:39 , z_index:20},
  cape_side :{abs_x:-22 , abs_y:45 , z_index:23},
},
up:{

  left_leg :{abs_x:12 , abs_y:13.5  , abs_scale_x:-1, z_index:3},
  left_arms :{abs_x:-16 , abs_y:29.5 , z_index:4},
  hair_front:{abs_x:-22 , abs_y:43.5 , z_index:5},
  torso :{abs_x:-6 , abs_y:30.5 , z_index:6},
  //torso:{abs_x:-6 , abs_y:16.5 , z_index:7},//pelvis
  right_leg :{abs_x:-7 , abs_y:14 , z_index:8},
  right_arms :{abs_x:16 , abs_y:30.5  , abs_scale_x:-1, z_index:9},
  leg_covers :{abs_x:-15 , abs_y:14 , z_index:10},
  necklaces :{abs_x:-13.5 , abs_y:31.5 , z_index:11},
  cape_back :{abs_x:-22 , abs_y:45 , z_index:12},
  cape_front :{abs_x:-22 , abs_y:45 , z_index:13},
  earrings :{abs_x:-12 , abs_y:38 , z_index:14},
  head :{abs_x:-11.5 , abs_y:45 , z_index:15},
  hair_back :{abs_x:-22 , abs_y:44 , z_index:17},
  //hair_back :{abs_x:-21 , abs_y:44 , z_index:18},//backhair
  head_gear :{abs_x:-22 , abs_y:44 , z_index:19},
  ear :{abs_x:-11 , abs_y:37 , z_index:20},
  wings :{abs_x:-21 , abs_y:42 , z_index:21},
  //wings :{abs_x:21 , abs_y:41  , abs_scale_x:-1, z_index:22},
},
down:{
  //wings :{abs_x:21 , abs_y:41  , abs_scale_x:-1, z_index:1},
  wings :{abs_x:-21 , abs_y:42 , z_index:2},
  cape_back :{abs_x:-22 , abs_y:45 , z_index:3},
  left_leg :{abs_x:10 , abs_y:14  , abs_scale_x:-1, z_index:4},
  hair_back :{abs_x:-22 , abs_y:44 , z_index:5},
  torso :{abs_x:-9 , abs_y:30 , z_index:6},
  //torso :{abs_x:-9 , abs_y:17 , z_index:7},//pelvis
  right_leg :{abs_x:-9 , abs_y:14 , z_index:8},
  left_arms :{abs_x:-15 , abs_y:30.5 , z_index:9},
  leg_covers :{abs_x:-10 , abs_y:13.5 , z_index:10},
  right_arms :{abs_x:16 , abs_y:31.5  , abs_scale_x:-1, z_index:11},
  necklaces :{abs_x:-13.5 , abs_y:34.5 , z_index:12},
  cape_front :{abs_x:-22 , abs_y:44 , z_index:13},
  head :{abs_x:-11.5 , abs_y:44 , z_index:16},
  ears:{abs_x:-11 , abs_y:36 , z_index:17},
  earrings :{abs_x:-12 , abs_y:39 , z_index:18},
  eyes :{abs_x:-11.5 , abs_y:44 , z_index:20},
  eyebrows :{abs_x:-11.5 , abs_y:44 , z_index:21},
  hair_base :{abs_x:-23 , abs_y:44.5 , z_index:22},
  hair_front:{abs_x:-23 , abs_y:44.5 , z_index:23},
  head_gear :{abs_x:-22 , abs_y:43 , z_index:24},
}
};

export { spriteTilePositions};

