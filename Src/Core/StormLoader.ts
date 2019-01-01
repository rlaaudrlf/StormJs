import { StormObject } from "./StormObject";
import { deserialize } from "./SerializeHelper";
import { saveFormat, StyleFormat, StyleFileInfo } from "./SaveFormat";
import { StyleCacher } from "./StyleCacher";
export class StormLoader {
	itemCount;
	element;

	public Load(style: string, stormObject: string) {
		let styleJson = JSON.parse(style);
		let stormJson = JSON.parse(stormObject);
		const styles: StyleFormat = deserialize(styleJson, StyleFormat);
		const stormObj: saveFormat = deserialize(stormJson, saveFormat);

		this.LoadStyles(styles.objs);
		this.LoadStormObj(stormObj.objs);
	}

	private LoadStyles(styles: Array<StyleFileInfo>) {
		for (const style of styles) {
			StyleCacher.instance.AddStyle(style.name, style.content);
		}
	}

	public LoadStormObj(items: Array<StormObject>) {
		var self = this;
		for (const item of items) {
			item.Load();
			const node = item.domElement.element;
			node.id = item.domElement.domFileName.split(".")[0];
			node.id = node.id + self.itemCount;
			self.element.appendChild(node);
			self.itemCount++;
			node.style.position = "relative";
			item.LoadHash();
		}

		for (const item of items) {
			if (item.parentHash != null) {
				let parent = StormObject.FindFromHash(item.parentHash);
				item.parent = parent;
				parent.children.push(item);
				parent.domElement.element.appendChild(item.domElement.element);
			}

			for (const ch of item.children) {
				let child = StormObject.FindFromHash(ch.hash);
				item.children.push(child);
				child.parent = item;
				item.domElement.element.appendChild(child.domElement.element);
			}
		}
	}
}
