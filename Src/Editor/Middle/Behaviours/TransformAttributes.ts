import { StormObject } from "../../../Core/Widgets/StormObject";
import {
	RendererContainer,
	Border
} from "../../../Core/Renderer/Virtual/RendererContainer";
import { Vector2 } from "../../../Core/Math/Vector2";
import { RendererLabel } from "../../../Core/Renderer/Virtual/RendererLabel";
import { Transform } from "../../../Core/Attributes/Transform";
import { Label } from "../../../Components/BasicComponents/Label";
import { LayoutStack } from "../../../Components/BasicComponents/LayoutStack";
import { AutoResizer } from "../../../Components/BasicComponents/AutoResizer";
import { ListAlignment } from "../../../Core/Widgets/ListAlignment";
import { RendererText } from "../../../Core/Renderer/Virtual/RendererText";
import { Input } from "../../../Core/Input";
import { Text } from "../../../Components/BasicComponents/Text";
import { RendererEmpty } from "../../../Core/Renderer/Virtual/RendererEmpty";
export class TransformAttributes {
	namearea;
	render(transform: Transform, obj: StormObject) {
		let stack = new StormObject();
		stack.transfrom.Parent = transform;
		stack.transfrom.anchor.left.target = transform;
		stack.transfrom.anchor.right.target = transform;
		let container = stack.setRenderer(RendererContainer);
		container.border = new Border();
		container.border.color.setHex(0xffffff);
		container.background.setHex(0x000000);
		stack.addBehaviour(LayoutStack);
		stack.getBehaviour<LayoutStack>(LayoutStack).alignment =
			ListAlignment.column;
		stack.addBehaviour(AutoResizer);

		let currentHeight = 0;
		let sobj = new StormObject();

		sobj = new StormObject();
		let renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = stack.transfrom;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, currentHeight);
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("transform");

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = stack.transfrom;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("position:");

		sobj = new StormObject();
		sobj.transfrom.Parent = stack.transfrom;
		sobj.transfrom.Height = 30;
		sobj.setRenderer(RendererEmpty);
		sobj.addBehaviour(LayoutStack);
		sobj.addBehaviour(AutoResizer);

		let bbb = new StormObject();
		renderer = bbb.setRenderer(RendererLabel);
		bbb.transfrom.Parent = sobj.transfrom;
		bbb.transfrom.Width = 30;
		bbb.transfrom.Height = 30;
		bbb.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = bbb.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("x:");

		let insobj = new StormObject();
		let rendererInput = insobj.setRenderer(RendererText);
		insobj.transfrom.Parent = sobj.transfrom;
		insobj.transfrom.Width = 30;
		insobj.transfrom.Height = 30;
		insobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = insobj.addBehaviour<Text>(Text);
		// rendererInput.color.setHex(0xffffff);
		this.namearea.setCompData(obj.transfrom.LocalPositon.x);

		bbb = new StormObject();
		renderer = bbb.setRenderer(RendererLabel);
		bbb.transfrom.Parent = sobj.transfrom;
		bbb.transfrom.Width = 30;
		bbb.transfrom.Height = 30;
		bbb.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = bbb.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("y");

		insobj = new StormObject();
		rendererInput = insobj.setRenderer(RendererText);
		insobj.transfrom.Parent = sobj.transfrom;
		insobj.transfrom.Width = 30;
		insobj.transfrom.Height = 30;
		insobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = insobj.addBehaviour<Text>(Text);
		// rendererInput.color.setHex(0xffffff);
		this.namearea.setCompData(obj.transfrom.LocalPositon.y);

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = stack.transfrom;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("degree:" + obj.transfrom.LocalDegree);

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = stack.transfrom;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("scale:");

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = stack.transfrom;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData(
			"x:" + obj.transfrom.LocalScale.x + " y:" + obj.transfrom.LocalScale.y
		);
	}
}
