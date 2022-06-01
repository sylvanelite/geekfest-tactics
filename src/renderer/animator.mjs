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
	
	static lerp(start, end, amount){
		return start*(1-amount)+end*amount;
	}
	
	static draw_Movement(ctx,animation){
		ui_background.drawTerrain(ctx);
		
		const chs = Sy_api.api_get_allCharacters();
		//TODO: factor in distance to lerp amount (|xfom-xto|+|yfrom-yto|)
		const lerpUnit = (ch)=>{
			//lerp to destination
			const [startx,starty] = Bit.GET_XY(animation.data.xy_from);
			const [endx,endy] = Bit.GET_XY(animation.data.xy_to);
			const duration = animation.duration/animation.totalDuration;
			const lerpx = Animator.lerp(startx,endx,duration);
			const lerpy = Animator.lerp(starty,endy,duration);
			ui_background.drawUnitAtPosition(ctx,ch,lerpx,lerpy);
		};
		for(const ch of chs){
			if(ch.point_xy == animation.data.xy_to){
				lerpUnit(ch);
			}else{
				ui_background.drawUnit(ctx,ch);
			}
		}
		
	}
	static draw_Battle(ctx,animation){
		ui_background.drawTerrain(ctx);
		const lerpUnit = (ch)=>{
			//lerp to destination
			const [startx,starty] = Bit.GET_XY(ch.point_xy);
			const [endx,endy] = Bit.GET_XY(animation.data.tgtCh.point_xy);
			const duration = animation.duration/animation.totalDuration;
			const lerpx = Animator.lerp(startx,endx,duration);
			const lerpy = Animator.lerp(starty,endy,duration);
			console.log(ch);
			ui_background.drawUnitAtPosition(ctx,ch,lerpx,lerpy);
		};
		//TODO: could also reset player 'hasMoved' state
		//NOTE: if this is the last unit in a turn to attack, the turn would have already toggled
		
		//need to render defending unit if it's damage has already been calced
		const [dx,dy] = Bit.GET_XY(animation.data.tgtCh.point_xy);
		const defUnit = Sy_api.api_getCharacterAtPosition(dx,dy);
		const defState = defUnit.player_state;
		defUnit.player_state = animation.data.targetStats.player_state;
		const chs = Sy_api.api_get_allCharacters();
		for(const ch of chs){
			if(ch.point_xy == animation.data.ch.point_xy){
				lerpUnit(ch);
			}else{
				ui_background.drawUnit(ctx,ch);
			}
		}
		defUnit.player_state = defState;
	}
	static draw_ToggleTurn(ctx,animation){
		ui_background.drawTerrain(ctx);
		ui_background.drawUnits(ctx);
	}
	
	static enqueue_drawMovement(xy_from,xy_to){
		//TODO: generate movement path?
		//calc movement speed, it will be lerped based on duration
		const [startx,starty] = Bit.GET_XY(xy_from);
		const [endx,endy] = Bit.GET_XY(xy_to);
		const distance = Math.abs(endx-startx)+Math.abs(endy-starty);
		const moveSpeed = distance*4;
		
		Animator.#animations.push({
			kind:ANIMATION.MOVE,
			data:{xy_from,xy_to},
			duration:0,
			totalDuration:moveSpeed
		});
	}
	static enqueue_drawBattle(ch, tgtCh){
		//copy intial values of the target so that they can rendered as-is
		const targetStats = {
			player_state:tgtCh.player_state
		};
		Animator.#animations.push({
			kind:ANIMATION.BATTLE,
			data:{ch, tgtCh, targetStats},
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