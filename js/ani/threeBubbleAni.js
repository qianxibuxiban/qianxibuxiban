import * as THREE from "three";

const noOfBubbles = 5;

class Bubble {
  constructor(texturePath, size = 1) {
    this.environmentMap = new THREE.CubeTextureLoader().load([
      "/textures/cubes/possx.png",
      "/textures/cubes/neggx.png",
      "/textures/cubes/possy.png",
      "/textures/cubes/neggy.png",
      "/textures/cubes/possz.png",
      "/textures/cubes/neggz.png",
    ]);

    this.texture = new THREE.TextureLoader().load(texturePath);

    this.geometry = new THREE.SphereGeometry(5, 32, 32);
    this.material = new THREE.MeshStandardMaterial({
      map: this.texture,
      metalness: 1,
      roughness: 0.0,
      envMap: this.environmentMap,
      transparent: true,
      opacity: 1,
    });
    // this.material = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Use a magenta color

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, -5, 5);

    this.windDirection = new THREE.Vector3(
      (Math.random() - 0.5) * 0.2, // Slight left or right movement
      0.9 + Math.random() * 0.1, // Mostly upward movement
      -0.5 - Math.random() * 0.5 // Movement away from the user
    ).normalize();
    this.targetWindDirection = this.windDirection.clone();

    this.initialSpeed = 0.002 + Math.random() * 0.03; // Start speed between 0.02 and 0.05
    this.speed = this.initialSpeed;
    this.decayFactor = 0.995; // You can adjust this for faster/slower decay
    this.creationTime = Date.now();

    this.rotationSpeed = new THREE.Vector3(
      Math.random() * 0.02 - 0.01, // Random value between -0.01 and 0.01
      Math.random() * 0.02 - 0.01,
      Math.random() * 0.02 - 0.01
    );
  }
  hasExited() {
    // Adjust these values based on your camera setup and scene dimensions.
    return (
      this.mesh.position.y > 20 || // Exited at the top
      this.mesh.position.y < -20 || // Exited at the bottom
      this.mesh.position.x > 20 || // Exited at the right
      this.mesh.position.x < -20 || // Exited at the left
      this.mesh.position.z > 30 || // Exited far into the screen
      this.mesh.position.z < -10 // Exited behind the camera
    );
  }

  resetPosition() {
    this.mesh.position.set(0, -5, 5);
    this.speed = 0.0009 + Math.random() * 0.02;
    this.windDirection = new THREE.Vector3(
      (Math.random() - 0.5) * 0.2,
      0.9 + Math.random() * 0.1,
      -0.5 - Math.random() * 0.5
    ).normalize();
  }
}

class BubbleManager {
  constructor(generateBubble) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15); // Pushing the camera a bit further on the z-axis.

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("bubbleCanvas"),
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(this.light);
    // this.scene.background = new THREE.Color("blue"); // Sets a red background.

    this.bubbles = [];

    // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const boxMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    // const box = new THREE.Mesh(boxGeometry, boxMaterial);
    // this.scene.add(box);
    this.generateBubble = this.generateBubble.bind(this); // Bind the generateBubble method to the instance
    this.animate = this.animate.bind(this);
    this.animate();
  }

  addBubble(bubble) {
    this.bubbles.push(bubble);
    this.scene.add(bubble.mesh);
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const globalAngle = Date.now() * 0.001;
    const amplitude = 0.05;

    // for (let i = this.bubbles.length - 1; i >= 0; i--) {
    //   let bubble = this.bubbles[i];

    //   bubble.mesh.rotation.x += bubble.rotationSpeed.x;
    //   bubble.mesh.rotation.y += bubble.rotationSpeed.y;
    //   bubble.mesh.rotation.z += bubble.rotationSpeed.z;
    //   // Calculate elapsed time since bubble was created
    //   let elapsedTime = (Date.now() - bubble.creationTime) / 1000; // in seconds

    //   if (elapsedTime < 5) {
    //     // For the first 5 seconds, decay the speed
    //     bubble.speed =
    //       bubble.initialSpeed * Math.pow(bubble.decayFactor, elapsedTime * 60); // 60 is an assumption for frame rate. Adjust as needed.
    //   } else if (bubble.speed > 0.009 + Math.random() * 0.01) {
    //     // Ensure it doesn't go below the desired range
    //     bubble.speed = 0.009 + Math.random() * 0.01; // Speed between 0.009 and 0.019 after decay
    //   }

    //   bubble.mesh.position.add(
    //     bubble.windDirection.clone().multiplyScalar(bubble.speed)
    //   );

    //   // Slight oscillation for all bubbles
    //   bubble.targetWindDirection.x += Math.sin(globalAngle) * amplitude;

    //   let shouldChangeDirection = Math.random() > 0.985;

    //   if (shouldChangeDirection) {
    //     let windIntensity = Math.random();

    //     if (windIntensity > 0.9) {
    //       bubble.targetWindDirection
    //         .set(
    //           Math.sin(globalAngle) * amplitude,
    //           1,
    //           (Math.random() - 0.5) * 0.5
    //         )
    //         .normalize();
    //     } else if (Math.random() < 0.1) {
    //       let slightVariation = new THREE.Vector3(
    //         (Math.random() - 0.5) * amplitude,
    //         0,
    //         (Math.random() - 0.5) * amplitude
    //       );
    //       bubble.targetWindDirection.add(slightVariation).normalize();
    //     }
    //   }

    //   // Smoothly transition to the target direction
    //   bubble.windDirection.lerp(bubble.targetWindDirection, 0.05);

    //   bubble.mesh.position.add(
    //     bubble.windDirection.clone().multiplyScalar(bubble.speed)
    //   );

    //   if (bubble.hasExited()) {
    //     bubble.resetPosition();
    //   }
    // }

    while (this.bubbles.length < noOfBubbles) {
      this.generateBubble();
    }

    this.renderer.render(this.scene, this.camera);
  }

  generateBubble() {
    const bubbleTexture = [
      "/textures/bubble/bubbletexture2.png",
      "/textures/bubble/bubbletexture3.png",
      "/textures/bubble/bubbletexture4.png",
      "/textures/bubble/bubbletexture5.png",
    ];

    let randomValue = Math.floor(Math.random() * bubbleTexture.length);

    const size = 0.5 + Math.random() * 0.5;
    let bubble = new Bubble("/textures/bubble/bubbletexture2.png", size);

    this.addBubble(bubble);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let bubbleManager = new BubbleManager();

  function generateNBubbles() {
    for (let i = 0; i < noOfBubbles; i++) {
      setTimeout(() => bubbleManager.generateBubble(), 1000 + 100 * i); // Adjusted here
    }
  }
  // generateBubble();

  let hasInteracted = false;
  function initializeBubbles() {
    if (hasInteracted) return;
    hasInteracted = true;
    generateNBubbles();
  }

  document.addEventListener("click", initializeBubbles);
  document.addEventListener("touchstart", initializeBubbles);
});

// let testBubble = new Bubble("/textures/bubble/bubbletexture2.png", 5);
// let bubbleManager = new BubbleManager();

// bubbleManager.addBubble(testBubble);
