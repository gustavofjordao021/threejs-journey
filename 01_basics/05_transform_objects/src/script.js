import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Creates and initiates an AxesHelper to know where eaxh axis is oriented towards. The AxesHelper will display 3 lines corresponding to the x, y and z axes, each one starting at the center of the scene and going in the corresponding direction.
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Canvas selector
const canvas = document.querySelector("canvas.webgl");

// Object-related variables. Instantiate a single Object (mesh) or a Group and, when you want to create a new object, you can add it to the Group you just created using the add(...) method rather than adding it directly to the scene. Because the Group class inherits from the Object3D class, it has access to the previously-mentioned properties and methods like position, scale, rotation, quaternion, and lookAt.
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube3.position.x = 1.5;
group.add(cube3);

// Moves object in an x, y, and z axis, which are the 3 necessary axes to position something in a 3D space. The direction of each axis is purely arbitrary, and it can vary according to the environment. In Three.js, we usually consider that the y axis is going upward, the z axis is going backward, and the x axis is going to the right.
mesh.position.x = 1.5;
mesh.position.y = 1;
mesh.position.z = -1;

// Scales objects according to a Vector3 axis. By default, x, y and z are equal to 1, meaning that the object has no scaling applied. If you put 0.5 as a value, the object will be half of its size on this axis, and if you put 2 as a value, it will be twice its original size on this axis.
mesh.scale.x = 2;
mesh.scale.y = 0.25;
mesh.scale.z = 0.5;

// The rotation property also has x, y, and z properties, but instead of a Vector3, it's a Euler. When you change the x, y, and z properties of a Euler, you can imagine putting a stick through your object's center in the axis's direction and then rotating that object on that stick. The value of these axes is expressed in radians. In native JavaScript, you can end up with an approximation of π using Math.PI.
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// Canvas size variables
const sizes = {
	width: 800,
	height: 600,
};

// Camera-related variables
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

// Object3D instances have an excellent method named lookAt(...) that lets you ask an object to look at something. The object will automatically rotate its -z axis toward the target you provided.
camera.lookAt(new THREE.Vector3(0, -1, 0));

// Ads both the camera and the object to the scene
scene.add(camera);
scene.add(group);

// Renderer-related variables
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Renders the scene and camera
renderer.render(scene, camera);
