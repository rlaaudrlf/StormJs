import { Button } from './Button';
import { ComponentBase } from './ComponentsBase';
import { StormStackList } from './StormStackList';
export class DropDownList extends  ComponentBase{
	button: Button;
	list: StormStackList;
	isDroped: boolean = false;

	awake() {
		this.list.stormObject.setActive(false);
		this.button.action.onclick.Regist(this.handleButtonClick);
	}

	handleButtonClick() {
		this.list.stormObject.setActive(!this.isDroped);
	}
}
