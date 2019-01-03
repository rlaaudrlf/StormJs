import { StormComponent } from "../Core/StormComponent";
import { Dictionary } from "../Core/Utils/Dictionary ";

export class Binder extends StormComponent {
	data;
	pathcer: Dictionary<string, StormComponent> = new Dictionary<
		string,
		StormComponent
	>();
	setCompData(data) {
		if (typeof data != "object") {
			return;
		}

		this.data = data;

		for (const key of this.pathcer.Keys()) {
			let component = this.pathcer.Get(key);
			component.setCompData(this.data[key]);
		}
	}
}
