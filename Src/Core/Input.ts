import { StormObject } from "./Widgets/StormObject";
import { Vector2 } from "./Math/Vector2";
import { InputEvent } from "./InputEvent";
import { Behaviour } from "./Behaviours";
import { TransFormAttributes } from "./Attributes/Transform";

export class IClickable {
	onClick(inputEvent: InputEvent) {}
}

export class IMouseDown {
	onMouseDown(inputEvent: InputEvent) {}
}

export class IMouseUp {
	onMouseUP(inputEvent: InputEvent) {}
}

export class Input {
	public static instance: Input = new Input();

	private constructor() {}

	FindTopObject<T>(stormObject: StormObject, inputEvent: InputEvent): T[] {
		let result = [];
		let stormList: StormObject[] = [];
		let currentStorm = stormObject;

		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}
			let behaviours = currentStorm.getBehaviours();

			for (const behaviour of behaviours) {
				if (
					behaviour.transform
						.getGlobalRect()
						.IsIncluded(new Vector2(inputEvent.x, inputEvent.y))
				) {
					result.unshift(behaviour);
				}
			}
			currentStorm = stormList.shift();
		}

		return result;
	}

	HandleClick(stormObject: StormObject, inputEvent: InputEvent) {
		let objs = this.FindTopObject<IClickable>(stormObject, inputEvent);
		inputEvent.objects = <Behaviour[]>(<any>objs);
		let obj = objs
			.filter(item => {
				return item.onClick != undefined;
			})
			.first();

		if (obj != null) {
			obj.onClick(inputEvent);
		}
	}

	HandleMouseDown(stormObject: StormObject, inputEvent: InputEvent) {
		let objs = this.FindTopObject<IMouseDown>(stormObject, inputEvent);
		inputEvent.objects = <Behaviour[]>(<any>objs);
		let obj = objs
			.filter(item => {
				return item.onMouseDown != undefined;
			})
			.first();

		if (obj != null) {
			obj.onMouseDown(inputEvent);
		}
	}

	HandleMouseUp(stormObject: StormObject, inputEvent: InputEvent) {
		let objs = this.FindTopObject<IMouseUp>(stormObject, inputEvent);
		inputEvent.objects = <Behaviour[]>(<any>objs);
		let obj = objs
			.filter(item => {
				return item.onMouseUP != undefined;
			})
			.first();

		if (obj != null) {
			obj.onMouseUP(inputEvent);
		}
	}
}
