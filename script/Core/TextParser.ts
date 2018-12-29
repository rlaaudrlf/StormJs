export class TextParser {
	content: string = "";
	setDom(content: string) {
		this.content = content;
	}

	public parse(model: any): string {
		let result: string = "";
		let modelname;
		let value;
		let isParsing = false;
		let pre = "";
		let str = "";

		for (let i: number = 0; i < this.content.length; i++) {
			const c: string = this.content[i];

			if (c === "{") {
				if (pre == "{") {
					isParsing = true;
					pre = "";
				}
				pre = c;
			} else if (c === "}") {
				if (pre == "}") {
					pre = "";
					isParsing = false;
					value = str;
					if (typeof model == "object") {
						result += model[value];
					} else {
						result += model;
					}
					str = "";
				}
				pre = c;
			} else if (c === ".") {
				modelname = str;
				str = "";
			} else if (!isParsing) {
				result += c;
			} else if (isParsing) {
				str += c;
			}
		}

		return result;
	}
}
