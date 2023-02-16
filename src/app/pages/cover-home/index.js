import GSAP from 'gsap';

export default class coverHome {
	constructor(el) {
		this.element = el;
		this.elements = {
			cover: this.element,
			title: this.element.querySelector('.cover__title'),
			list: this.element.querySelectorAll('li'),
			desc: this.element.querySelectorAll('.cover__desc')[1],
			btn: this.element.querySelector('.btn'),
		};

		this.animate();
	}

	animate() {
		const tl = GSAP.timeline({ duration: 1, ease: 'power4.out' });
		tl.from(this.elements.cover, { autoAlpha: 0 })
			.from(this.elements.title, {
				autoAlpha: 0,
				y: 100,
				rotate: 2,
			})
			.from(this.elements.list, {
				autoAlpha: 0,
				y: 40,
				stagger: 0.2,
				duration: 0.7,
				rotate: 10,
			})
			.from(
				this.elements.desc,
				{
					autoAlpha: 0,
					y: 40,
					duration: 0.7,
				},
				'-=0.5'
			)
			.from(
				this.elements.btn,
				{
					autoAlpha: 0,
				},
				'-=0.5'
			);
	}
}
