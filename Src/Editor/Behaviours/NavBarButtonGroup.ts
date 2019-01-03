import { Behaviour } from "../../Core/Behaviours";
import { StormStackList } from "../../Components/BasicComponents/StormStackList";
import { StormObject } from "../../Core/Widgets/StormObject";
import { RendererButton } from "../../Core/Renderer/Virtual/RendererButton";
export class Behaviourtest extends Behaviour {
	isDown = 3;
	stackList: StormStackList;
	awake() {
		this.stackList = this.stormObject.getBehaviour(StormStackList);
		let obj = new StormObject();
		obj.name = "123";
		obj.setRenderer(RendererButton);
		this.stackList.item = obj;
		let data = ["min", "max", "close"];
		this.stackList.padding = 2;
		this.stackList.size = 30;
		this.stackList.onItemClick.Regist((target, data) => {
			if (data == "min") {
				const { ipcRenderer } = require("electron");
				ipcRenderer.send("hide-window");
			} else if (data == "max") {
				const { ipcRenderer } = require("electron");
				ipcRenderer.send("show-window");
			} else {
				const { ipcRenderer } = require("electron");
				ipcRenderer.send("window-all-closed");
			}
		},null);

		this.stackList.setCompData(data);
		this.transform.anchor.left.value = 94;
	}
}
