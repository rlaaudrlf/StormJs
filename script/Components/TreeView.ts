import { ListViewBase } from "./ListViewBase";

export class TreeView<T> extends ListViewBase {
	OnSelectStyle: (data: any) => string;
	FilterItem: (data: any) => boolean;
	size: number = 100;
	padding: number = 1;
	onItemClick: (
		event: MouseEvent,
		data: T,
		element: HTMLElement,
		state
	) => void;

	public SetDiv(html: HTMLElement) {
		this.element = html;
		this.panel = document.createElement("div");
		this.element.appendChild(this.panel);
	}

	public SetData(data: Array<T>, type) {
		this.data = data;
		this.render(data, type);
	}

	render(data: Array<T>, type) {
		for (const value of data) {
			if (!this.FilterItem(value)) {
				continue;
			}

			let style = this.OnSelectStyle(value);
			const node = this.GenerateStyleNode(style);
			let div = document.createElement("div");

			div.style.height = this.size.toString();
			div.style.width = "100%";
			div.style.paddingTop = this.padding.toString() + "px";
			div.setAttribute("draggable", "true");
			this.panel.appendChild(div);
			div.appendChild(node);
			let state = {};
			div.onclick = (event: MouseEvent) => {
				event.stopPropagation();

				if (this.onItemClick != null) {
					this.onItemClick(event, value, div, state);
				}
			};

			this.ParseContent(value, node);
		}
	}
}
