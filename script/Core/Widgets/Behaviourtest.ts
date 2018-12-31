import { Behaviour } from "../Behaviours";
import { Vector2 } from "../Math/Vector2";
import { IClickable } from "../Input";
import { StormStackList } from "../../Components/BasicComponents/StormStackList";
import { StormObject } from "./StormObject";
import { RendererButton } from "../Renderer/Virtual/RendererButton";
import { RendererContainer } from '../Renderer/Virtual/RendererContainer';
import { RendererText } from '../Renderer/Virtual/RendererText';
export class Behaviourtest extends Behaviour implements IClickable {
	isDown = 3;
	stackList: StormStackList;
	awake() {
		this.stackList = this.stormObject.getBehaviour(StormStackList);
		let obj = new StormObject();
		obj.name='123'
		obj.setRenderer(RendererText);
		this.stackList.item = obj;
		let data=['min','max','close']
		this.stackList.padding=2
		this.stackList.setCompData(data)

		
		// this.stormObject.transfrom.localPosition = new Vector2(100, 10);
		// this.stormObject.transfrom.scale = new Vector2(100, 200);
	}

	update() {
		// this.stormObject.transfrom.rotation += 3;
		// this.stormObject.transfrom.localPosition.y += this.isDown;
		// if (this.transform.localPosition.y > 100) {
		// 	this.isDown = -3;
		// }
		// if (this.transform.localPosition.y < 0) {
		// 	this.isDown = 3;
		// }
	}

	onClick() {
		console.log(123);
	}
}
