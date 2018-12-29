import { Matrix3 } from "./Matrix3";
export class Vector3 {
	x: number = 0;
	y: number = 0;
	z: number = 0;

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	multiplyMatrix3(matrix: Matrix3) {
		this.x = matrix[0] * this.x + matrix[3] * this.y + matrix[6] * this.z;
		this.y = matrix[1] * this.x + matrix[4] * this.y + matrix[7] * this.z;
		this.z = matrix[2] * this.x + matrix[5] * this.y + matrix[8] * this.z;

		return this;
	}
}
