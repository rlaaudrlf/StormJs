import { TextParser } from "./TextParser";
import { DoubleBind, BindData } from "./DoubleBind";

export interface StormData {
	data;
	name;
}

export class Storm {
	model;
	constructor(stormData: StormData) {
		let textParser = new TextParser();
		const element = document.getElementById(stormData.name);
		textParser.setDom(element.textContent);
		var model = stormData.data;
		var bindmodel = DoubleBind.DataToBind(model);
		stormData.data = bindmodel;

		(<BindData>bindmodel).___eventListener.Regist(() => {
			element.textContent = textParser.parse(bindmodel);
		});
		this.model = bindmodel;
		element.textContent = textParser.parse(bindmodel);
	}

	getModel() {
		return this.model;
	}
}
