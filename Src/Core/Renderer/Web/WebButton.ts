import { WebItemBase } from "./WebItemBase";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";

@DefineMapper(RendererType.Button, RendererTarget.Web)
export class WebButton extends WebItemBase {
	constructor() {
		super();
		this.element = document.createElement("button");
		this.initElement();
	}
}
