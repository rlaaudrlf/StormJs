import {Renderer} from "../Renderer";
import {StormObject} from "../../Widgets/StormObject";
import {WebPage} from "./WebPage";
import {Vector2} from "../../Math/Vector2";
import {RenderItemBase} from "../RenderItemBase";
import {Updater} from "../../Utils/Updater";
import {Time} from "../../Time";
import {WebEvent} from "./WebEvent";
import {TransFormAttributes} from "../../Attributes/Transform";
import {Anchor} from "../../Widgets/Anchor";
import {RendererPanel} from "../Virtual/RendererPanel";
import {RendererEmpty} from "../Virtual/RendererEmpty";
import {Dictionary} from "../../Utils/Dictionary ";
import {RendererMask} from "../Virtual/RendererMask";

export const enum EStormLifeCycle {
	awake = 1,
	enable,
	start,
	update,
	end
}

export interface BehaviourLifeCycle {
	__currentLife: EStormLifeCycle;
}

class RenderItemInfo {
	renderItem: RenderItemBase;

	renderFrame: number;
}

export class WebRenderer extends Renderer {
	root: WebPage = new WebPage();

	parent: HTMLElement;

	renderItems: Dictionary<string, RenderItemInfo> = new Dictionary<
	string,
	RenderItemInfo
	>();

	renderer: RendererEmpty | null = null;

	renderFrame: number = 0;

	updateRenderFrame () {
		this.renderFrame++;
		this.renderFrame %= 10000000;
	}

	mount (id: string) {
		const element = document.getElementById(id);

		this.parent = element;
		if (element != null) {
			element.appendChild(this.root.element);
			window.onresize = () => {
				if (this.renderer != null) {
					this.renderer.transform.Width = this.parent.offsetWidth;
					this.renderer.transform.Height = this.parent.offsetHeight;
				}
			};
		}
	}

	private executeUpdateAnchor (stormObject: StormObject) {
		Anchor.UpdateAnchorFrame();
		const stormList: Array<StormObject> = [];

		stormList.push(stormObject);

		let currentStorm = stormList.pop();

		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}

			currentStorm.transfrom.anchor.updateAnchor();

			currentStorm = stormList.pop();
		}
	}

	private executeInitBehaviour (stormObject: StormObject) {
		const stormList: Array<StormObject> = [];

		stormList.push(stormObject);

		let currentStorm = stormList.pop();

		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}

			const behaviours = currentStorm.getBehaviours();

			for (const behaviour of behaviours) {
				const behaviourLifeCycle = <BehaviourLifeCycle>(<any>behaviour);

				if (behaviourLifeCycle.__currentLife == undefined) {
					behaviourLifeCycle.__currentLife = EStormLifeCycle.awake;
				}

				if (behaviourLifeCycle.__currentLife == EStormLifeCycle.awake) {
					behaviour.awake();
					behaviourLifeCycle.__currentLife++;
				} else if (
					behaviourLifeCycle.__currentLife == EStormLifeCycle.enable &&
					behaviourLifeCycle.__currentLife == EStormLifeCycle.enable &&
					behaviour.stormObject.getActive() == true
				) {
					behaviour.onEnable();
					behaviourLifeCycle.__currentLife++;
				} else if (behaviourLifeCycle.__currentLife == EStormLifeCycle.start) {
					behaviour.start();
					behaviourLifeCycle.__currentLife++;
				}

				if (
					behaviourLifeCycle.__currentLife == EStormLifeCycle.update &&
					behaviour.update != undefined
				) {
					behaviour.update();
				}
				if (
					behaviourLifeCycle.__currentLife == EStormLifeCycle.update &&
					behaviour.lateUpdate != undefined
				) {
					behaviour.lateUpdate();
				}
			}

			currentStorm = stormList.pop();
		}
	}

	private RenderImp (stormObject: StormObject) {
		Time.deltaTime = new Date().getTime() - this.recordTime;
		Time.deltaTime /= 1000;
		this.updateRenderFrame();

		if (this.recordTime == 0) {
			Time.deltaTime = 0;
		}

		this.recordTime = new Date().getTime();
		const stormList: Array<StormObject> = [];

		stormList.push(stormObject);
		let currentStorm = stormList.pop();

		this.executeInitBehaviour(stormObject);

		stormObject.transfrom.updateWorldTransform();
		this.executeUpdateAnchor(stormObject);
		// stormObject.transfrom.UpdateLocalTransform();

		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}

			const renderer = currentStorm.getRenderer();

			if (renderer == undefined) {
				currentStorm = stormList.shift();
				continue;
			}

			let renderItemInfo: RenderItemInfo = this.renderItems.Get(renderer.hash.toString());

			if (renderItemInfo == undefined) {
				renderItemInfo = new RenderItemInfo();
				renderItemInfo.renderFrame = this.renderFrame;
				renderItemInfo.renderItem = renderer.renderItem();
				this.renderItems.Add(renderer.hash.toString(), renderItemInfo);
			}

			renderItemInfo.renderFrame = this.renderFrame;

			let item: RenderItemInfo;
			let render = currentStorm.transfrom.Parent;

			while (render != undefined) {
				if (render.StormObject.getRenderer() != undefined) {
					item = this.renderItems.Get(render.StormObject.getRenderer().hash.toString());
					break;
				}

				render = render.Parent;
			}

			if (item == null || item == undefined) {
				renderItemInfo.renderItem.setParent(this.root);
			} else {
				renderItemInfo.renderItem.setParent(item.renderItem);
			}

			renderItemInfo.renderItem.setRenderer(renderer);

			// renderer.stormObject.onActiveChange.Regist((sender, visible) => {
			// 	renderItemInfo.renderItem.setVisible(visible);
			// });

			const transFormAttributes = <TransFormAttributes>(
				(<any>currentStorm.transfrom)
			);

			let currentObj: StormObject = currentStorm;
			let position = currentObj.transfrom.LocalPositon.copy();

			while (
				currentObj.transfrom.Parent != null ||
				currentObj.transfrom.Parent != undefined
			) {
				currentObj = currentObj.transfrom.Parent.StormObject;
				const renderer = currentObj.getRenderer();

				if (renderer == null || renderer == undefined) {
					position = position.add(currentObj.transfrom.LocalPositon);
				} else {
					break;
				}
			}

			renderItemInfo.renderItem.setPosition(position);

			renderItemInfo.renderItem.setScale(new Vector2(
				transFormAttributes.WorldWidth,
				transFormAttributes.WorldHeight
			));
			renderItemInfo.renderItem.setRotate(transFormAttributes.worldDegree);

			currentStorm = stormList.shift();
		}

		this.destroyUnusedRenderItem();
	}

	private destroyUnusedRenderItem () {
		const keys = this.renderItems.Keys();

		for (const key of keys) {
			const value = this.renderItems[key.toString()];

			if (value.renderFrame != this.renderFrame) {
				value.renderItem.destroy();
				this.renderItems.Remove(key.toString());
			}
		}
	}

	recordTime: number = 0;

	maskCount = 0;

	masks: Array<StormObject> = [];

	setMask (count: number) {
		this.maskCount = Math.max(count, 3);
	}

	getMask (index: number) {
		return this.masks[index];
	}

	Render (renderer: RendererPanel) {
		if (this.parent != undefined) {
			renderer.transform.Width = this.parent.offsetWidth;
			renderer.transform.Height = this.parent.offsetHeight;
		}

		this.renderer = renderer;

		Updater.instance.callbacks.Regist(() => {
			// this.parent.removeChild(this.root.element);
			this.RenderImp(renderer.stormObject);
			// this.parent.appendChild(this.root.element);
		}, null);

		for (let index = 0; index < this.maskCount; index++) {
			const mask = new StormObject();

			mask.name = "MaskLayer";
			mask.name = `maskLayer${index}`;
			mask.setRenderer(RendererMask);
			mask.transfrom.Parent = renderer.transform;
			mask.transfrom.anchor.left.target = renderer.transform;
			mask.transfrom.anchor.right.target = renderer.transform;
			mask.transfrom.anchor.top.target = renderer.transform;
			mask.transfrom.anchor.bottom.target = renderer.transform;
			this.masks.push(mask);
		}

		WebEvent.reigst(this.root.element, renderer.stormObject);
		Updater.instance.start();
	}
}