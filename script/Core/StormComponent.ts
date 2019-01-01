import { Behaviour } from './Behaviours';
import { Action } from './Action/Action';
export class StormComponent extends Behaviour {
	action:Action=new Action()
	setCompData(data: any) {}
}
