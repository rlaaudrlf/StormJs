import { IMouseDown } from "../../../Core/Input";
import { StormComponent } from "../../../Core/StormComponent";
export class BehaviourAttributes extends StormComponent {
	onFocustItem(item) {
		console.log(item);
	}
}
