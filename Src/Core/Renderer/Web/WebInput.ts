import { WebItemEmpty } from "./WebItemEmpty";
import { Action } from "../../Action/Action";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
import { RendererEmpty } from "../Virtual/RendererEmpty";
@DefineMapper(RendererType.Text, RendererTarget.Web)
export class WebInput extends WebItemEmpty {
	renderer: RendererEmpty;
	text = "";
	init() {
		this.element = document.createElement("input");
		this.initElement();
		this.element.oninput=(value)=>{
			console.log(value)
		}
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
		this.renderer = rendererBase;
	}

	setAction(action: Action) {}
}
