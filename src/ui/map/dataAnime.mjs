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


const anime_multi_data = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,3), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,4), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,5), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
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

const anime_1 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,2), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,3), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,4), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,5), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:2,min_range:1,max_range:1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,
			1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,3 ,1 ,1 ,1 ,1 ,3 ,3 ,3 ,
			1 ,1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tf     ],[tf     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const anime_2 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(8,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:1,mov:3,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,2), player_state: cbt_ENEMY, 
		hp:2,max_hp:2,atk:1,mov:3,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,3), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:3,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(7,4), player_state: cbt_ENEMY,  
		hp:2,max_hp:2,atk:1,mov:3,min_range:1,max_range:1
		}),
		new st_Character({ point_xy: Bit.SET_XY(8,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:1,mov:3,min_range:1,max_range:1
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,99,1 ,1 ,1 ,99,1 ,1 ,
			1 ,1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,
			1 ,1 ,99,1 ,1 ,1 ,99,1 ,1 ,
			1 ,1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,99,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const anime_3 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(4,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(5,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(4,4), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(5,2), player_state: cbt_ENEMY,  
		hp:4,max_hp:4,atk:3,mov:3,min_range:1,max_range:2
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,3 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,3 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,3 ,3 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,99,99,99,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tg     ],[tg     ],[tf     ],[tf     ],[tb     ],[tb     ],[tb     ],[tg     ],[tg     ],
			[tg     ],[tb     ],[tb     ],[tf     ],[tf     ],[tb     ],[tb     ],[tg     ],[tg     ],
			[tg     ],[tb     ],[tb     ],[tf     ],[tf     ],[tf     ],[tb     ],[tg     ],[tg     ],
			[tg     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tg     ],
			[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tg     ],
			[tb     ],[tb     ],[tb     ],[ts     ],[ts     ],[ts     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const anime_4 = {
	script:null,
	units:[
		new st_Character({ point_xy: Bit.SET_XY(0,1), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,2), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(2,3), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(0,4), player_state: cbt_PLAYER,  }),
		new st_Character({ point_xy: Bit.SET_XY(1,5), player_state: cbt_PLAYER,  }),
		//---
		new st_Character({ point_xy: Bit.SET_XY(7,1), player_state: cbt_ENEMY, 
		hp:4,max_hp:2,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,2), player_state: cbt_ENEMY, 
		hp:4,max_hp:2,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(5,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:2,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(6,3), player_state: cbt_ENEMY,  
		hp:4,max_hp:2,atk:1,mov:3,min_range:1,max_range:2
		}),
		new st_Character({ point_xy: Bit.SET_XY(5,5), player_state: cbt_ENEMY,  
		hp:4,max_hp:2,atk:1,mov:3,min_range:1,max_range:2
		})
		],
	terrain:{
			width:9,
			height:6,
			fogEnabled:false,
			terrain:[
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,3 ,1 ,1 ,1 ,99,1 ,
			1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,
			1 ,1 ,1 ,1 ,3 ,1 ,1 ,1 ,1 ,
			1 ,99,1 ,1 ,1 ,1 ,3 ,3 ,3 ,
			1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
			]
		},
	display:{
		scale:1,
		terrain:[
			[tg     ],[tb     ],[tb     ],[tf     ],[tb     ],[tg     ],[tb     ],[tb     ],[tb     ],
			[tg     ],[tg     ],[tb     ],[tf     ],[tb     ],[tb     ],[tg     ],[tl     ],[tb     ],
			[tg     ],[td     ],[tg     ],[tb     ],[tf     ],[tg     ],[tb     ],[td     ],[td     ],
			[tb     ],[tb     ],[tg     ],[tg     ],[tf     ],[tg     ],[tb     ],[td     ],[tb     ],
			[tb     ],[tl     ],[tb     ],[tb     ],[tb     ],[tb     ],[tf     ],[tf     ],[tf     ],
			[tb     ],[tb     ],[td     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],[tb     ],
		]
	}
};
const anime_5 = anime_multi_data;

const anime_data = [anime_1,anime_2,anime_3,anime_4,anime_5];

export { anime_multi_data,anime_data };