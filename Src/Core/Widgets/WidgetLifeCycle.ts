export class WidgetLifeCycle {
	private runtimeRenderImp: Function | null = null;
	private runTimeRender: Function | null = null;

	constructor() {
		this.awake();
        this.runTimeRender = this.render;
        
		Object.defineProperty(this, "render", {
			set: value => {
				this.runTimeRender = value;
				this.runtimeRenderImp = () => {
					this.preRender();
					this.runTimeRender();
					this.afterRender();
				};
			},
			get: () => {
				if (this.runtimeRenderImp == null) {
					this.runtimeRenderImp = () => {
						this.preRender();
						this.runTimeRender();
						this.afterRender();
					};
                }
                
				return this.runtimeRenderImp;
			}
        });
	}

	awake() {}
	start(){}
	preRender() {}
	render() {}
	afterRender() {}
	destroy() {}
}
