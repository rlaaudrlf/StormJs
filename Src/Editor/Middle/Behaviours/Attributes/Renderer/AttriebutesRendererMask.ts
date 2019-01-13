import { StormObject } from "../../../../../Core/Widgets/StormObject";
import { Transform } from "../../../../../Core/Attributes/Transform";
import { Renderer } from "../../../../../Core/Renderer/Renderer";
import { RendererText } from "../../../../../Core/Renderer/Virtual/RendererText";
import { AutoResizer } from "../../../../../Components/BasicComponents/AutoResizer";
import {
	RendererContainer,
	Border
} from "../../../../../Core/Renderer/Virtual/RendererContainer";
import { LayoutStack } from "../../../../../Components/BasicComponents/LayoutStack";
import { ListAlignment } from "../../../../../Core/Widgets/ListAlignment";
import { Vector2 } from "../../../../../Core/Math/Vector2";
import { RendererLabel } from "../../../../../Core/Renderer/Virtual/RendererLabel";
import { Label } from "../../../../../Components/BasicComponents/Label";
import { DefineAttributesRenderer } from "../../AttributesRenderer";
import { RendererMask } from '../../../../../Core/Renderer/Virtual/RendererMask';
import { AttributesBase } from './AttributesBase';

@DefineAttributesRenderer(RendererMask)
export class AttriebutesRendererMask extends AttributesBase {
	namearea;
	render(transform: Transform, render: RendererMask) {
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
