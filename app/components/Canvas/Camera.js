// Three
import * as THREE from 'three';

export default class Camera {
	constructor({ sizes }) {
		this.instance = new THREE.OrthographicCamera(
			sizes.width / -2,
			sizes.width / 2,
			sizes.height / 2,
			sizes.height / -2,
			1,
			1000
		);

		// this.camera.fov = 2 * (180 / Math.PI) * Math.atan(planeSize / (2 * 1));
		this.instance.position.set(0, -window.scrollY, 10);
	}

	resizeCamera(sizes) {
		this.instance.left = sizes.width / -2;
		this.instance.right = sizes.width / 2;
		this.instance.top = sizes.height / 2;
		this.instance.bottom = sizes.height / -2;
		this.instance.updateProjectionMatrix();
	}
}
