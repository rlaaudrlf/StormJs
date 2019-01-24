import {RendererEmpty} from "./RendererEmpty";
import {RenderItemBase, RenderItemConstructor} from "../RenderItemBase";
import {CallMapper} from "../../Mapper";
import {Enviroment} from "../../../Components/Enviroment";
import {RendererType} from "./RendererType";
import {Color} from "../../Math/Color";

export class Border {
	color: Color = new Color();

	size: number = 1;
}

class Shader {
	color: Color = new Color();

	size: number = 1;
}

export class RendererContainer extends RendererEmpty {
	background: Color = new Color();

	border: Border | null = null;

	shader: Shader = new Shader();

	renderItem (): RenderItemBase {
		const constructor = CallMapper<RenderItemConstructor>(
			RendererType.Container,
			Enviroment.rendererTarget
		);
		const element = new constructor();

		return element;
	}
}