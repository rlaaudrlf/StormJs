import { StormComponent } from "../../../Core/StormComponent";
import { EventManager } from "../../../Core/EventManager";
import { UIEventListhenner } from "../../../Components/BasicComponents/UIEventListhenner";
export class BehaviourWorkZone extends StormComponent {
	onItemClick: EventManager = new EventManager();
	awake() {
		this.stormObject.addBehaviour<UIEventListhenner>(UIEventListhenner);
		this.stormObject
			.getBehaviour<UIEventListhenner>(UIEventListhenner)
			.OnMouseDown.Regist((sender, data) => {
				this.HandleItemClick(sender, data);
			}, null);
	}

	HandleItemClick(sender, data) {
        this.onItemClick.Call(this, data);
        
	}

	onFocustItem(item) {
		console.log(item);
	}
}
