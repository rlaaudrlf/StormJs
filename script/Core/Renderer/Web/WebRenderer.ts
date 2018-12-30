import { Renderer } from "../Renderer";
import { StormObject } from "../../Widgets/StormObject";
import { WebPage } from "./WebPage";
import { Vector2 } from "../../Math/Vector2";
import { StyleAttributes } from "../../Attributes/StyleAttributes";
import { RenderItemBase } from "../RenderItemBase";
import { Updater } from "../../Utils/Updater";
import { Time } from "../../Time";
import { WebEvent } from "./WebEvent";
import { TransFormAttributes } from "../../Attributes/Transform";
import { Anchor } from "../../Widgets/Anchor";
import { RendererPanel } from "../Virtual/RendererPanel";
import { RendererBase } from "../Virtual/RendererBase";

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

export class WebRenderer extends Renderer {
	root: WebPage = new WebPage();
	parent: HTMLElement;
	renderItems: { [key: string]: RenderItemBase } = {};
	renderer: RendererBase | null = null;

	mount(id: string) {
		let element = document.getElementById(id);
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

	private executeBehaviourLateUpdate(stormObject: StormObject) {
		let stormList: StormObject[] = [];
		stormList.push(stormObject);

		let currentStorm = stormList.pop();
		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}
			let behaviours = currentStorm.getBehaviours();

			for (const behaviour of behaviours) {
				let behaviourLifeCycle = <BehaviourLifeCycle>(<any>behaviour);
				if (
					behaviourLifeCycle.__currentLife == EStormLifeCycle.update &&
					behaviour["update"] != undefined
				) {
					behaviour["update"]();
				}
				if (
					behaviourLifeCycle.__currentLife == EStormLifeCycle.update &&
					behaviour["lateUpdate"] != undefined
				) {
					behaviour["lateUpdate"]();
				}
			}

			currentStorm = stormList.pop();
		}
	}

	private executeUpdateAnchor(stormObject: StormObject) {
		Anchor.UpdateAnchorFrame();
		let stormList: StormObject[] = [];
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

	private executeBehaviour(stormObject: StormObject) {
		let stormList: StormObject[] = [];
		stormList.push(stormObject);

		let currentStorm = stormList.pop();
		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}

			let behaviours = currentStorm.getBehaviours();

			for (const behaviour of behaviours) {
				let behaviourLifeCycle = <BehaviourLifeCycle>(<any>behaviour);

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
			}

			currentStorm = stormList.pop();
		}
	}

	private RenderImp(stormObject: StormObject) {
		Time.deltaTime = new Date().getTime() - this.recordTime;
		Time.deltaTime /= 1000;

		if (this.recordTime == 0) {
			Time.deltaTime = 0;
		}

		this.recordTime = new Date().getTime();
		let stormList: StormObject[] = [];
		stormList.push(stormObject);
		let currentStorm = stormList.pop();

		this.executeBehaviour(stormObject);
		this.executeBehaviourLateUpdate(stormObject);

		stormObject.transfrom.updateWorldTransform();
		this.executeUpdateAnchor(stormObject);
		stormObject.transfrom.UpdateLocalTransform();

		while (currentStorm != undefined) {
			for (const child of currentStorm.transfrom.Children) {
				stormList.push(child.StormObject);
			}

			let renderer = currentStorm.getRenderer();

			if (renderer == undefined) {
				currentStorm = stormList.shift();
				continue;
			}

			let nativeRenderer = this.renderItems[renderer.hash.toString()];

			if (nativeRenderer == undefined) {
				nativeRenderer = renderer.renderItem();
				this.renderItems[renderer.hash.toString()] = nativeRenderer;
			}

			let parent = renderer.stormObject.getParentRenderer();
			if (parent == undefined) {
				nativeRenderer.setParent(this.root);
			} else {
				let item = this.renderItems[
					parent.stormObject.getRenderer().hash.toString()
				];
				nativeRenderer.setParent(item);
			}

			nativeRenderer.setRenderer(renderer);

			renderer.stormObject.onActiveChange.Regist((sender, visible) => {
				nativeRenderer.setVisible(visible);
			});

			let transFormAttributes = <TransFormAttributes>(
				(<any>currentStorm.transfrom)
			);

			nativeRenderer.setPosition(transFormAttributes.localPositon);

			nativeRenderer.setScale(
				new Vector2(
					transFormAttributes.WorldWidth,
					transFormAttributes.WorldHeight
				)
			);
			nativeRenderer.setRotate(transFormAttributes.worldDegree);

			currentStorm = stormList.shift();
		}
	}

	recordTime: number = 0;

	Render(renderer: RendererPanel) {
		if (this.parent != undefined) {
			renderer.transform.Width = this.parent.offsetWidth;
			renderer.transform.Height = this.parent.offsetHeight;
		}

		this.renderer = renderer;

		Updater.instance.callbacks.Regist(() => {
			// this.parent.removeChild(this.root.element);
			this.RenderImp(renderer.stormObject);
			// this.parent.appendChild(this.root.element);
		});

		WebEvent.reigst(this.root.element, renderer.stormObject);
		Updater.instance.start();
	}
}
