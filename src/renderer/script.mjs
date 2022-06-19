

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
				return {
					kind,
					text:data,
					stopRendering:false,
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
			console.log("audio snippet text:",hash(blockText),blockText);
			//Audio.PlayScriptLine(hash(blockText));
		}
		let line = lines[Script.#renderLineIdx];
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
		let lineIdx = 0;
		for(const line of lines){
			if(lineIdx>Script.#renderLineIdx){
				break;//not up to this line yet
			}
			if(lineIdx == Script.#renderLineIdx){
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
			if(lineIdx < Script.#renderLineIdx){
				Text.drawBitmapText(ctx,line.text, line.x, line.y);
			}
			lineIdx+=1;
		}
	}
	static #renderLine(ctx,s,textPos){
		let text = [];
		//text, choice, action, show
		switch(s.kind){
			case SCRIPT_KIND.TEXT:
				text.push({text:s.text,x:textPos.x,y:textPos.y});
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
		switch(s.kind){
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

