import { ComponentBase } from "./ComponentsBase";
import { IClickable } from "../../Core/Input";
import { EventManager } from "../../Core/EventManager";
export class UIEventListhenner extends ComponentBase implements IClickable {
	OnClick: EventManager = new EventManager();

	onClick() {
		this.OnClick.Call(this);
	}
}
