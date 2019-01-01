import { CallMapper } from "../../Mapper";
import { Enviroment } from "../../../Components/Enviroment";
import { RenderItemConstructor } from "../RenderItemBase";
import { RendererEmpty } from "./RendererEmpty";
import { RendererType } from "./RendererType";
export class RendererButton extends RendererEmpty {
	renderItem() {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Button,
			Enviroment.rendererTarget
		);

		return new constructor();
	}
}
