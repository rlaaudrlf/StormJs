import { ComponentBase } from "./ComponentsBase";
export class TreeView extends ComponentBase {
	datas: any;
	RenderItemBase() {
		// let constructor = CallMapper<RenderItemConstructor>(
		// 	RendererType.Container,
		// 	Enviroment.rendererTarget
		// );
		// this.element = new constructor();
	}

	setData(data: any) {
		this.datas = data;
	}
}
