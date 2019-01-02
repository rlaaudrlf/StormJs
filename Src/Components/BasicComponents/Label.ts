import { StormComponent } from "../../Core/StormComponent";
import { DoubleBind } from "../../Core/DoubleBind";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
import { GUID } from '../../Core/Utils/GUID';
export class Label extends StormComponent {
	text: string = "";
	label: RendererLabel;

	awake() {
		super.awake();
		this.label = this.stormObject.getRenderer<RendererLabel>();
	}

	setData(data: any) {
		this.text = <string>DoubleBind.DataToBind(data);
		this.label.text = this.text;
	}
}
