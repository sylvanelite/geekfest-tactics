import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { ui_background } from '../ui/ui_background.mjs';
import { Isometric } from "./isometric.mjs";

const ANIMATION = {
	MOVE:'MOVE',
	BATTLE:'BATTLE',
	TURN:'TURN',
	DIE:'DIE'
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
			case ANIMATION.DIE:
				Animator.draw_DieEffect(ctx,animation);
				break;
				console.log("unknown animation:",animation);
		}
		
		//check animation is done
		if(animation.duration>=animation.totalDuration){
			console.log('resolving',animation);
			animation.resolve();
			Animator.#animations.splice(0,1);
		}
	}
	
	static lerp(start, end, amount){
		return start*(1-amount)+end*amount;
	}
	
	static draw_Movement(ctx,animation){
		ui_background.drawTerrain(ctx);
		
		const lerpUnit = (ch)=>{
			//lerp to destination
			const [startx,starty] = Bit.GET_XY(animation.data.xy_from);
			const [endx,endy] = Bit.GET_XY(animation.data.xy_to);
			const duration = animation.duration/animation.totalDuration;
			const lerpx = Animator.lerp(startx,endx,duration);
			const lerpy = Animator.lerp(starty,endy,duration);
			let direction = (startx<endx?'right':'left');
			if(Math.abs(endy-starty)>Math.abs(endx-startx)){
				direction = (starty<endy?'down':'up');
			}
			const frameIdx = Math.floor(animation.duration/4)%3;
			
			ui_background.drawUnitAtPosition(ctx,ch,lerpx,lerpy,direction,frameIdx);
		};
		const isLerpUnit = (ch)=>{
			return (ch.point_xy == animation.data.xy_ch);
		};
		ui_background.drawUnits(ctx,isLerpUnit,lerpUnit);
		
	}
	static draw_Battle(ctx,animation){
		const initialIso = Isometric.SCALE;//test juice by scaling
		//TODO: apply panning, don't just zoom to the middle?
		const zoomAmount = 1.05;
		//zooming in (//TODO: easing?)
		if(animation.duration<animation.totalDuration/6){
			const lerpPercent = (animation.duration)/(animation.totalDuration/6);
			const lerpAmount = Animator.lerp(initialIso,initialIso*zoomAmount,lerpPercent);
			Isometric.setScale(lerpAmount);
		}
		//zooming out
		if(animation.duration>animation.totalDuration*(5/6)){
			const lerpPercent = (animation.duration-animation.totalDuration*(5/6))/(animation.totalDuration/6);
			const lerpAmount = Animator.lerp(initialIso*zoomAmount,initialIso,lerpPercent);
			Isometric.setScale(lerpAmount);
		}
		//zoomed
		if(animation.duration>=animation.totalDuration/6&&
			animation.duration<=animation.totalDuration*(5/6)){
			Isometric.setScale(initialIso*zoomAmount);
		}
		
		ui_background.drawTerrain(ctx);
		
		const lerpUnit = (ch)=>{
			//lerp to destination
			const [startx,starty] = Bit.GET_XY(ch.point_xy);
			const [endx,endy] = Bit.GET_XY(animation.data.tgtCh.point_xy);
			const duration = (animation.duration-(animation.totalDuration*(2/6)))/(animation.totalDuration*(4/6));
			const lerpx = Animator.lerp(startx,endx,duration);
			const lerpy = Animator.lerp(starty,endy,duration);
			ui_background.drawUnitAtPosition(ctx,ch,lerpx,lerpy);
		};
		//TODO: could also reset player 'hasMoved' state
		//don't do animation until after zoom is fully in
		//need to render defending unit if it's damage has already been calced
		const [dx,dy] = Bit.GET_XY(animation.data.tgtCh.point_xy);
		const defUnit = Sy_api.api_getCharacterAtPosition(dx,dy);
		const defState = defUnit.player_state;
		defUnit.player_state = animation.data.targetStats.player_state;
		const isLerpUnit = (ch)=>{
			if(!(animation.duration>=animation.totalDuration*(2/6)&&
			animation.duration<=animation.totalDuration*(4/6))){
				return false;
			}
			
			return (ch.point_xy == animation.data.ch.point_xy);
		};
		ui_background.drawUnits(ctx,isLerpUnit,lerpUnit);
		defUnit.player_state = defState;
		if((animation.duration>=animation.totalDuration*(2/6)&&
			animation.duration<=animation.totalDuration*(4/6))){
			const [tgtx,tgty] = Bit.GET_XY(animation.data.tgtCh.point_xy);
			ui_background.drawBattleHitEffect(ctx,tgtx,tgty,animation.data.ch.atk,(animation.duration-animation.totalDuration*(2/6))%16);
		}
		
		Isometric.setScale(initialIso);
	}
	static draw_ToggleTurn(ctx,animation){
		ui_background.drawTerrain(ctx);
		ui_background.drawUnits(ctx);
		const curTurn = Sy_api.api_getCurrentPlayerState()
		ui_background.drawToggleTurnEffect(ctx,curTurn,animation.duration);
	}
	static draw_DieEffect(ctx,animation){
		ui_background.drawTerrain(ctx);
		ui_background.drawUnits(ctx);
		ui_background.drawBattleDieEffect(ctx,animation.data.x,animation.data.y,animation.duration);
	}
	
	static #enqueuPromiseAnimation(animation){
		const promise = new Promise((res,rej)=>{
			animation.resolve = res;
		});
		Animator.#animations.push(animation);
		return promise;
	}
	
	static enqueue_drawMovement(xy_ch,xy_from,xy_to){
		//calc movement speed, it will be lerped based on duration
		const [startx,starty] = Bit.GET_XY(xy_from);
		const [endx,endy] = Bit.GET_XY(xy_to);
		const distance = Math.abs(endx-startx)+Math.abs(endy-starty);
		const moveSpeed = distance*15;
		const animation={
			kind:ANIMATION.MOVE,
			data:{xy_ch,xy_from,xy_to},
			duration:0,
			totalDuration:moveSpeed
		};
		return Animator.#enqueuPromiseAnimation(animation);
	}
	static enqueue_drawBattle(ch, tgtCh){
		//copy intial values of the target so that they can rendered as-is
		const targetStats = {
			player_state:tgtCh.player_state
		};
		const animation={
			kind:ANIMATION.BATTLE,
			data:{ch, tgtCh, targetStats},
			duration:0,
			totalDuration:33
		};
		return Animator.#enqueuPromiseAnimation(animation);
	}
	static enqueue_drawTurnToggle(){
		const done = new Promise((res)=>{res();});
		const animation={
			kind:ANIMATION.TURN,
			data:{},
			duration:0,
			totalDuration:33
		};
		return Animator.#enqueuPromiseAnimation(animation);
	}
	
	//internal, as part of battle
	static enqueue_dieEffect(x,y){
		const done = new Promise((res)=>{res();});
		const animation={
			kind:ANIMATION.DIE,
			data:{x,y},
			duration:0,
			totalDuration:16
		};
		return Animator.#enqueuPromiseAnimation(animation);
	}
}


export {Animator};