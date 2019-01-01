import { DoubleBind } from "../../Core/DoubleBind";
import { Vector2, EditableVector2 } from "../../Core/Math/Vector2";
import { StormComponent } from "../../Core/StormComponent";
import { StormObject } from "../../Core/Widgets/StormObject";

export class List extends StormComponent {
	data: any[] | null = null;
	itemWidth: number = 100;
	itemHeight: number = 100;
	alignment: "column" | "horizontal";
	paddingY: number = 0;
	paddingX: number = 0;
	perLineCount: number = 1;
	selectItemStyleOnRender: (data) => StormObject;
	onItemClick: (item, data) => void;
	public OnRender: (li: HTMLElement, data: any) => void;

	private items: StormObject[] = [];

	constructor() {
		super();
	}

	setData(data: any) {
		this.data = <any[] | null>DoubleBind.DataToBind(data);
		this.render();
	}

	render() {
		this.computeSize();
		this.renderItems();
	}

	private computeSize() {
		let width = this.itemWidth * this.perLineCount;
		let Height =
			this.itemHeight * Math.ceil(this.data.length / this.perLineCount);

		if (this.alignment == "column") {
		}

		this.stormObject.transfrom.Width = width;
		this.stormObject.transfrom.Height = Height;
	}

	private index2index2d(index: number): Vector2 {
		let positionIndex = new EditableVector2();
		positionIndex.x = index % this.perLineCount;
		positionIndex.y = index / this.perLineCount;
		return positionIndex;
	}

	private index2d2index(index2d: Vector2): number {
		let index;
		index = index2d.y * this.perLineCount;
		index += index2d.x;
		return index;
	}

	private getVisibleIndex(): Vector2[] {
		let clientRect = this.stormObject.transfrom.getGlobalRect();
		let parentRect = this.stormObject.transfrom.Parent.getGlobalRect();

		let visibleStartX =
			clientRect.x > parentRect.x ? clientRect.x : parentRect.x - clientRect.x;
		let visibleStartY =
			clientRect.y > parentRect.y ? clientRect.y : parentRect.y - clientRect.y;
		let visibleEndX = visibleStartX + clientRect.width;
		let parentEndX = parentRect.x + parentRect.width;
		if (visibleEndX > parentEndX) {
			visibleEndX = parentEndX;
		}
		let visibleEndY = visibleStartY + clientRect.height;
		let parentEndY = parentRect.y + parentRect.height;
		if (visibleEndY > parentEndY) {
			visibleEndY = parentEndY;
		}

		let visibleIndexs: Vector2[] = [];
		let visibleIndexStartX = Math.floor(
			visibleStartX / (this.itemWidth + this.paddingX)
		);
		let visibleIndexEndX = Math.ceil(
			(visibleEndX - this.itemWidth) / (this.itemWidth + this.paddingX)
		);

		let visibleIndexStartY = Math.floor(
			visibleStartY / (this.itemHeight + this.paddingY)
		);

		let visibleIndexEndY = Math.ceil(
			(visibleEndY - this.itemHeight) / (this.itemHeight + this.paddingY)
		);

		for (let y = visibleIndexStartY; y <= visibleIndexEndY; y++) {
			for (let x = visibleIndexStartX; x <= visibleIndexEndX; x++) {
				let value = new Vector2(x, y);
				visibleIndexs.push(value);
			}
		}

		return visibleIndexs;
	}

	renderItems() {
		this.removeItems();

		let visibleIndexs = this.getVisibleIndex();
		for (const index2d of visibleIndexs) {
			let index = this.index2d2index(index2d);
			this.addItem(this.data[index], index2d);
		}
	}

	private CalculatePaddingValue(index: Vector2): Vector2 {
		let value = new EditableVector2();

		if (index.x > 0) {
			value.x = this.paddingX;
		}

		if (index.y > 0) {
			value.y = this.paddingY;
		}

		return value;
	}

	private addItem(data, index2d: Vector2) {
		let index: number = this.index2d2index(index2d);

		if (index >= this.data.length) {
			return;
		}
		let itemWidget = this.selectItemStyleOnRender(data);
		let item = itemWidget;
		item.transfrom.Width = this.itemWidth;
		item.transfrom.Height = this.itemHeight;
		let x = index2d.x * this.itemWidth + index2d.x * this.paddingX;
		let y = index2d.y * this.itemHeight + index2d.y * this.paddingY;
		item.transfrom.LocalPositon = new Vector2(x, y);
		item.transfrom.Parent = this.stormObject.transfrom;

		let behaviours = item.getBehaviours();

		for (const behaviour of behaviours) {
			if (behaviour instanceof StormComponent) {
				behaviour.setCompData(this.data[index]);
			}
		}

		this.items.push(item);
	}

	private removeItems() {
		for (const item of this.items) {
			item.destroy();
		}

		this.items = [];
	}
}
