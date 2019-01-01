import { GlobalData } from "../GlobalData";
import { WorkItem } from "../workItem";
import { Enviroment } from "../Components/Enviroment";
import { RendererTarget } from "../Core/Renderer/RendererTarget";
import { WebLoader } from "../Core/Renderer/Web/WebLoader";
import { StormObject } from "../Core/Widgets/StormObject";
import { Behaviour } from "../Core/Behaviours";
import { WebRenderer } from "../Core/Renderer/Web/WebRenderer";
import { RendererText } from "../Core/Renderer/Virtual/RendererText";
import { RendererContainer } from "../Core/Renderer/Virtual/RendererContainer";
import { RendererPanel } from "../Core/Renderer/Virtual/RendererPanel";
import { Transform, TransFormAttributes } from "../Core/Attributes/Transform";
import { Behaviourtest } from "./Behaviours/NavBarButtonGroup";
import { Vector2, EditableVector2 } from "../Core/Math/Vector2";
import { SSL_OP_ALL } from "constants";
import { ColorKeywords } from "../Core/Math/Color";
import { EBorder } from "../Core/Widgets/Anchor";
import { MiddleArea } from "./Middle/MiddleArea";
import { BottomArea } from "./Bottom/BottomArea";
import { PanelMain } from './PanelMain';

export class PanelWorking {
	public element: HTMLElement = <any>null;
	public itemCount = 0;
	public workItems: Array<WorkItem> = [];

	public SetDiv(element: HTMLElement) {
		this.element = element;
		this.element.style.background = "#1e1e1e";
		this.element.style.overflow = "scroll";
		this.element.style.resize = "both";
		this.element.style.border = "1px solid";
		this.element.onmousemove = event => {
			// console.log((<any>event).target);
		};

		this.element.onmouseup = () => {
			// console.log((event as any).target);
		};

		this.element.onmousedown = e => {
			console.log(e.which);
			if (e.which == 3) {
				//获取鼠标的x轴
				var x = e.pageX - 10;
				//获取鼠标的Y轴
				var y = e.pageY - 10;
				//对我们设定的菜单元素位置移动到当前鼠标右键点击的位置，并且显示出来
				var button = document.createElement("button");

				button.style.top = y.toString();
				button.style.left = x.toString();
				button.style.display = "block";
				button.style.position = "absolute";
				button.style.width = "100";
				button.style.height = "30";
				button.textContent = "destroy";
				this.element.appendChild(button);
				button.onmouseleave = () => {
					this.element.removeChild(button);
				};
			}
		};

		this.element.ondragstart = ev => {
			GlobalData.instance.currentDrag = ev.target;

			for (const item of this.workItems) {
				if (item.stormObj.domElement.element.id == (<any>ev.target).id) {
					GlobalData.instance.currentDragData = item;
					break;
				}
			}

			GlobalData.instance.from = "work";
			GlobalData.instance.startX = ev.offsetX;
			GlobalData.instance.startY = ev.offsetY;
			ev.dataTransfer.setData("Text", (ev.target as any).id);
			console.log(ev);
		};

		var parent = document.createElement("div");
		parent.style.height = "400";
		parent.style.width = "400";
		this.element.appendChild(parent);

		
		// panel.transform.LocalScale.x = 0.5;

		// navBar.anchor.right.target = panel;
		// navBar.anchor.left.target = panel;

		// for (let index = 0; index < 2; index++) {
		// 	let so1 = new StormObject();
		// 	so1.setRenderer(RendererText);
		// 	so1.getRenderer().setData(index);
		// 	so1.transform.LocalPositon = new Vector2(index * 200, 0);
		// 	so1.transform.WorldDegree = index * 10;
		// 	so1.transform.WorldScale = new Vector2((index + 1) * 0.1, 1);
		// 	so1.anchor.left.target = panel;
		// 	so1.anchor.right.target = panel;
		// 	so1.anchor.right.value = 10;
		// 	// so1.transform.WorldDegree = index;
		// 	panel.transform.appendChild(so1.transform);
		// 	if (index == 1) {
		// 		so1.addBehaviour(Behaviourtest);
		// 	}
		// }

		let panel=new PanelMain()
		panel.start(this.element)
		// let tt = new Transform();
		// tt.LocalPositon.x = 100;
		// let current = tt;
		// for (let index = 0; index < 100; index++) {
		// 	let tt2 = new Transform();
		// 	tt2.Parent = current;
		// 	current = tt2;
		// }

		// let updaste = () => {
		// 	let old = new Date().getTime();

		// 	tt.updateWorldTransform();
		// 	tt.UpdateLocalTransform();

		// 	let newt = new Date().getTime();
		// 	console.log(newt - old);
		// 	console.log(current.WorldPosition)
		// };

		// setInterval(updaste);
	}

	public init() {
		(<HTMLElement>this.element.parentNode).ondrop = ev => this.dropmiddle(ev);
	}

	public Load(items: Array<StormObject>) {
		// var self = this;
		// for (const item of items) {
		// 	item.Load();
		// 	const node = item.domElement.element;
		// 	node.id = item.domElement.domFileName.split(".")[0];
		// 	node.id = node.id + self.itemCount;
		// 	self.element.appendChild(node);
		// 	self.itemCount++;
		// 	node.style.localPosition = "relative";
		// 	const workitem = new WorkItem();
		// 	workitem.id = node.id;
		// 	workitem.setitem(node);
		// 	workitem.setStorm(item);
		// 	workitem.OnItemClick((item: any) => self.HandleWorkItemClick(item));
		// 	self.workItems.push(workitem);
		// 	item.LoadHash();
		// }
		// for (const item of items) {
		// 	if (item.parentHash != null) {
		// 		let mountedElement = StormObject.FindFromHash(item.parentHash);
		// 		item.mountedElement = mountedElement;
		// 		mountedElement.children.push(item);
		// 		mountedElement.domElement.element.appendChild(item.domElement.element);
		// 	}
		// 	for (const ch of item.children) {
		// 		let child = StormObject.FindFromHash(ch.hash);
		// 		item.children.push(child);
		// 		child.mountedElement = item;
		// 		item.domElement.element.appendChild(child.domElement.element);
		// 	}
		// }
	}

	public dropmiddle(ev: MouseEvent) {
		// console.log(ev);
		// ev.preventDefault();
		// let comp = GlobalData.instance.currentDrag;
		// if (GlobalData.instance.from != "work") {
		// 	comp = GlobalData.instance.currentDragData;
		// 	const obj = StormObject.New();
		// 	obj.setDom(comp.name + ".html");
		// 	obj.startLife();
		// 	obj.Refresh();
		// 	const node = obj.domElement.element;
		// 	node.id = comp.name;
		// 	node.id = node.id + this.itemCount;
		// 	this.element.appendChild(node);
		// 	this.itemCount++;
		// 	node.style.localPosition = "absolute";
		// 	const workitem = new WorkItem();
		// 	workitem.setitem(node);
		// 	workitem.setStorm(obj);
		// 	workitem.OnItemClick((item: any) => this.HandleWorkItemClick(item));
		// 	this.workItems.push(workitem);
		// 	node.style.resize = "both";
		// 	node.style.border = "1px solid";
		// 	node.style.overflow = "visible";
		// 	var x = ev.layerX;
		// 	//获取鼠标的Y轴
		// 	var y = ev.layerY;
		// 	node.style.top = y.toString();
		// 	node.style.left = x.toString();
		// } else {
		// 	const attributes =
		// 		GlobalData.instance.currentDragData.stormObj.domElement.attributes;
		// 	// comp = GlobalData.instance.currentDrag;
		// 	const left = Number(attributes["left"].replace("px", ""));
		// 	const top = Number(attributes["top"].replace("px", ""));
		// 	// attributes["left"] = String(
		// 	// 	left + ev.clientX - GlobalData.instance.startX
		// 	// );
		// 	// attributes["top"] = String(top + ev.clientY - GlobalData.instance.startY);
		// 	console.log(ev);
		// 	var x = ev.layerX - <number>GlobalData.instance.startX;
		// 	var y = ev.layerY - <number>GlobalData.instance.startY;
		// 	attributes["top"] = y.toString();
		// 	attributes["left"] = x.toString();
		// 	attributes["localWidth"] =
		// 		GlobalData.instance.currentDragData.stormObj.domElement.element.style.localWidth;
		// 	attributes["localHeight"] =
		// 		GlobalData.instance.currentDragData.stormObj.domElement.element.style.localHeight;
		// 	this.HandleWorkItemClick(GlobalData.instance.currentDragData);
		// 	// comp.stormObj.domElement.UpdateAttributes();
		// 	const item = GlobalData.instance.currentDragData as WorkItem;
		// 	const target = event.target as HTMLElement;
		// 	if (
		// 		target != item.stormObj.domElement.element.parentNode &&
		// 		target != item.stormObj.domElement.element
		// 	) {
		// 		var key = target.getAttribute("Key");
		// 		var mountedElement = StormObject.FindFromHash(key);
		// 		if (mountedElement == null) {
		// 			return;
		// 		}
		// 		mountedElement.AddChild(item.stormObj);
		// 	}
		// }
	}

	public onWorkItemClick: any;

	public HandleWorkItemClick(item: any) {
		this.onWorkItemClick(item);
	}

	public OnWorkItemClick(onWorkItemClick: any) {
		this.onWorkItemClick = onWorkItemClick;
	}
}
