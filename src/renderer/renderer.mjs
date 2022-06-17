const PALETTE = {
	GB:"GB",
	MANGA:"MANGA",
	COMIC:"COMIC",
	ANIME:"ANIME"
};


//base class for drawing & computing interaction with them
class Renderer{
	
	static TILE_SIZE=16;
	static width=980;
	static height=540;
	
	static mousePoint=null;
	
	static mouseMove(e){
		const elemRect = e.target.getBoundingClientRect();
		const x = (e.pageX - elemRect.left);//*window.devicePixelRatio;
		const y = (e.pageY - elemRect.top);//*window.devicePixelRatio;
		const ratioX =  e.target.width/e.target.clientWidth;
		const ratioY =  e.target.height/e.target.clientHeight;
		Renderer.mousePoint={x:x*ratioX,y:y*ratioY};
	}
	static mouseOut(e){
		Renderer.mousePoint = null;
	}
	static isMouseOver(rect){
		if(!Renderer.mousePoint){return false;}
		return (rect.x <= Renderer.mousePoint.x && 
				Renderer.mousePoint.x <= rect.x + rect.width &&
				rect.y <= Renderer.mousePoint.y && 
				Renderer.mousePoint.y <= rect.y + rect.height);
	}
	static getMouseCell(){
		//TODO: params like grid x,y,width,height, 
		//      as well as offsets if there's a scrollable view
		const x = Math.floor(Renderer.mousePoint.x/Renderer.TILE_SIZE);
		const y = Math.floor(Renderer.mousePoint.y/Renderer.TILE_SIZE);
		
		return {x,y};
	}
	
	
	
	
	
	static #escapeName=(url)=>{
		return url.replace(/[\W]+/g,"_");
	}
	static #varImageCache = {};
	static #getImageData(url,loadCallback){
		url = "./res/"+url;
		const name = Renderer.#escapeName(url);
		if(!Renderer.#varImageCache.hasOwnProperty(name)){
			//begin loading
			Renderer.#varImageCache[name]={loaded:false};
			const req = new Request(url);
			fetch(req).then((r)=>{
				r.blob().then((b)=>{
					createImageBitmap(b).then((c)=>{
						Renderer.#varImageCache[name] = {loaded:true, data:c };
						Renderer.#applyProcessing(Renderer.#varImageCache[name]);
						if(loadCallback){
							loadCallback(name);
						}
					})
				});
			});
		}
		return Renderer.#varImageCache[name];
	}
	
	static preload(urls,callback){
		let doneCount = 0;
		const allDone = urls.length;
		for(const url of urls){
			Renderer.#getImageData(url,()=>{
				doneCount+=1;
				if(doneCount == allDone){
					callback();
				}
			});
		}
	}
	
	static drawSprite(sprite,ctx){
		const img = Renderer.#getImageData(sprite.url);
		if(img.loaded){
			const data = (img.palette?img.palette[Renderer.#renderPalette]:img.data);
			ctx.drawImage(data,
				sprite.sx,sprite.sy,sprite.width,sprite.height,
				sprite.x,
				sprite.y,
				sprite.width,
				sprite.height);
			return true;
		}
		return false;
	}
	static drawSpriteScaled(sprite,destW,destH,ctx){
		const img = Renderer.#getImageData(sprite.url);
		if(img.loaded){
			const data = (img.palette?img.palette[Renderer.#renderPalette]:img.data);
			ctx.drawImage(data,
				sprite.sx,sprite.sy,sprite.width,sprite.height,
				sprite.x,
				sprite.y,
				destW,
				destH);
			return true;
		}
		return false;
	}
	//TODO: should this be paramaterised?
	static drawSpriteFlippedH(sprite,rendererW,ctx){
		const img = Renderer.#getImageData(sprite.url);
		if(img.loaded){
			const data = (img.palette?img.palette[Renderer.#renderPalette]:img.data);
            ctx.save();
            ctx.translate(sprite.x-sprite.width+rendererW, 0);
            ctx.scale(-1, 1);
			ctx.drawImage(data,
				sprite.sx,sprite.sy,sprite.width,sprite.height,
				-sprite.width+rendererW,
				sprite.y,
				sprite.width,
				sprite.height);
			ctx.restore();
			return true;
		}
		return false;
	}
	static getSprite(
		url,
		x,y,width,height,
		sx,sy ){
		return {
			url,
			x,y,width,height,
			sx,sy
		};
	}
	
	static drawCanvasSprite(canvas,x,y,ctx){
		ctx.drawImage(canvas,x,y);
	}
	static drawCanvasSpriteFlippedH(canvas,x,y,ctx){
		ctx.save();
		ctx.translate(x, 0);
		ctx.scale(-1, 1);
		ctx.drawImage(canvas,-canvas.width,y);
		ctx.restore();
	}
	
	
	static #renderPalette = PALETTE.ANIME;
	static setRenderPalette(palette){
		Renderer.#renderPalette = palette;
	}
	static #applyProcessing(imgObj){
		const curPalette = Renderer.#renderPalette;
		imgObj.palette = {};
		const palettes = [PALETTE.GB,PALETTE.MANGA,PALETTE.ANIME,PALETTE.COMIC];
		for(const p of palettes){
			const img = imgObj.data;
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const context = canvas.getContext('2d');
			context.drawImage(img,0,0);
			Renderer.#renderPalette = p;
			Renderer.paletteShiftCanvas(canvas);
			imgObj.palette[p] = canvas;
		}
		Renderer.#renderPalette = curPalette;
	}
	
	static paletteShiftCanvas(canvas){
		//NOTE: this is very slow, could be better to just pre-render palette shifts
		//      this is especially true for portraits, where the img is large
		const paletteName = Renderer.#renderPalette;
		
		const paletteData = {
			GB:[
				{r:0  ,g:0  ,b:0  },
				{r:56 ,g:40 ,b:67 },
				{r:124,g:109,b:128},
				{r:199,g:198,b:198},
			],
			MANGA:[
				{r:41 ,g:36 ,b:24 },
				{r:82 ,g:72 ,b:57 },
				{r:115,g:101,b:74 },
				{r:139,g:125,b:98 },
				{r:164,g:141,b:106},
				{r:189,g:165,b:131},
				{r:205,g:186,b:148},
				{r:230,g:206,b:172},
			],
			COMIC:[
				{r:31 ,g:36 ,b:75 },
				{r:101,g:64 ,b:83 },
				{r:168,g:96 ,b:93 },
				{r:209,g:166,b:126},
				{r:246,g:231,b:156},
				{r:182,g:207,b:142},
				{r:96 ,g:174,b:123},
				{r:60 ,g:107,b:100},
			],		
			ANIME:[
				{r:101,g:71 ,b:30 },
				{r:181,g:112,b:117},
				{r:220,g:171,b:128},
				{r:248,g:216,b:171},
				{r:184,g:170,b:170},
				{r:255,g:245,b:245},
				{r:252,g:165,b:194},
				{r:236,g:70 ,b:70 },
				{r:255,g:163,b:34},
				{r:249,g:250,b:147},
				{r:123,g:193,b:136},
				{r:142,g:211,b:248},
				{r:89 ,g:137,b:163},
				{r:215,g:147,b:250},
				{r:116,g:81 ,b:142},
				{r:29 ,g:23 ,b:60 },
			],
		};
		const colourDistance = (r1,g1,b1,rgb)=>{
			const drp2 = Math.pow(r1 - rgb.r, 2);
			const dgp2 = Math.pow(g1 - rgb.g, 2);
			const dbp2 = Math.pow(b1 - rgb.b, 2);
			const t = (r1 + rgb.r) / 2;
			return Math.sqrt(2 * drp2 + 4 * dgp2 + 3 * dbp2 + t * (drp2 - dbp2) / 256);
		};
		
		const getBestPaletteForColour=(r,g,b)=>{
			let minDist = 9999;
			let result = {r:255,g:0,b:255};
			for(const col of paletteData[paletteName]){
				const dist = colourDistance(r,g,b,col);
				if(dist<minDist){
					result = col;
					minDist = dist;
				}
			}
			return result;
		};
		const ctx = canvas.getContext('2d');
		const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
		const data = imgData.data;
		const shiftCache = new Map();
		
		const hash = (x)=> {//https://stackoverflow.com/questions/664014/what-integer-hash-function-are-good-that-accepts-an-integer-hash-key
			x = ((x >> 16) ^ x) * 0x45d9f3b;
			x = ((x >> 16) ^ x) * 0x45d9f3b;
			x = (x >> 16) ^ x;
			return x;
		};
		for(let i=0;i<data.length;i+=4){
			const r=data[i];
			const g=data[i+1];
			const b=data[i+2];
			const a= data[i+3];
			if(a<200){continue;}
			
			const rgbHash = hash(r*10000+b*100*g);
			if(shiftCache.has(rgbHash)){
				const colSet = shiftCache.get(rgbHash);
				data[i]   =colSet.r;
				data[i+1] =colSet.g;
				data[i+2] =colSet.b;
				continue;
			}
			
			const col = getBestPaletteForColour(r,g,b);
			data[i]   =col.r;
			data[i+1] =col.g;
			data[i+2] =col.b;
			shiftCache.set(rgbHash,col);
		}
		ctx.putImageData(imgData, 0, 0);
		
	}
	
}


export {Renderer,PALETTE};