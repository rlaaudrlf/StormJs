import {StormComponent} from "../../Core/StormComponent";

export class Panel extends StormComponent {
	depth: number = 0;
	parentPanel:Panel

	awake(){

		let panel= this.stormObject.transfrom.Parent.StormObject.getBehaviour<Panel>(Panel)

	}
}