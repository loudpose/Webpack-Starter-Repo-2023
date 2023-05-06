import Loader from './components/Loader';
import Experience from './components/Canvas/Experience';
import homePage from './pages/home';
import aboutPage from './pages/about';

import Lenis from '@studio-freight/lenis';

import { debounce } from './utils/utils';

import barba from '@barba/core';
import GSAP from 'gsap';

class App {
	constructor() {
		this.createContent();
		this.createPage();
		this.create();
		this.createLoader();
	}

	createContent() {
		this.content = document.querySelector('.content');
		this.template = this.content.getAttribute('data-barba-namespace');
	}

	createPage() {
		// Pages
		this.pages = {
			home: new homePage('.cover'),
			about: new aboutPage('.about'),
		};

		this.page = this.pages[this.template];
		this.page.onCreated();
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
					beforeEnter: () => (this.page = this.pages['home']),
					afterEnter: (data) => {
						console.log(this.page.animate);
						this.page.load();
						return this.page.animate();
						// this.page.load();
						// return this.page.animate();
					},
				},
				{
					namespace: 'about',
					beforeEnter: () => (this.page = this.pages['about']),
					afterEnter: (data) => {
						this.page.load();
						return this.page.animate();
					},
				},
			],
			// transitions: [
			// 	{
			// 		name: 'opacity-transition',
			// 		leave: (data) => {
			// 			return this.page.hide();
			// 		},
			// 		enter: (data) => {
			// 			console.log(data);
			// 		},
			// 	},
			// ],
		});

		// Other
		this.addEventListeners();
		this.update();
	}

	createLoader() {
		this.loader = new Loader();
		this.loader.once('completed', this.onPreloaded.bind(this));
	}

	onPreloaded() {
		console.log('preloaded');
		// this.page.animate();

		if (this.template === 'home') {
			this.experience.gallery.getBounds().then(() => {
				this.experience.updateImages();
			});
		}

		this.loader.hide();
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
