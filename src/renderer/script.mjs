

//wipe in
//draw modal BG 
//character left
//character right
//text bubble
//old text bubbles
//wipe out

import { Renderer } from "./renderer.js";
import { Text } from "./text.js";
//import { Audio } from "./audio/audio.js";
//import { SFX } from "./data/AudioData.js";

class Script{
	static #renderCharacterIdx = 0;//which character within the line
	static #curScript = null;
	static #curScriptPosition = 0;
	static #isRunning = false;
	
	static #sprites = {
		bg: Renderer.getSprite(
						'ui/script_bg.png',
						0,0,
						960,540,
						0,0
					),
		speech_talk_left: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						480,128,
						0,0
					),
		speech_exclaim_left: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						480,128,
						480,0
					),
		speech_think_left: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						480,128,
						960,0
					),
		speech_think_right: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						480,128,
						0,128
					),
		speech_exclaim_right: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						480,128,
						480,128
					),
		speech_talk_right: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						480,128,
						960,128
					),
		chA: Renderer.getSprite(
						'ui/script_ch.png',
						0,0,
						256,320,
						0,0
					),
		chB: Renderer.getSprite(
						'ui/script_ch.png',
						0,0,
						256,320,
						256,0
					),
	};
	
	static #getCurrentLines(){
		const res = [];
		const script = Script.#curScript;
		for(let i=0;i<script.length&& i<= Script.#curScriptPosition;i+=1){
			const line = script[i];
			const s = Script.parseLine(line);
			res.push(s);
		}
		return res;
	}
	
	static isRunning(){
		return Script.#isRunning;
	}
	
	static start(script){
		Script.#curScript = script;
		Script.#curScriptPosition = 0;
		Script.#isRunning = true;
	}
	static parseLine(line){
		const json = JSON.parse(line);
		return json;
	}
	
	//render goes from the current position to the next script point that needs input 
	static draw(ctx){
		//TODO: maybe add BG to text obejct, so that it can change?
		//      maybe add SFX to text object?
		//draw order:
		/*
		-bg
		-text box -3
		-fade layer
		-text box -2
		-fade layer
		-text box -1
		-fade layer
		-non-active portrait
		-fade layer
		-active portrait
		-active text
		*/
		ctx.fillStyle = "rgba(200,200,200,0.2)";
		Renderer.drawSprite(Script.#sprites.bg,ctx);	
		const textPos = {x:205,y:150,xOff:8,yOff:64};
		const lines = Script.#getCurrentLines();
		if(!lines.length){return};
		//render previous text by looking at lines[Script.#curScriptPosition-<some amount>]
		//push them up, and fade to black 
		for(let i=-3;i<0;i+=1){
			if(Script.#curScriptPosition+i>=0){
				const prevLine = lines[Script.#curScriptPosition+i];
				prevLine.x = textPos.x+(prevLine.talk=="left"?0:100);
				prevLine.y = textPos.y+64*i;//'i' is negative, so this is 200-64 
				const bubbleName = "speech_"+prevLine.speech+"_"+prevLine.talk;//e.g. speech_talk_left
				const bubble = Script.#sprites[bubbleName];
				bubble.y=prevLine.y;
				bubble.x=prevLine.x-20;
				Renderer.drawSprite(bubble,ctx);
				Text.drawBitmapText(ctx,prevLine.text, prevLine.x+textPos.xOff, prevLine.y+textPos.yOff);
			}
			ctx.fillRect(0,0,Renderer.width,Renderer.height);
		}
		const line = lines[Script.#curScriptPosition];
		line.x = textPos.x+(line.talk=="left"?0:100);
		line.y = textPos.y;
		Script.#renderCharacterIdx+=0.5;
		if(Script.#renderCharacterIdx+1>=line.text.length){
			Script.#renderCharacterIdx = line.text.length;
		}
		//draw non-active ch
		const ch_left = Script.#sprites[line.left];
		const ch_right = Script.#sprites[line.right];
		ch_left.x = 75;//TODO: ch positions
		ch_right.x = 700;//TODO: ch positions
		ch_left.y = 250;//TODO: ch positions
		ch_right.y = 250;//TODO: ch positions
		if(line.talk=="left"){
		Renderer.drawSprite(ch_left,ctx);
		}else{
		Renderer.drawSprite(ch_right,ctx);
		}
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
		if(line.talk=="left"){
		Renderer.drawSprite(ch_right,ctx);
		}else{
		Renderer.drawSprite(ch_left,ctx);
		}
		//draw current line
		const bubbleName = "speech_"+line.speech+"_"+line.talk;//e.g. speech_talk_left
		const bubble = Script.#sprites[bubbleName];
		bubble.y=line.y;
		bubble.x=line.x-20;
		Renderer.drawSprite(bubble,ctx);
		let lineText = line.text.substring(0,Math.floor(Script.#renderCharacterIdx));
		Text.drawBitmapText(ctx,lineText, line.x+textPos.xOff, line.y+textPos.yOff);
		//bounce in the next character
		const linDim = Text.getBitmapTextDimensions(ctx,lineText);
		if(Math.floor(Script.#renderCharacterIdx)<line.text.length){
			const fract = Script.#renderCharacterIdx * 10 % 10 /10;
			Text.drawBitmapText(ctx,
				line.text.charAt(Math.floor(Script.#renderCharacterIdx)+1), 
				line.x+linDim.width+textPos.xOff, line.y-6*(1-fract)+textPos.yOff);
		}
	}
	
	static click(e){
		//advance text
		Script.#renderCharacterIdx = 0;
		Script.#curScriptPosition =Script.#curScriptPosition+1;
		if(Script.#curScriptPosition>=Script.#curScript.length){
			Script.#done();
		}
	}
	static #done(){
		//end the script
		Script.#renderCharacterIdx = 0;
		Script.#curScript = null;
		Script.#curScriptPosition = 0;
		Script.#isRunning = false;
		//Audio.StopScriptLine();
		//Audio.PlaySFX(SFX.receive);
	}
	
}

export {Script};

