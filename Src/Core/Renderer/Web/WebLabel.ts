import { WebItemEmpty } from "./WebItemEmpty";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
import { RendererEmpty } from "../Virtual/RendererEmpty";
import {
	RendererLabel,
	EVerticalAlign,
	EHorzontalAlign
} from "../Virtual/RendererLabel";
@DefineMapper(RendererType.Label, RendererTarget.Web)
export class WebLabel extends WebItemEmpty {
	cache = {};
	labelElement: HTMLElement;
	init() {
		this.element = document.createElement("div");

		this.labelElement = document.createElement("div");
		this.element.appendChild(this.labelElement);
		this.labelElement.style.padding = "0";
		this.labelElement.style.margin = "0";
		this.labelElement.style.position = "relative";
		this.initElement();

	}

	setStyle() {}

	setRenderer(rendererBase: RendererEmpty) {
		let renderer = <RendererLabel>rendererBase;
		if (this.isValidateValue("text", renderer.text)) {
			let text = renderer.text;
			this.labelElement.textContent = text;
		}

		if (this.isValidateValue("height", this.element.offsetHeight)) {
			let verticalAlign = renderer.verticalAlign;
			let offset = this.element.offsetHeight - this.labelElement.offsetHeight;
			if (verticalAlign == EVerticalAlign.center) {
				if (offset > 0) {
					this.labelElement.style.top = (offset * 0.5).toString();
				} else {
					this.labelElement.style.top = "0";
				}
			} else if (verticalAlign == EVerticalAlign.top) {
				this.labelElement.style.top = "0";
			} else if (verticalAlign == EVerticalAlign.bottom) {
				if (offset > 0) {
					this.labelElement.style.top = offset.toString();
				} else {
					this.labelElement.style.top = "0";
				}
			}
		}

		let horzontalAlign = renderer.horzontalAlign;

		if (this.isValidateValue("horzontalAlign", renderer.horzontalAlign)) {
			if (horzontalAlign == EHorzontalAlign.center) {
				this.labelElement.style.textAlign = "center";
			} else if (horzontalAlign == EHorzontalAlign.left) {
				this.labelElement.style.textAlign = "left";
			} else if (horzontalAlign == EHorzontalAlign.right) {
				this.labelElement.style.textAlign = "right";
			}
		}

		if (this.isValidateValue("color", "#" + renderer.color.getHexString())) {
			this.labelElement.style.color = "#" + renderer.color.getHexString();
		}
	}
}
