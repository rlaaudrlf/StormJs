import {StormObject} from "../../Core/Widgets/StormObject";
import {RendererLabel} from "../../Core/Renderer/Virtual/RendererLabel";
import {EBorder} from "../../Core/Widgets/Anchor";
import {RendererScrollView} from "../../Core/Renderer/Virtual/RendererScrollView";
import {
	Border,
	RendererContainer
} from "../../Core/Renderer/Virtual/RendererContainer";
import {ComponentFile} from "./ComponentFile";
import {List} from "../../Components/BasicComponents/List";
import {MathEx} from "../../Core/Math/MathEx";
export class FileDisplayer {
	init (parent: StormObject) {
		const container = new StormObject();

		container.setRenderer(RendererContainer);
		container.transfrom.Parent = parent.transfrom;
		container.getRenderer<RendererContainer>().background.setHex(0x252526);
		const border = new Border();

		container.getRenderer<RendererContainer>().border = border;
		border.color.setHex(0x353536);
		container.transfrom.anchor.top.target = parent.transfrom;
		container.transfrom.anchor.left.target = parent.transfrom;
		container.transfrom.anchor.right.target = parent.transfrom;
		container.transfrom.Height = 30;

		const label = new StormObject();

		label.setRenderer(RendererLabel);

		label.transfrom.Parent = parent.transfrom;
		label.getRenderer<RendererLabel>().text = "文件";
		label.transfrom.anchor.top.target = parent.transfrom;
		label.transfrom.Height = 30;
		label.transfrom.anchor.left.target = parent.transfrom;
		label.transfrom.anchor.right.target = parent.transfrom;

		const scroll = new StormObject();

		scroll.setRenderer(RendererScrollView);
		scroll.transfrom.anchor.top.target = label.transfrom;
		scroll.transfrom.anchor.top.border = EBorder.bottom;
		scroll.transfrom.anchor.bottom.target = parent.transfrom;
		scroll.transfrom.anchor.left.target = parent.transfrom;
		scroll.transfrom.anchor.right.target = parent.transfrom;
		scroll.transfrom.Parent = parent.transfrom;
		scroll.getRenderer<RendererScrollView>().showVerticalScrolBar = true;
		scroll.getRenderer<RendererScrollView>().background.setHex(0x252526);

		const list = new StormObject();
		const bList = list.addBehaviour<List>(List);
		const cmpFile = list.addBehaviour<ComponentFile>(ComponentFile);

		console.log(MathEx.getPercentage(1, 10, 2));
		console.log(MathEx.getPercentage(10, 1, 2));
		list.transfrom.Parent = scroll.transfrom;
	}
}