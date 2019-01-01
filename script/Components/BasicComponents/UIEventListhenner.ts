import { StormComponent } from "../../Core/StormComponent";
import { IClickable, IMouseDown, IMouseUp } from "../../Core/Input";
import { EventManager } from "../../Core/EventManager";
import { InputEvent } from "../../Core/InputEvent";
export class UIEventListhenner extends StormComponent
	implements IClickable, IMouseDown, IMouseUp {
	OnClick: EventManager = new EventManager();

	onClick(inputEvent: InputEvent) {
		this.OnClick.Call(this);
	}
	onMouseUP(inputEvent: InputEvent) {
        console.log(inputEvent)
    }

	onMouseDown(inputEvent: InputEvent) {}
}
