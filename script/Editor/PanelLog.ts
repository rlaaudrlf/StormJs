import { consoleUtils } from "../Core/Utils/ConsoleUtils";

export class PanelLog {
	element: HTMLElement = <any>null;
	SetDiv(element: HTMLElement) {
		this.element = element;
		consoleUtils.console.RegistLog(msg => {
			this.handleLog(msg);
		});
	}

	handleLog(msg: any) {
		let item = document.createElement("text");
		item.textContent = msg;
		this.element.appendChild(item);
	}
}
