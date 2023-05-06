// Three & GSAP
import * as THREE from 'three';

export default class BackgroundMesh {
	constructor(sizes, scene, camera) {
		this.sizes = sizes;
		this.camera = camera.el;

		this.create();

		scene.add(this.el);
	}

	create() {
		this.el = new THREE.Mesh(
			new THREE.PlaneGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({
				color: 0x000000,
				transparent: true,
				opacity: 0,
			})
		);

		this.el.scale.set(this.sizes.width, this.sizes.height);
		this.el.position.set(0, 0, -0.99);
	}

	onResize() {}
}
