import {Enviroment} from "../../../Components/Enviroment";
import {CallMapper} from "../../Mapper";
import {Color} from "../../Math/Color";
import {RenderItemBase, RenderItemConstructor} from "../RenderItemBase";
import {RendererEmpty} from "./RendererEmpty";
import {RendererType} from "./RendererType";

export class RendererPanel extends RendererEmpty {
	depth: number = 0;

	background: Color = new Color();

	isScrollable:boolean=false

	renderItem (): RenderItemBase {
		const constructor = CallMapper<RenderItemConstructor>(
			RendererType.Panel,
			Enviroment.rendererTarget
		);
		const element = new constructor();

		return element;
	}
}