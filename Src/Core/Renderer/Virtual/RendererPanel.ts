import { RendererEmpty } from "./RendererEmpty";
import { RenderItemConstructor, RenderItemBase } from "../RenderItemBase";
import { CallMapper } from "../../Mapper";
import { Enviroment } from "../../../Components/Enviroment";
import { RendererType } from "./RendererType";
import { Color } from "../../Math/Color";

export class RendererPanel extends RendererEmpty {
	background: Color = new Color();
	renderItem(): RenderItemBase {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Panel,
			Enviroment.rendererTarget
		);
		let element = new constructor();

		return element;
	}
}
