import { StormComponent } from "../../../Core/StormComponent";
import { IMouseDown } from "../../../Core/Input";
import { InputEvent, MouseKey } from "../../../Core/InputEvent";
import { StormObject } from "../../../Core/Widgets/StormObject";
import { RendererContainer } from "../../../Core/Renderer/Virtual/RendererContainer";
import { StormStackList } from "../../../Components/BasicComponents/StormStackList";
import { PanelMain } from "../../PanelMain";
import { Vector2 } from "../../../Core/Math/Vector2";
import { PanelAttribute } from "../../PanelAttributes";
import { UIEventListhenner } from "../../../Components/BasicComponents/UIEventListhenner";
export class BehaviourHierachy extends StormComponent implements IMouseDown {
	panel: StormObject;
	onMouseDown(inputEvent: InputEvent) {
		if (inputEvent.mouseKey != MouseKey.right) {
			return;
		}
		let stormObject: StormObject = new StormObject();
		stormObject.setRenderer(RendererContainer);
		stormObject.addBehaviour(StormStackList);

		stormObject.transfrom.LocalPositon = new Vector2(
			inputEvent.x,
			inputEvent.y
		);

		let background: StormObject = new StormObject();
		background.transfrom.Parent = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.left.target = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.right.target = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.bottom.target = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.top.target = PanelMain.maskLayer.transfrom;

		stormObject.transfrom.Parent = background.transfrom;
		background.addBehaviour(UIEventListhenner);
		background
			.getBehaviour<UIEventListhenner>(UIEventListhenner)
			.OnMouseDown.Regist(() => {
				this.panel.destroy();
				this.panel = undefined;
			});

		let stormStack = stormObject.getBehaviour(StormStackList);

		this.panel = background;

		stormObject.getRenderer<RendererContainer>().background.setHex(0x000000);
	}
}
