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
import { RenderItemBase } from "../../../Core/Renderer/RenderItemBase";
import { ListAlignment } from "../../../Core/Widgets/ListAlignment";
import { RendererButton } from "../../../Core/Renderer/Virtual/RendererButton";
import { serialize } from "../../../Core/SerializeHelper";
import { RendererLabel } from "../../../Core/Renderer/Virtual/RendererLabel";
import { Label } from "../../../Components/BasicComponents/Label";
import { Button } from "../../../Components/BasicComponents/Button";
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

		let stormStack: StormStackList = stormObject.getBehaviour(StormStackList);

		let item = new StormObject();
		let label = new StormObject();

		label.transfrom.Parent = item.transfrom;
		label.transfrom.Width = 100;
		label.transfrom.Height = 30;

		label.setRenderer(RendererLabel);
		label.addBehaviour(Label);

		item.setRenderer(RendererButton);
		item.addBehaviour(Button);
		item.getBehaviour<Button>(Button).label = label.getBehaviour(Label);

		stormStack.item = item;
		stormStack.alignment = ListAlignment.column;
		console.log(item)

		stormStack.size = 30;
		stormStack.setCompData([1, 2, 3, 4]);


		this.panel = background;

		stormObject.getRenderer<RendererContainer>().background.setHex(0x000000);
	}
}
