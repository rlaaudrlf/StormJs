import { ComponentBase } from "../../../Components/BasicComponents/ComponentsBase";
import { IMouseDown } from "../../../Core/Input";
import { InputEvent } from "../../../Core/InputEvent";
import { StormObject } from "../../../Core/Widgets/StormObject";
import { RendererContainer } from "../../../Core/Renderer/Virtual/RendererContainer";
import { StormStackList } from "../../../Components/BasicComponents/StormStackList";
export class BehaviourHierachy extends ComponentBase implements IMouseDown {
	panel: StormObject;
	onMouseDown(inputEvent: InputEvent) {
		if (this.panel != undefined) {
			this.panel.destroy();
		}
		let stormObject: StormObject = new StormObject();
		stormObject.setRenderer(RendererContainer);
		stormObject.addBehaviour(StormStackList);
		stormObject.transfrom.Parent = this.transform;

		let stormStack = stormObject.getBehaviour(StormStackList);

		this.panel = stormObject;

		stormObject.getRenderer<RendererContainer>().background.setHex(0x000000);

		console.log(inputEvent);
	}
}