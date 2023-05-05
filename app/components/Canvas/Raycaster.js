// Three
import * as THREE from 'three';

export default class Raycaster {
	constructor() {
		this.el = new THREE.Raycaster();
		this.currentIntersect = null;
	}
}
