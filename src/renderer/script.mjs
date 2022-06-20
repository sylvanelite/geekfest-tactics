

//wipe in
//draw modal BG 
//character left
//character right
//text bubble
//old text bubbles
//wipe out

const SCRIPT_KIND = {
	TEXT:"text",
	DONE:"done",
};
import { Renderer } from "./renderer.js";
import { Text } from "./text.js";
//import { Audio } from "./audio/audio.js";
//import { SFX } from "./data/AudioData.js";

class Script{
	static #renderLineIdx = 0;//when rendering text, which line is the current one to fade in
	static #renderIdx = 0;//which character within the line
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
	
	//goes from the curScriptPosition -> the next break in rendering, calling "callback" on each line
	//returns the index of the last line rendered
	static #scrollThroughLines(callback){
		const script = Script.#curScript;
		let lastLine = Script.#curScriptPosition;
		for(let i = Script.#curScriptPosition;i<script.length;i+=1){
			const line = script[i];
			const s = Script.parseLine(line);
			callback(s);
			if(s.stopRendering){
				return i;//should alway reach a break in rendering
			}
			lastLine = i;
		}
		console.warn("fell through script",lastLine);
		return lastLine;
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
		const [kind,data] = line.split("|");
		switch(kind){
			case SCRIPT_KIND.TEXT:
				const json = JSON.parse(data);
				return {
					kind,
					data:json,
					text:json.text,
					stopRendering:true,
					hasRender:true
				};
				break;
			case SCRIPT_KIND.DONE:
				return {
					kind,//no data for done
					stopRendering:true,
					hasRender:false
				};
				break;
			default:
				console.warn("unknown script: ",line);
				return {kind:'unknown'};
		}
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
		ctx.fillStyle = "rgba(200,200,200,0.1)";
		Renderer.drawSprite(Script.#sprites.bg,ctx);
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
	
		const textPos = {x:255,y:150};
		const lines = [];
		const callback = (s)=>{
			if(s.hasRender){
				const text = Script.#renderLine(ctx,s,textPos);
				for(const txt of text){
					lines.push(txt);
				}
			}
		};
		Script.#scrollThroughLines(callback);
		if(!lines.length){return};
		if(Script.#renderIdx==0&&Script.#renderLineIdx==0){
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
		//render previous text by looking at lines[Script.#renderLineIdx-<some amount>]
		//push them up, and fade to black 
		for(let i=-3;i<0;i+=1){
			if(Script.#renderLineIdx+i>=0){
				const prevLine = lines[Script.#renderLineIdx+i];
				prevLine.y+=64*i;//TODO: correct offset for past text
				const bubbleName = "speech_"+prevLine.data.speech+"_"+prevLine.data.talk;//e.g. speech_talk_left
				const bubble = Script.#sprites[bubbleName];
				bubble.y=prevLine.y;
				bubble.x=prevLine.x;
				Renderer.drawSprite(bubble,ctx);
				Text.drawBitmapText(ctx,prevLine.text, prevLine.x, prevLine.y);
			}
			ctx.fillRect(0,0,Renderer.width,Renderer.height);
		}
		const line = lines[Script.#renderLineIdx];
		Script.#renderIdx+=0.5;
		if(Script.#renderIdx+1>=line.text.length){
			//since this is used for substring, it needs to go up to length, not len-1
			Script.#renderIdx = line.text.length;
			//reached end of a line, progress to next line
			Script.#renderLineIdx+=1;
			if(Script.#renderLineIdx>=lines.length){
				//don't go past end of all lines
				Script.#renderLineIdx=lines.length-1;
			}else{
				Script.#renderIdx=0;//moved to next line, reset position
			}
		}
		//draw non-active ch
		const ch_left = Script.#sprites[line.data.left];
		const ch_right = Script.#sprites[line.data.right];
		ch_left.x = 200;//TODO: ch positions
		ch_right.x = 600;//TODO: ch positions
		ch_left.y = 270;//TODO: ch positions
		ch_right.y = 270;//TODO: ch positions
		if(line.data.talk=="left"){
		Renderer.drawSprite(ch_left,ctx);
		}else{
		Renderer.drawSprite(ch_right,ctx);
		}
		ctx.fillRect(0,0,Renderer.width,Renderer.height);
		if(line.data.talk=="left"){
		Renderer.drawSprite(ch_right,ctx);
		}else{
		Renderer.drawSprite(ch_left,ctx);
		}
		//draw current line
		const bubbleName = "speech_"+line.data.speech+"_"+line.data.talk;//e.g. speech_talk_left
		const bubble = Script.#sprites[bubbleName];
		bubble.y=line.y;
		bubble.x=line.x;
		Renderer.drawSprite(bubble,ctx);
		let lineText = line.text.substring(0,Math.floor(Script.#renderIdx));
		Text.drawBitmapText(ctx,lineText, line.x, line.y);
		//bounce in the next character
		const linDim = Text.getBitmapTextDimensions(ctx,lineText);
		if(Math.floor(Script.#renderIdx)<line.text.length){
			const fract = Script.#renderIdx * 10 % 10 /10;
			Text.drawBitmapText(ctx,
				line.text.charAt(Math.floor(Script.#renderIdx)+1), 
				line.x+linDim.width, line.y-6*(1-fract));
		}
	}
	static #renderLine(ctx,s,textPos){
		let text = [];
		switch(s.kind){
			case SCRIPT_KIND.TEXT:
				text.push({text:s.text,x:textPos.x,y:textPos.y,data:s.data});
				textPos.y+=15;
				break;
			default:
				console.warn("cannot render script: ",s);
		}
		return text;
	}
	
	
	static click(e){
		//TODO: maybe do skip on right click?
		const action = Script.#getCurrentWaitingAction();
		console.log(action);
		switch(action.kind){
			case SCRIPT_KIND.TEXT:
				Script.#actionContinue();
				break;
			case SCRIPT_KIND.DONE:
				Script.#actionDone();
				break;
			default:
				console.warn("cannot do script click: ",s);
		}
	}
	//when the script is waiting for input (stopRendering), return the script option at that spot
	static #getCurrentWaitingAction(){
		const waitingIdx =Script.#scrollThroughLines(()=>{});
		const line= Script.#curScript[waitingIdx];
		const s= Script.parseLine(line);
		return s;
	}
	//actions
	static #actionContinue(){
		//progress past pause
		Script.#renderLineIdx = 0;
		Script.#renderIdx = 0;
		Script.#curScriptPosition =Script.#scrollThroughLines(()=>{})+1;
		//Audio.PlaySFX(SFX.click);
	}
	static #actionDone(){
		//end the script
		Script.#renderLineIdx = 0;
		Script.#renderIdx = 0;
		Script.#curScript = null;
		Script.#curScriptPosition = 0;
		Script.#isRunning = false;
		//Audio.StopScriptLine();
		//Audio.PlaySFX(SFX.receive);
	}
	
}

export {Script};

