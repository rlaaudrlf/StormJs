import { RendererEmpty } from "./RendererEmpty";
import {
	RenderItemConstructor,
	RenderItemBase
} from "../RenderItemBase";
import { Enviroment } from "../../../Components/Enviroment";
import { CallMapper } from "../../Mapper";
import { DoubleBind } from "../../DoubleBind";
import { RendererType } from "./RendererType";
export class RendererImage extends RendererEmpty {
	src: string = "";
	renderItem(): RenderItemBase {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Image,
			Enviroment.rendererTarget
		);
		let element = new constructor();

		return element;
	}
}
