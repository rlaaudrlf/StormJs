import { StormComponent } from "../../Core/StormComponent";
import { Label } from "./Label";
export class Button extends StormComponent {
	label: Label | null = null;
	button: Button | null = null;

	setCompData(data) {
		this.label.setCompData(data);
	}
}
