import { StormComponent } from "../../Core/StormComponent";
import { DoubleBind } from "../../Core/DoubleBind";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
import { GUID } from "../../Core/Utils/GUID";
export class Label extends StormComponent {
	text: string = "";
	label: RendererLabel;

	awake() {
		super.awake();
		this.label = this.stormObject.getRenderer<RendererLabel>();
	}

	setData(data: any) {}

	setCompData(data: any) {
		if (this.label == undefined) {
			this.awake();
		}
		this.text = data;
		this.label.text = this.text;
	}
}
