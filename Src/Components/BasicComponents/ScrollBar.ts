import {StormComponent} from "../../Core/StormComponent";
import {StormObject} from "../../Core/Widgets/StormObject";
import {ScrollView} from "./ScrollView";
import {UIEventListhenner} from "./UIEventListhenner";
export class ScrollBar extends StormComponent {
	background: StormObject = undefined;

	up: StormObject | undefined = undefined;

	down: StormObject | undefined = undefined;

	front: StormObject | undefined = undefined;

	value: number = 0;

	scrollView: ScrollView | undefined = undefined;

	direction: "horizontal" | "vertical" = "horizontal";

	awake () {
		const a = this.down.addBehaviour<UIEventListhenner>(UIEventListhenner);

		a.OnClick.Regist();

		const b = this.up.addBehaviour<UIEventListhenner>(UIEventListhenner);

		b.OnClick.Regist();

		const front = this.front.addBehaviour<UIEventListhenner>(UIEventListhenner);

		front.OnMouseMove.Regist();
	}

	update () {}
}