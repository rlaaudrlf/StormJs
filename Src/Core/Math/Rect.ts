import {Vector2} from "./Vector2";
export class Rect {
	x: number;

	y: number;

	width: number;

	height: number;

	constructor (x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	IsIncluded (vector2: Vector2): boolean {
		if (
			vector2.x > this.x + this.width ||
			vector2.x < this.x ||
			vector2.y < this.y ||
			vector2.y > this.y + this.y + this.height
		) {
			return false;
		}

		return true;
	}

	IsIncludedRect (rect:Rect):boolean {
		if (rect.x + rect.width < this.x || rect.x > this.x + this.width ||
			rect.y + rect.height < this.y || rect.y > this.y + this.height) {
			return false;
		}

		return true;
	}
}