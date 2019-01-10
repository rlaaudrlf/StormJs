import { StormObject } from "../../Core/Widgets/StormObject";
import { RendererContainer } from "../../Core/Renderer/Virtual/RendererContainer";
import { EBorder } from "../../Core/Widgets/Anchor";
import { Hierachy } from "./Hierachy";
import { WorkZone } from "./WorkZone";
import { AttribbutesZone } from "./AttribbutesZone";
import { InputEvent } from '../../Core/InputEvent';
export class MiddleArea {
	init(parent: StormObject) {
		let middle = new StormObject();
		let left = new StormObject();
		let right = new StormObject();
		middle.setRenderer(RendererContainer);
		left.setRenderer(RendererContainer);
		right.setRenderer(RendererContainer);

		middle.transfrom.Parent = parent.transfrom;
		left.transfrom.Parent = parent.transfrom;
		right.transfrom.Parent = parent.transfrom;

		left.transfrom.anchor.top.target = parent.transfrom;
		left.transfrom.anchor.bottom.target = parent.transfrom;
		left.transfrom.Width = 200;

		middle.transfrom.anchor.top.target = parent.transfrom;
		middle.transfrom.anchor.bottom.target = parent.transfrom;
		middle.transfrom.anchor.left.target = left.transfrom;
		middle.transfrom.anchor.left.border = EBorder.right;
		middle.transfrom.anchor.right.target = right.transfrom;
		middle.transfrom.anchor.right.border = EBorder.left;

		right.transfrom.anchor.top.target = parent.transfrom;
		right.transfrom.anchor.bottom.target = parent.transfrom;
		right.transfrom.anchor.right.target = parent.transfrom;
		right.transfrom.anchor.left.target = parent.transfrom;
		right.transfrom.anchor.left.border = EBorder.right;
		right.transfrom.anchor.left.value = 200;

		left.getRenderer<RendererContainer>().background.setHex(0x007acc);
		middle.getRenderer<RendererContainer>().background.setHex(0x252526);
		right.getRenderer<RendererContainer>().background.setHex(0x007acc);

		let hierachy = new Hierachy();
		hierachy.init(left);

		let workZone = new WorkZone();
		workZone.init(middle);

		let attribbutesZone = new AttribbutesZone();
		attribbutesZone.init(right);

		workZone.onItemClick.Regist((sender, data) => {
			attribbutesZone.onFocustItem((<InputEvent>data).objects[1]);
		}, null);
	}
}
