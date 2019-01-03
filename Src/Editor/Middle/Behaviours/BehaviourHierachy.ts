import { StormComponent } from "../../../Core/StormComponent";
import { IMouseDown } from "../../../Core/Input";
import { InputEvent, MouseKey } from "../../../Core/InputEvent";
import { StormObject } from "../../../Core/Widgets/StormObject";
import { RendererContainer } from "../../../Core/Renderer/Virtual/RendererContainer";
import { StormStackList } from "../../../Components/BasicComponents/StormStackList";
import { PanelMain } from "../../PanelMain";
import { Vector2 } from "../../../Core/Math/Vector2";
import { UIEventListhenner } from "../../../Components/BasicComponents/UIEventListhenner";
import { ListAlignment } from "../../../Core/Widgets/ListAlignment";
import { RendererButton } from "../../../Core/Renderer/Virtual/RendererButton";
import { RendererLabel } from "../../../Core/Renderer/Virtual/RendererLabel";
import { Label } from "../../../Components/BasicComponents/Label";
import { GetHierachyItem } from "../../../Components/HierachyItem";
import { Binder } from "../../../Components/Binder";
import { TreeView } from "../../../Components/BasicComponents/TreeView";
import { EventManager } from "../../../Core/EventManager";

class HierachyItemData {
	data;
	child: HierachyItemData[] = [];
}

export class BehaviourHierachy extends StormComponent implements IMouseDown {
	panel: StormObject;
	treeView: TreeView;
	data: any[] = [];
	onItemClick: EventManager = new EventManager();

	awake() {
		let obj = new StormObject();
		obj.transfrom.anchor.left.target = this.transform;
		obj.transfrom.anchor.right.target = this.transform;
		this.treeView = obj.addBehaviour<TreeView>(TreeView);
		this.treeView.stormObject.setRenderer(RendererContainer);

		this.treeView.itemwidth = 100;

		let item = new StormObject();
		item.setRenderer(RendererButton);

		let label = new StormObject();

		label.transfrom.Parent = item.transfrom;
		label.transfrom.Width = 100;
		label.transfrom.Height = 30;

		label.setRenderer(RendererLabel);
		label.addBehaviour(Label);

		item.setRenderer(RendererButton);
		item.addBehaviour(Binder);

		item
			.getBehaviour<Binder>(Binder)
			.pathcer.Add("key", label.getBehaviour(Label));
		label.getRenderer<RendererLabel>().color.setHex(0x000000);

		this.treeView.leafPrefab = item;
		this.treeView.zonePrefab = item;
		this.treeView.getChildData.Regist((sender, value) => {
			return value;
		}, null);
		this.treeView.transform.Parent = this.transform;
		this.treeView.stormObject.name = "treeView";
		this.treeView.getChildData.Regist((sender, data) => {
			let hierachyItemData = <HierachyItemData>data;
			return hierachyItemData.child;
		}, null);
		this.treeView.onItemClick.Regist((sender,data)=>{
			this.onItemClick.Call(this,data)
		},null)
		this.treeView.leafPadding = 10;
	}

	onMouseDown(inputEvent: InputEvent) {
		if (inputEvent.mouseKey != MouseKey.right) {
			return;
		}
		let stormObject: StormObject = new StormObject();
		stormObject.setRenderer(RendererContainer);
		stormObject.addBehaviour(StormStackList);

		stormObject.transfrom.LocalPositon = new Vector2(
			inputEvent.x,
			inputEvent.y
		);

		let background: StormObject = new StormObject();
		background.transfrom.Parent = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.left.target = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.right.target = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.bottom.target = PanelMain.maskLayer.transfrom;
		background.transfrom.anchor.top.target = PanelMain.maskLayer.transfrom;

		stormObject.transfrom.Parent = background.transfrom;
		background.addBehaviour(UIEventListhenner);
		background
			.getBehaviour<UIEventListhenner>(UIEventListhenner)
			.OnMouseDown.Regist(() => {
				this.panel.destroy();
				this.panel = undefined;
			}, null);

		let stormStack: StormStackList = stormObject.getBehaviour(StormStackList);

		let item = new StormObject();
		let label = new StormObject();

		label.transfrom.Parent = item.transfrom;
		label.transfrom.Width = 100;
		label.transfrom.Height = 30;

		label.setRenderer(RendererLabel);
		label.addBehaviour(Label);

		item.setRenderer(RendererButton);
		item.addBehaviour(Binder);

		item
			.getBehaviour<Binder>(Binder)
			.pathcer.Add("key", label.getBehaviour(Label));
		label.getRenderer<RendererLabel>().color.setHex(0x000000);

		stormStack.item = item;
		stormStack.alignment = ListAlignment.column;
		stormStack.onItemClick.Regist((sender, data) => {
			this.panel.destroy();
			this.panel = undefined;
			let hierachyItemData = new HierachyItemData();
			hierachyItemData.data = data;
			this.data.push(data);

			this.treeView.setCompData(this.data);
		}, null);

		stormStack.size = 30;
		stormStack.setCompData(GetHierachyItem().ToList());

		this.panel = background;

		stormObject.getRenderer<RendererContainer>().background.setHex(0x000000);
	}
}
