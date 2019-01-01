import { inspect } from "util";

export class consoleUtils {
	public static console: consoleUtils = new consoleUtils();
	private callback: (msg: any) => void = <any>null;
	public Start() {
		// let log = console.log;
		// let mylog = msg => {
		// 	log(msg);
		// 	if (this.callback != null) {
		// 		this.callback(inspect(msg));
		// 	}
		// };
		// console.log = mylog;
	}

	public RegistLog(callback: (msg: any) => void) {
		this.callback = callback;
	}
}
