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



const manga_multi_data = {
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

const manga_1 = {
	script:[
			`{
				"text":"This is the Manga Zone!",
				"speech":"talk",
				"left":"chB",
				"right":"chA",
				"talk":"left"
			}`,
			`{
				"text":"Why are you backwards?",
				"speech":"talk",
				"left":"chB",
				"right":"chA",
				"talk":"right"
			}`,
			`{
				"text":"Manga reads right to left!",
				"speech":"exclaim",
				"left":"chA",
				"right":"chB",
				"talk":"right"
			}`,
			`{
				"text":"...But we can just turn around",
				"speech":"think",
				"left":"chA",
				"right":"chB",
				"talk":"left"
			}`,
			`{
				"text":"Another group of Cosplayers",
				"speech":"exclaim",
				"left":"chB",
				"right":"chA",
				"talk":"right"
			}`,
			`{
				"text":"We must battle!",
				"speech":"exclaim",
				"left":"chB",
				"right":"chA",
				"talk":"right"
			}`
			],
	units:[
		new st_Character({ point_xy: Bit.SET_XY(1,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(2,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(2,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,3), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(6,0), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:3,mov:3,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:3,mov:3,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,3), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:3,mov:4,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,4), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:3,mov:3,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,5), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:3,mov:4,min_range:1,max_range:1,
		sprite_a_wing:-1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,99,99,
			1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,99,99,
			]
		},
	display:{
		scale:1,
		terrain:[
			[ts     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[ts     ],[ts     ],
			[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[ts     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[ts     ],[ts     ],
		]
	}
};

const manga_2 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(5,1), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:2,mov:3,min_range:1,max_range:2,
		sprite_a_wing:-1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(4,5), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:2,mov:3,min_range:1,max_range:2,
		sprite_a_wing:-1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,2), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:2,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,3), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:2,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,4), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:2,mov:2,min_range:1,max_range:1,
		sprite_a_wing:-1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,99,99,99,99,99,99,
			1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,99,
			1 ,1 ,1 ,99,99,1 ,1 ,1 ,99,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,99,
			1 ,1 ,1 ,99,99,1 ,1 ,1 ,99,
			1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,99,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tb     ],[ts     ],[ts     ],[ts     ],[ts     ],[ts     ],[ts     ],
			[tb     ],[tb     ],[tb     ],[ts     ],[tb     ],[tb     ],[tb     ],[tb     ],[ts     ],
			[tb     ],[tb     ],[tb     ],[ts     ],[ts     ],[tb     ],[tb     ],[tb     ],[ts     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[ts     ],
			[tb     ],[tb     ],[tb     ],[ts     ],[ts     ],[tb     ],[tb     ],[tb     ],[ts     ],
			[tb     ],[tb     ],[tb     ],[ts     ],[tb     ],[tb     ],[tb     ],[tb     ],[ts     ],
		]
	}
};
const manga_3 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(4,0), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_a_wing:-1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:1,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:1,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,4), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:1,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(4,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:2,min_range:1,max_range:2,
		sprite_a_wing:-1,
		sprite_gender:'female'
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,3 ,1 ,1 ,1 ,1 ,3 ,1 ,1 ,
			1 ,1 ,99,99,99,99,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,99,99,99,99,3 ,1 ,1 ,
			1 ,99,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[ts     ],[ts     ],[ts     ],[ts     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[ts     ],[ts     ],[ts     ],[ts     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[ts     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const manga_4 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,0), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,0), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(6,3), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:2,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(5,4), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:2,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:2,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:2,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:2,mov:3,min_range:1,max_range:2,
		sprite_a_wing:1,
		sprite_gender:'female'
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tg     ],[tg     ],[tg     ],[ta     ],[ta     ],[tf     ],[ta     ],[ta     ],[ta     ],
			[tg     ],[tg     ],[ta     ],[ta     ],[ts     ],[ta     ],[ta     ],[ta     ],[ta     ],
			[tg     ],[ta     ],[ta     ],[ts     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],
			[ta     ],[ta     ],[ts     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],
			[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],
			[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],[ta     ],
		]
	}
};
const manga_5 = {
	script:[
			`{
				"text":"This is it!!",
				"speech":"talk",
				"left":"chB",
				"right":"chA",
				"talk":"left"
			}`,
			`{
				"text":"The final battle!",
				"speech":"talk",
				"left":"chB",
				"right":"chA",
				"talk":"left"
			}`,
			`{
				"text":"At least for this area!",
				"speech":"think",
				"left":"chB",
				"right":"chA",
				"talk":"right"
			}`
			],
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
		new st_Character({ point_xy: Bit.SET_XY(7,3), player_state: cbt_ENEMY,  
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
			[tg     ],[tg     ],[tw     ],[ta     ],[tw     ],[ta     ],[tg     ],[tg     ],[tg     ],
			[tg     ],[ta     ],[ta     ],[tw     ],[ta     ],[ta     ],[tg     ],[tf     ],[tg     ],
			[ta     ],[ta     ],[tw     ],[ta     ],[ta     ],[tg     ],[tg     ],[tg     ],[tg     ],
			[ta     ],[ta     ],[ta     ],[tf     ],[tf     ],[tg     ],[tg     ],[tf     ],[tg     ],
			[ta     ],[ta     ],[ta     ],[tf     ],[tf     ],[tg     ],[tg     ],[tg     ],[tg     ],
		]
	}
};

const manga_data = [manga_1,manga_2,manga_3,manga_4,manga_5];

export { manga_multi_data,manga_data };