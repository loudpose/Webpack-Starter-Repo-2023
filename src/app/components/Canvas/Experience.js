// Three
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Libraries
import GSAP from 'gsap';
import * as dat from 'dat.gui';

// Classes
import Component from '../../classes/Component';

// Utils
import { threeCover } from '../../utils/threeCover';
import { lerp } from '../../utils/utils';
import { clamp } from 'three/src/math/MathUtils';

// Shaders
import vertexShader from '../../../shared/shaders/vertex.glsl';
import fragmentShader from '../../../shared/shaders/fragment.glsl';
import imageVertex from '../../../shared/shaders/image.vert';
import imageFragment from '../../../shared/shaders/image.frag';

export default class Experience extends Component {
	constructor(el) {
		super({ element: el });

		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		this.sizes.aspect = this.sizes.width / this.sizes.height;

		// this.createGSAP()
		this.createGui();

		this.isReady = false;
		this.meshes = [];

		this.loadTextures(); // Creates Texture Loader
		// this.loadModels();

		this.createScene();
		this.createCamera();

		// this.controls = new OrbitControls(this.camera, this.element);
		// this.controls.enableDamping = true;

		// this.createElements();
		// this.createLights();
		this.createRenderer();
		this.addEventListeners();

		this.mouse = new THREE.Vector2();

		this.clock = new THREE.Clock();
		this.oldElapsedTime = 0;

		// const planeSize = 2;
		// this.camera.fov = 2 * (180 / Math.PI) * Math.atan(planeSize / (2 * 1));

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
		this.gui = new dat.GUI();
		this.gui.hide();

		this.globalUniforms = { uSpeed: { value: 0 } };

		this.debugObject = {};
		this.debugObject.progress = 0;

		// this.debugObject.runProgress = () => (this.debugObject.progress = 1);
		// this.gui.add(this.debugObject, 'runProgress');

		this.progress = {
			current: 0,
			target: 0,
		};

		this.gui
			.add(this.debugObject, 'progress')
			.min(0)
			.max(1)
			.step(0.001)
			.onFinishChange(() => {
				this.progress.target = this.debugObject.progress;
			});
	}

	/**
	 * Textures & Models
	 */
	loadModels() {
		this.gltfLoader = new GLTFLoader();

		const footerBounds = document
			.querySelector('footer')
			.getBoundingClientRect();

		console.log();
		this.roza = {
			model: null,
			material: null,
			textures: {
				color: this.textureLoader.load(
					'images/textures/MCh_S_12_Rzezba_Popiersie_Rozy_Loewenfeld.jpg'
				),
				normal: this.textureLoader.load(
					'images/textures/MCh_S_12_Rzezba_Popiersie_Rozy_Loewenfeld_.jpg'
				),
			},
		};

		this.roza.material = new THREE.MeshBasicMaterial({
			// roughness: 0.7,
			map: this.roza.textures.color,
			wireframe: true,
			// normalMap: this.roza.textures.normal,
		});

		this.gltfLoader.load('models/roza.glb', (gltf) => {
			this.roza.model =
				gltf.scene.children[0].children[0].children[0].children[0];

			this.roza.model.rotation.x = Math.PI * 0.5;
			this.roza.model.rotation.y = -Math.PI;

			const x = (footerBounds.left + footerBounds.right) / 2;
			const y =
				(footerBounds.top + footerBounds.bottom + window.scrollY * 2) / 2;
			console.log(footerBounds.top, footerBounds.bottom, window.scrollY);
			console.log(footerBounds.top, footerBounds.bottom, window.scrollY);
			console.log(footerBounds.top + footerBounds.bottom + window.scrollY);
			this.roza.model.position.set(
				x - this.sizes.width / 2,
				-y + this.sizes.height / 2,
				-190
			);

			this.roza.model.scale.set(
				this.sizes.aspect * 0.66,
				this.sizes.aspect * 0.66,
				this.sizes.aspect * 0.66
			);

			this.roza.model.material = this.roza.material;

			this.roza.model.geometry.center();

			this.scene.add(this.roza.model);
		});
	}

	loadTextures() {
		this.textureLoader = new THREE.TextureLoader();
		this.texturesAspect = [];

		// const images = [
		// 	'/images/gallery1.jpg',
		// 	'/images/gallery2.jpg',
		// 	'/images/gallery3.jpg',
		// 	'/images/gallery4.jpg',
		// 	'/images/gallery5.jpg',
		// ];
		// this.textures = images.map((img) => this.textureLoader.load(img));
	}

	// This method is called in app.js at onPreloaded()
	updateImages(imageBounds) {
		/*
		 * CREATE meshes
		 */
		if (this.meshes.length === 0) {
			// Create a mesh for each image and add it to the scene
			const loadTexturesPromises = imageBounds.map((obj, index) => {
				return new Promise((resolve) => {
					this.textureLoader.load(obj.src, (texture) => {
						const aspect = threeCover(
							texture,
							obj.bounds.width / obj.bounds.height
						);
						this.texturesAspect.push(aspect);

						resolve({ obj, texture, aspect, index });
					});
				});
			});

			Promise.all(loadTexturesPromises).then((loadedData) => {
				loadedData.forEach(({ obj, texture, aspect, index }) => {
					// console.log('i: ' + index, texture, aspect);
					const material = new THREE.ShaderMaterial({
						uniforms: {
							uTexture: {
								value: texture,
							},
							uScale: { value: aspect },
							uSpeed: { value: this.globalUniforms.uSpeed.value },
							uOffset: {
								value: new THREE.Vector2(0.0, 0.0),
							},
						},
						// wireframe: true,
						vertexShader: imageVertex,
						fragmentShader: imageFragment,
					});

					const geometry = new THREE.PlaneGeometry(
						obj.bounds.width,
						obj.bounds.height
					);

					const mesh = new THREE.Mesh(geometry, material);

					const x = (obj.bounds.left + obj.bounds.right) / 2;
					const y =
						(obj.bounds.top + obj.bounds.bottom + window.scrollY * 2) / 2;

					this.meshes.push(mesh);
					this.scene.add(mesh);

					mesh.position.set(
						x - this.sizes.width / 2,
						-y + this.sizes.height / 2,
						-1
					);
				});

				if (this.meshes.length === imageBounds.length) {
					this.isReady = true;
					// Workaround to avoid lag, renders all objects at all times. Not the best performance
					this.scene.traverse((obj) => (obj.frustumCulled = false));
				} // fin
			});
		}

		/*
		 * UPDATE meshes
		 */
		if (this.meshes.length >= 1) {
			this.meshes.map((mesh, i) => {
				const x =
					(imageBounds[i].bounds.left + imageBounds[i].bounds.right) / 2;
				const y =
					(imageBounds[i].bounds.top +
						imageBounds[i].bounds.bottom +
						window.scrollY * 2) /
					2;
				mesh.position.set(
					x - this.sizes.width / 2,
					-y + this.sizes.height / 2,
					-1
				);
			});
		}
	}

	/**
	 * Camera & Scene
	 */
	createScene() {
		this.scene = new THREE.Scene();
	}

	createCamera() {
		// this.camera = new THREE.PerspectiveCamera(
		// 	75,
		// 	this.sizes.width / this.sizes.height,
		// 	0.1,
		// 	100
		// );

		this.camera = new THREE.OrthographicCamera(
			this.sizes.width / -2,
			this.sizes.width / 2,
			this.sizes.height / 2,
			this.sizes.height / -2,
			1,
			100
		);
		this.camera.position.set(0, -window.scrollY, 10);
		this.scene.add(this.camera);
	}

	/**
	 * Elements & Lights
	 */
	createElements() {
		this.uniforms = {
			uTime: { value: 0 },
		};
		this.geometry = new THREE.PlaneGeometry(
			1 / this.sizes.aspect,
			1 / this.sizes.aspect
		);
		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		// this.scene.add(this.mesh);
	}

	createLights() {
		this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
		this.directionalLight.position.x = 2;
		this.directionalLight.castShadow = true;
		this.scene.add(this.ambientLight, this.directionalLight);
	}

	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.element,
			alpha: true,
		});

		// this.renderer.setClearColor(0xf1f1f1);
		// this.renderer.setClearColor(0x050505);

		this.renderer.outputEncoding = THREE.LinearEncoding;
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	update() {
		// green box setter
		// this.xSetter(this.position * 200);

		for (let i = 0; i < this.meshes.length; i++) {
			// this.meshes[i].material.uniforms.uSpeed.value =
			// 	this.globalUniforms.uSpeed.value;

			this.meshes[i].material.uniforms.uOffset.value.set(
				0.0,
				this.globalUniforms.uSpeed.value
			);
		}

		// Tick
		this.elapsedTime = this.clock.getElapsedTime();
		this.deltaTime = this.elapsedTime - this.oldElapsedTime;
		this.oldElapsedTime = this.elapsedTime;

		// Update material
		if (this.roza && this.roza.model) {
			this.roza.model.rotation.z = this.elapsedTime;
		}

		// Controls update
		// this.controls.update();

		// Scene
		this.renderer.render(this.scene, this.camera);
	}

	onResize() {
		// Update sizes
		this.sizes.width = window.innerWidth;
		this.sizes.height = window.innerHeight;

		// Update camera
		this.camera.left = this.sizes.width / -2;
		this.camera.right = this.sizes.width / 2;
		this.camera.top = this.sizes.height / 2;
		this.camera.bottom = this.sizes.height / -2;
		this.camera.updateProjectionMatrix();

		// Update renderer
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Update shader
	}

	addEventListeners() {
		// window.addEventListener('wheel', (event) => {
		// 	this.speed = event.deltaY * 0.0003;
		// });
	}
}
