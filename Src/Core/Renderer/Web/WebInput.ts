import { WebItemEmpty } from "./WebItemEmpty";
import { Action } from "../../Action/Action";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
@DefineMapper(RendererType.Text, RendererTarget.Web)
export class WebInput extends WebItemEmpty {
	text = "";
	init() {
		this.element = document.createElement("input");
		this.initElement();
	}

	SetData(data: any) {
		if (data == this.text) {
			return;
		}
		this.text = data;
		this.element.setAttribute("value", this.text);
	}

	setAction(action: Action) {}
}
