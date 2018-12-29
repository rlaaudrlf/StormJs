import { StormObject } from "../../Core/Widgets/StormObject";
import { Behaviour } from "../../Core/Behaviours";
export class StormCollector extends Behaviour {
	datas;
	dataPath: { [key: string]: DataPath } = {};

	setData(data: any) {
		this.datas = data;

		for (const path of data) {
			let dataPath = DataPath[path];
			if (dataPath != undefined) {
				dataPath.widget.setData(path);
			}
		}
	}
}

export class DataPath {
	widget: StormObject;
	path: string = "";
}
