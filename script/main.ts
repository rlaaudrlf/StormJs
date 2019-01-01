import { PanelComponent } from "./Editor/PanelComponent";
import { PanelWorking } from "./Editor/PanelWorking";
import { PanelAttribute } from "./Editor/PanelAttributes";
import { ToolBar } from "./toorbar";
import { PanelRoot } from "./Editor/panelRoot";
import { consoleUtils } from "./Core/Utils/ConsoleUtils";
import { PanelLog } from "./Editor/PanelLog";
import { PanelRuntime } from "./Editor/PanelRuntime";
import { PanelExplorer } from "./Editor/PanelExplorer/PanelExplorer";
import { PanelMain } from "./Editor/PanelMain";
import { ElementBase } from "./Components/ElementBase";
import { StormObject } from "./Core/Widgets/StormObject";
import { RendererContainer } from "./Core/Renderer/Virtual/RendererContainer";
import { WebRenderer } from "./Core/Renderer/Web/WebRenderer";
import { RendererPanel } from "./Core/Renderer/Virtual/RendererPanel";
import { RendererTarget } from "./Core/Renderer/RendererTarget";
import { Enviroment } from "./Components/Enviroment";
import { WebLoader } from "./Core/Renderer/Web/WebLoader";
import { Vector2 } from "./Core/Math/Vector2";
import { Behaviourtest } from "./Editor/Behaviours/NavBarButtonGroup";
import { StormStackList } from "./Components/BasicComponents/StormStackList";
import { EBorder } from "./Core/Widgets/Anchor";
require("./Core/Utils/ArrrayUtils");

export class Main {
	public panelComponent: PanelComponent;
	public panelWorking: PanelWorking;
	public panelAttribute: PanelAttribute;
	public panelRoot: PanelRoot;
	public toobar: ToolBar;
	public panelLog: PanelLog;
	public panelRuntime: PanelRuntime;
	public static main: Main;
	public panelExplorer: PanelExplorer;

	public start() {
		this.RegistTools();
		let panel=new PanelMain()
		panel.start(document.getElementById("middle"))


		// Enviroment.rendererTarget = RendererTarget.Web;
		// new WebLoader().load();

		// let panel = new StormObject();
		// panel.setRenderer(RendererPanel);
		// panel.getRenderer<RendererPanel>().background.setHex(0xff0000);

		// let a = new StormObject();
		// a.transfrom.Parent = panel.transfrom;
		// a.setRenderer(RendererContainer);
		// a.transfrom.WorldPosition = new Vector2(100, 10);
		// a.getRenderer<RendererContainer>().background.setHex(0x000000);

		// let b = new StormObject();
		// // b.setRenderer(RendererContainer);
		// b.transfrom.WorldPosition = new Vector2(200, 10);
		// b.transfrom.Parent = a.transfrom;
		// b.transfrom.anchor.left.target = panel.transfrom;
		// b.transfrom.anchor.left.border = EBorder.right;
		// b.transfrom.anchor.left.value = 320;
		// b.addBehaviour(StormStackList);
		// b.addBehaviour(Behaviourtest);

		// let webRenderer = new WebRenderer();
		// webRenderer.mount("middle");
		// webRenderer.Render(panel.getRenderer());

		// this.panelComponent = new PanelComponent();
		// this.panelWorking = new PanelWorking();
		// this.toobar = new ToolBar();
		// this.panelRoot = new PanelRoot();
		// const left = document.getElementById("left");
		// const middle = document.getElementById("middle");
		// const right = document.getElementById("right");
		// const tooBar = document.getElementById("toolbar");
		// const root = document.getElementById("dad");

		// const log = document.getElementById("log");
		// const runTime = document.getElementById("runTime");
		// this.panelRoot.SetDiv(root);
		// this.toobar.setDiv(tooBar);
		// this.panelComponent.SetDiv(left);
		// this.panelComponent.LoadComponent();
		// this.panelWorking.SetDiv(middle);
		// this.panelWorking.init();
		// this.panelAttribute = new PanelAttribute();
		// this.panelAttribute.setDiv(right);

		// this.panelExplorer = new PanelExplorer();
		// this.panelExplorer.start();
		// this.panelLog = new PanelLog();
		// this.panelLog.SetDiv(log);

		// this.panelRuntime = new PanelRuntime();
		// this.panelRuntime.SetDiv(runTime);

		// this.panelWorking.OnWorkItemClick((item: any) =>
		// 	this.HandlePanelWorkingItemClick(item)
		// );

		// Main.main = this;
	}

	private RegistTools() {
		consoleUtils.console.Start();
	}

	public HandlePanelWorkingItemClick(item: any) {
		this.panelAttribute.Update(item);
	}
}

var main = new Main();
main.start();
