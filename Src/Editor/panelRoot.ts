import { DomElement } from "../Core/DomElement";
export class PanelRoot {
	element: HTMLElement | null = null;
	childName: {} = {};
	constructor() {
		this.childName["middle"] = true;
		this.childName["right"] = true;
		this.childName["left"] = true;
	}
	SetDiv(element: HTMLElement) {
		this.element = element;
		this.element.onmousemove = (event: MouseEvent) => {
			this.HandleMove(event);
		};

		this.element.ondrop = () => {
			console.log(123);
		};

		document.onkeydown = event => {
			console.log(event);
		};
	}

	HandleMove(event: MouseEvent) {
		let name = this.findParent(<HTMLElement>event.target);
		// console.log(name);
		// console.log(event.target);
	}

	findParent(element: HTMLElement) {
		let parent: HTMLElement = element;
		while (parent != null) {
			if (this.childName[parent.id]) {
				return parent.id;
			}

			parent = <HTMLElement>parent.parentNode;
		}

		return null;
	}
}
