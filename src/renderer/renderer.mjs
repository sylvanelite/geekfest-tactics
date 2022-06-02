
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
	
}


export {Renderer};