
import { Sy_api } from "../state/api.mjs";
import { Renderer } from "../renderer/renderer.mjs";
import { ui_background } from "./ui_background.mjs";
import { ui_displayMove } from "./ui_displayMove.mjs";
import { ui_idle } from "./ui_idle.mjs";
import { Audio,BGM,SFX } from "../renderer/audio.mjs";

class ui_selectTarget{
	static draw(ctx){
		ui_background.draw(ctx);
		//draw highlighted character atk grid 
		ui_idle.drawHighlightedCharacters(ctx);
	}
	static click(e){
		const cell = Renderer.getMouseCellTileOrIso(Sy_api.api_getMapWidth(),Sy_api.api_getMapHeight());
		if(e.button == 2){//right click
			Sy_api.api_tgt_cancel();
			ui_displayMove.move(e);
			Audio.PlaySFX(SFX.cursorCancel);
			return;
		}
		if(cell.x>=Sy_api.api_getMapWidth()||cell.y>=Sy_api.api_getMapHeight()||cell.x<0||cell.y<0){
			Sy_api.api_tgt_cancel();
			ui_displayMove.clearPath();//cancel all the way back to idle?
			Sy_api.api_mov_cancel();
			Audio.PlaySFX(SFX.cursorCancel);
			return;
		}
		if(!Sy_api.api_isValidTargetCell(cell.x,cell.y)){
			Sy_api.api_tgt_cancel();
			ui_displayMove.clearPath();//cancel all the way back to idle?
			Sy_api.api_mov_cancel();
			Audio.PlaySFX(SFX.cursorCancel);
		}
		Sy_api.api_tgt_selectTarget(cell.x,cell.y,ui_displayMove.getPath());
		ui_displayMove.clearPath();
		Audio.PlaySFX(SFX.cursorSelect);
	}
}

export {ui_selectTarget};