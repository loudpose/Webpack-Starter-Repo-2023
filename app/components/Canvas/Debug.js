import * as dat from 'dat.gui';
import GSAP from 'gsap';

export default class Debug {
	constructor(variables) {
		this.active = window.location.hash === '#debug';

		this.variables = variables; // we point to actual variables in debugObject

		this.gui = new dat.GUI();

		if (!this.active) {
			this.gui.hide();
		} else {
			this.create();
		}
	}

	create() {
		this.gui
			.add(this.variables, 'progress')
			.min(0)
			.max(1)
			.step(0.001)
			.onFinishChange(() => {
				this.variables.progressTarget = this.variables.progress;
			});

		this.variables.runProgress = () => {
			// Forward & Backward progress
			const value = this.variables.progress < 1 ? 1 : 0;
			GSAP.to(this.variables, {
				progress: value,
				duration: 1,
				ease: 'expo.out',
			});
		};
		this.gui.add(this.variables, 'runProgress');
	}
}
