import { StormComponent } from "../../../Core/StormComponent";
import { Label } from "../../../Components/BasicComponents/Label";
import { StormObject } from "../../../Core/Widgets/StormObject";
import { RendererLabel } from "../../../Core/Renderer/Virtual/RendererLabel";
import { Vector2 } from "../../../Core/Math/Vector2";
import { LayoutStack } from "../../../Components/BasicComponents/LayoutStack";
import { TransformAttributes } from "./TransformAttributes";
import { ListAlignment } from "../../../Core/Widgets/ListAlignment";
import { RendererAttributes } from "./RendererAttributes";
import {
	RendererContainer,
	Border
} from "../../../Core/Renderer/Virtual/RendererContainer";
export class BehaviourAttributes extends StormComponent {
	namearea: Label;
	transformArea: any;

	awake() {
		this.stormObject.addBehaviour(LayoutStack);
		this.stormObject.getBehaviour<LayoutStack>(LayoutStack).alignment =
			ListAlignment.column;
	}

	onFocustItem(item) {
		for (const child of this.transform.Children) {
			child.StormObject.destroy();
		}

		let obj = <StormObject>item;

		let sobj = new StormObject();
		let renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("name:" + obj.name);

		let currentHeight = 0;
		let attributes = new TransformAttributes();
		attributes.render(this.transform, obj);

		let rendererAttributes = new RendererAttributes();
		rendererAttributes.render(this.transform, obj);

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("behaviours");

		let behaviours = obj.getBehaviours();

		for (const behaivour of behaviours) {
			let proto: Object = Reflect.getPrototypeOf(behaivour);

			sobj = new StormObject();
			renderer = sobj.setRenderer(RendererLabel);
			sobj.transfrom.Parent = this.transform;
			sobj.transfrom.Width = 100;
			sobj.transfrom.Height = 30;
			sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
			this.namearea = sobj.addBehaviour<Label>(Label);
			renderer.color.setHex(0xffffff);
			this.namearea.setCompData("name:" + proto.constructor.name);
		}
	}
}
