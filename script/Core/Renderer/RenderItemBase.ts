import { Action } from "../Action/Action";
import { StyleAttributes } from "../Attributes/StyleAttributes";
import { Vector2 } from "../Math/Vector2";
import { DoubleBind } from "../DoubleBind";
import { RendererBase } from "./Virtual/RendererBase";
export class RenderItemBase {
	attributes: StyleAttributes;
	setParent(parent: RenderItemBase) {}
	setChild(child: RenderItemBase) {}
	setPosition(position: Vector2) {}
	setScale(scale: Vector2) {}
	setRotate(degree: number) {}
	destroy() {}
	setVisible(visible: boolean) {}
	relativePositon: Vector2 = new Vector2(0, 0);
	setTransform(postion, degree, scale) {}
	setRenderer(rendererBase: RendererBase) {}
}

export interface RenderItemConstructor {
	new (...args): RenderItemBase;
}
