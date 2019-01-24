import {RenderItemBase, RenderItemConstructor} from "../RenderItemBase";
import {StormObject} from "../../Widgets/StormObject";
import {Behaviour} from "../../Behaviours";
import {CallMapper} from "../../Mapper";
import {RendererType} from "./RendererType";
import {Enviroment} from "../../../Components/Enviroment";
import {RendererPanel} from "./RendererPanel";

export class RendererEmpty extends Behaviour {
	rendererPanel: RendererPanel | undefined;

	awake () {
		const renderer = this.stormObject.getParentRenderer();

		if (renderer == undefined) {
			return;
		}

		if (renderer instanceof RendererPanel) {
			this.rendererPanel = renderer;
		} else {
			this.rendererPanel = renderer.rendererPanel;
		}
	}

	setStromObject (stromObject: StormObject) {
		this.stormObject = stromObject;
		this.transform = stromObject.transfrom;
	}

	renderItem (): RenderItemBase {
		const constructor = CallMapper<RenderItemConstructor>(
			RendererType.Empty,
			Enviroment.rendererTarget
		);
		const element = new constructor();

		return element;
	}
}