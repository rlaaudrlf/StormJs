import { StormComponent } from "../../Core/StormComponent";
import { DoubleBind } from "../../Core/DoubleBind";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
export class Label extends StormComponent {
	text: string = "";
	label: RendererLabel;

	constructor() {
		super();
	}

	setData(data: any) {
		this.text = <string>DoubleBind.DataToBind(data);
		this.label.text = this.text;
	}
}
