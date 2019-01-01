import { StormPage } from "./StormPage";

export class PageRouter {
	static instance: PageRouter = new PageRouter();
	currentPage: StormPage;
	SetPage(page: StormPage) {
		this.currentPage = page;
	}

	getCurrentPage() {
		return this.currentPage;
	}
}
