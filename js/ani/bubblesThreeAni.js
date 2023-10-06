// import Bubble from "./bunnyAni"; // Assuming this is where the Bubble class is located

// let globalAngle = 1;

// setInterval(
//   () => (globalAngle += Math.random() * (0.05 - 0.01) + 0.01),
//   Math.random() * (80 - 20) + 20
// );

// function moveBubble(bubble) {
//   let leftPosition =
//     window.innerWidth / 2 - parseFloat(bubble.style.width) / 2 - 10;
//   let bottomPosition = 120;

//   const amplitude = Math.random() * (7 - 1) + 1;

//   let animationFrameId;
//   function animate() {
//     if (!bubble || bubble.dataset.outOfBounds) {
//       cancelAnimationFrame(animationFrameId);
//       return; // Stop the animation if bubble is null or out of bounds
//     }

//     leftPosition += Math.sin(globalAngle) * amplitude;
//     bottomPosition += Math.random() * 5;

//     bubble.style.left = `${leftPosition}px`;
//     bubble.style.bottom = `${bottomPosition}px`;

//     let bubbleWidth = parseFloat(getComputedStyle(bubble).width);
//     let bubbleHeight = parseFloat(getComputedStyle(bubble).height);

//     if (
//       !bubble.dataset.outOfBounds &&
//       (parseInt(bubble.style.left) > window.innerWidth - bubbleWidth ||
//         parseInt(bubble.style.bottom) > window.innerHeight - bubbleHeight ||
//         parseInt(bubble.style.left) < 0 ||
//         parseInt(bubble.style.bottom) < 0)
//     ) {
//       bubble.dataset.outOfBounds = "true";
//       bubble.remove();
//       bubble = null;

//       // When all bubbles are out of bounds, you can regenerate them.
//       if (document.getElementsByClassName("bubbleCanvas").length === 0) {
//         generateNBubbles();
//       }
//     }
//     animationFrameId = requestAnimationFrame(animate);
//   }
//   animate();
// }

// function generateNBubbles() {
//   for (let i = 0; i < 25; i++) {
//     setTimeout(() => generateBubbleCanvas(i), 1000 + 100 * i);
//   }

//   // Assuming you still want to use BunnyAni for some other purpose
//   // console.log(BunnyAni);
//   // BunnyAni.startAnimation();
//   // setTimeout(() => BunnyAni.pauseAnimation(), 2600);
// }
// window.generateNBubbles = generateNBubbles;
// function generateBubbleCanvas(i) {
//   const canvasElem = document.createElement("canvas");
//   canvasElem.className = "bubbleCanvas";

//   // Randomize size
//   const size = Math.random() * (150 - 5) + 5;
//   canvasElem.style.width = `${size}px`;
//   canvasElem.style.height = `${size}px`;

//   document.body.appendChild(canvasElem);

//   // Now, instantiate the Bubble animation on this canvas
//   new Bubble("bubbleCanvas", i, "/assets/data/bubbletexture.png", 1, 0.005);

//   moveBubble(canvasElem);
// }

// let hasInteracted = false;

// function initializeBubbles() {
//   if (hasInteracted) return;
//   hasInteracted = true;
// }

// document.addEventListener("click", initializeBubbles);
// document.addEventListener("touchstart", initializeBubbles);
