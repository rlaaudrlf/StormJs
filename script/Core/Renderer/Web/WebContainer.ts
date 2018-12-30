import { WebItemBase } from "./WebItemBase";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
import { RendererContainer } from "../Virtual/RendererContainer";
import { RendererBase } from "../Virtual/RendererBase";
import { Vector2 } from "../../Math/Vector2";

@DefineMapper(RendererType.Container, RendererTarget.Web)
export class WebContainer extends WebItemBase {
	renderer: RendererContainer;
	constructor() {
		super();
		this.element = document.createElement("div");
		this.initElement();
	}

	setScale(scale: Vector2) {
		let borderSize = 0;
		if (this.renderer != null && this.renderer.border != null) {
			borderSize = this.renderer.border.size;
		}

		if (this.isValidateValue("width", scale.x - borderSize * 2)) {
			this.element.style.width = (scale.x - borderSize * 2).toString();
		}

		if (this.isValidateValue("height", scale.y - borderSize * 2)) {
			this.element.style.height = (scale.y - borderSize * 2).toString();
		}
	}

	setRenderer(rendererBase: RendererBase) {
		let renderer = <RendererContainer>rendererBase;
		this.renderer = renderer;

		if (
			this.isValidateValue(
				"background",
				"#" + renderer.background.getHexString()
			)
		) {
			this.element.style.background = "#" + renderer.background.getHexString();
		}

		if (this.isValidateValue("border", renderer.border)) {
			let border = renderer.border;
			this.element.style.borderWidth = border.size.toString();
			this.element.style.borderStyle = "solid";
			this.element.style.width = (
				this.element.offsetWidth -
				border.size * 2
			).toString();
			this.element.style.height = (
				this.element.offsetHeight -
				border.size * 2
			).toString();
			this.element.style.borderColor = "#" + border.color.getHexString();
		}
	}
}
