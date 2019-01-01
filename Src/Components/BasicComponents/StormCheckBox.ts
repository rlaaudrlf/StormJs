import { StormComponent } from "../../Core/StormComponent";
import { StormObject } from "../../Core/Widgets/StormObject";
export class StormCheckBox extends StormComponent {
	value: boolean = false;
	widgetSelected: StormObject | null = null;
	widgetNormal: StormObject | null = null;

	awake() {
		// this.widgetSelected.getRenderer().action.onclick.Regist(this.handleClick);
		// this.widgetNormal.getRenderer().action.onclick.Regist(this.handleClick);
	}

	handleClick() {
		this.value = !this.value;
		this.SetDisplay(this.value);
		this.action.onChange.Call(this, this.value);
	}

	setCompData(data: any) {
		this.value = data;
		this.SetDisplay(this.value);
	}

	SetDisplay(checked) {
		this.widgetSelected.setActive(checked);
		this.widgetNormal.setActive(!checked);
	}
}
