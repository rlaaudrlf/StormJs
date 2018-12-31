import { StormObject } from "../Core/Widgets/StormObject";
import { RendererTarget } from "../Core/Renderer/RendererTarget";
import { WebLoader } from "../Core/Renderer/Web/WebLoader";
import { RendererPanel } from "../Core/Renderer/Virtual/RendererPanel";
import { ColorKeywords } from "../Core/Math/Color";
import {
	RendererContainer,
	Border
} from "../Core/Renderer/Virtual/RendererContainer";
import { Behaviourtest } from "../Core/Widgets/Behaviourtest";
import { EBorder } from "../Core/Widgets/Anchor";
import { WebRenderer } from "../Core/Renderer/Web/WebRenderer";
import { MiddleArea } from "./Middle/MiddleArea";
import { BottomArea } from "./Bottom/BottomArea";
import { Enviroment } from "../Components/Enviroment";
import { StormStackList } from "../Components/BasicComponents/StormStackList";
import { Storm } from "../Core/Storm";
import { Behaviour } from "../Core/Behaviours";
import { TransFormAttributes } from "../Core/Attributes/Transform";
export class PanelMain {
	start(element: HTMLElement) {
		Enviroment.rendererTarget = RendererTarget.Web;
		new WebLoader().load();

		let panel = new StormObject();
		panel.setRenderer(RendererPanel);
		panel
			.getRenderer<RendererContainer>()
			.background.setHex(ColorKeywords.black);
		panel.name = "so";

		let navBar = new StormObject();
		navBar.transfrom.Parent = panel.transfrom;
		navBar.transfrom.Height = 30;
		navBar.transfrom.anchor.left.target = panel.transfrom;
		navBar.transfrom.anchor.right.target = panel.transfrom;
		navBar.setRenderer(RendererContainer);
		navBar.getRenderer<RendererContainer>().background.setHex(0x252526);
		panel.transfrom.appendChild(navBar.transfrom);

		let buttons = new StormObject();
		buttons.setRenderer(RendererContainer);
		buttons.transfrom.Parent = navBar.transfrom;
		buttons.transfrom.anchor.left.target = navBar.transfrom;
		buttons.transfrom.anchor.left.border = EBorder.right;
		buttons.transfrom.anchor.left.value = 320;
		buttons.transfrom.Height = 30;
		buttons.transfrom.anchor.right.target = navBar.transfrom;
		buttons.addBehaviour(Behaviourtest);
		buttons.addBehaviour(StormStackList);

		let middle = new StormObject();
		let bottom = new StormObject();
		let bottomBar = new StormObject();

		middle.setRenderer(RendererContainer);
		middle.transfrom.anchor.left.target = panel.transfrom;
		middle.transfrom.anchor.right.target = panel.transfrom;
		middle.transfrom.anchor.top.target = panel.transfrom;
		middle.transfrom.anchor.top.value = 30;
		middle.transfrom.anchor.bottom.target = panel.transfrom;
		middle.transfrom.anchor.bottom.border = EBorder.bottom;
		middle.transfrom.anchor.bottom.percentage = 0.4;
		middle
			.getRenderer<RendererContainer>()
			.background.setHex(ColorKeywords.bisque);

		bottom.setRenderer(RendererContainer);
		bottom.transfrom.anchor.left.target = panel.transfrom;
		bottom.transfrom.anchor.right.target = panel.transfrom;
		bottom.transfrom.anchor.top.target = middle.transfrom;
		bottom.transfrom.anchor.top.border = EBorder.bottom;
		bottom.transfrom.anchor.bottom.target = bottomBar.transfrom;
		bottom.transfrom.anchor.bottom.border = EBorder.top;
		bottom.getRenderer<RendererContainer>().background.setHex(0x252526);

		bottomBar.setRenderer(RendererContainer);
		bottomBar.transfrom.anchor.left.target = panel.transfrom;
		bottomBar.transfrom.anchor.right.target = panel.transfrom;
		bottomBar.transfrom.anchor.top.target = panel.transfrom;
		bottomBar.transfrom.anchor.top.border = EBorder.bottom;
		bottomBar.transfrom.anchor.top.value = 30;
		bottomBar.transfrom.anchor.bottom.target = panel.transfrom;
		bottomBar.getRenderer<RendererContainer>().background.setHex(0x007acc);

		middle.transfrom.Parent = panel.transfrom;
		bottom.transfrom.Parent = panel.transfrom;
		bottomBar.transfrom.Parent = panel.transfrom;

		let middleArea = new MiddleArea();
		middleArea.init(middle);

		let bottomArea = new BottomArea();
		bottomArea.init(bottom);

		let wr = new WebRenderer();
		wr.mount(element.id);
		wr.Render(panel.getRenderer());
	}
}
