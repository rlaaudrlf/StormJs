import {StormComponent} from "../../Core/StormComponent";
import {IClickable, IMouseDown, IMouseMove, IMouseUp} from "../../Core/Input";
import {EventManager} from "../../Core/EventManager";
import {InputEvent} from "../../Core/InputEvent";
export class UIEventListhenner extends StormComponent
	implements IClickable, IMouseDown, IMouseUp, IMouseMove {
	OnClick: EventManager = new EventManager();

	OnMouseUp: EventManager = new EventManager();

	OnMouseDown: EventManager = new EventManager();

	OnMouseMove: EventManager = new EventManager();

	onClick (inputEvent: InputEvent) {
		this.OnClick.Call(this, inputEvent);
	}

	onMouseUP (inputEvent: InputEvent) {
		this.OnMouseUp.Call(this, inputEvent);
	}

	onMouseDown (inputEvent: InputEvent) {
		this.OnMouseDown.Call(this, inputEvent);
	}

	onMouseMove (inputEvent: InputEvent) {
		this.OnMouseMove.Call(this, inputEvent);
	}
}