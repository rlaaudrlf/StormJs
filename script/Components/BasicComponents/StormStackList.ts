import { StormObject } from "../../Core/Widgets/StormObject";
import { ListAlignment } from "../../Core/Widgets/ListAlignment";
import { ComponentBase } from "./ComponentsBase";
import { RendererContainer } from "../../Core/Renderer/Virtual/RendererContainer";
import { Vector2 } from "../../Core/Math/Vector2";

export class StormStackList extends ComponentBase {
	datas: any;
	item: StormObject;
	size: number = 100;
	padding: number = 0;
	alignment: ListAlignment = ListAlignment.horizontal;
	items: StormObject[] = [];
	renderItem: selectablePrefab | null = null;
	thisNode: StormObject;

	awake() {
		this.thisNode = new StormObject();
		this.thisNode.setRenderer(RendererContainer);
	}

	setCompData(data: any) {
		this.datas = data;
		this.render();
	}

	computeSelfSize() {
		if (this.alignment == ListAlignment.horizontal) {
			this.thisNode.transfrom.Width =
				this.size + this.padding * this.datas.length;
		} else {
			this.thisNode.transfrom.Height =
				this.size + this.padding * this.datas.length;
		}
	}

	render() {
		if (this.datas == undefined) {
			return;
		}

		this.computeSelfSize();

		for (let index = 0; index < this.datas.length; index++) {
			let newItem: StormObject;
			let data = this.datas[index];

			if (this.renderItem != null) {
				newItem = StormObject.Instantiate(this.renderItem.OnSelect(data));
			} else {
				newItem = StormObject.Instantiate(this.item);
			}

			newItem.transfrom.Parent = this.thisNode.transfrom;

			let behaviours = newItem.getBehaviours();

			for (const behaviour of behaviours) {
				if (behaviour instanceof ComponentBase) {
					behaviour.setCompData(data);
				}
			}

			if (this.alignment == ListAlignment.horizontal) {
				newItem.transfrom.Height = this.thisNode.transfrom.Height;
				newItem.transfrom.Width = this.size;
				newItem.transfrom.LocalPositon = new Vector2(
					this.size * index + index * this.padding,
					0
				);
			} else {
				newItem.transfrom.Width = this.thisNode.transfrom.Width;
				newItem.transfrom.Height = this.size;
				newItem.transfrom.LocalPositon = new Vector2(
					0,
					this.size * index + index * this.padding
				);
			}

			this.items.push(newItem);
		}
	}
}

export class selectablePrefab {
	prefabs: StormObject[] = [];
	OnSelect: (data: any) => StormObject;
}
