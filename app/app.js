import Preloader from './components/Preloader';
import Experience from './components/Canvas/Experience';
import coverHome from './pages/home';

import Lenis from '@studio-freight/lenis';

import { debounce } from './utils/utils';

class App {
	constructor() {
		this.create();
		this.createPreloader();
	}

	create() {
		// Scroll
		this.scroll = new Lenis();

		// Canvas
		this.experience = new Experience('.webgl');

		// Other
		this.addEventListeners();
		this.update();
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once('completed', this.onPreloaded.bind(this));
	}

	onPreloaded() {
		// Pages
		this.home = new coverHome('.cover', (imageBounds) => {
			this.experience.updateImages(imageBounds);
		});
		this.preloader.hide();
	}

	update(time) {
		if (this.scroll) this.scroll.raf(time);
		if (this.experience && this.experience.isReady) this.experience.update();

		this.frame = window.requestAnimationFrame(this.update.bind(this));
	}

	addEventListeners() {
		// @TODO handle all touch events here, and send values to buttons & canvas
		window.addEventListener('resiz e', debounce(this.onResize.bind(this))); // 100ms debounce

		this.experience.elements.on('active', () => {
			this.scroll.stop();
		});

		this.experience.elements.on('inactive', () => {
			this.scroll.start();
		});

		this.scroll.on('scroll', (e) => {
			this.experience.camera.el.position.y = -window.scrollY;
			this.experience.speed = e.velocity * 0.002;
		});
	}

	onResize() {
		// First we update Canvas camera
		if (this.experience && this.experience.onResize) this.experience.onResize();

		// Second we update images bounds & update meshes on Canvas
		if (this.home && this.home.gallery) {
			this.home.gallery.getBounds();
			this.experience.updateImages(this.home.gallery.imagesArray);
		}
	}
}

new App();
