// Three & GSAP
import * as THREE from 'three';

// Shaders
import imageVertex from '../../../../shared/shaders/image.vert';
import imageFragment from '../../../../shared/shaders/image.frag';

export default class GalleryItem {
	constructor({ obj, texture, aspect, sizes, uniforms }) {
		this.sizes = sizes;
		this.uniforms = uniforms;

		this.createMesh({ obj, texture, aspect });

		this.getParams(); // for onClick animation fullscreen
	}

	createMesh({ obj, texture, aspect }) {
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

		this.mesh = new THREE.Mesh(geometry, material);

		const x = (obj.bounds.left + obj.bounds.right) / 2;
		const y = (obj.bounds.top + obj.bounds.bottom + window.scrollY * 2) / 2;

		// Position
		this.mesh.position.set(
			x - this.sizes.width / 2,
			-y + this.sizes.height / 2,
			-1
		);
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

	getParams() {
		// Calculates the size of the mesh when enlarged
		const meshWidth = this.mesh.geometry.parameters.width;
		const meshHeight = this.mesh.geometry.parameters.height;

		const scaledValue = this.calculateAspect(
			this.mesh.material.uniforms.uImageRes.value,
			{
				width: meshWidth,
				height: meshHeight,
			}
		);

		this.original = {
			position: new THREE.Vector3().copy(this.mesh.position),
			uResolution: new THREE.Vector2().copy(
				this.mesh.material.uniforms.uResolution.value
			),
			uZoomScale: new THREE.Vector2().copy(
				this.mesh.material.uniforms.uZoomScale.value
			),
		};

		this.modified = {
			uZoomScale: new THREE.Vector2().copy(scaledValue),
			uResolution: new THREE.Vector2().copy(scaledValue),
		};
	}
}
