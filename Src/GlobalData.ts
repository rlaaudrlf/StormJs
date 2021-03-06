import {Storage} from "./Editor/Core/Decorators/Storage";
@Storage()
export class GlobalData {
	public static instance: GlobalData = new GlobalData();

	public currentDragData: any;

	public currentDrag: any;

	public startX: any;

	public startY: any;

	public from: any;

	public currentPath: string;
}