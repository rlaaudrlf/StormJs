import { StormComponent } from "../../Core/StormComponent";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
import { HierachyItem } from "../HierachyItem";
import { RendererText } from "../../Core/Renderer/Virtual/RendererText";

export class Text extends StormComponent {
	text: string = "";
	renderer: RendererText;

	awake() {
		super.awake();
		this.renderer = this.stormObject.getRenderer<RendererText>();
	}

	setCompData(data: any) {
		if (this.renderer == undefined) {
			this.awake();
		}
		this.text = data;
		this.renderer.text = this.text;
	}
}
