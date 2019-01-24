import {StormObject} from "./StormObject";
import {RendererContainer} from "../Renderer/Virtual/RendererContainer";

export class Scene extends StormObject {
	constructor () {
		super();
		this.setRenderer(RendererContainer);
	}
}