import { GetComponentList } from '../Components/BasicComponents/ComponentList';
export class ElementList {
	element: HTMLElement | null = null;
	div: HTMLElement | null = null;
	width: string = "60";
	buttonHeight: number = 30;
	onClick: (name: any) => void | null = <any>null;
	public Create(element: any) {
		this.element = element;

		let list = GetComponentList();
		this.element.onmousedown = e => {
			console.log(e.which);
			if (e.which == 3) {
				var x = e.pageX - 10;
				var y = e.pageY - 10;

				this.div = document.createElement("div");
				this.div.style.width = this.width;
				this.div.style.height = (this.buttonHeight * list.length).toString();
				this.div.style.top = y.toString();
				this.div.style.left = x.toString();
				this.div.style.position = "absolute";
				this.element.appendChild(this.div);

				this.div.onmouseleave = () => {
					this.Destroy();
				};

				for (const a of list) {
					this.AddItem(a);
				}
			}
		};
	}

	private AddItem(name: string) {
		var button = document.createElement("button");
		button.style.display = "block";
		button.style.width = "120";
		button.style.height = this.buttonHeight.toString();
		button.style.marginLeft = "10";
		button.style.zIndex = "100";
		button.textContent = name;
		this.div.appendChild(button);

		button.onclick = () => {
			if (this.onClick != null) {
				this.onClick(name);
			}
			this.Destroy();
		};
	}

	public Destroy() {
		this.element.removeChild(this.div);
	}
}
