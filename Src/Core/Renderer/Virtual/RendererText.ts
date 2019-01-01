import { CallMapper } from "../../Mapper";
import {
	RenderItemConstructor,
	RenderItemBase
} from "../RenderItemBase";
import { Enviroment } from "../../../Components/Enviroment";
import { RendererBase } from "./RendererBase";
import { RendererType } from "./RendererType";

export class RendererText extends RendererBase {
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
