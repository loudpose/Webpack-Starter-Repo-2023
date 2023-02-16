import Btn from './components/btn';
import coverHome from './pages/cover-home';

class App {
	constructor() {
		this.create();
	}

	create() {
		console.log('Hello!');
		this.coverHome = new coverHome(document.getElementById('cover-home'));
		this.button = new Btn(document.getElementById('btn-gh'));
	}
}

new App();
