import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { Canvas } from  './components/canvas.js';
import { GameState } from './Game.js';
import { Client } from 'boardgame.io/client';

import { Renderer } from "./renderer/renderer.js";

const client = Client({ game: GameState,//debug:false,
numPlayers: 1//single player game. in theory could allow more than 1 player to take turns?
});
client.start();
window.client = client;//for debug
//RenderPhase.preload();

const App = () => {
	let lastRenderTime = performance.now();
	const draw = (canvas)=>{
		const frameDelta = performance.now()-lastRenderTime;
		if(frameDelta<15){
			return;//cap the frame rate at a max of ~60fps
		}
		lastRenderTime = performance.now();
		//render based on client.getState()
		const state = client.getState();
		const data = state.ctx;
		const G = state.G;
		const ctx = canvas.getContext('2d');
		ctx.font = '12pt monospace';
		ctx.clearRect(0,0,canvas.width,canvas.height);
		//draw BG
	};
	const click = (e)=>{
		Renderer.mouseMove(e);//ensure mouse coord is up to date
		
		const state = client.getState();
		const ctx = state.ctx;
		const G = state.G;
		
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

