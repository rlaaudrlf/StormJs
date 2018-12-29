import { CallMapper } from "../../Mapper";
import { Enviroment } from "../../../Components/Enviroment";
import { RenderItemConstructor } from "../RenderItemBase";
import { RendererBase } from "./RendererBase";
import { RendererType } from "./RendererType";
export class RendererButton extends RendererBase {
	renderItem() {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Button,
			Enviroment.rendererTarget
		);

		return new constructor();
	}
}
