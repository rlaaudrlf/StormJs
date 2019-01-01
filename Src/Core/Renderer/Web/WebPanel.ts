import { WebItemBase } from "./WebItemBase";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
import { RendererPanel } from "../Virtual/RendererPanel";
import { RendererBase } from "../Virtual/RendererBase";

@DefineMapper(RendererType.Panel, RendererTarget.Web)
export class WebPanel extends WebItemBase {
	renderer;
	constructor() {
		super();
		this.element = document.createElement("div");
		this.initElement();
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		this.element.style.margin = "0";
		this.element.style.padding = "0";
	}

	setRenderer(rendererBase: RendererBase) {
		let renderer = <RendererPanel>rendererBase;
		this.renderer = renderer;

		if (
			this.isValidateValue(
				"background",
				"#" + renderer.background.getHexString()
			)
		) {
			this.element.style.background = "#" + renderer.background.getHexString();
		}
	}
}
