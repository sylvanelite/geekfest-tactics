import { TERRAIN } from "../terrain/terrain.js";
import { Bit } from "../../state/bit.mjs";
import { st_Character, cbt_ENEMY,cbt_PLAYER } from "../../state/consts.mjs";

const comic_multi_data = {
	script:null,
	units:[
		new st_Character({
			player_state: cbt_PLAYER,
			point_xy: Bit.SET_XY(3,4),
			mov:10
		}),
		new st_Character({
			player_state: cbt_PLAYER,
			point_xy: Bit.SET_XY(2,2),
			mov:4
		}),
		new st_Character({
			player_state: cbt_ENEMY,
			point_xy: Bit.SET_XY(1,4),
			max_range:1,
			mov:10
		}),
		new st_Character({
			player_state: cbt_ENEMY,
			point_xy: Bit.SET_XY(8,5),
			max_range:2
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,2 ,1 ,4 ,1 ,1 ,1 ,
			99,1 ,99,2 ,5 ,1 ,1 ,1 ,1 ,
			99,1 ,1 ,2 ,1 ,3 ,1 ,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,1 ,1 ,99,
			1 ,1 ,99,1 ,1 ,1 ,1 ,99,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
			[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
			[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
			[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
			[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
			[12     ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],[1      ],
		]
	}
};

const comic_1 = comic_multi_data;
const comic_2 = comic_multi_data;
const comic_3 = comic_multi_data;
const comic_4 = comic_multi_data;
const comic_5 = comic_multi_data;

const comic_data = [comic_1,comic_2,comic_3,comic_4,comic_5];

export { comic_multi_data,comic_data };