import { StormComponent } from "../../Core/StormComponent";
import { EventManager } from "../../Core/EventManager";
import { StormObject } from "../../Core/Widgets/StormObject";
import { Vector2 } from "../../Core/Math/Vector2";
import { UIEventListhenner } from "./UIEventListhenner";
import { isArray } from "util";
import { HierachyItem } from "../HierachyItem";
@HierachyItem("TreeView")
export class TreeView extends StormComponent {
	datas: any;
	zonePrefab;
	leafPrefab;
	verticalPadding: number = 0;
	leafPadding: number = 0;
	itemHeight: number = 30;
	itemwidth: number = 30;
	onItemClick: EventManager = new EventManager();
	getChildData: EventManager = new EventManager();
	items: TreeItem[] = [];

	handleItemClick(target, value, value2) {
		let obj = <TreeItem>target;

		let treeItem = obj;

		this.onItemClick.Call(this, treeItem.data);
	}

	setCompData(datas) {
		if (!isArray(datas)) {
			return;
		}

		this.datas = datas;

		for (const item of this.items) {
			item.destroy();
		}

		for (let index = 0; index < datas.length; index++) {
			let data = datas[index];
			let item = new TreeItem();
			item.treeView = this;
			item.data = data;
			item.index = index;
			item.createSelf();
			this.items.push(item);
		}
	}
}


export class TreeItem {
	isZoneItem: boolean = false;
	isExpand: boolean = false;
	data;
	expandCount: number = 0;
	children: TreeItem[] = [];
	parent: TreeItem | null = null;
	item: StormObject;
	treeView: TreeView | null;
	isExpanded: boolean = false;
	index: number = 0;
	width: number;
	height: number;

	expand() {
		if (this.isExpand) {
			return;
		}

		this.expandImp();

		for (const child of this.children) {
			if (child.isExpand) {
				child.expand();
			}
		}
	}

	resizeImp(treeItem) {
		if (treeItem.isExpand) {
			treeItem.width = treeItem.treeView.itemwidth;
			let height = treeItem.treeView.itemHeight;

			for (const child of treeItem.children) {
				height += treeItem.treeView.verticalPadding;

				child.item.transfrom.LocalPositon = new Vector2(
					treeItem.treeView.leafPadding,
					height
				);

				height += child.height;
				treeItem.treeView.transform.Width = Math.max(
					treeItem.width,
					child.width + treeItem.treeView.leafPadding
				);
			}

			treeItem.height = height;
		} else {
			treeItem.width = treeItem.treeView.itemwidth;
			treeItem.height = treeItem.treeView.itemHeight;
		}
	}

	resizeSelf() {
		this.resizeImp(this);

		if (this.parent == null) {
			this.treeView.transform.Width = 0;
			let height = 0;

			for (const child of this.treeView.items) {
				child.item.transfrom.LocalPositon = new Vector2(0, height);
				height += this.treeView.verticalPadding;
				height += child.height;
				this.treeView.transform.Width = Math.max(
					this.treeView.transform.Width,
					child.width
				);
			}

			this.treeView.transform.Height = height;
		} else {
			this.resizeImp(this.parent);
		}
	}

	expandImp() {
		if (this.isExpanded) {
			for (const child of this.children) {
				child.createSelf();
			}
		} else {
			for (let index = 0; index < this.data.length; index++) {
				let data = this.data[index];
				let item = new TreeItem();
				item.treeView = this.treeView;
				item.data = data;
				item.index = index;
				item.parent = this;
				item.createSelf();
				this.children.push(item);
			}

			this.isExpanded = true;
		}

		this.isExpand = true;
		this.resizeSelf();
	}

	closeImp() {
		for (const child of this.children) {
			child.item.destroy();
			child.item = null;
		}

		this.isExpand = false;
		this.resizeSelf();
	}

	destroy() {
		this.close();
		this.item.destroy();
	}

	close() {
		if (!this.isExpand) {
			return;
		}

		this.closeImp();

		for (const child of this.children) {
			child.close();
		}
	}

	createSelf() {
		let item: StormObject;
		let childDatas = this.treeView.getChildData.Call(this, this.data);
		if (childDatas != null && isArray(childDatas)) {
			this.isZoneItem = true;
			item = StormObject.Instantiate(this.treeView.zonePrefab);
		} else {
			item = StormObject.Instantiate(this.treeView.leafPrefab);
		}

		if (this.parent == null) {
			item.transfrom.Parent = this.treeView.transform;
		} else {
			item.transfrom.Parent = this.parent.item.transfrom;
		}

		item.transfrom.Width = this.treeView.itemwidth;
		item.transfrom.Height = this.treeView.itemHeight;
		this.width = item.transfrom.Width;
		this.height = item.transfrom.Height;

		if (this.parent == null) {
			item.transfrom.LocalPositon = new Vector2(
				0,
				this.treeView.itemHeight * this.index +
					this.index * this.treeView.verticalPadding
			);
		} else {
			item.transfrom.LocalPositon = new Vector2(
				this.treeView.leafPadding,
				this.treeView.itemHeight * this.index +
					this.index * this.treeView.verticalPadding +
					this.treeView.itemHeight
			);
		}

		this.item = item;

		let behaivours = item.getBehaviours();

		let uiEvent: UIEventListhenner = item.getBehaviour<UIEventListhenner>(
			UIEventListhenner
		);

		if (uiEvent == undefined) {
			uiEvent = item.addBehaviour(UIEventListhenner);
		}
		uiEvent.OnClick.remove((target, value, value2) => {
			this.treeView.handleItemClick(this, value, value2);
		});

		uiEvent.OnClick.Regist(
			(target, value, value2) => {
				if (this.isZoneItem) {
					if (this.isExpand) {
						this.close();
					} else {
						this.expand();
					}
				}

				this.treeView.handleItemClick(this, value, value2);
			},
			null,
			this.data
		);

		for (const behaivour of behaivours) {
			if (behaivour instanceof StormComponent) {
				behaivour.setCompData(this.data);
			}
		}
	}
}
