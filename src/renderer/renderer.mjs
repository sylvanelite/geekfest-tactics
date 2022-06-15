
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
	
	static preload=(urls,callback)=>{
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
	
	static drawSprite=(sprite,ctx)=>{
		const img = Renderer.#getImageData(sprite.url);
		if(img.loaded){
			ctx.drawImage(img.data,
				sprite.sx,sprite.sy,sprite.width,sprite.height,
				sprite.x,
				sprite.y,
				sprite.width,
				sprite.height);
		}
	}
	static drawSpriteScaled=(sprite,destW,destH,ctx)=>{
		const img = Renderer.#getImageData(sprite.url);
		if(img.loaded){
			ctx.drawImage(img.data,
				sprite.sx,sprite.sy,sprite.width,sprite.height,
				sprite.x,
				sprite.y,
				destW,
				destH);
		}
	}
	//TODO: should this be paramaterised?
	static drawSpriteFlippedH=(sprite,ctx)=>{
		const img = Renderer.#getImageData(sprite.url);
		if(img.loaded){
			
            ctx.save();
            ctx.translate(sprite.x-sprite.width+Renderer.width, 0);
            ctx.scale(-1, 1);
			ctx.drawImage(img.data,
				sprite.sx,sprite.sy,sprite.width,sprite.height,
				-sprite.width+Renderer.width,
				sprite.y,
				sprite.width,
				sprite.height);
			ctx.restore();
		}
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
}


export {Renderer};