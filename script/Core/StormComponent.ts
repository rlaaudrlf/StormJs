import { StormObject } from "./StormObject";

import { JsonProperty, Serializable } from "./SerializeHelper";

@Serializable()
export class StormComponent {
	@JsonProperty()
	public stormObject: StormObject | null = null;
}
