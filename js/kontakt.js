// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// let scene, camera, renderer;
// let bubbleMesh;

// // Load the bubble texture
// const textureLoader = new THREE.TextureLoader();
// const bubbleTexture = textureLoader.load(
//   "/assets/data/bubbletexture.png",
//   function (texture) {
//     bubbleMaterial.map = texture;
//     bubbleMaterial.needsUpdate = true;
//   }
// );
// bubbleTexture.repeat.set(0.9, 0.9);
// // bubbleMaterial.bumpMap = bubbleTexture;
// // bubbleMaterial.bumpScale = 0.2;

// // Load the cube texture
// const envMap = new THREE.CubeTextureLoader().load([
//   "textures/posx.jpg",
//   "textures/negx.jpg",
//   "textures/posy.jpg",
//   "textures/negy.jpg",
//   "textures/posz.jpg",
//   "textures/negz.jpg",
// ]);

// // const envMap = new THREE.CubeTextureLoader().load([
// //   "textures/ppx.jpg",
// //   "textures/nnx.jpg",
// //   "textures/ppy.jpg",
// //   "textures/nny.jpg",
// //   "textures/ppz.jpg",
// //   "textures/nnz.jpg",
// // ]);

// const interferenceTexture = textureLoader.load(
//   "/assets/data/bubbletexture.png"
// );

// // Create the bubble material
// const bubbleMaterial = new THREE.MeshStandardMaterial({
//   map: interferenceTexture,
//   color: 0xffffff,
//   metalness: 0.95, // Makes it highly reflective
//   roughness: 0.1, // Keeps reflections sharp
//   envMap: envMap, // The environment map for reflections
//   envMapIntensity: 0.08, // Adjust the intensity of the environment map
//   reflectivity: 1,
//   opacity: 0.8,
//   transparent: true,
// });

// init();
// animate();

// function init() {
//   // Scene
//   scene = new THREE.Scene();

//   // Camera
//   camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   camera.position.set(0, 0, 5);
//   camera.lookAt(0, 0, 0);

//   // Renderer
//   renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

//   renderer.setSize(window.innerWidth, window.innerHeight);

//   const container = document.getElementById("yourContainerId");
//   container.appendChild(renderer.domElement);

//   // Controls
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.update();

//   // Resize listener
//   window.addEventListener("resize", function () {
//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     renderer.setSize(width, height);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
//   });

//   // Lighting
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//   scene.add(ambientLight);

//   const pointLight = new THREE.PointLight(0xffffff, 1, 100);
//   pointLight.position.set(0, 0, 5);
//   scene.add(pointLight);

//   const dirLight = new THREE.DirectionalLight(0xffffff, 1);
//   dirLight.position.set(1, 1, 1);
//   scene.add(dirLight);

//   // Create and add the bubble mesh to the scene
//   const bubbleGeometry = new THREE.SphereGeometry(0.5, 32, 32);
//   bubbleMesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

//   scene.background = null; //'envMap';
//   scene.add(bubbleMesh);
// }

// function animate() {
//   requestAnimationFrame(animate);

//   // Rotate the bubble
//   let rotationPerFrame = ((5 * 360) / (60 * 60)) * (Math.PI / 180); // Convert degrees to radians
//   bubbleMesh.rotation.y += rotationPerFrame;

//   renderer.render(scene, camera);
// }

// // import * as THREE from "three";
// // import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// // let scene, camera, renderer;
// // let bubbleMesh;

// // // Load the bubble texture
// // const textureLoader = new THREE.TextureLoader();
// // const bubbleTexture = textureLoader.load(
// //   "/assets/data/bubbletexture.png",
// //   function (texture) {
// //     bubbleMaterial.map = texture;
// //     bubbleMaterial.needsUpdate = true;
// //   }
// // );
// // bubbleTexture.repeat.set(0.9, 0.9);
// // // bubbleMaterial.bumpMap = bubbleTexture;
// // // bubbleMaterial.bumpScale = 0.2;

// // // Load the cube texture
// // const envMap = new THREE.CubeTextureLoader().load([
// //   "textures/posx.jpg",
// //   "textures/negx.jpg",
// //   "textures/posy.jpg",
// //   "textures/negy.jpg",
// //   "textures/posz.jpg",
// //   "textures/negz.jpg",
// // ]);

// // // const envMap = new THREE.CubeTextureLoader().load([
// // //   "textures/ppx.jpg",
// // //   "textures/nnx.jpg",
// // //   "textures/ppy.jpg",
// // //   "textures/nny.jpg",
// // //   "textures/ppz.jpg",
// // //   "textures/nnz.jpg",
// // // ]);

// // const interferenceTexture = textureLoader.load(
// //   "/assets/data/bubbletexture.png"
// // );

// // // Camera
// // camera = new THREE.PerspectiveCamera(
// //   75,
// //   window.innerWidth / window.innerHeight,
// //   0.1,
// //   1000
// // );
// // camera.position.set(0, 0, 5);
// // camera.lookAt(0, 0, 0);

// // window.addEventListener("resize", function () {
// //   let width = window.innerWidth;
// //   let height = window.innerHeight;
// //   renderer.setSize(width, height);
// //   camera.aspect = width / height;
// //   camera.updateProjectionMatrix();
// //   bubbleMaterial.uniforms.resolution.value.set(width, height); // Add this line
// // });

// // // Create the bubble material with a custom shader
// // const bubbleMaterial = new THREE.ShaderMaterial({
// //   uniforms: {
// //     bubbleTexture: { value: bubbleTexture },
// //     interferenceTexture: { value: interferenceTexture },
// //     envMap: { value: envMap },
// //     viewDirection: { type: "v3", value: camera.position },
// //     resolution: {
// //       type: "v2",
// //       value: new THREE.Vector2(window.innerWidth, window.innerHeight),
// //     },
// //   },

// //   vertexShader: `
// //       varying vec3 vNormal;
// //       varying vec3 vViewPosition;
// //       void main() {
// //           vNormal = normalize(normalMatrix * normal);
// //           vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
// //           vViewPosition = -mvPosition.xyz;
// //           gl_Position = projectionMatrix * mvPosition;
// //       }
// //   `,
// //   fragmentShader: `
// //   uniform vec2 resolution;

// //   uniform sampler2D bubbleTexture;
// //   uniform sampler2D interferenceTexture;
// //   uniform samplerCube envMap;
// //   varying vec3 vNormal;
// //   varying vec3 vViewPosition;

// //   float layerWeight(float blend) {
// //     float fresnel = dot(normalize(vNormal), normalize(vViewPosition));
// //     return pow(1.0 - fresnel, blend);
// //   }

// //   void main() {
// //       float facing = layerWeight(0.0); // Adjust this value to control the effect
// //       vec4 texColor = texture2D(bubbleTexture, gl_FragCoord.xy / resolution.xy);
// //       vec4 interferenceColor = texture2D(interferenceTexture, gl_FragCoord.xy / resolution.xy);
// //       vec4 envColor = textureCube(envMap, reflect(-vViewPosition, vNormal));
// //       vec4 finalColor = mix(texColor, interferenceColor, facing); // Mix the two colors based on the fresnel effect
// //       gl_FragColor = mix(finalColor, envColor, 0.5); // Mix with the environment color
// //   }
// // `,
// // });

// // // ... (rest of the code for init and animate functions)

// // init();
// // animate();

// // function init() {
// //   // Scene
// //   scene = new THREE.Scene();

// //   // Renderer
// //   renderer = new THREE.WebGLRenderer({ antialias: true });
// //   renderer.setSize(window.innerWidth, window.innerHeight);

// //   const container = document.getElementById("yourContainerId");
// //   container.appendChild(renderer.domElement);

// //   // Controls
// //   const controls = new OrbitControls(camera, renderer.domElement);
// //   controls.update();

// //   // Resize listener
// //   window.addEventListener("resize", function () {
// //     let width = window.innerWidth;
// //     let height = window.innerHeight;
// //     renderer.setSize(width, height);
// //     camera.aspect = width / height;
// //     camera.updateProjectionMatrix();
// //   });

// //   // Lighting
// //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// //   scene.add(ambientLight);

// //   const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// //   pointLight.position.set(0, 0, 5);
// //   scene.add(pointLight);

// //   const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// //   dirLight.position.set(1, 1, 1);
// //   scene.add(dirLight);

// //   // Create and add the bubble mesh to the scene
// //   const bubbleGeometry = new THREE.SphereGeometry(1, 32, 32);
// //   bubbleMesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

// //   // scene.background = envMap;
// //   scene.add(bubbleMesh);
// // }

// // function animate() {
// //   requestAnimationFrame(animate);

// //   // Rotate the bubble
// //   let rotationPerFrame = ((5 * 360) / (60 * 60)) * (Math.PI / 180); // Convert degrees to radians
// //   bubbleMesh.rotation.y += rotationPerFrame;

// //   renderer.render(scene, camera);
// // }
