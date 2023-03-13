import Btn from './components/Button';
import Preloader from './components/Preloader';
import Lenis from '@studio-freight/lenis';
import coverHome from './pages/home';

class App {
	constructor() {
		this.create();
		this.createPreloader();
		this.createScroll();
		this.update();
	}

	create() {
		this.coverHome = new coverHome('#cover-home');
		this.button = new Btn('#btn-gh');
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once('completed', this.onPreloaded.bind(this));
	}

	createScroll() {
		this.scroll = new Lenis({
			duration: 1,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		// this.scroll.on('scroll', ScrollTrigger.update);
	}

	onPreloaded() {
		this.preloader.hide();
	}

	update(e) {
		this.frame = window.requestAnimationFrame(this.update.bind(this));

		this.scroll.raf(e);
	}
}

new App();
