import { StormCheckBox } from "./StormCheckBox";
import { ComponentBase } from "./ComponentsBase";
import { ComponentList } from "./ComponentList";
@ComponentList('Components/CheckBoxGroup')
export class CheckBoxGroup extends ComponentBase {
	checkBoxes: StormCheckBox[] = [];
	canCheckCount = 1;
	currentSelectedItems: StormCheckBox[] = [];

	awake() {}

	start() {
		for (const checkBox of this.checkBoxes) {
			checkBox.action.onChange.Regist(this.handleItemChange);
		}
	}

	handleItemChange(widget: StormCheckBox, value: boolean) {
		if (value) {
			this.currentSelectedItems.push(widget);
			if (this.currentSelectedItems.length > this.canCheckCount) {
				this.currentSelectedItems.shift();
			}
		} else {
			this.currentSelectedItems.remove(widget);
		}

		this.action.onChange.Call(this);
	}
}
