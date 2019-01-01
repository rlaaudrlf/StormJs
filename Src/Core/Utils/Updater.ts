import { EventManager } from "../EventManager";
export class Updater {
	callbacks: EventManager = new EventManager();
	public static instance: Updater = new Updater();
	timer: any;
	isRunning: boolean = false;

	start() {
		if (this.isRunning) {
			return;
		}
		this.updateImp();
		this.isRunning = true;
	}

	updateImp() {
		this.timer = setInterval(() => {
			this.callbacks.Call(this), 1000 / 30;
		});
	}

	stop() {
		clearTimeout(this.timer);
		this.isRunning = false;
	}
}
