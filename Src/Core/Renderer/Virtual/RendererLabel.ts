import { RendererBase } from "./RendererBase";
import { RenderItemConstructor, RenderItemBase } from "../RenderItemBase";
import { CallMapper } from "../../Mapper";
import { Enviroment } from "../../../Components/Enviroment";
import { RendererType } from "./RendererType";
import { Color } from "../../Math/Color";

export const enum EVerticalAlign {
	top,
	center,
	bottom
}

export const enum EHorzontalAlign {
	left,
	center,
	right
}

export class RendererLabel extends RendererBase {
	text: string = "";
	color: Color = new Color();
	verticalAlign: EVerticalAlign = EVerticalAlign.center;
	horzontalAlign: EHorzontalAlign = EHorzontalAlign.center;

	renderItem(): RenderItemBase {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Label,
			Enviroment.rendererTarget
		);
		let element = new constructor();

		return element;
	}
}
