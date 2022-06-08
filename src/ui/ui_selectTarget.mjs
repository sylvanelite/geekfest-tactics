
import { Sy_api } from "../state/api.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { ui_background } from "./ui_background.mjs";
import { ui_displayMove } from "./ui_displayMove.mjs";

class ui_selectTarget{
	static draw(ctx){
		ui_background.draw(ctx);
	}
	static click(e){
		const cell = Renderer.getMouseCell();
		console.log("click: tgt",e,cell);
		if(e.button == 2){//right click
			Sy_api.api_tgt_cancel();
			ui_displayMove.move(e);
			return;
		}
		if(cell.x>=Sy_api.api_getMapWidth()||cell.y>=Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			console.log("cell out of bounds: ",cell.x,cell.y);
			return;
		}
		Sy_api.api_tgt_selectTarget(cell.x,cell.y,ui_displayMove.getPath());
		ui_displayMove.clearPath();
	}
}

export {ui_selectTarget};