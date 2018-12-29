import { EventManager } from "../EventManager";
export class StormAction {
    onPositionChange: EventManager = new EventManager();
    onScaleChange: EventManager = new EventManager();
}
