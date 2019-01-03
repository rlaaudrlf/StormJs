import { StormComponent } from "../../Core/StormComponent";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
import { HierachyItem } from "../HierachyItem";

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
