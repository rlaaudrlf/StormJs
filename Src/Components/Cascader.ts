import { StormComponent } from "../Core/StormComponent";
import { EventManager } from "../Core/EventManager";
import { StormObject } from "../Core/Widgets/StormObject";
import { Transform } from "../Core/Attributes/Transform";
import { Vector2 } from "../Core/Math/Vector2";
import { UIEventListhenner } from "./BasicComponents/UIEventListhenner";
export class Cascader extends StormComponent {
	datas: any;
	zonePrefab;
	leafPrefab;
	verticalPadding;
	leafPadding;
	itemHeight: number = 30;
	itemwidth: number = 30;
	onItemClick: EventManager = new EventManager();
	isZoneItem: EventManager = new EventManager();
	private items: StormObject[] = [];
	currentMaxZhanKai = 0;

	computeSelfSize(itemCount, zhanKaiCount) {
		this.transform.Height =
			this.itemHeight * itemCount.length +
			this.verticalPadding * (itemCount.length - 1);
		this.transform.Width = zhanKaiCount * this.leafPadding + this.itemwidth;
	}

	handleItemClick(target, value, value2) {
		this.onItemClick.Call(this);

		let obj = <StormObject>target;

		let treeItem = obj.getBehaviour<CascaderItem>(CascaderItem);

		if (treeItem.isZhanKai) {
			treeItem.isZhanKai = false;

			for (const child of treeItem.transform.Children) {
				this.items.remove(child.StormObject);
				child.StormObject.destroy();
			}
			this.currentMaxZhanKai = Math.max(
				this.currentMaxZhanKai,
				treeItem.zhanKaiCount
			);
			this.computeSelfSize(this.items.length, this.currentMaxZhanKai);
		} else {
			treeItem.zhanKaiCount;
			this.createItems(
				treeItem.data,
				treeItem.zhanKaiCount + 1,
				treeItem.transform
			);

			treeItem.isZhanKai = true;

			this.currentMaxZhanKai = Math.max(
				this.currentMaxZhanKai,
				treeItem.zhanKaiCount + 1
			);
			this.computeSelfSize(this.items.length, this.currentMaxZhanKai);
		}
	}

	createItems(datas, zhanKaiCount, parent: Transform) {
		for (let index = 0; index < datas.length; index++) {
			let data = datas[index];
			let item: StormObject;
			let isZone = false;
			if (this.isZoneItem.Call(this, data)) {
				item = StormObject.Instantiate(this.zonePrefab);
				isZone = true;
			} else {
				item = StormObject.Instantiate(this.leafPrefab);
			}

			item.transfrom.Parent = parent;

			item.transfrom.Width = this.transform.Width;
			item.transfrom.Height = this.itemHeight;
			item.transfrom.LocalPositon = new Vector2(
				0,
				this.itemHeight * index + index * this.verticalPadding
			);

			let treeItem = item.addBehaviour(CascaderItem);
			treeItem.isZoneItem = isZone;
			treeItem.zhanKaiCount = zhanKaiCount;

			let behaivours = item.getBehaviours();

			let uiEvent: UIEventListhenner = item.getBehaviour<UIEventListhenner>(
				UIEventListhenner
			);

			if (uiEvent == undefined) {
				uiEvent = item.addBehaviour(UIEventListhenner);
			}
			uiEvent.OnClick.remove((target, value, value2) => {
				this.handleItemClick(target, value, value2);
			});
			uiEvent.OnClick.Regist((target, value, value2) => {
				this.handleItemClick(target, value, value2);
			}, data);

			for (const behaivour of behaivours) {
				if (behaivour instanceof StormComponent) {
					behaivour.setCompData(data);
				}
			}

			this.items.push(item);
		}
	}

	setData(data: any) {
		this.datas = data;
		this.createItems(data, 0, this.transform);
	}
}

export class CascaderItem extends StormComponent {
	isZoneItem: boolean = false;
	isZhanKai: boolean = false;
	data;
	zhanKaiCount = 0;
}
