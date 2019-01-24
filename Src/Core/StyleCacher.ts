export class StyleCacher {
	public static instance: StyleCacher = new StyleCacher();

	themes: { [key: string]: string } = {};

	public AddStyle (key: string, value: string) {
		this.themes[key] = value;
	}

	public get (key: string) {
		return this.themes[key];
	}
}