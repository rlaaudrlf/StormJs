import { PanelBase } from "../PanelBase";
import { StyleCacher } from "../../Core/StyleCacher";
// import { Button } from '../../Core/VirtualUI/Button';
export class PanelFile2 extends PanelBase {
	// listView: ListView | null = null;
	constructor() {
		super();
	}

	start() {
		// this.listView = new ListView();
		// // this.listView.SetDiv(this.element);
		// this.listView.itemHeight = 100;
		// this.listView.itemWidth = 100;
		// this.listView.alignment = "column";
		// this.listView.perLineCount = 3;
		// this.listView.itemStyles.push(StyleCacher.instance.get("file.html"));
		// this.listView.selectItemStyleOnRender = () => {
		// 	// return new Button()
		// };
	}

	setData(data: any) {
		// console.log(data);

		// if (this.listView == null) {
		// 	return;
		// }

		// this.listView.SetData(data.child);
	}
}
