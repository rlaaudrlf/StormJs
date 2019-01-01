import { CallMapper } from "../../Mapper";
import {
	RenderItemConstructor,
	RenderItemBase
} from "../RenderItemBase";
import { Enviroment } from "../../../Components/Enviroment";
import { RendererEmpty } from "./RendererEmpty";
import { RendererType } from "./RendererType";

export class RendererText extends RendererEmpty {
	text: string = "";

	renderItem(): RenderItemBase {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Text,
			Enviroment.rendererTarget
		);
		let element = new constructor();

		return element;
	}
}
