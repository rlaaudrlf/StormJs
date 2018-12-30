import { StormObject } from "../../Core/Widgets/StormObject";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
import { RendererScrollView } from "../../Core/Renderer/Virtual/RendererScrollView";
import { EBorder } from "../../Core/Widgets/Anchor";
import {
	RendererContainer,
	Border
} from "../../Core/Renderer/Virtual/RendererContainer";
export class AttribbutesZone {
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
		label.getRenderer<RendererLabel>().text = "属性";
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
		scroll.getRenderer<RendererContainer>().background.setHex(0x252526);
	}
}
