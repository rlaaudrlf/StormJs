import {Behaviour} from "../../Core/Behaviours";
import {Inject} from "../Core/Decorators/Inject";
import {GlobalData} from "../../GlobalData";
import {fstat, readdir, readdirSync} from "fs";
import {StormObject} from "../../Core/Widgets/StormObject";
import {List} from "../../Components/BasicComponents/List";
import {RendererLabel} from "../../Core/Renderer/Virtual/RendererLabel";
import {Label} from "../../Components/BasicComponents/Label";
export class ComponentFile extends Behaviour {
	@Inject(GlobalData)
	globalData: GlobalData;

	awake () {
		let path = `${this.globalData.currentPath}d:/`;

		path = "d://";
		const values = readdirSync(path);

		console.log(values);

		const cmpList = this.stormObject.getBehaviour<List>(List);
		const obj = new StormObject();

		obj.setRenderer(RendererLabel);
		obj.addBehaviour<Label>(Label);
		cmpList.perLineCount = 4;
		cmpList.selectItemStyleOnRender = (data) => obj;
        cmpList.setData(values);
        cmpList.onItemClick=(value,data)=>{
            console.log(data)
        }
        
	}
}