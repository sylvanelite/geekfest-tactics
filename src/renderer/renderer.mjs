
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
			ctx.drawImage(img.data,
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
			ctx.drawImage(img.data,
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
            ctx.save();
            ctx.translate(sprite.x-sprite.width+rendererW, 0);
            ctx.scale(-1, 1);
			ctx.drawImage(img.data,
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
		//Renderer.#paletteShiftCanvas(canvas);
		ctx.drawImage(canvas,x,y);
	}
	static drawCanvasSpriteFlippedH(canvas,x,y,ctx){
		//Renderer.#paletteShiftCanvas(canvas);
		ctx.save();
		ctx.translate(x, 0);
		ctx.scale(-1, 1);
		ctx.drawImage(canvas,-canvas.width,y);
		ctx.restore();
	}
	
	static paletteShiftCanvas(canvas){
		
		//ok
		const PALETTE_GB = [
			{r:0  ,g:0  ,b:0  },
			{r:56 ,g:40 ,b:67 },
			{r:124,g:109,b:128},
			{r:199,g:198,b:198},
		];
		//ok
		const PALETTE_MANGA = [
			{r:41 ,g:36 ,b:24 },
			{r:82 ,g:72 ,b:57 },
			{r:115,g:101,b:74 },
			{r:139,g:125,b:98 },
			{r:164,g:141,b:106},
			{r:189,g:165,b:131},
			{r:205,g:186,b:148},
			{r:230,g:206,b:172},
		];
		
		/*
		//no
		const PALETTE_MANGA_2 = [
			{r:34 ,g:35 ,b:35 },
			{r:240,g:246,b:240},
		];
		//no
		const PALETTE_COMIC_3 = [
			{r:251,g:248,b:253},
			{r:161,g:169,b:209},
			{r:0  ,g:127,b:255},
			{r:36 ,g:37 ,b:111},
			{r:20 ,g:18 ,b:24 },
			{r:95 ,g:14 ,b:82 },
			{r:253,g:26 ,b:67 },
			{r:255,g:177,b:108},
		];
		//very red
		const PALETTE_COMIC_2 = [
			{r:43 ,g:18 ,b:13 },
			{r:159,g:18 ,b:17 },
			{r:252,g:20 ,b:0  },
			{r:252,g:106,b:0  },
			{r:252,g:252,b:0  },
			{r:0  ,g:0  ,b:0  },
			{r:51 ,g:4  ,b:69 },
			{r:156,g:12 ,b:156},
			{r:255,g:9  ,b:157},
			{r:0  ,g:7  ,b:44 },
			{r:4  ,g:0  ,b:133},
			{r:0  ,g:0  ,b:255},
			{r:0  ,g:102,b:255},
			{r:103,g:205,b:252},
			{r:0  ,g:72 ,b:73 },
			{r:6  ,g:120,b:38 },
			{r:0  ,g:201,b:8  },
			{r:82 ,g:255,b:0  },
			{r:198,g:240,b:34 },
			{r:53 ,g:44 ,b:46 },
			{r:117,g:73 ,b:68 },
			{r:246,g:117,b:122},
			{r:250,g:197,b:155},
			{r:105,g:54 ,b:35 },
			{r:176,g:87 ,b:43 },
			{r:233,g:142,b:66 },
			{r:252,g:180,b:72 },
			{r:255,g:252,b:255},
			{r:102,g:102,b:136},
			{r:152,g:146,b:173},
			{r:184,g:184,b:209},
			{r:221,g:217,b:230},
			{r:252,g:252,b:252},
		];
		//harsh...
		const PALETTE_COMIC_4 = [
			{r:9  ,g:9  ,b:10 },
			{r:92 ,g:33 ,b:45 },
			{r:194,g:56 ,b:47 },
			{r:224,g:145,b:54 },
			{r:235,g:223,b:66 },
			{r:135,g:204,b:57 },
			{r:37 ,g:102,b:45 },
			{r:55 ,g:153,b:107},
			{r:99 ,g:199,b:224},
			{r:77 ,g:86 ,b:214},
			{r:60 ,g:40 ,b:112},
			{r:112,g:51 ,b:143},
			{r:224,g:117,b:188},
			{r:253,g:255,b:245},
			{r:112,g:107,b:138},
			{r:112,g:51 ,b:143},
		];
		*/
		//ok
		const PALETTE_COMIC = [
			{r:31 ,g:36 ,b:75 },
			{r:101,g:64 ,b:83 },
			{r:168,g:96 ,b:93 },
			{r:209,g:166,b:126},
			{r:246,g:231,b:156},
			{r:182,g:207,b:142},
			{r:96 ,g:174,b:123},
			{r:60 ,g:107,b:100},
		];
		//ok
		const PALETTE_ANIME = [
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
		];
		
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
			for(const col of PALETTE_COMIC){
				const dist = colourDistance(r,g,b,col);
				if(dist<minDist){
					result = col;
					minDist = dist;
				}
			}
			return result;
		};
		
		//TODO: use automatic lookup based on colour distance, cache results
		
		const ctx = canvas.getContext('2d');
		const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
		const data = imgData.data;
		for(let i=0;i<data.length;i+=4){
			const r=data[i];
			const g=data[i+1];
			const b=data[i+2];
			const a= data[i+3];
			if(a<200){continue;}
			const col = getBestPaletteForColour(r,g,b);
			data[i]   =col.r;
			data[i+1] =col.g;
			data[i+2] =col.b;
		}
		
		ctx.putImageData(imgData, 0, 0);
		
	}
	
}


export {Renderer};