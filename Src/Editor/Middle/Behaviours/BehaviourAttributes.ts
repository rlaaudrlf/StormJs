import { StormComponent } from "../../../Core/StormComponent";
import { Label } from "../../../Components/BasicComponents/Label";
import { StormObject } from "../../../Core/Widgets/StormObject";
import { RendererLabel } from "../../../Core/Renderer/Virtual/RendererLabel";
import { Vector2 } from "../../../Core/Math/Vector2";
export class BehaviourAttributes extends StormComponent {
	namearea: Label;
	transformArea: any;

	onFocustItem(item) {
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
		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("transform");

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("position:");

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData(
			"x:" + obj.transfrom.LocalPositon.x + " y:" + obj.transfrom.LocalPositon.y
		);

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("degree:" + obj.transfrom.LocalDegree);

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("scale:");

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData(
			"x:" + obj.transfrom.LocalScale.x + " y:" + obj.transfrom.LocalScale.y
		);

		sobj = new StormObject();
		renderer = sobj.setRenderer(RendererLabel);
		sobj.transfrom.Parent = this.transform;
		sobj.transfrom.Width = 100;
		sobj.transfrom.Height = 30;
		sobj.transfrom.LocalPositon = new Vector2(0, (currentHeight += 30));
		this.namearea = sobj.addBehaviour<Label>(Label);
		renderer.color.setHex(0xffffff);
		this.namearea.setCompData("renderer");

		let render = obj.getRenderer();
		if (render != null) {
			let proto: Object = Reflect.getPrototypeOf(render);

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
