import { WebButton } from "./WebButton";
import { WebContainer } from "./WebContainer";
import { WebImage } from "./WebImage";
import { WebInput } from "./WebInput";
import { WebLabel } from "./WebLabel";
import { WebItemEmpty } from "./WebItemEmpty";
import { WebPage } from "./WebPage";
import { WebScrollView } from "./WebScrollView";
import { WebPanel } from './WebPanel';

export class WebLoader {
	load() {
		WebButton.load();
		WebContainer.load();
		WebImage.load();
		WebInput.load();
		WebLabel.load();
		WebItemEmpty.load();
		WebPage.load();
		WebScrollView.load();
		WebPanel.load()
	}
}
