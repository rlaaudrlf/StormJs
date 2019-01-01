import { StormComponent } from "../../Core/StormComponent";
export class TreeView extends StormComponent {
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
