import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

/* The PerspectiveCamera simulates a real-life camera with perspective. The first parameter called field of view corresponds to your camera view's vertical amplitude angle in degrees. If you use a small angle, you'll end up with a long scope effect, and if you use a wide-angle, you'll end up with a fish eye effect because, in the end, what the camera sees will be stretched or squeezed to fit the canvas. The second parameter is called aspect ratio and corresponds to the width divided by the height. 

The third and fourth parameters called near and far, correspond to how close and how far the camera can see. Any object or part of the object closer to the camera than the near value or further away from the camera than the far value will not show up on the render. */
const camera = new THREE.PerspectiveCamera(
	45,
	sizes.width / sizes.height,
	0.1,
	100
);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/* The OrthographicCamera is used to create orthographic renders of your scene without perspective. It's useful if you make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera. The OrthographicCamera differs from the PerspectiveCamera by its lack of perspective, meaning that the objects will have the same size regardless of their distance from the camera. 

The parameters you have to provide are very different from the PerspectiveCamera.Instead of a field of view, you must provide how far the camera can see in each direction (left, right, top and bottom). Then you can provide the near and far values just like we did for the PerspectiveCamera. */
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	100
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/* First of all, we want to know the mouse coordinates. We can do that using native JavaScript by listening to the mousemove event with addEventListener.

The coordinates will be located in the argument of the callback function as event.clientX and event.clientY:*/
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);

	console.log(cursor.x, cursor.y);
});

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
