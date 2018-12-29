import { WebItemBase } from "./WebItemBase";
import { StyleAttributes } from "../../Attributes/StyleAttributes";
import { Action } from "../../Action/Action";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
@DefineMapper(RendererType.Image, RendererTarget.Web)
export class WebImage extends WebItemBase {
	src: string = "";
	img: HTMLElement;
	constructor() {
		super();
		this.element = document.createElement("div");
		this.img = document.createElement("img");
		this.initElement();
	}

	initElement() {
		this.element.style.position = "absolute";
		this.element.style.width = "100";
		this.element.style.height = "100";

		this.img.style.position = "absolute";
		this.img.style.width = "100%";
		this.img.style.height = "100%";
		this.img.style.margin = "0";
		this.img.style.padding = "0";
		this.element.appendChild(this.img);

		this.childNode = document.createElement("div");
		this.childNode.style.position = "relative";
		this.childNode.style.margin = "0";
		this.childNode.style.padding = "0";
		this.childNode.style.width = "100%";
		this.childNode.style.height = "100%";
		this.element.appendChild(this.childNode);
	}

	SetData(data: any) {
		if (data == this.src) {
			return;
		}
		this.src = data;
		this.img.setAttribute("src", this.src);
	}
}
