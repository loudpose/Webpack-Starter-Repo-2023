// Three
import * as THREE from 'three';

import Component from './Component';

export default class Canvas extends Component {
	constructor(el) {
		super({ element: el });

		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		this.sizes.aspect = this.sizes.width / this.sizes.height;

		this.createScene();
		this.createRenderer();
	}

	/**
	 * Camera & Scene
	 */
	createScene() {
		this.scene = new THREE.Scene();
	}

	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.element,
			alpha: true,
		});

		// this.renderer.setClearColor(0xf1f1f1);
		// this.renderer.setClearColor(0x050505);

		this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	onResize() {
		this.sizes.width = window.innerWidth;
		this.sizes.height = window.innerHeight;
		this.sizes.aspect = this.sizes.width / this.sizes.height;
	}

	destroy = () => {
		// Traverse scene
		this.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();

				for (const key in child.material) {
					const value = child.material[key];

					if (value && typeof value.dispose === 'function') {
						value.dispose();
					}
				}
			}
		});

		// Controls
		if (this.camera.controls) this.camera.controls.dispose();

		this.renderer.dispose();
	};
}
