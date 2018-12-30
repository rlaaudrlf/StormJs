import { PanelComponent } from "./Editor/PanelComponent";
import { PanelWorking } from "./Editor/PanelWorking";
import { PanelAttribute } from "./Editor/PanelAttributes";
import { ToolBar } from "./toorbar";
import { PanelRoot } from "./Editor/panelRoot";
import { consoleUtils } from "./Core/Utils/ConsoleUtils";
import { PanelLog } from "./Editor/PanelLog";
import { PanelRuntime } from "./Editor/PanelRuntime";
import { PanelExplorer } from "./Editor/PanelExplorer/PanelExplorer";
import { PanelMain } from './Editor/PanelMain';
import { ElementBase } from './Components/ElementBase';
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
