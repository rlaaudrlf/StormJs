import { StormObject } from "../../Widgets/StormObject";
import { Input } from "../../Input";
import { InputEvent } from "../../InputEvent";
export class WebEvent {
	static reigst(element: HTMLElement, stormObject: StormObject) {
		element.onclick = (mouseEvent: MouseEvent) => {
			console.log(mouseEvent)
			let inputEvent: InputEvent = new InputEvent();
			inputEvent.x = mouseEvent.x;
			inputEvent.y = mouseEvent.y;
			inputEvent.mouseKey = mouseEvent.buttons;
			Input.instance.HandleClick(stormObject, inputEvent);
		};

		element.onmousedown = (mouseEvent: MouseEvent) => {
			let inputEvent: InputEvent = new InputEvent();
			inputEvent.x = mouseEvent.x;
			inputEvent.y = mouseEvent.y;
			inputEvent.mouseKey = mouseEvent.buttons;
			Input.instance.HandleMouseDown(stormObject, inputEvent);
		};

		element.onmouseup = (mouseEvent: MouseEvent) => {
			let inputEvent: InputEvent = new InputEvent();
			inputEvent.x = mouseEvent.x;
			inputEvent.y = mouseEvent.y;
			inputEvent.mouseKey = mouseEvent.buttons;
			Input.instance.HandleMouseUp(stormObject, inputEvent);
		};
	}
}
