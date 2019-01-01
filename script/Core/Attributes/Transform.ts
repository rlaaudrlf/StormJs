import { Vector2 } from "../Math/Vector2";
import { StormObject } from "../Widgets/StormObject";
import { Matrix3 } from "../Math/Matrix3";
import { Anchor } from "../Widgets/Anchor";
import { Rect } from "../Math/Rect";
import { GUID } from "../Widgets/DeepCloner";

// 	updateMatrix() {
// 		if (this.mountedElement == undefined) {
// 			return;
// 		}

// 		this.local2WorldMatrix = this.mountedElement.local2WorldMatrix.copy();

// 		this.local2WorldMatrix.translate(
// 			this.localPosition.x,
// 			this.localPosition.y
// 		);
// 		this.world2LocalMatrix.translate(
// 			-this.localPosition.x,
// 			-this.localPosition.y
// 		);

// 		this.local2WorldMatrix.scale(this.mountedElement.scale.x, this.mountedElement.scale.y);
// 		this.world2LocalMatrix.scale(
// 			this.scale.x / this.mountedElement.scale.x,
// 			this.scale.y / this.mountedElement.scale.y
// 		);

// 		this.local2WorldRotation = this.mountedElement.World2localRotation + this.rotation;
// 		this.World2localRotation = this.local2WorldRotation - this.rotation;

// 		this.position = new Vector2().multiplyMatrix3(this.local2WorldMatrix);
// 	}

export interface TransFormAttributes {
	worldPosition: Vector2;
	worldScale: Vector2;
	worldDegree: number;
	localPositon: Vector2;
	localScale: Vector2;
	localDegree: number;
	Width: number;
	Height: number;
	local2WorldMatrix: Matrix3;
	world2LocalMatrix: Matrix3;
	stormObject: StormObject | null;
	parent: Transform | null;
	child: Transform[];
	isDirty: boolean;
	WorldWidth;
	WorldHeight;
}

export class Transform {
	private worldPosition: Vector2 = new Vector2(0, 0);
	private worldScale: Vector2 = new Vector2(1, 1);
	private worldDegree: number = 0;
	private localPositon: Vector2 = new Vector2(0, 0);
	private localScale: Vector2 = new Vector2(1, 1);
	private localDegree: number = 0;
	Width: number = 100;
	Height: number = 100;
	private local2WorldMatrix: Matrix3 = new Matrix3();
	private world2LocalMatrix: Matrix3 = new Matrix3();
	private stormObject: StormObject | null = null;
	private parent: Transform | null = null;
	private child: Transform[] = [];
	private isDirty: boolean = false;
	readonly anchor: Anchor = new Anchor();
	hash: GUID = new GUID();

	destroy() {
		if (this.parent != null) {
			this.parent.Children.remove(this);
		}
	}

	get Children() {
		return this.child;
	}

	set StormObject(value) {
		if (this.stormObject == null) {
			this.stormObject = value;
		}

		this.anchor.transform = this;
	}

	get StormObject() {
		return this.stormObject;
	}

	get Parent() {
		return this.parent;
	}

	set Parent(value) {
		if (this.parent != null) {
			(<Array<Transform>>this.parent.child).remove(this);
		}

		this.parent = value;
		this.parent.child.push(this);
		this.isDirty = true;
	}

	appendChild(obj: Transform) {
		if (obj.parent != undefined) {
			obj.parent.child.remove(obj);
		}

		obj.parent = this;
		this.child.push(obj);
	}

	get IsDirty() {
		return this.isDirty;
	}

	get Local2WorldMatrix() {
		this.UpdateMatrixUp();
		return this.local2WorldMatrix;
	}

	get World2LocalMatrix() {
		this.UpdateMatrixUp();
		return this.world2LocalMatrix;
	}

	get LocalDegree() {
		return this.localDegree;
	}

	set LocalDegree(value) {
		this.localDegree = value;
		this.isDirty = true;
	}

	set LocalScale(value) {
		this.localScale = value;
		this.isDirty = true;
	}

	get LocalScale() {
		return this.localScale;
	}

	set LocalPositon(value) {
		this.localPositon = value;
		this.isDirty = true;
	}

	get LocalPositon() {
		return this.localPositon;
	}

	updateWorldTransform() {
		if (this.parent != null) {
			this.worldPosition = this.parent.worldPosition.add(this.localPositon);
			this.worldDegree = this.parent.worldDegree + this.localDegree;
			this.worldScale = this.parent.worldScale.mul(this.localScale);
		} else {
			this.worldPosition = this.localPositon.copy();
			this.worldDegree = this.localDegree;
			this.worldScale = this.localScale.copy();
		}

		for (const child of this.child) {
			child.updateWorldTransform();
		}
	}

	UpdateLocalTransform() {
		let stack = [];
		let current = this;

		while (current != undefined) {
			for (const child of current.child) {
				stack.push(child);
			}

			if (current.parent != null) {
				current.localPositon = current.worldPosition.sub(
					current.parent.worldPosition
				);
				current.localDegree = current.worldDegree - current.parent.worldDegree;
				current.localScale = current.worldScale.div(current.parent.worldScale);
			} else {
				current.localPositon = current.worldPosition.copy();
				current.localDegree = current.localDegree;
				current.localScale = current.localScale.copy();
			}

			current = stack.shift();
		}
	}

	UpdateMatrixUp() {
		if (this.parent != null) {
			this.parent.UpdateMatrixUp();
		}

		this.UpdateMatrix();
	}

	UpdateMatrixDown() {
		this.UpdateMatrix();
		for (const child of this.child) {
			child.UpdateMatrixDown();
		}
	}

	UpdateMatrix() {
		let world2Local = new Matrix3();
		let local2World = new Matrix3();

		local2World.translate(-this.localPositon.x, -this.localPositon.y);
		local2World.Rotate(-this.LocalDegree);
		local2World.scale(1 / this.localScale.x, 1 / this.localScale.y);

		world2Local.translate(this.localPositon.x, this.localPositon.y);
		world2Local.Rotate(this.LocalDegree);
		world2Local.scale(this.localScale.x, this.localScale.y);

		this.parent.local2WorldMatrix.mul(local2World);
		this.parent.world2LocalMatrix.mul(world2Local);

		this.world2LocalMatrix = world2Local;
		this.local2WorldMatrix = local2World;
	}

	updateWorldPosition() {
		if (this.parent != null) {
			this.parent.updateWorldPosition();
			this.worldPosition = this.parent.worldPosition.add(this.localPositon);
		} else {
			this.worldPosition = this.localPositon.copy();
		}
	}

	updateW2LPostion() {
		if (this.parent != null) {
			this.localPositon = this.worldPosition.sub(this.parent.worldPosition);
		} else {
			this.localPositon = this.worldPosition;
		}
	}

	updateW2LScale() {
		if (this.parent != null) {
			this.localScale = this.worldScale.div(this.parent.worldScale);
		} else {
			this.localScale = this.worldScale.copy();
		}
	}

	updateW2LDegree() {
		if (this.parent != null) {
			this.localDegree = this.worldDegree - this.parent.worldDegree;
		} else {
			this.localDegree = this.worldDegree;
		}
	}

	set WorldPosition(value) {
		this.updateWorldPosition();
		this.worldPosition = value;
		this.updateW2LPostion();

		this.isDirty = true;
	}

	get WorldPosition() {
		this.updateWorldPosition();
		return this.worldPosition;
	}

	updateWorldDegree() {
		if (this.parent != null) {
			this.parent.updateWorldDegree();
			this.worldDegree = this.parent.worldDegree + this.localDegree;
		} else {
			this.worldDegree = this.localDegree;
		}
	}

	get WorldDegree() {
		this.updateWorldDegree();
		return this.worldDegree;
	}
	set WorldDegree(value) {
		this.updateWorldDegree();
		this.worldDegree = value;
		this.updateW2LDegree();

		this.isDirty = true;
	}

	updateWorldScale() {
		if (this.parent != null) {
			this.parent.updateWorldScale();
			this.worldScale = this.parent.worldScale.mul(this.localScale);
		} else {
			this.worldScale = this.localScale.copy();
		}
	}

	set WorldScale(value) {
		this.updateWorldScale();
		this.worldScale = value;
		this.updateW2LScale();

		this.isDirty = true;
	}

	get WorldScale() {
		this.updateWorldScale();
		return this.worldScale;
	}

	get WorldHeight() {
		return this.worldScale.y * this.Height;
	}

	get WorldWidth() {
		return this.worldScale.x * this.Width;
	}

	getGlobalRect() {
		let position = this.WorldPosition;
		let scale = this.WorldScale;
		let rect = new Rect(
			position.x,
			position.y,
			this.WorldWidth * scale.x,
			this.WorldHeight * scale.y
		);

		return rect;
	}
}
