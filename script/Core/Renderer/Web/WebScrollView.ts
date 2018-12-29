import { WebItemBase } from "./WebItemBase";
import { StyleAttributes } from "../../Attributes/StyleAttributes";

import { Action } from "../../Action/Action";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";
import { RendererBase } from "../Virtual/RendererBase";
import { RendererScrollView } from "../Virtual/RendererScrollView";

@DefineMapper(RendererType.ScrollView, RendererTarget.Web)
export class WebScrollView extends WebItemBase {
	constructor() {
		super();
		this.element = document.createElement("div");
		this.initElement();
	}

	setRenderer(rendererBase: RendererBase) {
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
