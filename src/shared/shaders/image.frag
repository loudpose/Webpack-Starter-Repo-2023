uniform sampler2D uTexture;
uniform vec2 uScale;
uniform vec2 uOffset;

varying vec2 vUv;

vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
	float r = texture2D(textureImage,uv + offset).r;
	vec2 gb = texture2D(textureImage,uv).gb;
	return vec3(r,gb);
}


void main() {

	float uvx, uvy;
	if (uScale.x > uScale.y) {
		uvx = vUv.x  / uScale.x;
		uvy = vUv.y / uScale.y;
	} else {
		uvx = vUv.x / uScale.x;
		uvy = vUv.y / uScale.y;
	}

	vec2 newuv = vec2(uvx, uvy);

	vec3 color = rgbShift(uTexture, newuv, uOffset);
	// vec4 image = texture2D(uTexture, newuv);

	gl_FragColor = vec4(color, 1.0);
}