// Three
import * as THREE from 'three';

export default class Raycaster {
	constructor({ meshes, canvas }) {
		this.el = new THREE.Raycaster();
		this.currentIntersect = null;
		this.galleryMeshes = meshes;
		this.canvas = canvas;

		this.isIntersecting = false;
		this.isFullscreen = false;
		this.isPointer = false;
	}

	clearMeshes() {
		if (!this.isPointer) {
			this.canvas.classList.add('hover');
			this.isPointer = true;
		}

		// Clear
		for (let i = 0; i < this.galleryMeshes.length; i++) {
			this.galleryMeshes[i].material.uniforms.uDarken.value = 1;
		}
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
				this.isPointer = false;
				this.canvas.classList.remove('hover');
			}
		}

		if (this.isIntersecting) requestIdleCallback(this.clearMeshes.bind(this));
	}
}
