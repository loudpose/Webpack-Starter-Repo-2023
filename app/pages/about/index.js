import Page from '../../classes/Page';
import GSAP from 'gsap';

export default class aboutPage extends Page {
	constructor(el) {
		super({
			element: el,
			elements: {
				title: '.idea__title',
				desc: '.idea__description',
			},
		});
		this.id = 'about';
	}

	animate() {
		console.log('About Anim');
		const tl = GSAP.timeline({ duration: 1, ease: 'power4.out' });
		tl.from(this.element, { autoAlpha: 0 })
			.from(this.elements.title, {
				autoAlpha: 0,
				y: 100,
				rotate: 2,
			})
			.from(
				this.elements.desc,
				{
					autoAlpha: 0,
					y: 40,
					duration: 0.7,
				},
				'-=0.5'
			);
	}
}
