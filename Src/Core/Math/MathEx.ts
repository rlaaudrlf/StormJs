export class MathEx {
	static degree2Radian (degree: number) {
		return ((2 * Math.PI) / 360) * degree;
	}

	static lerp (x: number, y: number, t: number) {
		return (1 - t) * x + t * y;
	}

	static getPercentage (x: number, y: number, t: number) {
		return (y - t) / (y - x);
	}
}