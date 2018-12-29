import { ComponentBase } from "./ComponentsBase";
import { DoubleBind } from "../../Core/DoubleBind";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
export class Label extends ComponentBase {
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
