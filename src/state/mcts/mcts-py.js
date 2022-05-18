//https://github.com/jbradberry/mcts/blob/master/mcts/uct.py (MIT)


class Stats {
	constructor(value=0,visits=0){
		this.value = value;
		this.visits = visits;
	}
}

class UCT{
	constructor(board){
		this.board = board;
		this.history = [];
		this.stats = {};
		this.max_depth = 0;
		this.data = {};
		this.calculation_time = 1000;
		this.max_actions = 1000;
		
		// Exploration constant, increase for more exploratory actions,
		// decrease to prefer actions with known higher win rates.
		this.C = 1.4;
	}
	copyData(data){
		return JSON.parse(JSON.stringify(data));
	}
	update(state){
		this.history.push(this.board.to_compact_state(state));
	}
	display(state){
		//return this.board.display(state,action)
	}
	winner_message(winners){
		return "winner"+winners;//this.board.winner_massage(winners)
	}
	get_action(){
		//Causes the AI to calculate the best action from the
		//current game state and return it.
		
		this.max_depth = 0;
		this.data = {
			'C':this.C,
			'max_actions':this.max_actions,
			//'name':this.name//
		};
		//this.stats.clear()//
		let state = this.history[this.history.length-1];
		let player = this.board.current_player(state);
		let legal = this.board.legal_actions(state);
		
		//Bail out early if there is no real choice to be made.
		if(!legal){
            return {
				'type': 'action', 
				'message': null, 
				'extras': this.copyData(this.data)
			};
		}
        if(legal.length == 1){
            return {
                'type': 'action',
                'message': JSON.parse(JSON.stringify(legal[0])),
                'extras': this.copyData(this.data),
            };
		}
		
		let games = 0;
		
		let begin = performance.now();
		while(performance.now()-begin < this.calcaulation_time){
			this.run_simulation();
			games+=1;
		}
		
		//Display the number of calls of `run_simulation` and the
        //time elapsed.
		this.data.games = games;
		this.data.max_dpeth =this.max_depth;
		this.data.time = performance.now()-begin;
		console.log(this.data['games'],this.data['time']);
		console.log("Maximum depth searched:", this.max_depth);
		
		//Store and display the stats for each possible action.
		this.data['actions'] = this.calcaulate_action_values(this.history,player,legal);
		for(const m of this.data['actions']){
			console.log(this.action_template(m));//.format(**m))
		}
		
		//Return the action with the highest average value.
		
		return {
            'type': 'action',
            'message': JSON.parse(JSON.stringify(this.data['actions'][0]['action'])),
            'extras': this.copyData(this.data),
        };
	}
	
	run_simulation(){
		//Plays out a "random" game from the current position,
        //then updates the statistics tables with the result.

        //A bit of an optimization here, so we have a local
        //variable lookup instead of an attribute access each loop.
		
		let C = this.C;
		let stats = this.stats;
		
		let visited_states = [];
		let history_copy = [...this.history];//shallow copy of array
		let state = history_copy[history_copy.length-1];
		
		let expand = true;
		for(let t=1;t<this.max_actions+1;t+=1){
			let legal = this.board.legal_actions(state);
			let action_states = [];
			for(const a of legal){
				action_states.push([a,this.board.next_state(history_copy)];
			}
			////https://www.brython.info/tests/editor.html?lang=en
			if(expand && !()){
			}
			
		}
		
	}
	
	
}
