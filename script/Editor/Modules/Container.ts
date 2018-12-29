import { ProjectBuilder } from "./ProjectBuilder";
import { DataTranslater } from "./DataTranslater";
import { AutoSaver } from "./AutoSaver";
export class Container {
	public static instance: Container = new Container();
	private constructor() {}
	ProjectBuilder: ProjectBuilder = new ProjectBuilder();
	DataTranslater: DataTranslater = new DataTranslater();
	autoSaver: AutoSaver = new AutoSaver();
}