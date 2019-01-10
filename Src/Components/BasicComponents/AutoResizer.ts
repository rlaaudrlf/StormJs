import { Behaviour } from "../../Core/Behaviours";
import { ListAlignment } from "../../Core/Widgets/ListAlignment";
import { Vector2 } from "../../Core/Math/Vector2";
export class AutoResizer extends Behaviour {
	padding: number = 0;

	update() {
		let width = 0;
		let height = 0;
		for (const child of this.transform.Children) {
			width += child.Width;
			height += child.Height;
		}

		this.transform.Width = width;
        this.transform.Height = height;
	}
}
