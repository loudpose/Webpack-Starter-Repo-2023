// Three
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Libraries
import GSAP from 'gsap';

// Classes
import Component from '../../classes/Component';
import Canvas from '../../classes/Canvas';

// Canvas Components
import Gallery from './Gallery';
import Camera from './Camera';
import Debug from './Debug';

// Utils
import { lerp } from '../../utils/utils';
import { clamp } from 'three/src/math/MathUtils';
import map from 'lodash/map';

// 3D Models
import Roza from './Models/Roza';

// Shaders
import vertexShader from '../../../shared/shaders/vertex.glsl';
import fragmentShader from '../../../shared/shaders/fragment.glsl';
import Lights from './Lights';
import Raycaster from './Raycaster';

// Scene & renderer are created in Canvas.js class
export default class Experience extends Canvas {
	constructor(el) {
		super(el);

		this.speed = 0;
		// this.createGSAP()
		this.createGui();
		this.models = this.loadModels();

		this.isReady = false; // update method is called only when true

		this.camera = new Camera({ sizes: this.sizes });
		this.scene.add(this.camera.el);

		this.gallery = new Gallery({
			scene: this.scene,
			sizes: this.sizes,
		});

		// this.controls = new OrbitControls(this.camera, this.element);
		// this.controls.enableDamping = true;

		this.lights = new Lights({
			scene: this.scene,
		});

		this.mouse = new THREE.Vector2();
		this.isTouch = false;

		this.clock = new THREE.Clock();
		this.oldElapsedTime = 0;

		this.raycaster = new Raycaster();
		this.addEventListeners();
		this.onResize();
	}

	/**
	 * Utility
	 */
	createGSAP() {
		this.timeline = GSAP.timeline();
		this.xSetter = GSAP.quickSetter('.dot', 'y', 'px');
		GSAP.utils.pipe(
			GSAP.utils.clamp(0, 100), //make sure the number is between 0 and 100
			GSAP.utils.snap(5), //snap to the closest increment of 5
			GSAP.quickSetter('.dot', 'y', 'px') //apply it to the #id element's x property and append a "px" unit
		);
	}

	createGui() {
		/* Add all variables to debugObject*/
		this.debugObject = {};
		this.debugObject.progress = 0;
		this.debugObject.progressTarget = 0;

		this.debug = new Debug(this.debugObject);
	}

	/**
	 * Textures & Models
	 */
	loadModels() {
		return [
			(this.roza = new Roza({
				scene: this.scene,
				sizes: this.sizes,
				modelPath: 'models/roza.glb',
			})),
		];
	}

	// This method is called in app.js at onPreloaded()
	updateImages() {
		if (this.gallery.meshes.length === 0) {
			this.gallery.createMeshes(this.gallery.imageBounds);
			this.isReady = true;
		} else {
			this.gallery.updateMeshes(this.gallery.imageBounds);
		}
	}

	/**
	 * Elements & Lights
	 */

	update() {
		// RGB Shift
		this.gallery.uniforms.uOffset.value.set(0.0, this.speed);

		// Rotation on Model

		if (this.models[0].model)
			this.models[0].model.rotation.z = this.elapsedTime;

		// Cast a ray
		this.raycaster.el.setFromCamera(this.mouse, this.camera.el);
		const intersects = this.raycaster.el.intersectObjects(this.gallery.meshes);

		if (intersects.length) {
			if (!this.raycaster.currentIntersect) console.log('mouse enter');
			this.raycaster.currentIntersect = intersects[0];
		} else {
			if (this.raycaster.currentIntersect) console.log('mouse leave');
			this.raycaster.currentIntersect = null;
		}

		// Tick
		this.elapsedTime = this.clock.getElapsedTime();
		this.deltaTime = this.elapsedTime - this.oldElapsedTime;
		this.oldElapsedTime = this.elapsedTime;

		// Controls update
		// this.controls.update();

		// Scene
		this.renderer.render(this.scene, this.camera.el);
	}

	onResize() {
		// Update sizes
		super.onResize();

		// Update camera
		this.camera.resizeCamera(this.sizes);

		// Update renderer
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Update models
		if (this.models) {
			this.models.map((model) => {
				model.onResize();
			});
		}

		// Update elements
		this.gallery.sizes = this.sizes;

		if (this.gallery.onResize) this.gallery.onResize();
	}

	addEventListeners() {
		window.addEventListener('click', (event) => {
			if (this.gallery.active && !this.gallery.isAnimating) {
				return this.gallery.setInactive(this.element);
			}

			if (this.raycaster.currentIntersect && !this.gallery.isAnimating) {
				this.element.classList.add('dg', 'ac');

				const intersectItem = this.gallery.items.find((item) => {
					return item.mesh.uuid === this.raycaster.currentIntersect.object.uuid;
				});

				this.gallery.setActive(intersectItem, this.camera.el);
			}
		});
		// window.addEventListener('wheel', (event) => {
		// 	this.speed = event.deltaY * 0.0003;
		// });
		// Handle mouse events
		window.addEventListener('mousemove', (event) => {
			// this.mouse.x = event.clientX / this.sizes.width - 0.5;
			// this.mouse.y = -(event.clientY / this.sizes.height) + 0.5;

			this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
			this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
		});

		// Handle touch events
		window.addEventListener('touchstart', (event) => {
			this.isTouch = true;
			updateTouchPosition(event);
		});

		window.addEventListener('touchmove', (event) => {
			if (this.isTouch) {
				updateTouchPosition(event);
			}
		});

		window.addEventListener('touchend', () => {
			this.isTouch = false;
		});

		const updateTouchPosition = (event) => {
			if (event.touches.length > 0) {
				const touchEvent = event.touches[0];
				this.mouse.x = touchEvent.clientX / this.sizes.width - 0.5;
				this.mouse.y = -(touchEvent.clientY / this.sizes.height) + 0.5;
			}
		};
	}
}
