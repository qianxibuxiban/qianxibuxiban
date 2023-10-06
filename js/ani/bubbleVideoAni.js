// import { Application } from "@splinetool/runtime";

// const canvas = document.getElementById("canvas3d");
// const app = new Application(canvas);
// app.load("https://prod.spline.design/v7RiHnfY56HeWcTf/scene.splinecode");

// const rabbitAnimation = app;
// window.rabbitAnimation = rabbitAnimation;
// import BunnyAni from "./bunnyAni";
let shouldChangeWind = false;
const WIND_CHANGE_FREQUENCY = 0.2;
let lerpAmount = 0.001;

function updateWindDirection() {
  if (Math.random() < WIND_CHANGE_FREQUENCY) {
    shouldChangeWind = true; // Set flag to change wind direction
    targetWindDirection *= -1; // Reverse the target wind direction.
  }
}

// Run the updateWindDirection function every few seconds to decide if wind direction should change.
setInterval(updateWindDirection, 200); // Check every 5 seconds
let globalWindDirection = 1; // Left or right. 1 for right, -1 for left.
let targetWindDirection = globalWindDirection;

let globalAngle = 1;

let userHasInteracted = false;
document.body.addEventListener("click", function () {
  if (userHasInteracted) {
    return;
  } else {
    generateNBubbles();
  }
  userHasInteracted = true;
});
setInterval(
  () => (globalAngle += Math.random() * (0.05 - 0.01) + 0.01),
  Math.random() * (80 - 20) + 20
);

function moveBubble(bubble) {
  let leftPosition =
    window.innerWidth / 2 - parseFloat(bubble.style.width) / 2 - 10;
  let bottomPosition = 120;

  const amplitude = Math.random() * (7 - 1) + 1;

  const bubbleEl = document.getElementsByClassName("video-container");

  let animationFrameId;

  function animate() {
    // If the flag is set to change the wind direction, then update the global wind direction
    if (shouldChangeWind) {
      globalWindDirection +=
        (targetWindDirection - globalWindDirection) * lerpAmount;

      // When close enough to the target value, set it directly to avoid oscillations
      if (Math.abs(globalWindDirection - targetWindDirection) < 0.01) {
        globalWindDirection = targetWindDirection;
      }
    }

    // ... [Rest of the animate function remains the same]

    leftPosition += globalWindDirection * Math.sin(globalAngle) * amplitude;
    bottomPosition += (Math.random() * amplitude) / 2;

    if (!bubble || bubble.dataset.outOfBounds) {
      cancelAnimationFrame(animationFrameId);
      return;
    }

    bubble.style.left = `${leftPosition}px`;
    bubble.style.bottom = `${bottomPosition}px`;

    let bubbleWidth = parseFloat(getComputedStyle(bubble).width);
    let bubbleHeight = parseFloat(getComputedStyle(bubble).height);

    if (
      !bubble.dataset.outOfBounds &&
      (parseInt(bubble.style.left) > window.innerWidth - bubbleWidth ||
        parseInt(bubble.style.bottom) > window.innerHeight - bubbleHeight ||
        parseInt(bubble.style.left) < 0 ||
        parseInt(bubble.style.bottom) < 0)
    ) {
      bubble.dataset.outOfBounds = "true";
      // Optionally remove or handle the bubble here
      // Remove video from the bubble if it exists
      // 1. Extract width, left, and top styles of the bubble.
      // 1. Retrieve the bubble's position and size.
      let bubbleWidth = bubble.offsetWidth; // Using offsetWidth to get computed width
      let bubblePosition = bubble.getBoundingClientRect();
      let bubbleLeft = bubblePosition.left;
      let bubbleTop = bubblePosition.top;

      bubble.remove();
      bubble = null;

      // 3. Create a new element for the burst animation.
      let spriteElem = document.createElement("div");
      spriteElem.style.width = bubbleWidth * 1.5 + "px";
      spriteElem.style.height = bubbleWidth * 1.5 + "px"; // Assuming height is the same as width for a circle
      spriteElem.style.left = bubbleLeft - 25 + "px";
      spriteElem.style.top = bubbleTop - 25 + "px";

      spriteElem.className = "bubble-burst"; // This class should have the sprite animation

      // 4. Append the sprite element to the body or the same container where the bubble was.
      document.body.appendChild(spriteElem); // You can replace `document.body` with a specific container if needed

      // Add an event listener to remove the spriteElem after the animation ends
      spriteElem.addEventListener("animationend", function () {
        spriteElem.remove();
        spriteElem = null;
      });

      if (bubbleEl.length === 0) {
        generateNBubbles();
      }
    }
    animationFrameId = requestAnimationFrame(animate);
    // requestAnimationFrame(animate);
  } //--
  animate();

  // Start generating bubbles
}

function generateNBubbles() {
  for (let i = 0; i < 25; i++) {
    setTimeout(() => generateBubbleVideo(), 1000 + 100 * i);
  }
  // console.log(BunnyAni);
  // BunnyAni.startAnimation();

  // setTimeout(() => BunnyAni.pauseAnimation(), 2600);
}

//ideo-container
function generateBubbleVideo() {
  // Create the video container and the video element and its source
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");
  const video = document.createElement("video");
  const source = document.createElement("source");
  const bubbleVids = [
    // "public/assets/ani/bubbleVid/bubble1.webm",
    // "public/assets/ani/bubbleVid/bubble2.webm",
    // "public/assets/ani/bubbleVid/bubble3.webm",
    // "public/assets/ani/bubbleVid/bubble4.webm",
    "public/assets/ani/bubbleVid/0001-0200.mkv",
  ];
  const randomBubbleVid = Math.floor(Math.random() * bubbleVids.length) + 0;

  const vidPrefix = bubbleVids[randomBubbleVid];
  source.src = vidPrefix;
  source.type = "video/webm";

  video.appendChild(source);
  video.setAttribute("autoplay", "true");
  video.setAttribute("muted", "true");
  video.setAttribute("loop", "true");

  videoContainer.appendChild(video);
  const randomOpa = Math.random() * 0.4 + 0.3;
  console.log(randomOpa);
  videoContainer.style.opacity = randomOpa;

  // Randomize size
  const size = Math.random() * (150 - 5) + 5; // Random size between 50px and 200px
  videoContainer.style.width = `${size}px`;
  videoContainer.style.height = `${size}px`;

  document.body.appendChild(videoContainer);

  moveBubble(videoContainer);
}

let hasInteracted = false;

function initializeBubbles() {
  if (hasInteracted) return; // Ensure this runs only once

  // Now, set the flag so this function doesn't run again
  hasInteracted = true;
}

document.addEventListener("click", initializeBubbles);
document.addEventListener("touchstart", initializeBubbles);
