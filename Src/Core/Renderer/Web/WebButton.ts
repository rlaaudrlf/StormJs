import { WebItemEmpty } from "./WebItemEmpty";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";

@DefineMapper(RendererType.Button, RendererTarget.Web)
export class WebButton extends WebItemEmpty {
	init() {
		this.element = document.createElement("button");
		this.initElement();
	}
}
