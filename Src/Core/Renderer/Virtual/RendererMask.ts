import { RendererEmpty } from "./RendererEmpty";
import { RenderItemConstructor, RenderItemBase } from "../RenderItemBase";
import { CallMapper } from "../../Mapper";
import { Enviroment } from "../../../Components/Enviroment";
import { RendererType } from "./RendererType";

export class RendererMask extends RendererEmpty {
	renderItem(): RenderItemBase {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Mask,
			Enviroment.rendererTarget
		);
		let element = new constructor();

		return element;
	}
}
