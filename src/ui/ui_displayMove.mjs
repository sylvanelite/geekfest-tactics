
import { Sy_api } from "../state/api.mjs";
import { Renderer } from "../renderer/renderer.mjs";

class ui_displayMove{
	static draw(ctx){
	}
	static click(e){
		console.log("click: mov",e);
		if(e.button == 2){//right click
			Sy_api.api_mov_cancel();
			return;
		}
		const cell = Renderer.getMouseCell();
		console.log(cell)
		if(cell.x>Sy_api.api_getMapWidth()||cell.y>Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			console.log("cell out of bounds: ",cell.x,cell.y);
			return;
		}
		Sy_api.api_mov_selectDestination(cell.x,cell.y);
	}
}

export {ui_displayMove};