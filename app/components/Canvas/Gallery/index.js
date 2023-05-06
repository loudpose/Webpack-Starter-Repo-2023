// Three & GSAP
import * as THREE from 'three';
import GSAP from 'gsap';
import each from 'lodash/each';

// Classes
import Component from '../../../classes/Component';
import GalleryItem from './GalleryItem';

// Utils
import { threeCover } from '../../../utils/threeCover';
import BackgroundMesh from './BackgroundMesh';

export default class Gallery extends Component {
	constructor({ scene, camera, sizes }) {
		super({
			element: '.gallery',
			elements: {
				images: '.gallery__image',
			},
		});

		this.scene = scene;
		this.sizes = sizes;

		this.textureLoader = new THREE.TextureLoader();

		this.meshes = [];
		this.items = [];

		// Animation related
		this.active = false;
		this.previous = null;
		this.isAnimating = false;

		this.backgroundMesh = new BackgroundMesh(this.sizes, this.scene, camera);
		this.addEventListeners();
	}

	getBounds() {
		return new Promise((resolve) => {
			// Create Images Array
			if (!this.imagesArray) {
				this.imagesArray = new Array(this.elements.images.length);
				each(
					this.elements.images,
					(image, i) =>
						(this.imagesArray[i] = {
							bounds: image.getBoundingClientRect(),
							src: image.src,
						})
				);
			}

			// Update Existing Images Array
			if (this.imagesArray) {
				this.imagesArray.map(
					(image, i) =>
						(image.bounds = this.elements.images[i].getBoundingClientRect())
				);
			}

			// Return bounds to GallerySection.js -> app.js -> Experience.js
			this.imageBounds = this.imagesArray;

			resolve(this.imagesArray);
		});
	}

	createMeshes(imageBounds) {
		this.uniforms = {
			uSpeed: { value: 0 },
			uOffset: {
				value: new THREE.Vector2(0.0, 0.0),
			},
		};
		// Create a mesh for each image and add it to the scene
		const loadTexturesPromises = imageBounds.map((obj, index) => {
			return new Promise((resolve) => {
				this.textureLoader.load(obj.src, (texture) => {
					const aspect = threeCover(
						texture,
						obj.bounds.width / obj.bounds.height
					);

					resolve({ obj, texture, aspect, index });
				});
			});
		});

		Promise.all(loadTexturesPromises).then((loadedData) => {
			loadedData.forEach(({ obj, texture, aspect, index }) => {
				const item = new GalleryItem({
					obj,
					texture,
					aspect,
					sizes: this.sizes,
					uniforms: this.uniforms,
				});
				const mesh = item.mesh;

				// Add to scene
				this.scene.add(mesh);

				// Also to arrays for later usage
				this.meshes.push(mesh);
				this.items.push(item);
			});

			if (this.meshes.length === imageBounds.length) {
				this.isReady = true;
				// Workaround to avoid lag, renders all objects at all times. Not the best performance
				this.scene.traverse((obj) => (obj.frustumCulled = false));
			} // fin
		});
	}

	updateMeshes(imageBounds) {
		this.meshes.map((mesh, i) => {
			const x = (imageBounds[i].bounds.left + imageBounds[i].bounds.right) / 2;
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

	calculateAspect(imageResolution, meshSize) {
		const padding = 10; // adjust this value to change the amount of padding
		const imageAspect = imageResolution.x / imageResolution.y;
		const screenAspect =
			(this.sizes.width - 2 * padding) / (this.sizes.height - 2 * padding);

		if (imageAspect > screenAspect) {
			// image is wider relative to the screen (with padding) - scale based on width
			return {
				x: (this.sizes.width - 2 * padding) / meshSize.width,
				y: (this.sizes.width - 2 * padding) / meshSize.width / imageAspect,
			};
		} else {
			// image is taller relative to the screen (with padding) - scale based on height
			return {
				x: ((this.sizes.height - 2 * padding) / meshSize.height) * imageAspect,
				y: (this.sizes.height - 2 * padding) / meshSize.height,
			};
		}
	}

	animateMesh(item, camera, canvas, isActive) {
		this.isAnimating = true;

		if (this.active) {
			GSAP.to(item.mesh.material.uniforms.uZoomScale.value, {
				x: item.modified.uZoomScale.x,
				y: item.modified.uZoomScale.y,
			});

			GSAP.to(item.mesh.material.uniforms.uResolution.value, {
				x: item.modified.uResolution.x,
				y: item.modified.uResolution.y,
			});
		} else {
			GSAP.to(item.mesh.material.uniforms.uZoomScale.value, {
				x: item.original.uZoomScale.x,
				y: item.original.uZoomScale.y,
			});

			GSAP.to(item.mesh.material.uniforms.uResolution.value, {
				x: item.original.uResolution.x,
				y: item.original.uResolution.y,
			});
		}

		GSAP.to(item.mesh.material.uniforms.uProgress, {
			value: this.active ? 1 : 0,
		});

		if (this.active) {
			GSAP.to(item.mesh.position, {
				x: camera.position.x,
				y: camera.position.y,
				z: 1,
				onComplete: () => (this.isAnimating = false),
			});
		} else {
			GSAP.to(item.mesh.position, {
				x: item.original.position.x,
				y: item.original.position.y,
				z: item.original.position.z,
			});
		}

		this.isAnimating = false;
	}

	setActive(item, camera) {
		GSAP.to(this.backgroundMesh.el.material, {
			opacity: 0.5,
		});

		this.emit('active');
		this.active = true;
		this.animateMesh(item, camera, null);
		this.previous = item;
		clearTimeout(this.timer);
	}

	setInactive(canvas) {
		console.log(this.backgroundMesh.opacity);
		GSAP.to(this.backgroundMesh.el.material, {
			opacity: 0,
		});
		this.emit('inactive'); // enables scroll
		this.active = false;
		this.animateMesh(this.previous, null, canvas);
		this.previous = null;
		this.timer = setTimeout(() => canvas.classList.remove('dg', 'ac'), 1000);
	}

	onResize() {
		if (this.imageBounds) {
			this.getBounds().then(() => {
				this.updateMeshes(this.imageBounds);
				this.items.map((item) => {
					item.getParams();
				});
			});
		}

		if (this.backgroundMesh)
			this.backgroundMesh.el.scale.set(this.sizes.width, this.sizes.height);
	}
}
