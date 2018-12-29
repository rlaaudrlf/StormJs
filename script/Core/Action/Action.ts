import { EventManager } from "../EventManager";
export class Action {
	constructor() {}

	dispose() {}

	onclick: EventManager = new EventManager();
	onDoubleClick: EventManager = new EventManager();
	onChange: EventManager = new EventManager();
	onDrag: EventManager = new EventManager();
	onDrop: EventManager = new EventManager();
	onDragging: EventManager = new EventManager();
	onTransformChange: EventManager = new EventManager();
	onParentChange: EventManager = new EventManager();
	onDataChange: EventManager = new EventManager();
	onStyleChange: EventManager = new EventManager();
	onListItemClick: EventManager = new EventManager();
	onMouseEnter: EventManager = new EventManager();
	onMouseLeave: EventManager = new EventManager();
}
