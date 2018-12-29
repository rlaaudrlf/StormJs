import { StormObject } from "../../Widgets/StormObject";
import { Input } from "../../Input";
export class WebEvent {
	static reigst(element: HTMLElement, stormObject: StormObject) {
		element.onclick = (mouseEvent: MouseEvent) => {
			Input.instance.HandleClick(stormObject, mouseEvent);
		};
	}
}
