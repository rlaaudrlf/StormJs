import { Serializable, JsonProperty } from "../SerializeHelper";
import { Color } from '../Math/Color';

@Serializable()
export class StyleAttributes {
	@JsonProperty()
	public id: string | null | undefined = undefined;
	@JsonProperty()
	public class: string | null | undefined = undefined;
	@JsonProperty()
	public border: string | null | undefined = undefined;
	@JsonProperty()
	public color: string | null | undefined = undefined;
	@JsonProperty()
	public "text-align": string | null | undefined = undefined;
	@JsonProperty()
	public "z-index": string | null | undefined = undefined;

	public background: Color = new Color();
	public display: string = "";
}

export class LabelAttributes extends StyleAttributes {
	text: string = "";
	color: string = "#000000";
}
