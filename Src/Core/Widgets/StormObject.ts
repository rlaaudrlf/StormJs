import {Behaviour} from "../Behaviours";

import {DeepCloner} from "./DeepCloner";
import {GUID} from "../Utils/GUID";
import {RendererEmpty} from "../Renderer/Virtual/RendererEmpty";
import {Transform} from "../Attributes/Transform";
import {Layer} from "../Layer";
import {EventManager} from "../EventManager";
import {HierachyItem} from "../../Components/HierachyItem";

import {
	BehaviourLifeCycle,
	EStormLifeCycle
} from "../Renderer/Web/WebRenderer";
import {Serializable} from "../Serializer";
import {RendererPanel} from "../Renderer/Virtual/RendererPanel";

@HierachyItem("StormObject")
@Serializable()
export class StormObject {
	private renderer: RendererEmpty | undefined = undefined;

	private active: boolean = true;

	behaviours: Array<Behaviour> = [];

	hash: GUID = new GUID();

	name: string = "StormObject";

	transfrom: Transform;

	drag: DragDrop | null = null;

	drop: DragDrop | null = null;

	layer: Layer = Layer.default;

	onActiveChange: EventManager = new EventManager();

	constructor () {
		this.transfrom = new Transform();
		this.transfrom.StormObject = this;
	}

	getParentRenderer (): RendererEmpty {
		if (this.transfrom.Parent == undefined) {
			return undefined;
		}

		let {renderer} = this.transfrom.Parent.StormObject;

		if (renderer == undefined) {
			renderer = this.transfrom.Parent.StormObject.getRenderer();
		}

		return renderer;
	}

	getScrollableRenderer ():RendererPanel {
		const result = this.getRenderer();


		return result;
	}

	findParent (where:(obj:StormObject)=>boolean):StormObject {
		let result:StormObject = this.transfrom.StormObject;

		while (!where(result)) {
			if (result == undefined) {
				return undefined;
			}

			result = result.transfrom.Parent.StormObject;
		}

		return result;
	}

	setRenderer<T extends RendererEmpty> (c: new () => T): T {
		this.renderer = new c();
		this.renderer.setStromObject(this);

		return <T> this.renderer;
	}

	getRenderer<T extends RendererEmpty> () {
		return <T>(<any> this.renderer);
	}

	setActive (visible: boolean) {
		if (visible == this.active) {
			return;
		}

		this.active = visible;

		for (const behaviour of this.behaviours) {
			const behaviourLifeCycle = <BehaviourLifeCycle>(<any>behaviour);

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

	getActive () {
		return this.active;
	}

	addBehaviour<T extends Behaviour> (c: new () => T): T {
		const behaviour = new c();

		behaviour.stormObject = this;
		behaviour.transform = this.transfrom;
		this.behaviours.push(behaviour);

		return behaviour;
	}

	getBehaviour<T extends Behaviour> (type): undefined | T {
		for (const behaviour of this.behaviours) {
			if (behaviour instanceof type) {
				return <T>behaviour;
			}
		}

		return undefined;
	}

	getBehaviours () {
		return this.behaviours;
	}

	destroy () {
		for (const child of this.transfrom.Children) {
			child.StormObject.destroy();
		}

		for (const behaviour of this.behaviours) {
			behaviour.destroy();
		}

		if (this.renderer != undefined) {
			this.renderer.destroy();
		}

		this.transfrom.destroy();
	}

	static Instantiate (widget: StormObject): StormObject {
		const obj = DeepCloner.Clone(widget);

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

	canDrag: boolean = false;

	canDropId: Array<string> = [];
}