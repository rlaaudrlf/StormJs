export class PanelBase {
	element: HTMLElement | null = null;

	constructor() {}

	SetDivFromID(id: string) {
		let element = document.getElementById(id);
		this.element = element;
	}
}
