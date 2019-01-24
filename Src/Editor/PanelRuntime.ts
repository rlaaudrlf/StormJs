import { GlobalData } from "../Storage";
import { Inject } from "./Core/Decorators/Inject";
export class PanelRuntime {
	@Inject(GlobalData)
	globalData:GlobalData
	element: HTMLElement | null = null;
	SetDiv(element: HTMLElement) {
		this.element = element;
	}

	public Load() {
		let frame = document.createElement("iframe");
		frame.style.width = "100%";
		frame.style.height = "100%";
		frame.setAttribute("src", this.globalData.tempPath + "/index.html");

		if (this.element == null) {
			return;
		}

		this.element.appendChild(frame);
	}
}
