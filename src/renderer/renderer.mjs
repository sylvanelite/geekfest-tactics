
//base class for drawing & computing interaction with them
class Renderer{
	
	static width=980;
	static height=540;
	
	static mousePoint=null;
	
	static mouseMove(e){
		const x = (e.pageX - e.target.offsetLeft);//*window.devicePixelRatio;
		const y = (e.pageY - e.target.offsetTop);//*window.devicePixelRatio;
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
	
}


export {Renderer};