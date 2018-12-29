import { StormObject } from "./StormObject";
import { Transform, TransFormAttributes } from "../Attributes/Transform";
import { EditableVector2 } from "../Math/Vector2";
export class Anchor {
	left: AnchorTarget = new AnchorTarget();
	right: AnchorTarget = new AnchorTarget();
	top: AnchorTarget = new AnchorTarget();
	bottom: AnchorTarget = new AnchorTarget();
	transform: Transform;
	static AnchorFrame: number = 0;

	static UpdateAnchorFrame() {
		this.AnchorFrame++ % 1000000;
	}

	constructor() {
		this.left.border = EBorder.left;
		this.right.border = EBorder.right;
		this.top.border = EBorder.top;
		this.bottom.border = EBorder.bottom;
	}

	setWidget(widget: Transform) {
		this.transform = widget;
	}

	updateAnchor() {
		this.updateLeftAnchor();
		this.udpateRightAnchor();
		this.udpateTopAnchor();
		this.udpateBottomAnchor();
	}

	updateLeftAnchor() {
		if (
			this.left.target != null &&
			this.left.anchorFrame != Anchor.AnchorFrame
		) {
			let thisTransform = <TransFormAttributes>(<any>this.transform);
			this.left.anchorFrame = Anchor.AnchorFrame;
			this.left.target.anchor.updateLeftAnchor();
			let targetAttributs = <TransFormAttributes>(<any>this.left.target);

			if (this.left.border == EBorder.left) {
				let x =
					targetAttributs.worldPosition.x +
					targetAttributs.WorldWidth * this.left.percentage +
					this.left.value;
				(<EditableVector2>thisTransform.worldPosition).x = x;
			} else if (this.left.border == EBorder.right) {
				let x =
					targetAttributs.worldPosition.x +
					targetAttributs.WorldWidth -
					targetAttributs.WorldWidth * this.left.percentage -
					this.left.value;
				(<EditableVector2>thisTransform.worldPosition).x = x;
			}
		}
	}

	udpateRightAnchor() {
		if (
			this.right.target != null &&
			this.right.anchorFrame != Anchor.AnchorFrame
		) {
			this.right.anchorFrame = Anchor.AnchorFrame;
			this.right.target.anchor.udpateRightAnchor();
			let thisTransform = <TransFormAttributes>(<any>this.transform);
			let targetAttributs = <TransFormAttributes>(<any>this.right.target);

			if (this.right.border == EBorder.left) {
				let width =
					targetAttributs.worldPosition.x +
					targetAttributs.WorldWidth * this.right.percentage +
					this.right.value -
					thisTransform.worldPosition.x;
				thisTransform.Width = width / thisTransform.worldScale.x;
			} else if (this.right.border == EBorder.right) {
				let width =
					targetAttributs.worldPosition.x +
					targetAttributs.WorldWidth -
					targetAttributs.WorldWidth * this.right.percentage -
					this.right.value -
					thisTransform.worldPosition.x;
				thisTransform.Width = width / thisTransform.worldScale.x;
			}
		}
	}

	udpateTopAnchor() {
		if (this.top.target != null && this.top.anchorFrame != Anchor.AnchorFrame) {
			this.top.anchorFrame != Anchor.AnchorFrame;
			let thisTransform = <TransFormAttributes>(<any>this.transform);
			this.top.target.anchor.udpateTopAnchor();
			let targetAttributs = <TransFormAttributes>(<any>this.top.target);
			if (this.top.border == EBorder.top) {
				let y =
					targetAttributs.worldPosition.y +
					targetAttributs.Height * this.top.percentage +
					this.top.value;
				(<EditableVector2>thisTransform.worldPosition).y = y;
			} else if (this.top.border == EBorder.bottom) {
				let y =
					targetAttributs.worldPosition.y +
					targetAttributs.Height -
					targetAttributs.Height * this.top.percentage -
					this.top.value;
				(<EditableVector2>thisTransform.worldPosition).y = y;
			}
		}
	}

	udpateBottomAnchor() {
		if (
			this.bottom.target != null &&
			this.bottom.anchorFrame != Anchor.AnchorFrame
		) {
			let thisTransform = <TransFormAttributes>(<any>this.transform);
			this.bottom.target.anchor.udpateBottomAnchor();
			let targetAttributs = <TransFormAttributes>(<any>this.bottom.target);

			if (this.bottom.border == EBorder.top) {
				let height =
					targetAttributs.worldPosition.y +
					targetAttributs.Height * this.bottom.percentage +
					this.bottom.value -
					thisTransform.worldPosition.y;
				thisTransform.Height = height / thisTransform.worldScale.y;
			} else if (this.bottom.border == EBorder.bottom) {
				let height =
					targetAttributs.worldPosition.y +
					targetAttributs.Height -
					targetAttributs.Height * this.bottom.percentage -
					this.bottom.value -
					thisTransform.worldPosition.y;
				thisTransform.Height = height / thisTransform.worldScale.y;
			}
		}
	}
}

export enum EBorder {
	left,
	right,
	top,
	bottom
}

export class AnchorTarget {
	border: EBorder = EBorder.left;
	target: Transform | null = null;
	value: number = 0;
	percentage: number = 0;
	anchorFrame: number = -1;
}
