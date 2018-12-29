import { StormPage } from './StormPage';

export class StormPageRouter {
	static instance: StormPageRouter = new StormPageRouter();
	currentPage: StormPage;
	SetPage(page: StormPage) {
		this.currentPage = page;
	}

	getCurrentPage() {
		return this.currentPage;
	}
}
