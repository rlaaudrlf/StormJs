import {StormObject} from "./Core/Widgets/StormObject";
import {Storage} from "./Editor/Core/Decorators/Storage";
@Storage()
export class GlobalData {
	public projectPath = "";

	public tempPath = "";

	public ProjectPath = "";

	public currentSelectStormObject: StormObject | undefined = undefined;

	public root: StormObject;
}