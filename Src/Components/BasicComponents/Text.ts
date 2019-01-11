import { StormComponent } from "../../Core/StormComponent";
import { RendererText } from "../../Core/Renderer/Virtual/RendererText";

export class Text extends StormComponent {
	text: string = "";
	renderer: RendererText;
	path = "";

	awake() {
		super.awake();
		this.renderer = this.stormObject.getRenderer<RendererText>();
		this.renderer.onValueChange.Regist(() => {
			this.text = this.renderer.text;
			this.onValueChange.Call(this, this.text);
		}, null);
	}

	setCompData(data: any) {
		if (this.renderer == undefined) {
			this.awake();
		}
		this.text = data;
		this.renderer.text = this.text;
	}
}
