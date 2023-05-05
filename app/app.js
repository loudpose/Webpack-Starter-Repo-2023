import Preloader from './components/Preloader';
import Experience from './components/Canvas/Experience';
import homePage from './pages/home';
import aboutPage from './pages/about';

import Lenis from '@studio-freight/lenis';

import { debounce } from './utils/utils';

import barba from '@barba/core';
import GSAP from 'gsap';
console.log(barba);

class App {
	constructor() {
		this.createContent();
		this.createPage();
		this.create();
		this.createPreloader();
	}

	createContent() {
		this.content = document.querySelector('main');
		this.template = this.content.getAttribute('data-barba-namespace');
	}

	createPage() {
		// Pages
		this.pages = {
			home: new homePage('.cover'),
			about: new aboutPage('.about'),
		};
		this.page = this.pages[this.template];
		this.page.animate();
	}
	create() {
		// Scroll
		this.scroll = new Lenis();

		// Canvas
		this.experience = new Experience('.webgl');

		// Page Transitions
		this.barba = barba;
		this.barba.init({
			views: [
				{
					namespace: 'home',
					beforeEnter() {
						console.log('beforeLeave Home');
					},
					afterEnter() {
						console.log('afterEnter Home');
					},
				},
				{
					namespace: 'about',
					beforeEnter() {
						console.log('beforeLeave About');
					},
					afterEnter() {
						console.log('afterEnter About');
					},
				},
			],
			transitions: [
				{
					name: 'opacity-transition',
					leave(data) {
						return GSAP.to(data.current.container, {
							opacity: 0,
						});
					},
					enter(data) {
						return GSAP.from(data.next.container, {
							opacity: 0,
						});
					},
				},
			],
		});

		// Other
		this.addEventListeners();
		this.update();
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once('completed', this.onPreloaded.bind(this));
	}

	onPreloaded() {
		// this.page.animate();

		this.experience.gallery.getBounds().then(() => {
			this.experience.updateImages();
			this.preloader.hide();
		});
	}

	update(time) {
		if (this.scroll) this.scroll.raf(time);
		if (this.experience && this.experience.isReady) this.experience.update();

		this.frame = window.requestAnimationFrame(this.update.bind(this));
	}

	hide() {}

	addEventListeners() {
		// @TODO handle all touch events here, and send values to buttons & canvas
		window.addEventListener('resize', debounce(this.onResize.bind(this))); // 100ms debounce

		this.experience.gallery.on('active', () => {
			this.scroll.stop();
		});

		this.experience.gallery.on('inactive', () => {
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
