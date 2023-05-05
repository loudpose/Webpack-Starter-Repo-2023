// Three
import * as THREE from 'three';

export default class Raycaster {
	constructor({ meshes }) {
		this.el = new THREE.Raycaster();
		this.currentIntersect = null;
		this.galleryMeshes = meshes;

		this.isIntersecting = false;
		this.isFullscreen = false;
	}

	clearMeshes() {
		// Clear
		for (let i = 0; i < this.galleryMeshes.length; i++) {
			this.galleryMeshes[i].material.uniforms.uDarken.value = 1;
		}
		console.log('clearing');
	}

	update() {
		const intersects = this.el.intersectObjects(this.galleryMeshes);

		if (intersects.length && !this.isFullscreen) {
			// show
			// if (!this.currentIntersect) console.log('mouse enter');
			this.currentIntersect = intersects[0];
			this.currentIntersect.object.material.uniforms.uDarken.value = 1.05;

			this.isIntersecting = true;
		} else {
			// hide
			this.isIntersecting = false;

			if (this.currentIntersect) {
				this.currentIntersect = null;
				this.isIntersecting = false;
			}
		}

		if (this.isIntersecting) requestIdleCallback(this.clearMeshes.bind(this));
	}
}
