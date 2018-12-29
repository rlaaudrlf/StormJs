import { Behaviour } from "../Behaviours";
import { Vector2 } from "../Math/Vector2";
import { IClickable } from "../Input";
export class Behaviourtest extends Behaviour implements IClickable {
	isDown = 3;
	awake() {
		// this.stormObject.transfrom.localPosition = new Vector2(100, 10);
		// this.stormObject.transfrom.scale = new Vector2(100, 200);
	}

	update() {
		// this.stormObject.transfrom.rotation += 3;
		// this.stormObject.transfrom.localPosition.y += this.isDown;
		// if (this.transform.localPosition.y > 100) {
		// 	this.isDown = -3;
		// }
		// if (this.transform.localPosition.y < 0) {
		// 	this.isDown = 3;
		// }
	}

	onClick() {
		console.log(123)
	}
}
