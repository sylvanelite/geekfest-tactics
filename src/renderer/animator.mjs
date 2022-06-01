import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
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
		// switch on animation.kind and perform drawing
		ui_background.drawTerrain(ctx);
		switch(animation.kind){
			case ANIMATION.MOVE:
				Animator.draw_Movement(ctx,animation);
				break;
			case ANIMATION.BATTLE:
				Animator.draw_Battle(ctx,animation);
				break;
			case ANIMATION.TURN:
				Animator.draw_ToggleTurn(ctx,animation);
				break;
			default:
				console.log("unknown animation:",animation);
		}
		
		//check animation is done
		if(animation.duration>=animation.totalDuration){
			Animator.#animations.splice(0,1);
		}
	}
	
	static draw_Movement(ctx,animation){
		ui_background.drawTerrain(ctx);
		
		const lerp = (start, end, amount) => {
			return start*(1-amount)+end*amount;
		};
		const chs = Sy_api.api_get_allCharacters();
		//TODO: factor in distance to lerp amount (|xfom-xto|+|yfrom-yto|)
		const lerpUnit = (ch)=>{
			//lerp to destination
			const [startx,starty] = Bit.GET_XY(animation.data.xy_from);
			const [endx,endy] = Bit.GET_XY(animation.data.xy_to);
			const duration = animation.duration/animation.totalDuration;
			const lerpx = lerp(startx,endx,duration);
			const lerpy = lerp(starty,endy,duration);
			ui_background.drawUnitAtPosition(ctx,ch,lerpx,lerpy);
		};
		for(const ch of chs){
			if(ch.point_xy != animation.data.xy_to){
				ui_background.drawUnit(ctx,ch);
			}else{
				lerpUnit(ch);
			}
		}
		
	}
	static draw_Battle(ctx,animation){
		ui_background.drawTerrain(ctx);
	}
	static draw_ToggleTurn(ctx,animation){
		ui_background.drawTerrain(ctx);
	}
	
	static enqueue_drawMovement(xy_from,xy_to){
		//TODO: generate movement path?
		Animator.#animations.push({
			kind:ANIMATION.MOVE,
			data:{xy_from,xy_to},
			duration:0,
			totalDuration:33
		});
	}
	static enqueue_drawBattle(ch, slectedTgt){
		Animator.#animations.push({
			kind:ANIMATION.BATTLE,
			data:{ch, slectedTgt},
			duration:0,
			totalDuration:33
		});
	}
	static enqueue_drawTurnToggle(){
		Animator.#animations.push({
			kind:ANIMATION.TURN,
			data:{},
			duration:0,
			totalDuration:33
		});
	}
	
}


export {Animator};