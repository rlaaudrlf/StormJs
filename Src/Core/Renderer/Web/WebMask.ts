import { WebItemEmpty } from "./WebItemEmpty";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";

@DefineMapper(RendererType.Mask, RendererTarget.Web)
export class WebMask extends WebItemEmpty {
	renderer;
	init() {
		this.element = document.createElement("div");
		this.initElement();
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		this.element.style.margin = "0";
		this.element.style.padding = "0";
		this.element.style.pointerEvents = "none";
	}
}
