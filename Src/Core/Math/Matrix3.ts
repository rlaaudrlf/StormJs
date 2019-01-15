import { MathEx } from "./MathEx";
import { Serializable } from "../Serializer";
@Serializable()
export class Matrix3 {
	elements: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1];

	constructor() {
		for (let index = 0; index < 9; index++) {
			this[index] = this.elements[index];
		}
	}

	translate(tx: number, ty: number): Matrix3 {
		var te = this;

		te[0] += tx * te[2];
		te[3] += tx * te[5];
		te[6] += tx * te[8];
		te[1] += ty * te[2];
		te[4] += ty * te[5];
		te[7] += ty * te[8];

		return this;
	}

	Rotate(degree) {
		var te = this;
		let radian = MathEx.degree2Radian(degree);
		let sin = Math.sin(radian);
		let cos = Math.cos(radian);

		te[0] *= cos;
		te[1] *= -sin;
		te[3] *= sin;
		te[4] *= cos;

		return this;
	}

	scale(sx: number, sy: number): Matrix3 {
		var te = this;

		te[0] *= sx;
		te[3] *= sx;
		te[6] *= sx;
		te[1] *= sy;
		te[4] *= sy;
		te[7] *= sy;

		return this;
	}

	mul(target:Matrix3){

	}

	inverse(taregt:Matrix3){

	}

	copy(): Matrix3 {
		let matrix = new Matrix3();
		matrix.fromArray(this.toArray());
		return matrix;
	}

	toArray() {
		let array = [];
		for (var i = 0; i < 9; i++) {
			array.push(this[i]);
		}

		return array;
	}

	fromArray(array: number[]): Matrix3 {
		for (var i = 0; i < 9; i++) {
			this[i] = array[i];
		}

		return this;
	}
}
