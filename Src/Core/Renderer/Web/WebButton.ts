import { WebItemEmpty } from "./WebItemEmpty";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";

@DefineMapper(RendererType.Button, RendererTarget.Web)
export class WebButton extends WebItemEmpty {
	button: HTMLElement;

	init() {
		this.element = document.createElement("div");
		this.button = document.createElement("button");
		this.initElement();
	}

	initElement() {
		this.element.style.position = "absolute";
		this.element.style.width = "100";
		this.element.style.height = "100";

		this.button.style.position = "absolute";
		this.button.style.width = "100%";
		this.button.style.height = "100%";
		this.button.style.margin = "0";
		this.button.style.padding = "0";
		this.element.appendChild(this.button);

		this.childNode = document.createElement("div");
		this.childNode.style.position = "relative";
		this.childNode.style.margin = "0";
		this.childNode.style.padding = "0";
		this.childNode.style.width = "100%";
		this.childNode.style.height = "100%";
		this.element.appendChild(this.childNode);
	}
}
