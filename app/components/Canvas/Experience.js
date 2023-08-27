// Three
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Libraries
import GSAP from 'gsap';

// Classes
import Canvas from '../../classes/Canvas';

// Canvas Components
import Gallery from './Gallery';
import Camera from './Camera';
import Debug from './Debug';
import Lights from './Lights';
import Raycaster from './Raycaster';

// Utils
import { lerp } from '../../utils/utils';
import { clamp } from 'three/src/math/MathUtils';
import map from 'lodash/map';

// 3D Models
import Roza from './Models/Roza';

// Shaders
import vertexShader from '../../../shared/shaders/vertex.glsl';
import fragmentShader from '../../../shared/shaders/fragment.glsl';
import fxVertexShader from '../../../shared/shaders/fxshader.vert';
import fxFragmentShader from '../../../shared/shaders/fxshader.frag';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// Scene & renderer are created in Canvas.js class
export default class Experience extends Canvas {
	constructor(el) {
		super(el);

		this.speed = 0;
		this.targetSpeed = 0;
		this.mouse = new THREE.Vector2();
		this.followMouse = new THREE.Vector2();
		this.prevMouse = new THREE.Vector2();

		// this.createGui();
		this.models = this.loadModels();

		this.isReady = false; // update method is called only when true

		this.camera = new Camera({ sizes: this.sizes });
		this.scene.add(this.camera.el);

		this.createGallery();

		// this.controls = new OrbitControls(this.camera, this.element);
		// this.controls.enableDamping = true;

		this.lights = new Lights({
			scene: this.scene,
		});

		this.mouse = new THREE.Vector2();
		this.touch = {
			start: 0,
			end: 0,
		};
		this.isTouch = false;

		this.clock = new THREE.Clock();
		this.oldElapsedTime = 0;
		this.createComposer();

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

	createGallery() {
		this.gallery = new Gallery({
			scene: this.scene,
			sizes: this.sizes,
		});
		this.raycaster = new Raycaster({ meshes: this.gallery.meshes });
	}

	createComposer() {
		this.composer = new EffectComposer(this.renderer);
		let renderPass = new RenderPass(this.scene, this.camera.el);
		// renderPass.clearColor = new THREE.Color(0, 0, 0);
		// renderPass.clearAlpha = 0;

		this.composer.addPass(renderPass);

		this.counter = 0.0;
		this.myEffect = {
			uniforms: {
				tDiffuse: { value: null },
				distort: { value: 0 },
				resolution: {
					value: new THREE.Vector2(1, window.innerHeight / window.innerWidth),
				},
				uMouse: { value: new THREE.Vector2(0, 0) },
				uVelo: { value: 0 },
				uScale: { value: 0 },
				uType: { value: 1 },
				time: { value: 0 },
			},
			vertexShader: fxVertexShader,
			fragmentShader: fxFragmentShader,
		};

		this.customPass = new ShaderPass(this.myEffect);
		this.customPass.renderToScreen = true;
		this.customPass.material.transparent = true;
		console.log(this.customPass);

		this.composer.addPass(this.customPass);
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
	getSpeed() {
		this.speed = Math.sqrt(
			(this.prevMouse.x - this.mouse.x) ** 2 +
				(this.prevMouse.y - this.mouse.y) ** 2
		);

		this.targetSpeed -= 0.1 * (this.targetSpeed - this.speed);
		this.followMouse.x -= 0.1 * (this.followMouse.x - this.mouse.x);
		this.followMouse.y -= 0.1 * (this.followMouse.y - this.mouse.y);

		this.prevMouse.x = this.mouse.x;
		this.prevMouse.y = this.mouse.y;
	}

	update() {
		// RGB Shift
		// this.gallery.uniforms.uOffset.value.set(0.0, this.speed);
		this.getSpeed();
		this.customPass.uniforms.uMouse.value = this.followMouse;

		// Rotation on Model
		if (this.models[0].model)
			this.models[0].model.rotation.z = this.elapsedTime;

		// Cast a ray
		this.raycaster.el.setFromCamera(this.mouse, this.camera.el);
		this.raycaster.update();
		if (this.raycaster.currentIntersect) {
			this.raycaster.currentIntersect.object.material.uniforms.uMouse.value =
				this.mouse;
		}

		// Tick
		this.elapsedTime = this.clock.getElapsedTime();
		this.deltaTime = this.elapsedTime - this.oldElapsedTime;
		this.oldElapsedTime = this.elapsedTime;

		// Controls update
		// this.controls.update();
		this.customPass.uniforms.time.value = this.deltaTime;
		this.customPass.uniforms.uVelo.value = Math.min(this.targetSpeed, 0.05);
		this.targetSpeed *= 0.999;

		// Scene
		// this.renderer.render(this.scene, this.camera.el);
		this.composer.render();
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
		// Gallery fullscreen
		window.addEventListener('click', (event) => {
			if (this.gallery.active && !this.gallery.isAnimating) {
				this.raycaster.isFullscreen = false;
				return this.gallery.setInactive(this.element);
			}

			if (this.raycaster.currentIntersect && !this.gallery.isAnimating) {
				// UI updates
				this.raycaster.isFullscreen = true;
				this.element.classList.add('dg', 'ac');

				const intersectItem = this.gallery.items.find((item) => {
					return item.mesh.uuid === this.raycaster.currentIntersect.object.uuid;
				});

				this.gallery.setActive(intersectItem, this.camera.el);
			}
		});

		// Handle mouse events
		window.addEventListener('mousemove', (event) => {
			this.mouse.x = event.clientX / window.innerWidth;
			this.mouse.y = 1 - event.clientY / window.innerHeight;
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
				// @TODO
				// const touchEvent = event.touches[0];
				// this.speed += -(event.touches[0] / this.sizes.height) + 0.5;
				// this.mouse.x = touchEvent.clientX / this.sizes.width - 0.5;
				// this.mouse.y = -(touchEvent.clientY / this.sizes.height) + 0.5;
			}
		};
	}
}
