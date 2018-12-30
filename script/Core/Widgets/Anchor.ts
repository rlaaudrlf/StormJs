import { Transform, TransFormAttributes } from "../Attributes/Transform";
import { EditableVector2, Vector2 } from "../Math/Vector2";
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
			let thisTransform = this.transform;
			this.left.anchorFrame = Anchor.AnchorFrame;
			this.left.target.anchor.updateLeftAnchor();
			let targetAttributs = this.left.target;

			if (this.left.border == EBorder.left) {
				let x =
					targetAttributs.WorldPosition.x +
					targetAttributs.WorldWidth * this.left.percentage +
					this.left.value;
				thisTransform.WorldPosition = new Vector2(
					x,
					thisTransform.WorldPosition.y
				);
			} else if (this.left.border == EBorder.right) {
				let x =
					targetAttributs.WorldPosition.x +
					targetAttributs.WorldWidth -
					targetAttributs.WorldWidth * this.left.percentage -
					this.left.value;
				thisTransform.WorldPosition = new Vector2(
					x,
					thisTransform.WorldPosition.y
				);
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
			let thisTransform = this.transform;
			let targetAttributs = this.right.target;

			if (this.right.border == EBorder.left) {
				let width =
					targetAttributs.WorldPosition.x +
					targetAttributs.WorldWidth * this.right.percentage +
					this.right.value -
					thisTransform.WorldPosition.x;
				thisTransform.Width = width / thisTransform.WorldScale.x;
			} else if (this.right.border == EBorder.right) {
				let width =
					targetAttributs.WorldPosition.x +
					targetAttributs.WorldWidth -
					targetAttributs.WorldWidth * this.right.percentage -
					this.right.value -
					thisTransform.WorldPosition.x;
				thisTransform.Width = width / thisTransform.WorldScale.x;
			}
		}
	}

	udpateTopAnchor() {
		if (this.top.target != null && this.top.anchorFrame != Anchor.AnchorFrame) {
			this.top.anchorFrame != Anchor.AnchorFrame;
			let thisTransform = this.transform;
			this.top.target.anchor.udpateTopAnchor();
			let targetAttributs = this.top.target;
			if (this.top.border == EBorder.top) {
				let y =
					targetAttributs.WorldPosition.y +
					targetAttributs.Height * this.top.percentage +
					this.top.value;
				thisTransform.WorldPosition = new Vector2(
					thisTransform.WorldPosition.x,
					y
				);
			} else if (this.top.border == EBorder.bottom) {
				let y =
					targetAttributs.WorldPosition.y +
					targetAttributs.Height -
					targetAttributs.Height * this.top.percentage -
					this.top.value;

				thisTransform.WorldPosition = new Vector2(
					thisTransform.WorldPosition.x,
					y
				);
			}
		}
	}

	udpateBottomAnchor() {
		if (
			this.bottom.target != null &&
			this.bottom.anchorFrame != Anchor.AnchorFrame
		) {
			let thisTransform = this.transform;
			this.bottom.target.anchor.udpateBottomAnchor();
			let targetAttributs = this.bottom.target;

			if (this.bottom.border == EBorder.top) {
				let height =
					targetAttributs.WorldPosition.y +
					targetAttributs.Height * this.bottom.percentage +
					this.bottom.value -
					thisTransform.WorldPosition.y;
				thisTransform.Height = height / thisTransform.WorldScale.y;
			} else if (this.bottom.border == EBorder.bottom) {
				let height =
					targetAttributs.WorldPosition.y +
					targetAttributs.Height -
					targetAttributs.Height * this.bottom.percentage -
					this.bottom.value -
					thisTransform.WorldPosition.y;
				thisTransform.Height = height / thisTransform.WorldScale.y;
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
