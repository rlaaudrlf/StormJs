import { WebItemBase } from "./WebItemBase";
import { StyleAttributes } from "../../Attributes/StyleAttributes";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
@DefineMapper(RendererType.Page, RendererTarget.Web)
export class WebPage extends WebItemBase {
	constructor() {
		super();
		this.element = document.createElement("div");
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		this.element.style.margin = "0";
		this.element.style.padding = "0";
		this.initElement();
	}
}
