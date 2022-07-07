import { TERRAIN } from "../terrain/terrain.js";
import { Bit } from "../../state/bit.mjs";
import { st_Character, cbt_ENEMY,cbt_PLAYER } from "../../state/consts.mjs";

const tw = TERRAIN.WATER;
const tb = TERRAIN.BRICK;
const tl = TERRAIN.LAVA;
const tf = TERRAIN.FOLIAGE;
const tg = TERRAIN.GRASS;
const ts = TERRAIN.STONE;
const ta = TERRAIN.SAND;//sAnd
const to = TERRAIN.WOOD;//wOod
const td = TERRAIN.DIRT;


const game_multi_data = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:5,max_hp:5,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY, 
		hp:5,max_hp:5,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,3), player_state: cbt_ENEMY, 
		hp:5,max_hp:5,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,4), player_state: cbt_ENEMY,
		hp:5,max_hp:5,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,5), player_state: cbt_ENEMY,
		hp:5,max_hp:5,atk:3,mov:3,min_range:1,max_range:2
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
		]
	}
};

const game_1 = {
	script:[
			`{
				"text":"This is the Game area!",
				"speech":"talk",
				"left":"chA",
				"right":"chB",
				"talk":"left"
			}`,
			`{
				"text":"Black and white...",
				"speech":"talk",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"... is it a Game Boy?",
				"speech":"talk",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"Another group of Cosplayers",
				"speech":"exclaim",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"We must battle!",
				"speech":"exclaim",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"... what is this, Pokemon?",
				"speech":"think",
				"left":"chA",
				"right":"chB",
				"talk":"left"
			}`
			],
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,3), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,4), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,5), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,99,1 ,1 ,1 ,99,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,99,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,99,1 ,1 ,
			1 ,1 ,1 ,99,1 ,1 ,99,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tg     ],[tl     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tg     ],[tl     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tg     ],[tl     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tg     ],[tl     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const game_2 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(3,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(3,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(3,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(4,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(3,3), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,99,1 ,1 ,1 ,1 ,1 ,99,1 ,
			1 ,1 ,3 ,1 ,1 ,1 ,3 ,1 ,1 ,
			1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,3 ,1 ,3 ,1 ,3 ,1 ,1 ,
			1 ,99,1 ,1 ,1 ,1 ,1 ,99,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],
			[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tf     ],[tb     ],[tf     ],[tb     ],[tf     ],[tb     ],[tb     ],
			[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],
		]
	}
};
const game_3 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,4), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,3 ,1 ,1 ,1 ,1 ,3 ,1 ,
			1 ,1 ,3 ,1 ,3 ,3 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,
			1 ,1 ,3 ,1 ,3 ,3 ,1 ,1 ,1 ,
			1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tf     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tf     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const game_4 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,1), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:1,mov:3,min_range:1,max_range:2
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,
			1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,3 ,
			1 ,1 ,1 ,99,99,99,1 ,1 ,1 ,
			1 ,1 ,1 ,99,99,99,1 ,1 ,1 ,
			1 ,1 ,1 ,99,99,99,1 ,3 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[ta     ],[ta     ],[ta     ],[ta     ],[tf     ],[ta     ],[ta     ],[ta     ],[ta     ],
			[ta     ],[tf     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[tf     ],
			[ta     ],[ta     ],[tl     ],[tl     ],[tl     ],[ta     ],[ta     ],[ta     ],[ta     ],
			[tg     ],[ta     ],[tl     ],[tl     ],[tl     ],[ta     ],[ta     ],[ta     ],[ta     ],
			[tg     ],[tg     ],[tl     ],[tl     ],[tl     ],[ta     ],[ta     ],[tf     ],[ta     ],
			[tg     ],[tg     ],[tg     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],
		]
	}
};
const game_5 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,0), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,0), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(6,3), player_state: cbt_ENEMY, 
		hp:6,max_hp:6,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(5,4), player_state: cbt_ENEMY, 
		hp:6,max_hp:6,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,5), player_state: cbt_ENEMY,  
		hp:6,max_hp:6,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,3), player_state: cbt_ENEMY,  
		hp:6,max_hp:6,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,5), player_state: cbt_ENEMY,  
		hp:6,max_hp:6,atk:3,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,1 ,1 ,3 ,1 ,3 ,1 ,
			1 ,1 ,99,1 ,99,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,99,1 ,1 ,1 ,3 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,3 ,1 ,1 ,3 ,1 ,
			1 ,1 ,1 ,3 ,3 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tg     ],[tg     ],[tg     ],[ta     ],[ta     ],[tf     ],[tg     ],[tf     ],[tg     ],
			[tg     ],[tw     ],[ta     ],[ta     ],[tw     ],[ta     ],[tg     ],[tg     ],[tg     ],
			[tg     ],[ta     ],[ta     ],[tw     ],[ta     ],[ta     ],[tg     ],[tf     ],[tg     ],
			[ta     ],[ta     ],[tw     ],[ta     ],[ta     ],[tg     ],[tg     ],[tg     ],[tg     ],
			[ta     ],[ta     ],[ta     ],[tf     ],[tf     ],[tg     ],[tg     ],[tf     ],[tg     ],
			[ta     ],[ta     ],[ta     ],[tf     ],[tf     ],[tg     ],[tg     ],[tg     ],[tg     ],
		]
	}
};

const game_data = [game_1,game_2,game_3,game_4,game_5];

export { game_multi_data,game_data };