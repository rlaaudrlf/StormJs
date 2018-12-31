import { StormObject } from "./Widgets/StormObject";
import { Vector2 } from "./Math/Vector2";

export class IClickable {
	onClick() {}
}

export class Input {
	public static instance: Input = new Input();

	private constructor() {}

	FindTopObject<T>(stormObject: StormObject, mouseEvent: MouseEvent): T[] {
		let result = [];
		let stormList: StormObject[] = [];
		stormList.push(stormObject);

		let currentStorm = stormList.pop();
		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}
			let behaviours = currentStorm.getBehaviours();

			for (const behaviour of behaviours) {
				if (
					behaviour.transform
						.getGlobalRect()
						.IsIncluded(new Vector2(mouseEvent.x, mouseEvent.y))
				) {
					result.push(behaviour);
				}
			}
			currentStorm = stormList.pop();
		}

		return result;
	}

	HandleClick(stormObject: StormObject, mouseEvent: MouseEvent) {
		let objs = this.FindTopObject<IClickable>(stormObject, mouseEvent);
		let obj = objs.pop();

		if (obj != undefined && obj.onClick != undefined) {
			obj.onClick();
		}
	}
}
