export class EventManager {
	callbacks: CallbackInfo[] = [];
	onRegist: EventManager | null = null;

	public Call(sender: any, ...datas: any[] | undefined) {
		let tempCallback = [];
		for (const callbackInfo of this.callbacks) {
			tempCallback.push(callbackInfo);
		}
		for (const callbackInfo of tempCallback) {
			if (callbackInfo.callback == null) {
				continue;
			}
			if (datas == undefined) {
				callbackInfo.callback(sender, ...callbackInfo.args);
			} else {
				callbackInfo.callback(sender, ...datas, ...callbackInfo.args);
			}
		}
	}

	public Regist(callback: Function, ...args: any[] | undefined) {
		let callbackInfo = new CallbackInfo();
		callbackInfo.callback = callback;
		callbackInfo.args = args;
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
	callback: any;
	args: any;
}
