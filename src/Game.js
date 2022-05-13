//https://boardgame.io/documentation/#/
import { INVALID_MOVE } from 'boardgame.io/core';


const PhaseMoves = {
	endPhase: (G, ctx)=>{
		ctx.events.endPhase();
	},
	done: (G,ctx)=> {
		Script.actionDone(G);
	}
};
const Turn = {
	onBegin:(G,ctx)=>{
		
	}
};
const GlobalMoves = {
	
};

const GameState = {
 // seed:42,
  setup: () => {
	  return { 
	  };
  },
  turn: {
	onBegin:Turn.onBegin,
	stages:{
		main:{
			moves:{}
		},
		combat:{
			moves:{}
		},
		
	},
  },
  
  phases:{
	loading:{
		moves:{endPhase:PhaseMoves.endPhase},
		start:true,
		next:'playing',
		//custom empty turn so that the initial game state does not trigger until out of this stage
		turn: {
			stages:{},
		},
	},
	playing:{}//the actual game begins here, no specification on move/turn drops back to global definitions above
  },
  
  
  moves: GlobalMoves
};





export { GameState };

