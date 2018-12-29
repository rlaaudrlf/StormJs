import { StyleCacher } from "../Core/StyleCacher";
import { TextParser } from "../Core/TextParser";
import { ListViewBase } from "./ListViewBase";
export class StackPanel extends ListViewBase {
	OnSelectStyle: (data: any) => string;
	size: number = 100;
	padding: number = 1;
	public SetDiv(html: HTMLElement) {
		this.element = html;
		this.panel = document.createElement("div");
		this.element.appendChild(this.panel);
	}

	public SetData(data: any) {
		this.data = data;
		for (const value of data) {
			let style = this.OnSelectStyle(value);
			const parser = new DOMParser();
			const theme = StyleCacher.instance.get(style);
			if (theme == null) {
				return;
			}
			const doc = parser.parseFromString(theme, "text/html");
			const node = doc.body.childNodes[0] as HTMLElement;

			let div = document.createElement("div");

			div.style.height = this.size.toString();
			div.style.width = "100%";
			div.style.paddingTop = this.padding.toString() + "px";
			div.setAttribute("draggable", "true");
			this.panel.appendChild(div);
			div.appendChild(node);
			let selfData = value;

			let func = (node: any) => {
				node.childNodes.forEach((value: HTMLElement) => {
					if (value == null) {
						return;
					}

					func(value);
					if (value.textContent[0] == "{" && value.textContent[1] == "{") {
						let textParser = new TextParser();
						textParser.setDom(value.textContent);
						value.textContent = textParser.parse(selfData);
					}
				});
			};

			func(node);
		}
	}
}
