import { WorkItem } from "../WorkItem";
import { GlobalData } from "../GlobalData";
import { StyleAttributes } from '../Core/Attributes/StyleAttributes';

export class PanelAttribute {
	public element: HTMLElement | null = null;
	public le: HTMLElement | null = null;

	public Update(workItem: WorkItem) {
		if (this.le != null) {
			this.element.removeChild(this.le);
		}

		const attributes = new StyleAttributes();
		const atrs = Reflect.ownKeys(attributes);
		const ul = document.createElement("ul");
		ul.style.height = "100%";
		ul.style.width = "100%";
		ul.style.listStyleType = "none";
		ul.style.margin = "0";
		ul.style.padding = "0";
		this.element.appendChild(ul);
		this.le = ul;

		const renderAttributePanel = new RenderAttributePanel();

		for (let atr of atrs) {
			if (renderAttributePanel.HasRenderAttributes(atr)) {
				renderAttributePanel.do(atr, ul, workItem);
				continue;
			}

			const label = document.createElement("label");
			const input = document.createElement("input");
			label.textContent = atr.toString();
			label.style.color = "#ffffff";
			const li = document.createElement("li");
			ul.appendChild(li);
			li.style.display = "flex";
			li.appendChild(label);
			li.appendChild(input);
			input.style.marginLeft = "auto";
			input.value = workItem.element.style[atr.toString()];
			input.setAttribute("type", "input");
			const value = atr;
			const newvalue = input;
			input.oninput = () => {
				workItem.stormObj.domElement.attributes[value] = newvalue.value;
				console.log(value);
				console.log(newvalue.value);
			};
		}
	}

	public setDiv(element: HTMLElement) {
		this.element = element;
		this.element.style.overflowY = "scroll";
		this.element.style.background = "#252526";
	}
}

class RenderAttributePanel {
	public attributesAndFunc: {
		[key: string]: (name: any, ul: any, workItem: any) => void;
	} = {};

	constructor() {
		this.attributesAndFunc["color"] = this.colorpanel;
		this.attributesAndFunc["background"] = this.colorpanel;
	}

	public colorpanel(name: any, ul: any, workItem: any) {
		var label = document.createElement("label");
		const input = document.createElement("input");
		label.textContent = name;
		label.style.color = "#ffffff";
		const li = document.createElement("li");
		ul.appendChild(li);
		li.style.display = "flex";
		li.appendChild(label);
		li.appendChild(input);
		input.id = `input${name}`;
		input.style.marginLeft = "auto";
		input.value = workItem.element.style[name];
		const colors = (window as any).jsColorPicker(`#input${name}`, {
			customBG: "#222",
			readOnly: true,
			init: function(elm, colors) {
				elm.style.backgroundColor = elm.value;
				elm.style.color =
					colors.rgbaMixCustom.luminance > 0.22 ? "#222" : "#ddd";
			},

			convertCallback: function(colors, type) {
				console.log(label.textContent);
				const data = GlobalData.instance.currentDragData;
				if (data["workItem"] == undefined) {
					return;
				}
				data["workItem"].stormObj.domElement.attributes[data["name"]] = `#${
					colors.HEX
				}`;
			}
		});
		input.onmousedown = event => {
			const name = event.currentTarget["id"].replace("input", "");
			GlobalData.instance.currentDragData = { workItem, name };
		};
	}

	public do(name: any, ul: any, workItem: any) {
		this.attributesAndFunc[name](name, ul, workItem);
	}

	public HasRenderAttributes(name: any) {
		const value = this.attributesAndFunc[name];

		if (value == null || value == undefined) {
			return false;
		}

		return true;
	}
}
