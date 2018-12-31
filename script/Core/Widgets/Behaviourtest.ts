import { Behaviour } from "../Behaviours";
import { IClickable } from "../Input";
import { StormStackList } from "../../Components/BasicComponents/StormStackList";
import { StormObject } from "./StormObject";
import { RendererButton } from "../Renderer/Virtual/RendererButton";
export class Behaviourtest extends Behaviour implements IClickable {
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
			console.log(data);
		});
		this.stackList.setCompData(data);
		this.transform.anchor.left.value = 94;

		// this.stormObject.transfrom.localPosition = new Vector2(100, 10);
		// this.stormObject.transfrom.scale = new Vector2(100, 200);
	}

	update() {
		// this.stormObject.transfrom.rotation += 3;
		// this.stormObject.transfrom.localPosition.y += this.isDown;
		// if (this.transform.localPosition.y > 100) {
		// 	this.isDown = -3;
		// }
		// if (this.transform.localPosition.y < 0) {
		// 	this.isDown = 3;
		// }
	}

	onClick() {
		console.log(123);
	}
}
