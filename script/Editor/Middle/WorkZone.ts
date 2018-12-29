import { StormObject } from "../../Core/Widgets/StormObject";
import { RendererLabel } from "../../Core/Renderer/Virtual/RendererLabel";
import { RendererScrollView } from "../../Core/Renderer/Virtual/RendererScrollView";
import { EBorder } from "../../Core/Widgets/Anchor";
import { RendererContainer } from "../../Core/Renderer/Virtual/RendererContainer";
export class WorkZone {
	init(parent: StormObject) {
		let label = new StormObject();
		label.setRenderer(RendererLabel);

		label.transfrom.Parent = parent.transfrom;
		label.getRenderer<RendererLabel>().text = "拖放区";
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
	}
}
