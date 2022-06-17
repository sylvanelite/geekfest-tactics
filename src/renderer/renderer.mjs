
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
	/*
	static #paletteShiftCanvas(canvas){
		
		const COLOUR = {
			skin_dark    :'AB8163',
			skin_mid     :'ECB486',
			skin_light   :'FCDC9A',
			yellow_dark  :'837B3D',
			yellow_mid   :'ABA039',
			yellow_light :'FFE546',
			pink_dark    :'542C3F',
			pink_mid     :'804361',
			pink_midlght :'B35D88',
			pink_light   :'F781BC',
			blue_dark    :'394080',
			blue_mid     :'4F59B0',
			blue_light   :'9EABFF',
			brown_vdark  :'171107',
			brown_dark   :'453A17',
			brown_mid    :'7A5D33',
			brown_light  :'B27C54',
			black        :'000100',
			metal_vdark  :'5B5A5E',
			metal_dark   :'7C796B',
			metal_mid    :'A89A85',
			metal_light  :'FFDDDA',

			hair_vlight :'AB836C',
			hair_light  :'8F6C65',
			hair_mid    :'705550',
			hair_dark   :'47342C',
			hair_vdark  :'211815',

			green_vlight :'A3BF00',
			green_light  :'689A00',
			green_mid    :'007A00',
			green_dark   :'004A00',

			dgreen_mid   :'002528',
			dgreen_light :'00413A',

			white        :'F3F0F2',
			gray         :'949494',
			blue_light   :'3CBCF2',
			blue_mid     :'009EF2',
			blue_dark    :'007CC9',
		};
		
		
		const getR = (hexStr)=>{
			switch(hexStr){
				case COLOUR.skin_dark     :return 56;
				case COLOUR.skin_mid      :return 124;
				case COLOUR.skin_light    :return 199;
				case COLOUR.yellow_dark   :return 56;
				case COLOUR.yellow_mid    :return 124;
				case COLOUR.yellow_light  :return 199;
				case COLOUR.pink_dark     :return 56;
				case COLOUR.pink_mid      :return 124;
				case COLOUR.pink_midlght  :return 199;
				case COLOUR.pink_light    :return 199;
				case COLOUR.blue_dark     :return 56;
				case COLOUR.blue_mid      :return 124;
				case COLOUR.blue_light    :return 199;
				case COLOUR.brown_vdark   :return 0;
				case COLOUR.brown_dark    :return 56;
				case COLOUR.brown_mid     :return 124;
				case COLOUR.brown_light   :return 199;
				case COLOUR.black         :return 0;
				case COLOUR.metal_vdark   :return 0;
				case COLOUR.metal_dark    :return 56;
				case COLOUR.metal_mid     :return 124;
				case COLOUR.metal_light   :return 199;
				case COLOUR.hair_vlight   :return 199;
				case COLOUR.hair_light    :return 199;
				case COLOUR.hair_mid      :return 124;
				case COLOUR.hair_dark     :return 56;
				case COLOUR.hair_vdark    :return 0;
				case COLOUR.green_vlight  :return 199;
				case COLOUR.green_light   :return 199;
				case COLOUR.green_mid     :return 124;
				case COLOUR.green_dark    :return 56;
				case COLOUR.dgreen_mid    :return 124;
				case COLOUR.dgreen_light  :return 199;
				case COLOUR.white         :return 199;
				case COLOUR.gray          :return 199;
				case COLOUR.blue_light    :return 199;
				case COLOUR.blue_mid      :return 124;
				case COLOUR.blue_dark     :return 199;
				default:return 255;//probably conversion already applied, don't process any more pixels
			}
		};
		const getG = (hexStr)=>{
			switch(hexStr){
				case COLOUR.skin_dark     :return 40;
				case COLOUR.skin_mid      :return 109;
				case COLOUR.skin_light    :return 199;
				case COLOUR.yellow_dark   :return 40;
				case COLOUR.yellow_mid    :return 109;
				case COLOUR.yellow_light  :return 199;
				case COLOUR.pink_dark     :return 40;
				case COLOUR.pink_mid      :return 109;
				case COLOUR.pink_midlght  :return 199;
				case COLOUR.pink_light    :return 199;
				case COLOUR.blue_dark     :return 40;
				case COLOUR.blue_mid      :return 109;
				case COLOUR.blue_light    :return 199;
				case COLOUR.brown_vdark   :return 0;
				case COLOUR.brown_dark    :return 40;
				case COLOUR.brown_mid     :return 109;
				case COLOUR.brown_light   :return 199;
				case COLOUR.black         :return 0;
				case COLOUR.metal_vdark   :return 0;
				case COLOUR.metal_dark    :return 40;
				case COLOUR.metal_mid     :return 109;
				case COLOUR.metal_light   :return 199;
				case COLOUR.hair_vlight   :return 199;
				case COLOUR.hair_light    :return 199;
				case COLOUR.hair_mid      :return 109;
				case COLOUR.hair_dark     :return 40;
				case COLOUR.hair_vdark    :return 0;
				case COLOUR.green_vlight  :return 199;
				case COLOUR.green_light   :return 199;
				case COLOUR.green_mid     :return 109;
				case COLOUR.green_dark    :return 40;
				case COLOUR.dgreen_mid    :return 109;
				case COLOUR.dgreen_light  :return 199;
				case COLOUR.white         :return 199;
				case COLOUR.gray          :return 199;
				case COLOUR.blue_light    :return 199;
				case COLOUR.blue_mid      :return 109;
				case COLOUR.blue_dark     :return 199;
				default:return 255;//probably conversion already applied, don't process any more pixels
			}
		};
		
		const getB = (hexStr)=>{
			switch(hexStr){
				case COLOUR.skin_dark     :return 67;
				case COLOUR.skin_mid      :return 128;
				case COLOUR.skin_light    :return 199;
				case COLOUR.yellow_dark   :return 67;
				case COLOUR.yellow_mid    :return 128;
				case COLOUR.yellow_light  :return 199;
				case COLOUR.pink_dark     :return 67;
				case COLOUR.pink_mid      :return 128;
				case COLOUR.pink_midlght  :return 199;
				case COLOUR.pink_light    :return 199;
				case COLOUR.blue_dark     :return 67;
				case COLOUR.blue_mid      :return 128;
				case COLOUR.blue_light    :return 199;
				case COLOUR.brown_vdark   :return 0;
				case COLOUR.brown_dark    :return 67;
				case COLOUR.brown_mid     :return 128;
				case COLOUR.brown_light   :return 199;
				case COLOUR.black         :return 0;
				case COLOUR.metal_vdark   :return 0;
				case COLOUR.metal_dark    :return 67;
				case COLOUR.metal_mid     :return 128;
				case COLOUR.metal_light   :return 199;
				case COLOUR.hair_vlight   :return 199;
				case COLOUR.hair_light    :return 199;
				case COLOUR.hair_mid      :return 128;
				case COLOUR.hair_dark     :return 67;
				case COLOUR.hair_vdark    :return 0;
				case COLOUR.green_vlight  :return 199;
				case COLOUR.green_light   :return 199;
				case COLOUR.green_mid     :return 128;
				case COLOUR.green_dark    :return 67;
				case COLOUR.dgreen_mid    :return 128;
				case COLOUR.dgreen_light  :return 199;
				case COLOUR.white         :return 199;
				case COLOUR.gray          :return 199;
				case COLOUR.blue_light    :return 199;
				case COLOUR.blue_mid      :return 128;
				case COLOUR.blue_dark     :return 199;
				default:return 255;//probably conversion already applied, don't process any more pixels
			}
		};
		
		const componentToHex = (c)=>{
			var hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		};
		const rgbToHex = (r, g, b)=>{
			return "" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		};
		const ctx = canvas.getContext('2d');
		const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
		const data = imgData.data;
		for(let i=0;i<data.length;i+=4){
			const r=data[i];
			const g=data[i+1];
			const b=data[i+2];
			const a= data[1+3];
			if(a<200){continue;}
			const hexStr = rgbToHex(r,g,b);
			switch(hexStr){
				case COLOUR.skin_dark     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.skin_mid      : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.skin_light    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.yellow_dark   : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.yellow_mid    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.yellow_light  : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.pink_dark     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.pink_mid      : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.pink_midlght  : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.pink_light    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.blue_dark     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.blue_mid      : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.blue_light    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.brown_vdark   : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.brown_dark    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.brown_mid     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.brown_light   : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.black         : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.metal_vdark   : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.metal_dark    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.metal_mid     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.metal_light   : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.hair_vlight   : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.hair_light    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.hair_mid      : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.hair_dark     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.hair_vdark    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.green_vlight  : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.green_light   : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.green_mid     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.green_dark    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.dgreen_mid    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.dgreen_light  : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.white         : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.gray          : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.blue_light    : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.blue_mid      : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				case COLOUR.blue_dark     : data[i]=getR(hexStr);data[i+1]=getG(hexStr);data[i+2]=getB(hexStr); break;
				//default:return;//probably conversion already applied, don't process any more pixels
			}
		}
		
		ctx.putImageData(imgData, 0, 0);
		
	}*/
	
}


export {Renderer};