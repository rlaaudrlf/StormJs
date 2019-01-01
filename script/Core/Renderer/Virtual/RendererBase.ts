import { RenderItemBase } from "../RenderItemBase";
import { Action } from "../../Action/Action";
import { StormObject } from "../../Widgets/StormObject";
import { Behaviour } from "../../Behaviours";
import { GUID } from "../../Widgets/DeepCloner";

export class RendererBase extends Behaviour {
	action: Action = new Action();
	stormObject: StormObject | undefined = undefined;
	width: number = 100;
	height: number = 100;
	hash: GUID = new GUID();

	setStromObject(stromObject: StormObject) {
		this.stormObject = stromObject;
		this.transform = stromObject.transfrom;
	}

	renderItem(): RenderItemBase {
		return undefined;
	}
}
