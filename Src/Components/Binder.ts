import { StormComponent } from "../Core/StormComponent";
import { Dictionary } from "../Core/Utils/Dictionary ";
import { DoubleBind, BindData } from "../Core/DoubleBind";

export class Binder extends StormComponent {
	data: BindData;
	pathcer: Dictionary<string, StormComponent> = new Dictionary<
		string,
		StormComponent
	>();
	setCompData(data) {
		if (typeof data != "object") {
			return;
		}

		this.data = data;
		this.setInnerData();
	}

	update() {
		for (const key of this.pathcer.Keys()) {
			let component = this.pathcer.Get(key);
			component.setCompData(this.data[key]);
		}
	}

	setInnerData() {
		for (const key of this.pathcer.Keys()) {
			let component = this.pathcer.Get(key);
			component.setCompData(this.data[key]);
			component.onValueChange.Regist(
				(sender, value, key) => {
					let bindDataInfo = this.findBindData(this.data, key);
					if (typeof bindDataInfo.value[key] == "number") {
						value = Number(value);
						if (isNaN(value)) {
							return;
						}
					}
					bindDataInfo.value[key] = value;
				},
				null,
				key
			);
		}
	}
}
