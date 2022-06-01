import React, {useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { DebugContainer } from  './debug/container.js';

import { Canvas } from  './components/canvas.js';
import { GameState,GAME_STATE } from './Game.js';
import { Renderer } from './renderer/renderer.js';
import { Animator } from './renderer/animator.js';

import { ui_idle } from './ui/ui_idle.js';
import { ui_displayMove } from './ui/ui_displayMove.js';
import { ui_selectTarget } from './ui/ui_selectTarget.js';

import { Sy_api } from './state/api.js';
import { Sy } from './state/main.js';

//https://www.gamedeveloper.com/programming/making-a-game-boy-game-in-2017-a-quot-sheep-it-up-quot-post-mortem-part-1-2-
const DEBUG_ENABLED = true;
if(DEBUG_ENABLED){
	window.Sy = Sy;
}

const App = () => {
	let lastRenderTime = performance.now();
	const draw = (canvas)=>{
		const frameDelta = performance.now()-lastRenderTime;
		if(frameDelta<15){
			return;//cap the frame rate at a max of ~60fps
		}
		lastRenderTime = performance.now();
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		ui_idle.draw(ctx);//always draw idle?
		
		if(Animator.isRunning()){
			Animator.draw(ctx);
			return;
		}
		const state = Sy_api.api_getCurrentState();
		//draw BG here? or higher up?
		switch(state){
			case GAME_STATE.BATTLE_IDLE:
			//	ui_idle.draw(ctx);
			return;
			case GAME_STATE.BATTLE_MOVE:
				ui_displayMove.draw(ctx);
			return;
			case GAME_STATE.BATTLE_TARGET:
				ui_selectTarget.draw(ctx);
			return;
		}
		
	};
	const click = (e)=>{
		Renderer.mouseMove(e);//ensure mouse coord is up to date		
		if(Animator.isRunning()){
			return;//TODO: skip animation? 
		}
		//TODO: check control source?
		const state = GameState.getCurrentState();
		//draw BG here?
		switch(state){
			case GAME_STATE.BATTLE_IDLE:
				ui_idle.click(e);
			return;
			case GAME_STATE.BATTLE_MOVE:
				ui_displayMove.click(e);
			return;
			case GAME_STATE.BATTLE_TARGET:
				ui_selectTarget.click(e);
			return;
		}
	};
	
	
	
  return (
    <div class={"container is-widescren"} >
		<div class={"columns"}>
		<div class={"column"}>
			<Canvas draw={draw} 
					onClick={click} 
					onContextMenu={(e)=>{click(e);e.preventDefault();return false;}}
					onMouseMove={Renderer.mouseMove}
					onMouseOut={Renderer.mouseOut}
				width={Renderer.width} 
				height={Renderer.height} 
				style={{width:Renderer.width/window.devicePixelRatio,
						height:Renderer.height/window.devicePixelRatio,
						border:"1px solid black"
				}}/>
		</div>
		<DebugContainer enabled={DEBUG_ENABLED}/>
	</div>
	</div>
  );
}
window.onresize=()=>{
	return;//
	const canvElems=document.getElementsByTagName('canvas');
	for(const c of canvElems){
		c.style.width=window.innerWidth+"px";
		c.style.height=window.innerHeight+"px";
	}
};
ReactDOM.render(<App />, document.getElementById("root"));

