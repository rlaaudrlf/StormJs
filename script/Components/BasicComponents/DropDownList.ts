import { Button } from './Button';
import { StormComponent } from '../../Core/StormComponent';
import { StormStackList } from './StormStackList';
export class DropDownList extends  StormComponent{
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
