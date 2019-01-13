import { AttriebutesRendererButton } from "./Attributes/Renderer/AttriebutesRendererButton";
import { AttriebutesRendererContainer } from "./Attributes/Renderer/AttriebutesRendererContainer";
import { AttriebutesRendererEmpty } from "./Attributes/Renderer/AttriebutesRendererEmpty";
import { AttriebutesRendererImage } from "./Attributes/Renderer/AttriebutesRendererImage";
import { AttriebutesRendererLabel } from "./Attributes/Renderer/AttriebutesRendererLabel";
import { AttriebutesRendererMask } from "./Attributes/Renderer/AttriebutesRendererMask";
import { AttriebutesRendererPanel } from "./Attributes/Renderer/AttriebutesRendererPanel";
import { AttriebutesRendererScrollView } from "./Attributes/Renderer/AttriebutesRendererScrollView";
import { AttriebutesRendererText } from "./Attributes/Renderer/AttriebutesRendererText";

export function Load() {
	AttriebutesRendererButton.load();
	AttriebutesRendererContainer.load();
	AttriebutesRendererEmpty.load();
	AttriebutesRendererImage.load();
	AttriebutesRendererLabel.load();
	AttriebutesRendererMask.load();
	AttriebutesRendererPanel.load();
	AttriebutesRendererScrollView.load();
	AttriebutesRendererText.load();
}
