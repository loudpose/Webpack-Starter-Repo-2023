import Btn from './components/Button';
import Preloader from './components/Preloader';

import coverHome from './pages/home';

class App {
	constructor() {
		this.create();
		this.createPreloader();
	}

	create() {
		this.coverHome = new coverHome('#cover-home');
		this.button = new Btn('#btn-gh');
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once('completed', this.onPreloaded.bind(this));
	}

	onPreloaded() {
		this.preloader.hide();
	}
}

new App();
