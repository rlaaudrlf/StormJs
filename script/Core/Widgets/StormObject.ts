import { Behaviour } from "../Behaviours";

import { GUID, DeepCloner } from "./DeepCloner";
import { RendererBase } from "../Renderer/Virtual/RendererBase";
import { Transform } from "../Attributes/Transform";
import { Action } from "../Action/Action";
import { Layer } from "../Layer";
import { EventManager } from "../EventManager";

import {
	BehaviourLifeCycle,
	EStormLifeCycle
} from "../Renderer/Web/WebRenderer";

export class StormObject {
	private widget: RendererBase | undefined = undefined;
	private active: boolean = true;
	behaviours: Behaviour[] = [];
	hash: GUID = new GUID();
	name: string = "";
	transfrom: Transform;
	drag: DragDrop | null = null;
	drop: DragDrop | null = null;
	action: Action = new Action();
	layer: Layer = Layer.default;
	onActiveChange: EventManager = new EventManager();

	constructor() {
		this.transfrom = new Transform();
		this.transfrom.StormObject = this;
	}

	getParentRenderer(): RendererBase {
		if (this.transfrom.Parent == undefined) {
			return undefined;
		}

		let renderer: RendererBase = this.transfrom.Parent.StormObject.widget;

		if (renderer == undefined) {
			renderer = this.transfrom.Parent.StormObject.getRenderer();
		}

		return renderer;
	}

	setRenderer<T extends RendererBase>(c: new () => T) {
		this.widget = new c();
		this.widget.setStromObject(this);
	}

	getRenderer<T extends RendererBase>() {
		return <T>(<any>this.widget);
	}

	setActive(visible: boolean) {
		if (visible == this.active) {
			return;
		}

		this.active = visible;

		for (const behaviour of this.behaviours) {
			let behaviourLifeCycle = <BehaviourLifeCycle>(<any>behaviour);
			if (
				behaviourLifeCycle.__currentLife == undefined ||
				behaviourLifeCycle.__currentLife <= EStormLifeCycle.enable
			) {
				continue;
			}
			if (visible) {
				behaviour.onEnable();
			}
			if (!visible) {
				behaviour.onDisable();
			}
		}
		this.onActiveChange.Call(this, this.active);
	}

	getActive() {
		return this.active;
	}

	addBehaviour<T extends Behaviour>(c: new () => T) {
		let behaviour = new c();
		behaviour.stormObject = this;
		behaviour.transform = this.transfrom;
		this.behaviours.push(behaviour);
	}

	getBehaviour<T extends Behaviour>(type): undefined | T {
		for (const behaviour of this.behaviours) {
			if (behaviour instanceof type) {
				return <T>behaviour;
			}
		}

		return undefined;
	}

	getBehaviours() {
		return this.behaviours;
	}

	destroy() {
		for (const child of this.transfrom.Children) {
			child.StormObject.destroy();
		}

		for (const behaviour of this.behaviours) {
			behaviour.dispose();
		}

		if (this.widget != undefined) {
			this.widget.destroy();
		}
	}

	static Instantiate(widget: StormObject): StormObject {
		let obj = DeepCloner.Clone(widget);

		return <StormObject>obj;
	}

	// 	let updater = () => {
	// 		if (
	// 			behaviourUpdater.updateState == updateState.none ||
	// 			behaviour.isDisposed
	// 		) {
	// 			return;
	// 		}

	// 		map[behaviourUpdater.updateState]();
	// 		behaviourUpdater.updateState += 1;

	// 		setTimeout(updater);
	// 	};

	// 	updater();
	// }
}

export class DragDrop {
	id: string;
}
