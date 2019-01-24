import { Transform } from "../../../Core/Attributes/Transform";
import { StormObject } from "../../../Core/Widgets/StormObject";

import { DefineAttributesRenderer, SelectRenderer } from "./AttributesRenderer";
export class RendererAttributes {
	namearea;
	render(transform: Transform, obj: StormObject) {
		let render = obj.getRenderer();
		if (render != null) {
			let proto = Reflect.getPrototypeOf(render);
			let value = SelectRenderer(proto.constructor);
			value["render"](transform, render);
		}
	}
}
