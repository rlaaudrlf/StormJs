import { StormObject } from "./StormObject";
import { RendererContainer } from "../Renderer/Virtual/RendererContainer";
export class StormPage extends StormObject {
	constructor() {
		super();
		this.setRenderer(RendererContainer);
	}

    initParent(){

    }


}
