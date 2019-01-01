import { StormComponent } from "../../Core/StormComponent";
import { DoubleBind } from "../../Core/DoubleBind";
import { RendererImage } from "../../Core/Renderer/Virtual/RendererImage";

export class Image extends StormComponent {
	img: RendererImage;

	constructor() {
		super();
	}

	src: string = "";

	setData(data: any) {
		this.src = <string>DoubleBind.DataToBind(data);
		this.render();
	}

	render() {
		this.img.src = this.src;
	}
}
