import { StyleAttributes } from "../../Attributes/StyleAttributes";
import { Action } from "../../Action/Action";
import { RenderItemBase } from "../RenderItemBase";
import { Vector2 } from "../../Math/Vector2";
import { Color } from "../../Math/Color";
import { RendererEmpty } from "../Virtual/RendererEmpty";
import { DefineMapper } from "../../Mapper";
import { RendererTarget } from "../RendererTarget";
import { RendererType } from "../Virtual/RendererType";

@DefineMapper(RendererType.Empty, RendererTarget.Web)
export class WebItemEmpty extends RenderItemBase {
	action: Action;
	data: any;
	element: HTMLElement;
	parent: WebItemEmpty | undefined = undefined;
	child: WebItemEmpty[] = [];
	childNode: HTMLElement;
	degree: number = 0;
	private position: Vector2 = new Vector2();
	private rotation: number = 0;
	private scale: Vector2 = new Vector2();

	constructor() {
		super();
		this.init();
	}

	init() {
		this.element = document.createElement("div");
		this.initElement();
	}

	static load() {}

	initElement() {
		this.element.style.position = "absolute";
		this.element.style.width = "100";
		this.element.style.height = "100";

		this.childNode = document.createElement("div");
		this.childNode.style.position = "relative";
		this.childNode.style.margin = "0";
		this.childNode.style.padding = "0";
		this.childNode.style.width = "100%";
		this.childNode.style.height = "100%";
		this.element.appendChild(this.childNode);
	}

	setParent(parent: RenderItemBase) {
		if (parent == this.parent) {
			return;
		}

		let webItemBase = <WebItemEmpty>parent;
		let currentParent = this.parent;

		if (currentParent != undefined) {
			currentParent.child.remove(this);
		}
		this.parent = webItemBase;
		this.parent.child.push(this);
		this.parent.childNode.appendChild(this.element);

		this.child;
	}

	setTransform(postion, degree, scale) {
		let isChanged = true;
		if (postion.x != this.position.x || postion.y != this.position.y) {
			this.position = postion;
			isChanged = true;
		}

		if (degree != this.rotation) {
			this.rotation = degree;
			isChanged = true;
		}

		if (this.scale.x != scale.x || this.scale.y != scale.y) {
			this.scale = scale;
			isChanged = true;
		}

		if (isChanged) {
			let valuePositon =
				"translate(" + this.position.x + "px," + this.position.y + "px);";
			let valueScale = "scale(" + this.scale.x + "px," + this.scale.y + "px)";

			this.element.style.transform = valuePositon + valueScale;
		}
	}

	setRenderer(rendererBase: RendererEmpty) {
		this.element.setAttribute("name", rendererBase.stormObject.name);
	}

	setRotate(degree) {
		if (degree == this.degree) {
			return;
		}
		this.degree = degree;
		this.element.style.transform = "rotate(" + degree + "deg)";
	}

	setChild(child: RenderItemBase) {
		let webItemBase = <WebItemEmpty>child;
		let parent = webItemBase.parent;

		if (parent != undefined) {
			parent.child.remove(child);
		}

		webItemBase.parent = this;
		this.child.push(webItemBase);
		this.childNode.appendChild(webItemBase.element);
	}

	setPosition(position: Vector2) {
		if (this.element.style.left != position.x.toString()) {
			this.element.style.left = position.x.toString();
		}

		if (this.element.style.top != position.y.toString()) {
			this.element.style.top = position.y.toString();
		}
	}

	setScale(scale: Vector2) {
		if (this.element.style.width != scale.x.toString()) {
			this.element.style.width = scale.x.toString();
		}

		if (this.element.style.height != scale.y.toString()) {
			this.element.style.height = scale.y.toString();
		}
	}

	updateAttributes(attributes: StyleAttributes) {
		for (const key in attributes) {
			if (key == "position") {
				let position = <Vector2>attributes[key];

				if (this.element.style.left != position.x.toString()) {
					this.element.style.left = position.x.toString();
				}

				if (this.element.style.top != position.y.toString()) {
					this.element.style.top = position.y.toString();
				}
			} else if (key == "text") {
				let text: string = <string>attributes[key];
				if (this.element.textContent == text) {
					continue;
				}
				this.element.textContent = text;
			} else if (key == "background") {
				let color: Color = <Color>attributes[key];
				if (this.element.style.background == "#" + color.getHexString()) {
					continue;
				}
				this.element.style.background = "#" + color.getHexString();
			} else {
				if (this.element.style[key] == attributes[key]) {
					continue;
				}
				this.element.style[key] = attributes[key];
			}
		}
	}

	cache: {} = {};
	isValidateValue(key, value): boolean {
		if (value == undefined || value == null) {
			return false;
		}

		if (this.cache[key] == value) {
			return false;
		}

		this.cache[key] = value;

		return true;
	}

	destroy() {
		if (this.element != null && this.element.parentNode != null) {
			this.element.parentNode.removeChild(this.element);
		}
	}

	setVisible(visible: boolean) {
		if (this.element == null) {
			return;
		}
		if (visible) {
			this.element.style.display = "";
		} else {
			this.element.style.display = "none";
		}
	}

	updateElementValue(
		element: HTMLElement,
		attribute: StyleAttributes,
		styleForm: StyleAttributes
	) {
		for (const key in styleForm) {
			if (key == "position") {
				let position = <Vector2>attribute[key];
				element.style.left = position.x.toString();
				element.style.top = position.y.toString();
			} else if (key == "text") {
				let text: string = <string>attribute[key];
				element.textContent = text;
			} else {
				element.style[key] = attribute[key];
			}
		}
	}
}
