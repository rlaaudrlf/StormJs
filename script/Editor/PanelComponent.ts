import { Component } from "../Components/Component";
import { ThemeLoader } from "./ResourceLoader/themeLoader";
import { ElementList } from "./ElementList";

export class PanelComponent {
	public element: HTMLElement = <any>null;
	public ul: HTMLElement = <any>null;
	public components: Array<Component> = new Array<Component>();

	public SetDiv(element: HTMLElement) {
		this.element = element;
		this.element.style.width = "200px";
		this.element.style.height = "100%";
		this.element.style.background = "#252526";
		const ul = document.createElement("ul");
		ul.style.height = "100%";
		ul.style.width = "100%";
		ul.style.listStyleType = "none";
		ul.style.margin = "0";
		ul.style.padding = "0";
		ul.style.overflowY = "scroll";
		this.ul = ul;
		this.element.appendChild(ul);
		this.element.style.margin = "0";
		this.element.style.padding = "0";
		// this.element.style.resize = "both";
		// this.element.style.border='1px solid '
		let el = new ElementList();
		el.onClick = name => {
			console.log(name);
			this.addItem(name);
		};

		el.Create(this.element);
	}

	public componentItems: Array<ComponentItem> = new Array<ComponentItem>();

	// public registComponent() {
	// 	this.components.push(new Label());
	// 	this.components.push(new Input());
	// 	this.components.push(new DivC());
	// 	this.components.push(new Button());
	// }

	public LoadComponent() {
		// this.registComponent();
		const themes = ThemeLoader.instance.themes;

		for (let key in themes) {
			const value = themes[key];
			const componentItem = new ComponentItem();
			componentItem.name = key.split(".")[0];
			componentItem.content = value;
			this.componentItems.push(componentItem);
		}

		// for (const comp of this.componentItems) {
		// 	this.addItem(comp.name)
		// }
	}

	private addItem(name: string) {
		var li = document.createElement("li");
		// var newcomp = comp.get();

		li.style.width = "100%";
		li.style.height = "30px";
		li.style.background = "#252526";
		li.style.color = "#bebebe";
		li.style.textAlign = "center";
		li.style.verticalAlign = "middle";
		li.style.justifyContent = "center";
		li.style.display = "flex";
		li.style.alignItems = "center";
		li.onmouseenter = handle => {
			(handle.target as HTMLElement).style.background = "#37373d";
		};
		li.onmouseleave = handle => {
			(handle.target as HTMLElement).style.background = "#252526";
		};

		// li.setAttribute("draggable", "true");
		// li.setAttribute("ondragstart", " drag(event)");
		// li.ondragstart = ev => {
		// 	GlobalData.instance.currentDrag = li;
		// 	GlobalData.instance.currentDragData = comp;
		// 	GlobalData.instance.startX = ev.clientX;
		// 	GlobalData.instance.startY = ev.clientY;
		// 	ev.dataTransfer.setData("Text", (ev.target as any).id);
		// 	GlobalData.instance.from = "component";
		// };
		li.textContent = name;
		this.ul.appendChild(li);
	}
}

class ComponentItem {
	public name: string | null = null;
	public content: string | null = null;
}
