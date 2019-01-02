import { StormObject } from "../../Core/Widgets/StormObject";
import { ListAlignment } from "../../Core/Widgets/ListAlignment";
import { StormComponent } from "../../Core/StormComponent";
import { Vector2 } from "../../Core/Math/Vector2";
import { UIEventListhenner } from "./UIEventListhenner";
import { StyleAttributes } from "../../Core/Attributes/StyleAttributes";
import { EventManager } from "../../Core/EventManager";

export class StormStackList extends StormComponent {
	datas: any;
	item: StormObject;
	size: number = 100;
	padding: number = 0;
	alignment: ListAlignment = ListAlignment.horizontal;
	items: StormObject[] = [];
	renderItem: selectablePrefab | null = null;
	onItemClick: EventManager = new EventManager();

	setCompData(data: any) {
		this.datas = data;
		this.render();
	}

	computeSelfSize() {
		if (this.alignment == ListAlignment.horizontal) {
			this.transform.Width =
				this.size * this.datas.length + this.padding * (this.datas.length - 1);
		} else {
			this.transform.Height =
				this.size * this.datas.length + this.padding * (this.datas.length - 1);
		}
	}

	handleItemClick(target, value, value2) {
		console.log(value2)
		this.onItemClick.Call(this, value2);
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

			console.log(newItem)
			console.log(this.item)
			newItem.transfrom.Parent = this.transform;

			let behaviours = newItem.getBehaviours();

			for (const behaviour of behaviours) {
				if (behaviour instanceof StormComponent) {
					behaviour.setCompData(data);
				}
			}

			let uiEvent: UIEventListhenner = newItem.getBehaviour<UIEventListhenner>(
				UIEventListhenner
			);

			if (uiEvent == undefined) {
				uiEvent = newItem.addBehaviour(UIEventListhenner);
			}
			uiEvent.OnClick.remove((target, value, value2) => {
				this.handleItemClick(target, value, value2);
			});
			uiEvent.OnClick.Regist((target, value, value2) => {
				this.handleItemClick(target, value, value2);
			}, data);

			if (this.alignment == ListAlignment.horizontal) {
				newItem.transfrom.Height = this.transform.Height;
				newItem.transfrom.Width = this.size;
				newItem.transfrom.LocalPositon = new Vector2(
					this.size * index + index * this.padding,
					0
				);
			} else {
				newItem.transfrom.Width = this.transform.Width;
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
