import {JsonProperty, Serializable} from "./SerializeHelper";
import {DoubleBind} from "./DoubleBind";
import {StyleCacher} from "./StyleCacher";
import {StyleAttributes} from "./Attributes/StyleAttributes";

@Serializable()
export class DomElement {
	@JsonProperty()
	public domFileName: string | null = null;

	public element: HTMLElement | null = null;

	@JsonProperty()
	public attributes: StyleAttributes | null = null;

	public destroy () {
		if (this.element == null) {
			return;
		}
		const parent = this.element.parentNode;

		if (parent != null) {
			parent.removeChild(this.element);
		} else {
			document.removeChild(this.element);
		}
	}

	public SetAttribute (key: string, value: string) {
		if (this.element == null) {
			return;
		}

		this.element.setAttribute(key, value);
	}

	public create () {
		const parser = new DOMParser();
		const theme = StyleCacher.instance.get(this.domFileName);

		if (theme == null) {
			return;
		}
		const doc = parser.parseFromString(theme, "text/html");
		const node = doc.body.childNodes[0] as HTMLElement;

		this.element = node;
		this.BindAttributes(node);
	}

	public Load () {
		const parser = new DOMParser();
		const theme = StyleCacher.instance.get(this.domFileName);

		if (theme == null) {
			return;
		}
		const doc = parser.parseFromString(theme, "text/html");
		const node = doc.body.childNodes[0] as HTMLElement;

		this.element = node;
		this.LoadAttributes();
		this.BindAttributes(this.element);
	}

	public BindAttributes (element: HTMLElement) {
		this.attributes = new StyleAttributes();
		let attributeKey = Reflect.ownKeys(this.attributes);

		this.UpdateAttributes();
		console.log(this.attributes);

		DoubleBind.DataToBind(this.attributes);
		(this.attributes as any).___eventListener.onChange(() => {
			for (const key of attributeKey) {
				if (this.attributes[key] != undefined && this.attributes[key] != "") {
					element.style[key] = this.attributes[key];
				}
			}
		});
	}

	public LoadAttributes () {
		if (this.attributes == null) {
			return;
		}

		const attributes = new StyleAttributes();
		const attributeKey = Reflect.ownKeys(attributes);

		for (const key of attributeKey) {
			this.element.style[key] = this.attributes[key];
		}
	}

	public UpdateAttributes () {
		if (this.attributes == null) {
			return;
		}

		const attributes = new StyleAttributes();
		const attributeKey = Reflect.ownKeys(attributes);

		for (const key of attributeKey) {
			const value = this.element.style[key];

			this.attributes[key] = value;
		}
	}
}