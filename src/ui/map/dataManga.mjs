import { TERRAIN } from "../terrain/terrain.js";
import { Bit } from "../../state/bit.mjs";
import { st_Character, cbt_ENEMY,cbt_PLAYER } from "../../state/consts.mjs";

const tw = TERRAIN.WATER;
const tb = TERRAIN.BRICK;
const tl = TERRAIN.LAVA;

const manga_multi_data = {
	script:null,
	units:[
		new st_Character({
			player_state: cbt_PLAYER,
			point_xy: Bit.SET_XY(1,0),
		}),
		new st_Character({
			player_state: cbt_PLAYER,
			point_xy: Bit.SET_XY(1,2),
		}),
		new st_Character({
			player_state: cbt_PLAYER,
			point_xy: Bit.SET_XY(3,4),
		}),
		new st_Character({
			player_state: cbt_PLAYER,
			point_xy: Bit.SET_XY(3,3),
		}),
		new st_Character({
			player_state: cbt_PLAYER,
			point_xy: Bit.SET_XY(2,1),
		}),
		//---
		new st_Character({
			player_state: cbt_ENEMY,
			point_xy: Bit.SET_XY(1,4),
			max_range:1,
			mov:10
		}),
		new st_Character({
			player_state: cbt_ENEMY,
			point_xy: Bit.SET_XY(8,5)
		}),
		new st_Character({
			player_state: cbt_ENEMY,
			point_xy: Bit.SET_XY(8,0)
		}),
		new st_Character({
			player_state: cbt_ENEMY,
			point_xy: Bit.SET_XY(8,1)
		}),
		new st_Character({
			player_state: cbt_ENEMY,
			point_xy: Bit.SET_XY(8,2)
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			99,1 ,1 ,2 ,1 ,4 ,1 ,1 ,1 ,
			99,1 ,99,2 ,5 ,1 ,1 ,1 ,1 ,
			99,1 ,1 ,2 ,1 ,3 ,1 ,1 ,1 ,
			99,1 ,99,1 ,1 ,1 ,1 ,1 ,1 ,
			99,1 ,99,1 ,1 ,1 ,1 ,1 ,99,
			99,1 ,99,1 ,1 ,1 ,1 ,99,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tw     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tw     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tw     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tw     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tw     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],
			[tw     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],
		]
	}
};

const manga_1 = manga_multi_data;
const manga_2 = manga_multi_data;
const manga_3 = manga_multi_data;
const manga_4 = manga_multi_data;
const manga_5 = manga_multi_data;

const manga_data = [manga_1,manga_2,manga_3,manga_4,manga_5];

export { manga_multi_data,manga_data };