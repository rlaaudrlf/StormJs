import { Transform } from "../../../Core/Attributes/Transform";
import { StormObject } from "../../../Core/Widgets/StormObject";
import {
	RendererContainer,
	Border
} from "../../../Core/Renderer/Virtual/RendererContainer";
import { Vector2 } from "../../../Core/Math/Vector2";
import { Label } from "../../../Components/BasicComponents/Label";
import { RendererLabel } from "../../../Core/Renderer/Virtual/RendererLabel";
import { AutoResizer } from "../../../Components/BasicComponents/AutoResizer";
import { LayoutStack } from "../../../Components/BasicComponents/LayoutStack";
import { ListAlignment } from "../../../Core/Widgets/ListAlignment";
export class RendererAttributes {
	namearea;
	render(transform: Transform, obj: StormObject) {
		let render = obj.getRenderer();
		if (render != null) {
			let stack = new StormObject();
			stack.addBehaviour(AutoResizer);
			let currentHeight = 0;
			let container = stack.setRenderer(RendererContainer);
			stack.addBehaviour(LayoutStack);
			stack.getBehaviour<LayoutStack>(LayoutStack).alignment =
				ListAlignment.column;
			stack.addBehaviour(AutoResizer);
			stack.transfrom.Parent = transform;
			stack.transfrom.Width = 100;
			stack.transfrom.Height = 30 * 2;
			stack.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
			container.border = new Border();
			container.border.color.setHex(0xffffff);
			container.background.setHex(0x000000);
			stack.transfrom.anchor.left.target = transform;
			stack.transfrom.anchor.right.target = transform;
			let proto: Object = Reflect.getPrototypeOf(render);

			let sobj = new StormObject();
			let renderer = sobj.setRenderer(RendererLabel);
			sobj.transfrom.Parent = stack.transfrom;
			sobj.transfrom.Width = 100;
			sobj.transfrom.Height = 30;
			sobj.transfrom.LocalPositon = new Vector2(0, currentHeight);
			this.namearea = sobj.addBehaviour<Label>(Label);
			renderer.color.setHex(0xffffff);
			this.namearea.setCompData("renderer");

			sobj = new StormObject();
			renderer = sobj.setRenderer(RendererLabel);
			sobj.transfrom.Parent = stack.transfrom;
			sobj.transfrom.Width = 100;
			sobj.transfrom.Height = 30;
			sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
			this.namearea = sobj.addBehaviour<Label>(Label);
			renderer.color.setHex(0xffffff);
			this.namearea.setCompData("name:" + proto.constructor.name);
		}
	}
}
