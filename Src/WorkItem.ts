import { GlobalData } from "./GlobalData";
import { StormObject } from "./Core/StormObject";

export class WorkItem {
	public background: any;
	public width: any;
	public height: any;
	public display: any;
	public element: HTMLElement;
	public onItemClick: any;
	public stormObj: StormObject;
	public id: string;

	public OnItemClick(onitemClick: any) {
		this.onItemClick = onitemClick;
	}

	public setStorm(obj: StormObject) {
		this.stormObj = obj;
	}

	public setitem(element: HTMLElement) {
		this.element = element;
		element.draggable = true;
		// element.ondragstart = ev => this.handleDrag(ev);
		element.onclick = ev => this.handleClick(ev);
	}

	public handleClick(ev: MouseEvent) {
		console.log(ev);
		this.onItemClick(this);
		ev.stopPropagation();
	}
}
