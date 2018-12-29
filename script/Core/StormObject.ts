import { DomElement } from "./DomElement";
import { StormComponent } from "./StormComponent";
import { JsonProperty, Serializable } from "./SerializeHelper";
import { Md5 } from "ts-md5";
import { StormPool } from "./StormPool";

@Serializable()
export class StormObject {
	@JsonProperty()
	public domElement: DomElement = new DomElement();
	@JsonProperty()
	public components: Array<StormComponent> = [];
	parent: StormObject;
	children: Array<StormObject> = [];
	@JsonProperty()
	parentHash: string;
	@JsonProperty()
	childrenHash: Array<string> = [];
	@JsonProperty()
	hash: string;
	@JsonProperty()
	styles:string[]

	private constructor() {}

	public static New(): StormObject {
		let result = new StormObject();
		result.init();

		return result;
	}

	public init() {
		this.hash = Md5.hashStr(Date.now().toString()).toString();
		StormPool.instance.add(this);
	}

	public LoadHash() {
		StormPool.instance.add(this);
	}

	public startLife() {
		for (const component of this.components) {
			component.stormObject = this;
		}
	}

	public Load() {
		this.startLife();
		this.domElement.Load();
		this.domElement.SetAttribute("key", this.hash);
	}

	public addComponent(component: any) {
		this.components.push(component);
		component.stormObject = this;
	}

	public removeComponent(component: any) {
		for (let index = 0; index < this.components.length; index++) {
			const element = this.components[index];
			if (element == component) {
				if (element == component) {
					return;
				}
			}
		}
	}

	public setDom(path: any) {
		this.domElement.domFileName = path;
	}

	public Refresh() {
		this.domElement.destroy();
		this.domElement.create();
		this.domElement.SetAttribute("key", this.hash);
	}

	public static Destroy(stormObject: StormObject) {
		StormPool.instance.remove(stormObject);
		stormObject.domElement.destroy();
	}

	public RemoveChild(stormObject: StormObject) {}

	public AddChild(stormObject: StormObject) {
		this.children.push(stormObject);
		this.childrenHash.push(stormObject.hash);
		stormObject.parent = this;
		stormObject.parentHash = this.hash;
		this.domElement.element.appendChild(stormObject.domElement.element);
	}

	public static FindFromHash(hash: string): StormObject {
		return StormPool.instance.get(hash);
	}
}
