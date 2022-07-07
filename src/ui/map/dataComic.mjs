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


const comic_multi_data = {
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
			width:18,
			height:12,
			fogEnabled:true,
			terrain:[
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:0.5,
		terrain:[
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
			[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],
		]
	}
};

const comic_1 = {
	script:[
			`{
				"text":"This is the Comic zone!",
				"speech":"talk",
				"left":"chA",
				"right":"chB",
				"talk":"left"
			}`,
			`{
				"text":"we can read books here",
				"speech":"talk",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"It looks like there's a queue",
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
				"text":"... I just wanted to read a book",
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
		new st_Character({ point_xy: Bit.SET_XY(8,0), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:3,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,3), player_state: cbt_ENEMY,  
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
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,3 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,3 ,
			1 ,1 ,3 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tf     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],
			[tb     ],[tb     ],[tf     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const comic_2 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_gender:'female',
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
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:-1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,1 ,99,99,1 ,1 ,
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,99,99,99,1 ,1 ,
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,99,1 ,99,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tl     ],[tl     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tl     ],[tl     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tl     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const comic_3 = {
	
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(5,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(5,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(5,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(4,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(6,3), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(1,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,4), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(1,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,99,99,99,99,99,99,1 ,
			1 ,1 ,1 ,1 ,99,99,99,1 ,1 ,
			1 ,3 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,3 ,1 ,3 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,99,99,99,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tl     ],[tl     ],[tl     ],[tl     ],[tl     ],[tl     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tl     ],[tl     ],[tb     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tf     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tl     ],[tl     ],[tb     ],[tb     ],
		]
	}
};
const comic_4 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(3,0), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,4), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(5,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_gender:'female',
		sprite_a_wing:1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,99,1 ,99,1 ,1 ,1 ,1 ,
			1 ,1 ,99,1 ,99,1 ,1 ,3 ,1 ,
			1 ,1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,
			1 ,3 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,
			1 ,99,1 ,1 ,1 ,1 ,1 ,3 ,1 ,
			1 ,99,1 ,1 ,1 ,3 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tl     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tl     ],[tb     ],[tl     ],[tb     ],[tb     ],[tf     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],
			[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const comic_5 = {
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

const comic_data = [comic_1,comic_2,comic_3,comic_4,comic_5];

export { comic_multi_data,comic_data };