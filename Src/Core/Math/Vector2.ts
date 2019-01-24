import {Matrix3} from "./Matrix3";
import {Vector3} from "./Vector3";
import {Serializable} from "../Serializer";

export class EditableVector2 {
	x: number;

	y: number;

	copy () {
		return new Vector2(this.x, this.y);
	}

	add (target: Vector2) {
		return new Vector2(this.x + target.x, this.y + target.y);
	}

	sub (target: Vector2) {
		return new Vector2(this.x - target.x, this.y - target.y);
	}

	div (target: Vector2) {
		return new Vector2(this.x / target.x, this.y / target.y);
	}

	mul (target: Vector2) {
		return new Vector2(this.x * target.x, this.y * target.y);
	}

	isEqual (target: Vector2) {
		if (this.x == target.x && this.y == target.y) {
			return true;
		}

		return false;
	}

	multiplyMatrix3 (matrix: Matrix3): Vector2 {
		const vector = new Vector3(this.x, this.y, 1);

		vector.multiplyMatrix3(matrix);

		this.x = vector.x;
		this.y = vector.y;

		return this;
	}
}

@Serializable()
export class Vector2 extends EditableVector2 {
	x: number = 0;

	y: number = 0;

	constructor (x: number = 0, y: number = 0) {
		super();
		this.x = x;
		this.y = y;
	}
}