import Component from '../../classes/Component';

export default class aboutPage extends Component {
	constructor(el) {
		super({
			element: el,
			elements: {
				title: '.idea',
				desc: '.idea__description',
			},
		});
		this.id = 'about';
	}

	createComponent() {}

	create() {}
}
