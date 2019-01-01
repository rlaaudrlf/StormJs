import { WebItemEmpty } from "./WebItemEmpty";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
import { RendererEmpty } from "../Virtual/RendererEmpty";
import { RendererScrollView } from "../Virtual/RendererScrollView";

@DefineMapper(RendererType.ScrollView, RendererTarget.Web)
export class WebScrollView extends WebItemEmpty {
	init() {
		this.element = document.createElement("div");
		this.initElement();
	}

	setRenderer(rendererBase: RendererEmpty) {
		let renderer = <RendererScrollView>rendererBase;
		let showVerticalScrolBar = <boolean>rendererBase["showVerticalScrolBar"];
		let showHorizontalScrolBar = <boolean>(
			rendererBase["showHorizontalScrolBar"]
		);
		if (this.isValidateValue("showVerticalScrolBar", showVerticalScrolBar)) {
			if (showVerticalScrolBar) {
				this.element.style.overflowY = "scroll";
			} else {
				this.element.style.overflowY = "hidden";
			}
		}

		if (
			this.isValidateValue("showHorizontalScrolBar", showHorizontalScrolBar)
		) {
			if (showHorizontalScrolBar) {
				this.element.style.overflowX = "scroll";
			} else {
				this.element.style.overflowX = "hidden";
			}
		}

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
