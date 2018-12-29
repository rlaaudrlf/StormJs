export class Component {
	element: HTMLElement;

	constructor() {
		this.new();
	}

	public get(): string {
		return null;
	}

	public GetName(): string {
		return null;
	}

	public getForm(): string {
		return "";
  }
  
  // public setData(){
    
  // }

	protected new(): Element {
		let parser = new DOMParser();
		let doc = parser.parseFromString(this.getForm(), "text/html");
		var node = <HTMLElement>doc.body.childNodes[0];
		this.element = node;

		return node;
	}

	public getName(): string {
		return null;
	}
}
