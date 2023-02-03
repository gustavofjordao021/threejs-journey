import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object

// Sometimes, we need to create our own geometries. If the geometry is very complex or with a precise shape, it's better to create it in a 3D software (and we will cover that in a future lesson), but if the geometry isn't too complex, we can build it ourself by using BufferGeometry.
const geometry = new THREE.BufferGeometry();

// To add vertices to a BufferGeometry you must start with a Float32Array. Float32Array are native JavaScript typed array. You can only store floats inside, and the length of that array is fixed. As you can see, the coordinates of the vertices are specified linearly. The array is a one-dimensional array where you specify the x, y, and z of the first vertex, followed by the x, y, and z of the second vertex, and so on.
const positionsArray = new Float32Array([
	0,
	0,
	0, // First vertex
	0,
	1,
	0, // Second vertex
	1,
	0,
	0, // Third vertex
]);

// Before you can send that array to the BufferGeometry, you have to transform it into a BufferAttribute. The first parameter corresponds to your typed array and the second parameter corresponds to how much values make one vertex attribute. To read this array, we have to go 3 by 3 because a vertex position is composed of 3 values (x, y and z).
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

//Then we can add this attribute to our BufferGeometry using the setAttribute(...) method. The first parameter is the name of this attribute and the second parameter is the value. We chose 'position' as the name because Three.js internal shaders will look for that value to position the vertices.
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
