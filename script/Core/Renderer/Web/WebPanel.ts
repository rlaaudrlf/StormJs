import { WebItemBase } from "./WebItemBase";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";

@DefineMapper(RendererType.Panel, RendererTarget.Web)
export class WebPanel extends WebItemBase {
	constructor() {
		super();
		this.element = document.createElement("div");
		this.initElement();
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		this.element.style.margin = "0";
		this.element.style.padding = "0";
	}
}
