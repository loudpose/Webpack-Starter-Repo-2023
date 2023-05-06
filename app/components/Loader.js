import Component from '../classes/Component';
import GSAP from 'gsap';

export default class Loader extends Component {
	constructor() {
		super({
			element: document.querySelector('.preloader'),
			elements: {
				images: document.querySelectorAll('[data-src]'),
				imagesBg: document.querySelectorAll('[data-src-bg]'),
			},
		});

		this.length = 0;
		this.createLoader();
	}

	createLoader() {
		if (
			this.elements.imagesBg.length === 0 &&
			this.elements.images.length === 0
		)
			return setTimeout(this.onLoaded.bind(this), 100);

		this.elements.imagesBg.forEach((img) => {
			img.onload = (_) => this.onAssetLoaded();
			img.style.backgroundImage = `url(${img.getAttribute('data-src-bg')})`;
			this.onAssetLoaded();
		});

		this.elements.images.forEach((img) => {
			img.onload = (_) => this.onAssetLoaded();
			img.src = img.getAttribute('data-src');
		});
	}

	onAssetLoaded() {
		this.length++;
		let imageLength = 0;

		if (this.elements.images) {
			imageLength += this.elements.images.length;
		}

		if (this.elements.imagesBg) {
			imageLength += this.elements.imagesBg.length;
		}

		const percent = this.length / imageLength;

		if (percent === 1) {
			setTimeout(this.onLoaded.bind(this), 1000);
		}
	}

	onLoaded() {
		console.log('onLoaded');
		this.emit('completed');
	}

	hide() {
		console.log('hidepreloader');
		GSAP.fromTo(
			this.element,
			{ autoAlpha: 1 },
			{ autoAlpha: 0, duration: 1.2, ease: 'power4.out' }
		).then(() => this.element.classList.add('preloader--hidden'));
		// .then(this.destroy.bind(this));
	}

	animateTransition() {
		// ... animation
		console.log('animateTransition');
	}

	destroy() {
		this.element.parentNode.removeChild(this.element);
	}
}
