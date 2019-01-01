import { ComponentBase } from "../../../Components/BasicComponents/ComponentsBase";
import { IMouseDown } from "../../../Core/Input";
import { InputEvent } from '../../../Core/InputEvent';
export class BehaviourHierachy extends ComponentBase implements IMouseDown {
	onMouseDown(inputEvent: InputEvent) {
        console.log(inputEvent)
    }
}
