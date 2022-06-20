

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
						128,128,
						0,0
					),
		speech_exclaim_left: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						128,128,
						128,0
					),
		speech_think_left: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						128,128,
						256,0
					),
		speech_talk_right: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						128,128,
						0,128
					),
		speech_exclaim_right: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						128,128,
						128,128
					),
		speech_think_right: Renderer.getSprite(
						'ui/script_bubble.png',
						0,0,
						128,128,
						256,128
					),
		chA: Renderer.getSprite(
						'ui/script_ch.png',
						0,0,
						128,128,
						0,0
					),
		chB: Renderer.getSprite(
						'ui/script_ch.png',
						0,0,
						128,128,
						128,0
					),
		chC: Renderer.getSprite(
						'ui/script_ch.png',
						0,0,
						128,128,
						256,0
					),
		chD: Renderer.getSprite(
						'ui/script_ch.png',
						0,0,
						128,128,
						384,0
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
	static draw(ctx){//canvas context
		//TODO: draw sprite (background)
		//      draw left, right character
		//      draw speech bubble
		/*
		text|{
			text:"abc def, etc",//text to display
			speech:"talk|exclaim|think",//speech bubble
			left:"abc",//character + expression on LHS
			right:"def",//character + expression on RHS
			talk:"left|right"//which character is highlighted (and has speech bubble pointing at them)
		}
		//TODO: maybe add BG to text? 
		//      maybe add SFX to text?
		*/
		//draw order:
		/*
		-bg
		-text box -3
		-fade layer
		-text box -2
		-fade layer
		-text box -1
		-non-active portrait
		-fade layer
		-active portrait
		-active text
		*/
		ctx.fillStyle = "rgba(200,200,200,0.2)";
		Renderer.drawSprite(Script.#sprites.bg,ctx);
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
	
		const textPos = {x:355,y:150};
		const lines = Script.#getCurrentLines();
		if(!lines.length){return};
		if(Script.#renderCharacterIdx==0){
			//TODO: use this hash to ID audio snippets 
			const blockText = lines.map((x)=>{
				return x.text;
			}).join(' ');
			//jenkins hash
			//https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
			const hash=(b)=>{
				let a=0;
				let c=0;
				for(a=0,c=b.length;c--;){
					a+=b.charCodeAt(c);
					a+=a<<10,a^=a>>6;
					a+=a<<3;a^=a>>11;
				}
				return((a+(a<<15)&4294967295)>>>0).toString(16);
			};
			//console.log("audio snippet text:",hash(blockText),blockText);
			//Audio.PlayScriptLine(hash(blockText));
		}
		//render previous text by looking at lines[Script.#curScriptPosition-<some amount>]
		//push them up, and fade to black 
		for(let i=-3;i<0;i+=1){
			if(Script.#curScriptPosition+i>=0){
				const prevLine = lines[Script.#curScriptPosition+i];
				const bubbleName = "speech_"+prevLine.speech+"_"+prevLine.talk;//e.g. speech_talk_left
				const bubble = Script.#sprites[bubbleName];
				bubble.y=textPos.y+64*i;//'i' is negative, so this is 200-64 
				bubble.x=textPos.x+(prevLine.talk=="left"?0:100);
				Renderer.drawSprite(bubble,ctx);
				Text.drawBitmapText(ctx,prevLine.text, prevLine.x, prevLine.y);
			}
			ctx.fillRect(0,0,Renderer.width,Renderer.height);
		}
		const line = lines[Script.#curScriptPosition];
		Script.#renderCharacterIdx+=0.5;
		if(Script.#renderCharacterIdx+1>=line.text.length){
			Script.#renderCharacterIdx = line.text.length;
		}
		//draw non-active ch
		const ch_left = Script.#sprites[line.left];
		const ch_right = Script.#sprites[line.right];
		ch_left.x = 200;//TODO: ch positions
		ch_right.x = 600;//TODO: ch positions
		ch_left.y = 270;//TODO: ch positions
		ch_right.y = 270;//TODO: ch positions
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
		bubble.y=textPos.y;
		bubble.x=textPos.x+(line.talk=="left"?0:100);
		Renderer.drawSprite(bubble,ctx);
		let lineText = line.text.substring(0,Math.floor(Script.#renderCharacterIdx));
		Text.drawBitmapText(ctx,lineText, line.x, line.y);
		//bounce in the next character
		const linDim = Text.getBitmapTextDimensions(ctx,lineText);
		if(Math.floor(Script.#renderCharacterIdx)<line.text.length){
			const fract = Script.#renderCharacterIdx * 10 % 10 /10;
			Text.drawBitmapText(ctx,
				line.text.charAt(Math.floor(Script.#renderCharacterIdx)+1), 
				line.x+linDim.width, line.y-6*(1-fract));
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

