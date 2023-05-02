// varying vec2 vUv;
// uniform vec2 uOffset;

#define M_PI 3.1415926535897932384626433832795

// vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
// 	position.x = position.x + (sin(uv.y * M_PI) * offset.x);
// 	position.y = position.y + (sin(uv.x * M_PI) * offset.y);
// 	return position;
// }

// void main()
// {
// 	// vec4 modelPosition = modelMatrix * vec4(position, 1.0);
// 	// vec4 viewPosition = viewMatrix * modelPosition;
// 	// vec4 projectedPosition = projectionMatrix * viewPosition;
	
// 	// gl_Position = projectedPosition;

// 	vec3 newPosition = position;
// 	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );


// 	vUv = uv;
// }

varying vec2 vUv;
uniform float uProgress;
uniform vec2 uZoomScale;

void main() {
	vUv = uv;
	vec3 pos = position;
	float angle = uProgress * M_PI / 2.;
	float wave = cos(angle);
	float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
	pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
	pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);

	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}