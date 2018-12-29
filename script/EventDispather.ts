export class EventDispather {
	public data: any;
	public target: any;
	public from: any;
	public messageCalls: { [key: string]: Array<(event: any) => void> } = <any>(
		null
	);

	public click(element: HTMLElement, message: string) {
		element.onclick = event => {
			var calls = this.messageCalls[message];

			if (calls != null) {
				for (const call of calls) {
					call(event);
				}
			}
		};
	}

	public listhen(message: any, func: any) {
		let calls = this.messageCalls[message];
		if (calls == null) {
			calls = [];
		}

		calls.push(func);
	}
}
