
import { ui_background } from '../ui/ui_background.mjs';

const ANIMATION = {
	MOVE:'MOVE',
	BATTLE:'BATTLE',
	TURN:'TURN',
};

//base class for drawing & computing interaction with them
class Animator{
	
	static #animations = [];
	
	static isRunning(){
		return  Animator.#animations.length > 0;
	}
	
	static draw(ctx){
		const animation = Animator.#animations[0];
		animation.duration +=1;
		//TODO: switch on animation.kind() and actually draw it
		ui_background.draw(ctx);
		if(animation.duration>=animation.totalDuration){
			Animator.#animations.splice(0,1);
		}
		console.log(animation);
	}
	
	
	static drawMovement(xy_from,xy_to){
		Animator.#animations.push({
			kind:ANIMATION.MOVE,
			data:{xy_from,xy_to},
			duration:0,
			totalDuration:33
		});
	}
	static drawBattle(ch, slectedTgt){
		Animator.#animations.push({
			kind:ANIMATION.BATTLE,
			data:{ch, slectedTgt},
			duration:0,
			totalDuration:33
		});
	}
	static drawTurnToggle(){
		Animator.#animations.push({
			kind:ANIMATION.TURN,
			data:{},
			duration:0,
			totalDuration:33
		});
	}
	
}


export {Animator};