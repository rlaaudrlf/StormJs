import { StormComponent } from "./StormComponent";
export class EventLithener extends StormComponent {
	OnClick;
	OnMove;
	private element: HTMLElement;
	private Awake() {
		this.element = this.stormObject.domElement.element;

		if (this.OnClick != null) {
			this.element.onclick = event => {
				this.HandleClick(event);
			};
		}
	}

	HandleClick(event: MouseEvent) {
		onclick.call(event);
	}

	HandleMove(event: MouseEvent) {}

	HandleDoubleClick() {}
}
