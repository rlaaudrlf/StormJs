import { RendererBase } from "./RendererBase";
import { RenderItemConstructor, RenderItemBase } from "../RenderItemBase";
import { Enviroment } from "../../../Components/Enviroment";
import { CallMapper } from "../../Mapper";
import { RendererType } from "./RendererType";
import { Color } from '../../Math/Color';
export class RendererScrollView extends RendererBase {
	showVerticalScrolBar: boolean = false;
	showHorizontalScrolBar: boolean = false;
	background:Color=new Color()

	renderItem(): RenderItemBase {
		let constructor = CallMapper<RenderItemConstructor>(
			RendererType.ScrollView,
			Enviroment.rendererTarget
		);
		let element = new constructor();

		return element;
	}
}
