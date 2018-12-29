import { StyleCacher } from "../Core/StyleCacher";
import { TextParser } from "../Core/TextParser";

export class ElementBase {
	GenerateStyleNode(styleName: string): HTMLElement {
		const parser = new DOMParser();
		const theme = StyleCacher.instance.get(styleName);
		if (theme == null) {
			return;
		}
		const doc = parser.parseFromString(theme, "text/html");
		const node = doc.body.childNodes[0] as HTMLElement;
		return node;
	}

	ParseContent(data, node: HTMLElement) {
		node.childNodes.forEach((value: HTMLElement) => {
			this.ParseContent(data, value);
			if (value.textContent[0] == "{" && value.textContent[1] == "{") {
				let textParser = new TextParser();
				textParser.setDom(value.textContent);
				value.textContent = textParser.parse(data);
			}
		});
	}
}
