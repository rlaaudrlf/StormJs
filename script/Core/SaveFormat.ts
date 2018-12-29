import { JsonProperty, Serializable } from "./SerializeHelper";
import { StormObject } from "./StormObject";

@Serializable()
export class saveFormat {
	@JsonProperty({ type: StormObject })
	public objs: Array<StormObject> = new Array<StormObject>();
}

@Serializable()
export class StyleFileInfo {
	@JsonProperty()
	name: string;
	@JsonProperty()
	content: string;
}

@Serializable()
export class StyleFormat {
	@JsonProperty({ type: StyleFileInfo })
	public objs: Array<StyleFileInfo> = new Array<StyleFileInfo>();
}
