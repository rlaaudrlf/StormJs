import { StormObject } from "../../Core/Widgets/StormObject";
import {
	RendererLabel,
	EVerticalAlign
} from "../../Core/Renderer/Virtual/RendererLabel";
import { RendererScrollView } from "../../Core/Renderer/Virtual/RendererScrollView";
import { EBorder } from "../../Core/Widgets/Anchor";
import {
	RendererContainer,
	Border
} from "../../Core/Renderer/Virtual/RendererContainer";
import { ColorKeywords } from "../../Core/Math/Color";
export class Hierachy {
	init(parent: StormObject) {
		let container = new StormObject();
		container.setRenderer(RendererContainer);
		container.transfrom.Parent = parent.transfrom;
		container.getRenderer<RendererContainer>().background.setHex(0x00ff00);
		let border = new Border();
		container.getRenderer<RendererContainer>().border = border;
		border.color.setHex(ColorKeywords.red);
		container.transfrom.anchor.top.target = parent.transfrom;
		container.transfrom.Height = 30;

		let label = new StormObject();
		label.setRenderer(RendererLabel);
		label.transfrom.Parent = parent.transfrom;
		label.getRenderer<RendererLabel>().text = "控件";
		label.getRenderer<RendererLabel>().color.setHex(0x000000);
		label.transfrom.anchor.top.target = parent.transfrom;
		label.transfrom.Height = 30;
		label.getRenderer<RendererLabel>().verticalAlign = EVerticalAlign.center;

		let scroll = new StormObject();
		scroll.setRenderer(RendererScrollView);
		scroll.transfrom.anchor.top.target = label.transfrom;
		scroll.transfrom.anchor.top.border = EBorder.bottom;
		scroll.transfrom.anchor.bottom.target = parent.transfrom;
		scroll.transfrom.anchor.left.target = parent.transfrom;
		scroll.transfrom.anchor.right.target = parent.transfrom;
		scroll.transfrom.Parent = parent.transfrom;
		scroll.getRenderer<RendererScrollView>().showVerticalScrolBar = true;
		scroll.getRenderer<RendererScrollView>().background.setHex(0x252526);
	}
}
