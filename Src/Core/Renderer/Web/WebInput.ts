import { WebItemEmpty } from "./WebItemEmpty";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
import { RendererEmpty } from "../Virtual/RendererEmpty";
import { RendererText } from "../Virtual/RendererText";
import { InputEvent } from "../../InputEvent";
@DefineMapper(RendererType.Text, RendererTarget.Web)
export class WebInput extends WebItemEmpty {
	renderer: RendererText;
	text = "";
	init() {
		this.element = document.createElement("input");
		this.initElement();
		this.element.oninput = (event: Event): void => {
			if (this.renderer != undefined) {
				this.renderer.text = (<HTMLInputElement>this.element).value;
				this.renderer.onValueChange.Call(this.renderer);
			}
		};
	}

	SetData(data: any) {
		if (data == this.text) {
			return;
		}
		this.text = data;
		this.element.setAttribute("value", this.text);
	}

	setRenderer(rendererBase: RendererEmpty) {
		super.setRenderer(rendererBase);
		this.renderer = <RendererText>rendererBase;
		this.text = this.renderer.text;

		if (this.isValidateValue("horzontalAlign", this.renderer.text)) {
			this.element.setAttribute("value", this.text);
		}
	}
}
