import {StormComponent} from "../../Core/StormComponent";
import {StormObject} from "../../Core/Widgets/StormObject";
import {MathEx} from "../../Core/Math/MathEx";
export class ScrollView extends StormComponent {
	child: StormObject | undefined = undefined;

	value: number = 0;

	direction: "horizontal" | "vertical" = "horizontal";

	awake () {
		if (this.transform.Children.length > 0) {
			this.child = this.transform.Children[0].StormObject;
		}
	}

	setValue (value: number) {
		if (this.child == undefined) {
			return;
		}

		this.value = value;
		const thisRect = this.transform.getGlobalRect();
		const childRect = this.child.transfrom.getGlobalRect();

		if (this.direction == "horizontal") {
			const width = childRect.width - thisRect.width;

			this.child.transfrom.WorldPosition.x = MathEx.lerp(
				thisRect.x,
				thisRect.x - width,
				value
			);
		} else {
			const height = childRect.height - thisRect.height;

			this.child.transfrom.WorldPosition.y = MathEx.lerp(
				thisRect.y,
				thisRect.y - height,
				value
			);
		}
	}

	update () {
		if (this.child == undefined) {
			return;
		}
		const thisRect = this.transform.getGlobalRect();
		const childRect = this.child.transfrom.getGlobalRect();

		if (this.direction == "horizontal") {
			const width = childRect.width - thisRect.width;

			this.value = MathEx.getPercentage(
				thisRect.x,
				thisRect.x - width,
				childRect.x
			);
		} else {
			const height = childRect.height - thisRect.height;

			this.value = MathEx.getPercentage(
				thisRect.y,
				thisRect.y - height,
				childRect.y
			);
		}
	}
}