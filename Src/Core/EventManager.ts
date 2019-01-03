export class EventManager {
	callbacks: CallbackInfo[] = [];
	onRegist: EventManager | null = null;

	public Call(sender: any, ...datas: any[] | undefined) {
		let tempCallback: CallbackInfo[] = [];
		for (const callbackInfo of this.callbacks) {
			tempCallback.push(callbackInfo);
		}

		let result = undefined;
		for (const callbackInfo of tempCallback) {
			if (callbackInfo.callback == null) {
				continue;
			}
			if (datas == undefined) {
				if (callbackInfo.Target != null) {
					result = callbackInfo.callback.call(
						callbackInfo.Target,
						sender,
						...callbackInfo.args
					);
				} else if (!callbackInfo.hasTarget) {
					result = callbackInfo.callback(sender, ...callbackInfo.args);
				}
			} else {
				if (callbackInfo.Target != null) {
					result = callbackInfo.callback.call(
						callbackInfo.Target,
						sender,
						...datas,
						...callbackInfo.args
					);
				} else if (!callbackInfo.hasTarget) {
					result = callbackInfo.callback(
						sender,
						...datas,
						...callbackInfo.args
					);
				}
			}
		}

		return result;
	}

	public Regist(
		callback: Function,
		target: object,
		...args: any[] | undefined
	) {
		let callbackInfo = new CallbackInfo();
		callbackInfo.callback = callback;
		callbackInfo.args = args;
		callbackInfo.Target = target;
		this.callbacks.push(callbackInfo);
		if (this.onRegist != null) {
			this.onRegist.Call(this);
		}
	}

	public Clear() {
		this.callbacks = [];
	}

	remove(callback) {
		for (const callbackInfo of this.callbacks) {
			if (callback == callbackInfo.callback) {
				this.callbacks.remove(callbackInfo);
				return;
			}
		}
	}
}

export class CallbackInfo {
	callback: Function;
	args: any;
	private target = null;
	hasTarget: boolean = false;

	get Target() {
		return this.target;
	}

	set Target(value: object) {
		this.hasTarget = value != null;
		this.target = value;
	}
}
