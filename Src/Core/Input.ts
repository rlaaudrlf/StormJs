import { StormObject } from "./Widgets/StormObject";
import { Vector2 } from "./Math/Vector2";
import { InputEvent } from "./InputEvent";
import { Behaviour } from "./Behaviours";

export class IClickable {
	onClick(inputEvent: InputEvent) {}
}

export class IMouseDown {
	onMouseDown(inputEvent: InputEvent) {}
}

export class IMouseUp {
	onMouseUP(inputEvent: InputEvent) {}
}

export class StormIter {
	private count = -2;
	public children: StormIter[] = [];
	public GetNext() {
		if (this.count == -2) {
			this.count = this.children.length - 1;
		}

		if (this.count >= 0) {
			let result = this.children[this.count];
			this.count--;
			return result;
		}

		return undefined;
	}
	stormObject: StormObject;
}

class InputTargetFinder {
	behaviours: Behaviour[] = [];
	objects: StormObject[] = [];
}

export class Input {
	public static instance: Input = new Input();

	private constructor() {}

	FindTopObject<T>(
		stormObject: StormObject,
		inputEvent: InputEvent
	): InputTargetFinder {
		let result = new InputTargetFinder();
		let stormList: StormObject[] = [];
		let IterStack: StormIter[] = [];
		let currentStorm = stormObject;

		let currentStormIter = new StormIter();
		let root: StormIter = currentStormIter;
		currentStormIter.stormObject = currentStorm;

		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
				let iter = new StormIter();
				iter.stormObject = child.StormObject;
				currentStormIter.children.push(iter);
				IterStack.push(iter);
			}

			currentStormIter = IterStack.shift();
			currentStorm = stormList.shift();
		}

		currentStormIter = root;
		let stack: StormIter[] = [];

		while (currentStormIter != undefined || stack.length > 0) {
			while (currentStormIter != undefined) {
				stack.push(currentStormIter);
				currentStormIter = currentStormIter.GetNext();
			}

			currentStormIter = stack.pop();
			let behaviours = currentStormIter.stormObject.getBehaviours();

			if (
				currentStormIter.stormObject.transfrom
					.getGlobalRect()
					.IsIncluded(new Vector2(inputEvent.x, inputEvent.y))
			) {
				for (const behaviour of behaviours) {
					if (
						behaviour.transform
							.getGlobalRect()
							.IsIncluded(new Vector2(inputEvent.x, inputEvent.y))
					) {
						result.behaviours.push(behaviour);
					}
				}
				result.objects.push(currentStormIter.stormObject);
			}

			currentStormIter = stack.pop();
		}

		return result;
	}

	HandleClick(stormObject: StormObject, inputEvent: InputEvent) {
		let objs = this.FindTopObject<IClickable>(stormObject, inputEvent);
		inputEvent.behaviours = <Behaviour[]>(<any>objs.behaviours);
		inputEvent.objects = objs.objects;
		let obj = (<IClickable[]>(<any>inputEvent.behaviours))
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
		inputEvent.behaviours = <Behaviour[]>(<any>objs.behaviours);
		inputEvent.objects = objs.objects;
		let obj = (<IMouseDown[]>(<any>inputEvent.behaviours))
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
		inputEvent.behaviours = <Behaviour[]>(<any>objs.behaviours);
		inputEvent.objects = objs.objects;
		let obj = (<IMouseUp[]>(<any>inputEvent.behaviours))
			.filter(item => {
				return item.onMouseUP != undefined;
			})
			.first();

		if (obj != null) {
			obj.onMouseUP(inputEvent);
		}
	}
}
