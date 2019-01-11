import { Behaviour } from "../../Core/Behaviours";
import { ListAlignment } from "../../Core/Widgets/ListAlignment";
import { Vector2 } from "../../Core/Math/Vector2";
export class AutoResizer extends Behaviour {
	padding: number = 0;

	update() {
		let width = 0;
		let height = 0;
		for (const child of this.transform.Children) {
			width = Math.max(width, child.LocalPositon.x + child.Width);
			height = Math.max(height, child.LocalPositon.y + child.Height);
		}

		this.transform.Width = width;
		this.transform.Height = height;
	}
}
