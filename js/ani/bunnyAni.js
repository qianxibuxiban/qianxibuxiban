// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// // Create the scene and camera
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 5;

// // Create a WebGLRenderer and add it to the DOM
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create a light so we can see the model
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 1, 1).normalize();
// scene.add(light);

// // Load the texture
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("assets/ani/bunnyAni/bunny_tex1.png");

// const container = document.getElementById("canvas-bunny");
// container.appendChild(renderer.domElement);
// renderer.setSize(window.innerWidth, window.innerHeight);

// const loader = new GLTFLoader();

// loader.load(
//   "/assets/ani/bunnyAni/Pointing.glb",
//   (gltf) => {
//     const model = gltf.scene;

//     model.traverse(function (child) {
//       if (child.isMesh) {
//         child.material.map = texture;
//         child.material.needsUpdate = true;
//       }
//     });
//     model.scale.set(0.4, 0.4, 0.4);
//     model.position.set(0, -2, 2);
//     // model.rotation.set(0, 11, 0);
//     // model.lookAt(targetPosition);
//     // const group = new THREE.Group();
//     // scene.add(group);
//     // group.add(model);
//     // model.position.set(-pivotX, -pivotY, -pivotZ);
//     // group.rotation.set(rx, ry, rz);
//     // const box = new THREE.Box3().setFromObject(model);
//     // const size = box.getSize(new THREE.Vector3());
//     // const desiredHeight = 5; // Replace with your desired height
//     // const scale = desiredHeight / size.y;
//     // model.scale.set(scale, scale, scale);

//     scene.add(model);
//     const ambientLight = new THREE.AmbientLight(0x404040, 1);
//     scene.add(ambientLight);

//     // If you want to play the animation, you can do so with the following:
//     if (gltf.animations && gltf.animations.length) {
//       const mixer = new THREE.AnimationMixer(model);
//       const action = mixer.clipAction(gltf.animations[0]);
//       action.play();

//       // Include this in the animate function to update the animation
//       const clock = new THREE.Clock();
//       animate();
//       function animate() {
//         const delta = clock.getDelta();
//         mixer.update(delta);
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//       }
//     } else {
//       function animate() {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//       }
//     }
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

// "/assets/ani/bunnyAni/Pointing (4).fbx",

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

import { saveToLocalS, getFromLocalS } from "../tools/localstorage";

// Create the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a WebGLRenderer and add it to the DOM
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // The second argument is the alpha value.
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.toneMapping = THREE.ReinhardToneMapping;

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // Enable smooth damping of the camera movement
// controls.dampingFactor = 0.05;
// controls.zoomSpeed = 2; // Speed of zooming

document.body.appendChild(renderer.domElement);

// Create a light so we can see the model
const light = new THREE.DirectionalLight(0xffffff, 2); // Intensity set to 2
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

scene.add(light);

// Load the texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("assets/ani/bunnyAni/bunny_tex1.png");

const container = document.getElementById("canvas-bunny");
container.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new FBXLoader();

const BunnyAni = {
  startAnimation: null,
  pauseAnimation: null,
  restartAnimation: null,
};
let resolveModelLoaded;
const modelLoadedPromise = new Promise((resolve) => {
  resolveModelLoaded = resolve;
});

loader.load(
  "/assets/ani/bunnyAni/Pointing (4).fbx",
  (fbx) => {
    // Your processing here will be very similar to what you did for the gltf model.

    fbx.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });

    fbx.scale.set(0.3, 0.3, 0.3);
    fbx.position.set(0, -3, 0);
    // fbx.rotation.set(Math.PI / 5, 0, 0);
    fbx.rotation.x -= Math.PI / 5; // Rotate upwards by ~11.25 degrees
    fbx.rotation.y -= Math.PI;

    const offset = new THREE.Vector3(0, 0, -5); // 5 units behind
    const globalPosition = offset.applyMatrix4(fbx.matrixWorld);
    light.position.copy(globalPosition);
    scene.add(fbx);
    // controls.addEventListener("change", function () {
    //   console.log(
    //     `Rotation: X: ${fbx.rotation.x}, Y: ${fbx.rotation.y}, Z: ${fbx.rotation.z}`
    //   );
    // });

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // const mixer = new THREE.AnimationMixer(fbx);
    // const action = mixer.clipAction(fbx.animations[0]);
    const clipDuration = fbx.animations[0].duration;

    // action.play();

    let elapsedTime = 0;
    // Animation handling for FBX can be different depending on how it was exported.
    // You would generally use the same animation mixer, but the exact usage might differ depending on the FBX contents.
    saveToLocalS("isPaused", false);
    let isPaused = false;

    // At the top of your bunnyAni.js file:

    // ... (rest of your code)

    const mixer = new THREE.AnimationMixer(fbx);
    const action = mixer.clipAction(fbx.animations[0]);
    action.play();

    BunnyAni.startAnimation = function () {
      if (action) {
        isPaused = false; // Simply continue the animation
      }
    };

    BunnyAni.pauseAnimation = function () {
      isPaused = true;
    };

    BunnyAni.restartAnimation = function () {
      if (action) {
        action.reset().play();
        elapsedTime = 0;
        isPaused = false;
      }
    };

    resolveModelLoaded();

    if (fbx.animations && fbx.animations.length) {
      const clock = new THREE.Clock();
      function animate() {
        if (elapsedTime >= clipDuration) {
          // saveToLocalS("isPaused", true);
          isPaused = true;
          elapsedTime = 0;
        }
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        if (!isPaused) {
          mixer.update(delta);
        }

        elapsedTime += delta;

        renderer.render(scene, camera);
        // controls.update();
      }
      animate(); // initiate the animation loop here
    } else {
      function animate() {
        requestAnimationFrame(animate);
        if (!isPaused) {
          const delta = clock.getDelta();
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      }
      animate(); // initiate the animation loop here too
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

BunnyAni.modelLoaded = modelLoadedPromise;
export default BunnyAni;
