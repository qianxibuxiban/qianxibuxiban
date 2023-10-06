// import BunnyAni from "./bunnyAni";

let shouldChangeWind = false;
const WIND_CHANGE_FREQUENCY = 0.2;
const WIND_STRENGTH_THRESHOLD = 0.7; // Adjust this value based on your needs
let bubblesArray = [];

let lerpAmount = 0.001;

function updateWindDirection() {
  if (Math.random() < WIND_CHANGE_FREQUENCY) {
    shouldChangeWind = true;
    globalWindIntensity = -globalWindIntensity;
  }
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

// Run the updateWindDirection function every few seconds to decide if wind direction should change.
setInterval(updateWindDirection, 200);
let globalWindIntensity = 1; // Varies between -1 and 1
let globalSizeAngle = Math.random() * Math.PI * 2; // Starts the angle from a random position

let globalAngle = 1;

generateNBubbles();
setInterval(
  () => (
    (globalAngle += Math.random() * (0.05 - 0.01) + 0.01),
    (globalSizeAngle += Math.random() * (0.05 - 0.01) + 0.01)
  ),
  Math.random() * (80 - 20) + 20
);

function moveBubble(bubble) {
  if (!bubble || !(bubble instanceof HTMLElement)) {
    console.warn("Invalid bubble provided to moveBubble function.");
    return;
  }
  let bubbleWidth = parseFloat(getComputedStyle(bubble).width);
  let leftPosition = window.innerWidth / 2 - bubbleWidth / 2;

  let bottomPosition = 120;
  const amplitude = Math.random() * (7 - 1) + 1;

  let animationFrameId;

  const WIND_STRENGTH_THRESHOLD = 0.7; // Adjust this value based on your needs

  function animate() {
    if (bubble.isMerged) {
      cancelAnimationFrame(animationFrameId); // Cancel the animation
      return;
    }
    const imgElement = bubble.querySelector("img");
    const bubbleSize = parseFloat(imgElement.style.width);

    if (Math.abs(globalWindIntensity) > WIND_STRENGTH_THRESHOLD) {
      const direction = Math.sign(globalWindIntensity);
      const sizeMultiplier = Math.max(1 + globalWindIntensity * 0.001, 0.7);

      leftPosition += direction * Math.sin(globalAngle) * amplitude;

      imgElement.style.width = `${bubbleSize * sizeMultiplier}px`;
      imgElement.style.height = `${bubbleSize * sizeMultiplier}px`;
    } else {
      // Independently change direction and size for each bubble occasionally
      let individualDirection = Math.random() > 0.5 ? 1 : -1;
      if (Math.random() < 0.02) {
        const targetSizeMultiplier = Math.random() * 0.1 + 0.95;
        const newSize = lerp(
          bubbleSize,
          bubbleSize * targetSizeMultiplier,
          0.05
        );

        imgElement.style.width = `${newSize}px`;
        imgElement.style.height = `${newSize}px`;
      }

      leftPosition += individualDirection * Math.sin(globalAngle) * amplitude;
    }

    bottomPosition += Math.random();

    bubble.style.left = `${leftPosition}px`;
    bubble.style.bottom = `${bottomPosition}px`;

    if (shouldChangeWind) {
      globalWindIntensity = -globalWindIntensity; // Flip the intensity for wind direction change.
      shouldChangeWind = false; // Reset the change wind flag.
    }

    if (
      parseInt(bubble.style.left) > window.innerWidth - bubbleWidth ||
      parseInt(bubble.style.bottom) > window.innerHeight - bubbleWidth ||
      parseInt(bubble.style.left) < 0 ||
      parseInt(bubble.style.bottom) < 0 ||
      bubbleSize > 350 ||
      bubbleSize < 20 ||
      bubble.destroy === true
    ) {
      bubble.dataset.outOfBounds = "true";

      bubble.remove();
      // const index = bubblesArray.indexOf(bubble);
      // if (index > -1) {
      //   bubblesArray.splice(index, 1);
      // } else {

      cancelAnimationFrame(animationFrameId); // Cancel the animation

      let spriteElem = document.createElement("div");
      spriteElem.style.width = bubbleSize * 2 + "px";
      spriteElem.style.height = bubbleSize * 2 + "px"; // Assuming height is the same as width for a circle
      spriteElem.style.left = `${
        parseFloat(bubble.style.left) - bubbleSize / 2
      }px`;
      spriteElem.style.bottom = `${
        parseFloat(bubble.style.bottom) - bubbleSize / 2
      }px`;

      spriteElem.className = "bubble-burst"; // This class should have the sprite animation

      // 4. Append the sprite element to the body or the same container where the bubble was.
      document.body.appendChild(spriteElem); // You can replace `document.body` with a specific container if needed

      // Add an event listener to remove the spriteElem after the animation ends
      spriteElem.addEventListener("animationend", function () {
        spriteElem.remove();
        spriteElem = null;
      });

      const imgContainer = document.getElementsByClassName("image-container");

      if (imgContainer.length === 0) {
        generateNBubbles();
      }
      return;
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

function generateNBubbles() {
  for (let i = 0; i < 25; i++) {
    setTimeout(() => generateBubbleImage(), 500 + 100 * i);
  }

  applyArmUp();

  setTimeout(() => applyHeadSwing(), 500);
  setTimeout(() => applyArmDown(), 2500);
  setTimeout(() => applyHandMix(), 3000);
}

function applyHandMix() {
  const bunnyElement = document.getElementById("animatedBunny");

  // Remove any existing animation class
  bunnyElement.classList.remove("bunnyArmUpDown");

  // Add the bunnyHandMix class
  bunnyElement.classList.add("bunnyHandMix");
  bunnyElement.style.animation = "bunnyAnimation 1.5s infinite";
}

function applyArmUp() {
  const bunnyElement = document.getElementById("animatedBunny");

  // Remove any existing animation class
  bunnyElement.classList.remove("bunnyHandMix");

  // Add the bunnyArmUpDown class
  bunnyElement.classList.add("bunnyArmUpDown");

  // Change the animation property
  bunnyElement.style.animation = "armUpDownAnimation 0.5s forwards";
}
function applyHeadSwing() {
  const bunnyElement = document.getElementById("animatedBunny");

  // Remove any existing animation class
  bunnyElement.classList.remove("bunnyArmUpDown");

  // Add the bunnyHandMix class
  bunnyElement.classList.add("bunnyHeadSwing");
  bunnyElement.style.animation = "headswingAnimation 1.5s infinite";
}

function applyArmDown() {
  const bunnyElement = document.getElementById("animatedBunny");
  // Change the animation property to run in reverse
  bunnyElement.style.animation = "armUpDownAnimation 0.5s forwards reverse";
}

function switchToNewAnimation(duration, animation, noFrames) {
  const imgElement = document.getElementById(animation); // assuming you have an img element with this id
  const currentFrame = parseInt(imgElement.src.match(/(\d+).png$/)[1]);
  let framesLeft;

  // Check direction by comparing with the next frame's image source
  const nextFrame = parseInt(
    imgElement.src
      .replace(currentFrame, currentFrame + 1)
      .match(/(\d+).png$/)[1]
  );
  if (imgElement.src.includes(nextFrame)) {
    // Animation is moving forward
    framesLeft = noFrames - currentFrame;
  } else {
    // Animation is moving in reverse
    framesLeft = currentFrame - 1; // since we go till frame 1 in reverse
  }

  const remainingTime = framesLeft * duration;

  setTimeout(function () {
    // Here, switch to the new animation
    const bunnyElement = document.getElementById("animatedBunny");
    bunnyElement.style.animation = "newAnimation 10s infinite";
  }, remainingTime);
}

function getRandomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}
function generateBubbleImage() {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  const img = document.createElement("img");
  img.src = "public/assets/ani/bubbleImg/output.gif";
  img.alt = "Bubble Animation";

  img.classList.add("sliding"); // Add this line here

  imgContainer.appendChild(img);

  const size = Math.random() * (100 - 50) + 50; // Random size between 50px and 200px
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;

  document.body.appendChild(imgContainer);
  bubblesArray.push(imgContainer); // Add this line

  // const bubbleImages = [
  //   "/assets/ani/bubbleImg/bubble1/",
  //   "/assets/ani/bubbleImg/bubble2/",
  //   "/assets/ani/bubbleImg/bubble3/",
  //   "/assets/ani/bubbleImg/bubble4/",
  //   "/assets/ani/bubbleImg/bubble5/",
  //   "/assets/ani/bubbleImg/bubble6/",
  //   "/assets/ani/bubbleImg/bubble7/",
  //   "/assets/ani/bubbleImg/bubble8/",
  //   "/assets/ani/bubbleImg/bubble10/",
  //   "/assets/ani/bubbleImg/bubble11/",

  //   "/assets/ani/bubbleImg/bubble9/",
  //   "/assets/ani/bubbleImg/bubble12/",
  // ];
  // const randomBubbleImg = Math.floor(Math.random() * bubbleImages.length) + 0;
  // const images = [];
  // const imgPrefix = bubbleImages[randomBubbleImg];
  // for (let i = 1; i <= 71; i++) {
  //   images.push(imgPrefix + String(i).padStart(4, "0") + ".png");
  // }
  // let currentBubbleFrame = Math.floor(Math.random() * images.length);

  setInterval(() => {
    // Find the current active image and remove the active class
    const currentImage = imgContainer.querySelector("img.active");
    if (currentImage) {
      currentImage.classList.remove("active");
    }

    // Set the source of the next image and add the active class
    img.src = images[currentBubbleFrame];
    img.classList.add("active");

    currentBubbleFrame = (currentBubbleFrame + 1) % 71;
  }, 100);

  imgContainer.style.opacity = getRandomBetween(0.3, 0.7);
  imgContainer.destroy = false;
  imgContainer.onclick = function () {
    this.destroy = true;
  };

  imgContainer.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });
  moveBubble(imgContainer);
}

let hasInteracted = false;
function initializeBubbles() {
  if (hasInteracted) return;
  hasInteracted = true;
}
document.addEventListener("click", initializeBubbles);
document.addEventListener("touchstart", initializeBubbles);

// detect colision, join bubbles
function checkCollisions(bubblesArray) {
  // let bubblesArray = Array.from(document.querySelectorAll(".image-container"));
  for (let i = 0; i < bubblesArray.length; i++) {
    for (let j = i + 1; j < bubblesArray.length; j++) {
      const bubble1 = bubblesArray[i];
      const bubble2 = bubblesArray[j];

      const dx =
        parseFloat(bubble1.style.left) - parseFloat(bubble2.style.left);
      const dy =
        parseFloat(bubble1.style.bottom) - parseFloat(bubble2.style.bottom);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const r1 =
        parseFloat(getComputedStyle(bubble1.querySelector("img")).width) / 2;
      const r2 =
        parseFloat(getComputedStyle(bubble2.querySelector("img")).width) / 2;

      if (distance < r1 + r2 - 50) {
        // The bubbles overlap by more than 10 pixels
        mergeBubbles(bubble1, bubble2, r1, r2);
      }
    }
  }
}

function mergeBubbles(bubble1, bubble2, r1, r2) {
  // Calculate new radius based on the combined volume of the two bubbles
  bubble2.isMerged = true; // Add this line
  const V1 = (4 / 3) * Math.PI * r1 ** 3;
  const V2 = (4 / 3) * Math.PI * r2 ** 3;
  const newR = Math.cbrt(((3 / 4) * (V1 + V2)) / Math.PI);

  const img1 = bubble1.querySelector("img");
  let currentWidth = parseFloat(img1.style.width);
  let currentHeight = parseFloat(img1.style.height);
  let targetWidth = newR * 2;
  let targetHeight = newR * 2;

  let lerpStep = 0;

  function animateMerge() {
    lerpStep += 0.009; // Slower growth

    const adjustedTargetWidth = lerp(currentWidth, targetWidth, lerpStep);
    const adjustedTargetHeight = lerp(currentHeight, targetHeight, lerpStep);

    if (lerpStep <= 0.33) {
      // For the first third of the animation, stretch vertically
      img1.style.height = `${lerp(
        currentHeight,
        adjustedTargetHeight * 1.1,
        lerpStep * 3
      )}px`;

      // Adjust the bottom position to maintain center
      bubble1.style.bottom = `${
        parseFloat(bubble1.style.bottom) -
        lerp(0, adjustedTargetHeight * 0.1, lerpStep * 3) / 2
      }px`;
    } else if (lerpStep <= 0.66) {
      // For the second third, stretch horizontally
      img1.style.width = `${lerp(
        currentWidth,
        adjustedTargetWidth * 1.1,
        (lerpStep - 0.33) * 3
      )}px`;

      // Adjust the left position to maintain center
      bubble1.style.left = `${
        parseFloat(bubble1.style.left) -
        lerp(0, adjustedTargetWidth * 0.1, (lerpStep - 0.33) * 3) / 2
      }px`;
    } else if (lerpStep <= 1) {
      // For the final third, make it round again
      img1.style.width = `${lerp(
        currentWidth,
        adjustedTargetWidth,
        (lerpStep - 0.66) * 3
      )}px`;
      img1.style.height = `${lerp(
        currentHeight,
        adjustedTargetHeight,
        (lerpStep - 0.66) * 3
      )}px`;
    } else {
      // End the animation
      img1.style.width = `${targetWidth}px`;
      img1.style.height = `${targetHeight}px`;
      cancelAnimationFrame(animationId);
      return;
    }

    // Request another frame of the animation
    requestAnimationFrame(animateMerge);
  }

  // Start the merge animation
  let animationId = requestAnimationFrame(animateMerge);

  // ... (rest of the code for removing bubble2)

  // Remove bubble2
  bubble2.remove();
  const index = bubblesArray.indexOf(bubble2);
  if (index > -1) {
    bubblesArray.splice(index, 1);
  }
}

// Assuming bubblesArray is an array that contains all bubble div elements on the page

// setInterval(() => checkCollisions(bubblesArray), 100);
