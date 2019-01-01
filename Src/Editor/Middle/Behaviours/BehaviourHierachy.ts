import { StormComponent } from "../../../Core/StormComponent";
import { IMouseDown } from "../../../Core/Input";
import { InputEvent } from "../../../Core/InputEvent";
import { StormObject } from "../../../Core/Widgets/StormObject";
import { RendererContainer } from "../../../Core/Renderer/Virtual/RendererContainer";
import { StormStackList } from "../../../Components/BasicComponents/StormStackList";
import { PanelMain } from "../../PanelMain";
import { Vector2 } from "../../../Core/Math/Vector2";
export class BehaviourHierachy extends StormComponent implements IMouseDown {
	panel: StormObject;
	onMouseDown(inputEvent: InputEvent) {
		if (this.panel != undefined) {
			this.panel.destroy();
			this.panel = undefined;
			return;
		}
		let stormObject: StormObject = new StormObject();
		stormObject.setRenderer(RendererContainer);
		stormObject.addBehaviour(StormStackList);
		stormObject.transfrom.Parent = PanelMain.maskLayer.transfrom;
		stormObject.transfrom.LocalPositon = new Vector2(500, 100);

		let stormStack = stormObject.getBehaviour(StormStackList);

		this.panel = stormObject;

		stormObject.getRenderer<RendererContainer>().background.setHex(0x000000);

		console.log(inputEvent);
	}
}
