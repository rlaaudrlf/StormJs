import { Behaviour } from '../../Core/Behaviours';
import { Action } from '../../Core/Action/Action';
export class ComponentBase extends Behaviour {
	action:Action=new Action()
	setCompData(data: any) {}
}
