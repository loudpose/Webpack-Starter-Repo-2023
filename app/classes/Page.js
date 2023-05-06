import Component from './Component';

export default class extends Component {
	constructor(el) {
		super(el);
	}

	// createComponent() {}

	// create() {}

	load() {
		super.createComponent();
		super.create();
	}

	onCreated() {}

	// animate() {}
}
