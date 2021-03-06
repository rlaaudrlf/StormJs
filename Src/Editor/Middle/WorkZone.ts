import { StormObject } from "../../Core/Widgets/StormObject";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
import { RendererScrollView } from "../../Core/Renderer/Virtual/RendererScrollView";
import { EBorder } from "../../Core/Widgets/Anchor";
import {
	RendererContainer,
	Border
} from "../../Core/Renderer/Virtual/RendererContainer";
import { Vector2 } from "../../Core/Math/Vector2";
import { BehaviourWorkZone } from "./Behaviours/BehaviourWorkZone";
import { EventManager } from "../../Core/EventManager";
import { RendererText } from "../../Core/Renderer/Virtual/RendererText";
import { serialize } from "../../Core/SerializeHelper";
import { Serializer } from "../../Core/Serializer";
import { writeFileSync } from "fs";
export class WorkZone {
	onItemClick: EventManager = new EventManager();
	init(parent: StormObject) {
		let container = new StormObject();
		container.setRenderer(RendererContainer);
		container.transfrom.Parent = parent.transfrom;
		container.getRenderer<RendererContainer>().background.setHex(0x252526);
		let border = new Border();
		container.getRenderer<RendererContainer>().border = border;
		border.color.setHex(0x353536);
		container.transfrom.anchor.top.target = parent.transfrom;
		container.transfrom.anchor.left.target = parent.transfrom;
		container.transfrom.anchor.right.target = parent.transfrom;
		container.transfrom.Height = 30;

		let label = new StormObject();
		label.setRenderer(RendererLabel);

		label.transfrom.Parent = parent.transfrom;
		label.getRenderer<RendererLabel>().text = "拖放区";
		label.getRenderer<RendererLabel>().color.setHex(0xeeeeee);
		label.transfrom.anchor.top.target = parent.transfrom;
		label.transfrom.Height = 30;
		label.transfrom.anchor.left.target = parent.transfrom;
		label.transfrom.anchor.right.target = parent.transfrom;

		let scroll = new StormObject();
		scroll.setRenderer(RendererScrollView);
		scroll.transfrom.anchor.top.target = label.transfrom;
		scroll.transfrom.anchor.top.border = EBorder.bottom;
		scroll.transfrom.anchor.bottom.target = parent.transfrom;
		scroll.transfrom.anchor.left.target = parent.transfrom;
		scroll.transfrom.anchor.right.target = parent.transfrom;
		scroll.transfrom.Parent = parent.transfrom;
		scroll.getRenderer<RendererScrollView>().showVerticalScrolBar = true;
		scroll.getRenderer<RendererScrollView>().showHorizontalScrolBar = true;
		scroll.getRenderer<RendererScrollView>().background.setHex(0x252526);
		scroll.addBehaviour(BehaviourWorkZone);

		let a = scroll.getBehaviour<BehaviourWorkZone>(BehaviourWorkZone);
		a.onItemClick.Regist((sender, data) => {
			this.onItemClick.Call(this, data);
		}, null);

		let test = new StormObject();
		test.transfrom.Parent = scroll.transfrom;
		test.transfrom.LocalPositon = new Vector2(10, 10);
		test.setRenderer(RendererContainer);

		test = new StormObject();
		test.transfrom.Parent = scroll.transfrom;
		test.transfrom.LocalPositon = new Vector2(100, 10);
		test.setRenderer(RendererText);
		test.name = "11123";

		let c = Serializer.Serialize(test);
		console.log(c);

		writeFileSync("d:\\test.json", JSON.stringify(c));
		console.log(Serializer.Deserialize(JSON.parse(JSON.stringify(c))))

		console.log(JSON.parse(JSON.stringify(c)))
	}
}
