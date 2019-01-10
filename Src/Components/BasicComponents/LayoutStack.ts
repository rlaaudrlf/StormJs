import { Behaviour } from "../../Core/Behaviours";
import { ListAlignment } from "../../Core/Widgets/ListAlignment";
import { Vector2 } from "../../Core/Math/Vector2";
export class LayoutStack extends Behaviour {
	padding: number = 0;
	alignment: ListAlignment = ListAlignment.horizontal;

	update() {
		let children = this.transform.Children;

		let currentPositionValue = 0;
		for (const child of children) {
			if (this.alignment == ListAlignment.horizontal) {
				child.LocalPositon = new Vector2(currentPositionValue, 0);
				currentPositionValue += child.Width + this.padding;
			} else {
				child.LocalPositon = new Vector2(0, currentPositionValue);
				currentPositionValue += child.Height + this.padding;
			}
		}
	}
}
