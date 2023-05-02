// Three
import * as THREE from 'three';

// Utils
import { threeCover } from '../../utils/threeCover';

// Shaders
import imageVertex from '../../../shared/shaders/image.vert';
import imageFragment from '../../../shared/shaders/image.frag';

export default class Element {
	constructor({ scene, sizes }) {
		this.textureLoader = new THREE.TextureLoader();
		this.scene = scene;
		this.sizes = sizes;
		this.meshes = [];

		this.uniforms = {
			uSpeed: { value: 0 },
			uOffset: {
				value: new THREE.Vector2(0.0, 0.0),
			},
		};
	}

	createMeshes(imageBounds) {
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
				// console.log('i: ' + index, texture, aspect);
				const material = new THREE.ShaderMaterial({
					uniforms: {
						// uSpeed, uOffset, uProgress
						...this.uniforms,
						uProgress: { value: 0 },
						// Texture
						uTexture: {
							value: texture,
						},
						// Scale Res
						uScale: { value: aspect },
						uZoomScale: { value: new THREE.Vector2(1.0, 1.0) },
						uResolution: { value: new THREE.Vector2(1.0, 1.0) }, // 1, 1
						uImageRes: {
							value: {
								x: texture.source.data.width,
								y: texture.source.data.height,
							},
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
				const y = (obj.bounds.top + obj.bounds.bottom + window.scrollY * 2) / 2;

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
}
