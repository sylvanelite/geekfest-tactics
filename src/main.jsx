import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { DebugMenu } from  './debug/debug-menu.js';
import { Canvas } from  './components/canvas.js';
import { GameState } from './Game.js';
import { Renderer } from './renderer/renderer.js';
import { Animator } from './renderer/animator.js';

import { ui_idle } from './ui/ui_idle.js';
import { ui_displayMove } from './ui/ui_displayMove.js';
import { ui_selectTarget } from './ui/ui_selectTarget.js';

import { Sy_api } from './state/api.js';
import {
	cbt_STATE_IDLE,
	cbt_STATE_DISPLAY_MOVE,
	cbt_STATE_SELECT_WEAPON_TARGET
} from './state/consts.mjs';

//https://www.gamedeveloper.com/programming/making-a-game-boy-game-in-2017-a-quot-sheep-it-up-quot-post-mortem-part-1-2-


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
		
		if(Animator.isRunning()){
			Animator.draw(ctx);
			return;
		}
		const state = Sy_api.api_getCurrentState();
		//draw BG here? or higher up?
		switch(state){
			case cbt_STATE_IDLE:
				ui_idle.draw(ctx);
			return;
			case cbt_STATE_DISPLAY_MOVE:
				ui_displayMove.draw(ctx);
			return;
			case cbt_STATE_SELECT_WEAPON_TARGET:
				ui_selectTarget.draw(ctx);
			return;
		}
		
	};
	const click = (e)=>{
		Renderer.mouseMove(e);//ensure mouse coord is up to date		
		if(Animator.isRunning()){
			return;//TODO: skip animation? 
		}
		const state = Sy_api.api_getCurrentState();
		//draw BG here?
		switch(state){
			case cbt_STATE_IDLE:
				ui_idle.click();
			return;
			case cbt_STATE_DISPLAY_MOVE:
				ui_displayMove.click();
			return;
			case cbt_STATE_SELECT_WEAPON_TARGET:
				ui_selectTarget.click();
			return;
		}
	};
	
  return (
    <div>
	<Canvas draw={draw} onClick={click} 
                onMouseMove={Renderer.mouseMove}
                onMouseOut={Renderer.mouseOut}
			width={Renderer.width} 
			height={Renderer.height} 
			style={{width:Renderer.width/window.devicePixelRatio,height:Renderer.height/window.devicePixelRatio
			}}/>
	<DebugMenu />
	</div>
  );
}
window.onresize=()=>{
	const canvElems=document.getElementsByTagName('canvas');
	for(const c of canvElems){
		c.style.width=window.innerWidth+"px";
		c.style.height=window.innerHeight+"px";
	}
};
ReactDOM.render(<App />, document.getElementById("root"));

