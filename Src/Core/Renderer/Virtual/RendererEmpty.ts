import { RenderItemBase, RenderItemConstructor } from "../RenderItemBase";
import { StormObject } from "../../Widgets/StormObject";
import { Behaviour } from "../../Behaviours";
import { CallMapper } from "../../Mapper";
import { RendererType } from "./RendererType";
import { Enviroment } from "../../../Components/Enviroment";

export class RendererEmpty extends Behaviour {
	setStromObject(stromObject: StormObject) {
		this.stormObject = stromObject;
		this.transform = stromObject.transfrom;
	}

	renderItem(): RenderItemBase {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.Empty,
			Enviroment.rendererTarget
		);
		let element = new constructor();

		return element;
	}
}
