import React, {useState,useEffect} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { DebugContainer } from  './debug/container.js';

import { Canvas } from  './components/canvas.js';
import { GameState,GAME_STATE,CONTROL_SOURCE } from './Game.js';
import { Renderer } from './renderer/renderer.js';
import { Animator } from './renderer/animator.js';
import { Network } from './renderer/network.js';
import { Script } from './renderer/script.js';

import { ui_idle } from './ui/ui_idle.js';
import { ui_displayMove } from './ui/ui_displayMove.js';
import { ui_selectTarget } from './ui/ui_selectTarget.js';

import { ui_menuSplash } from './ui/ui_menuSplash.js';
import { ui_menuCharacter } from './ui/ui_menuCharacter.js';
import { ui_menuMap } from './ui/ui_menuMap.js';

import { Sy_api } from './state/api.js';
import { Sy } from './state/main.js';
import { Sy_AI } from './state/ai.js';

const DEBUG_ENABLED = false;
if(DEBUG_ENABLED){
	window.Sy = Sy;
}

Sy_api.api_setRenderer(Animator);

class Logic{
	static #lastRenderTime = performance.now();
	static draw(canvas){
		const frameDelta = performance.now()-Logic.#lastRenderTime;
		if(frameDelta<15){
			return;//cap the frame rate at a max of ~60fps
		}
		Logic.#lastRenderTime = performance.now();
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(Script.isRunning()){
			Script.draw(ctx);
			return;
		}
		if(Animator.isRunning()){
			Animator.draw(ctx);
			return;
		}
		
		const state = GameState.getCurrentState();
		//draw BG here? or higher up?
		switch(state){
			case GAME_STATE.MENU_SPLASH:
				ui_menuSplash.draw(ctx);
			return;
			case GAME_STATE.MENU_CHARACTER:
				ui_menuCharacter.draw(ctx);
			return;
			case GAME_STATE.MENU_MAP:
				ui_menuMap.draw(ctx);
			return;
			case GAME_STATE.BATTLE_IDLE:
				ui_idle.draw(ctx);//always draw idle?
			return;
			case GAME_STATE.BATTLE_MOVE:
				ui_displayMove.draw(ctx);
			return;
			case GAME_STATE.BATTLE_TARGET:
				ui_selectTarget.draw(ctx);
			return;
		}
	}
	
	static click(e){
		Renderer.mouseMove(e);//ensure mouse coord is up to date	
		const controlSource = GameState.getControlSource();
		if(controlSource!=CONTROL_SOURCE.LOCAL){
			return;
		}
		if(Script.isRunning()){
			Script.click(e);
			return;
		}
		if(Animator.isRunning()){
			return;//TODO: skip animation? 
		}
		const state = GameState.getCurrentState();
		switch(state){
			case GAME_STATE.MENU_SPLASH:
				ui_menuSplash.click(e);
			return;
			case GAME_STATE.MENU_CHARACTER:
				ui_menuCharacter.click(e);
			return;
			case GAME_STATE.MENU_MAP:
				ui_menuMap.click(e);
			return;
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
	}
	static update(){
		if(!Animator.isRunning()){
			Network.update();//this is an async call
		}
		
		//check and execute AI
		const controlSource = GameState.getControlSource();
		if(controlSource!=CONTROL_SOURCE.AI){
			return;
		}	
		if(Animator.isRunning()){
			return;//TODO: skip animation? 
		}
		const state = GameState.getCurrentState();
		//TODO: abstract AI logic for each state?
		switch(state){
			case GAME_STATE.BATTLE_IDLE:
			case GAME_STATE.BATTLE_MOVE:
			case GAME_STATE.BATTLE_TARGET:
				const isRunning = Sy_AI.AI();
				if(!isRunning){
					return;
				}
			return;
			default:
				console.log("update: unknown state ",state);
			return;
		}
	}
	static move(e){
		Renderer.mouseMove(e);
		//check and execute AI
		const controlSource = GameState.getControlSource();
		if(controlSource!=CONTROL_SOURCE.LOCAL){
			return;
		}	
		if(Animator.isRunning()){
			return;//TODO: skip animation? 
		}
		const state = GameState.getCurrentState();
		switch(state){
			case GAME_STATE.BATTLE_MOVE:
				ui_displayMove.move(e);
				return;
			case GAME_STATE.BATTLE_IDLE:
			case GAME_STATE.BATTLE_TARGET:
			default:
			return;
		}
	}
	
}

const App = () => {
	useEffect(() => {
	 let timer=-1;
	 const mainLoop = () => {
		Logic.update();
		timer = setTimeout(mainLoop, 15);
	 };
	 mainLoop();
	 return () => {
	  clearTimeout(timer);
	 };
	},[])
	
	
  return (
    <div class={"container is-widescren"} >
		<div class={"columns"}>
		<div class={"column"}>
			<Canvas draw={Logic.draw} 
					onClick={Logic.click} 
					onContextMenu={(e)=>{Logic.click(e);e.preventDefault();return false;}}
					onMouseMove={Logic.move}
					onMouseOut={Renderer.mouseOut}
				width={Renderer.width} 
				height={Renderer.height} 
				style={{width:'100%',
						aspectRatio:Renderer.width+"/"+Renderer.height
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

