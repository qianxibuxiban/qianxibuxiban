// Get a reference to the container element
const container = document.querySelector(".container");
let thumbHeightOrWidth = "thumb-wrapper";
// window.innerHeight > window.innerWidth
//   ? "thumb-wrapper-height"
//   : "thumb-wrapper";
function addImages(index, path, origImg) {
  // Create a new div with the class "thumb-wrapper"
  const thumbWrapper = document.createElement("div");
  thumbWrapper.classList.add(thumbHeightOrWidth);

  // Create the first image element for the thumbnail
  //   const thumbImage = document.createElement("img");
  //   thumbImage.classList.add("thumb");
  //   thumbImage.src = `assets/thumbs/lucija/${i}_thumbnail.jpeg`;
  //   thumbImage.alt = `Thumb ${i}`;

  // Create the second image element for the full image
  const fullImage = document.createElement("div");
  fullImage.classList.add("full-image");
  fullImage.style.backgroundImage = path;
  fullImage.origImg = origImg;
  //   fullImage.style.width = "calc(100vw / 2)";
  //   fullImage.style.height = "calc(100vh / 3 - 80px)";
  fullImage.style.backgroundSize = "cover";
  fullImage.style.backgroundPosition = "center center";
  fullImage.style.backgroundRepeat = "no-repeat";
  fullImage.alt = `Full Image ${index + 1}`;

  // Append the thumbnail and full image to the thumb-wrapper div
  //   thumbWrapper.appendChild(thumbImage);
  thumbWrapper.appendChild(fullImage);

  // Append the thumb-wrapper div to the container
  container.appendChild(thumbWrapper);
}
function setImages() {
  console.log("setImages called");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let i = 0; i < 18; i++) {
    const path = `url('assets/img/${i + 1}.png')`; //`assets/img/lucija/${i}.png`;
    const origImg = `url('assets/img/${i + 1}.png')`;
    addImages(i, path, origImg);
  }

  // addImages(27, `url('assets/img/lucija2/3.png')`);
}
// setImages();
// style="background:url('http://i.imgur.com/RiX7XfW.jpg')
document.addEventListener("DOMContentLoaded", function () {
  function animate() {
    // Get all the thumbnail wrappers
    const thumbWrappers = document.querySelectorAll(`.${thumbHeightOrWidth}`);

    // Function to get a random index
    function getRandomIndex(max) {
      return Math.floor(Math.random() * max);
      //   return 25;
    }

    // Function to move the thumbnail to the "scale-thumb" div and apply 2x scaling

    // Get a random index to select a random thumbnail
    const randomIndex = getRandomIndex(thumbWrappers.length);
    // Select the thumbnail and full-image elements of the random thumbnail wrapper
    const randomThumbWrapper = thumbWrappers[randomIndex];
    const randomThumb = randomThumbWrapper.querySelector(".full-image");

    let aniImage = document.getElementById("ani-image");

    aniImage.style.backgroundImage = randomThumb.origImg;
    aniImage.style.transition = "none";
    const thumbImgPath = randomThumb.style.backgroundImage;
    randomThumb.style.backgroundImage = "";
    const wellcomeMsg = document.getElementById("lang-welcome");
    const wellcomeContainer = document.getElementById("wellcome-conatainer");
    originalPosition(aniImage, randomThumb, wellcomeMsg, wellcomeContainer);
    let rect = aniImage.getBoundingClientRect();
    aniImage.style.transition =
      "left 2s ease, top 2s ease, width 2s ease, height 2s ease";

    const aniImgSrc = aniImage.style.backgroundImage.split('"')[1];
    getImageDimensions(aniImgSrc, aniImage, wellcomeMsg, wellcomeContainer);
    setTimeout(function () {
      originalPosition(aniImage, randomThumb, wellcomeMsg, wellcomeContainer);
    }, 4000);

    setTimeout(function () {
      animate();
      randomThumb.style.backgroundImage = thumbImgPath;
    }, 6000);
  }
  animate();
});

function originalPosition(element, randomT, wellcomeMsg, wellcomeContainer) {
  const rectRandomThumb = randomT.getBoundingClientRect();
  wellcomeContainer.style.opacity = 0.2;
  wellcomeMsg.style.opacity = 1;
  // Apply position and size to aniImage
  element.style.width = `${rectRandomThumb.width}px`;
  element.style.height = `${rectRandomThumb.height}px`;
  element.style.left = `${rectRandomThumb.left}px`;
  element.style.top = `${rectRandomThumb.top}px`;
}
function centerScaleThumb(
  element,
  width,
  height,
  wellcomeMsg,
  wellcomeContainer
) {
  wellcomeContainer.style.opacity = 0.7;
  wellcomeMsg.style.opacity = 0;

  if (element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const newWidHeight = recalcImgDimen(
      width,
      height,
      viewportWidth / 1.2,
      viewportHeight / 1.2
    );
    const targetLeft = (viewportWidth - newWidHeight.width) / 2;
    const targetTop = (viewportHeight - newWidHeight.height) / 2;
    element.style.left = `${targetLeft}px`;
    element.style.top = `${targetTop}px`;
    element.style.width = `${newWidHeight.width}px`; // viewportWidth / 1.7 + "px";
    element.style.height = `${newWidHeight.height}px`; //viewportHeight / 1.2 + "px";
  }
}
function getImageDimensions(imageUrl, element, wellcomeMsg, wellcomeContainer) {
  // Create a new Image object
  var image = new Image();
  // Set the source of the Image object to the image's URL
  image.src = imageUrl;
  // Return a promise to handle the asynchronous loading of the image
  return new Promise(function (resolve, reject) {
    // Once the image is loaded, resolve the promise with its width and height
    image.onload = function () {
      var width = this.width;
      var height = this.height;
      resolve([width, height]);
      centerScaleThumb(element, width, height, wellcomeMsg, wellcomeContainer);
    };
    // If there's an error loading the image, reject the promise
    image.onerror = function (e) {
      console.error("Error event:", e);
      reject(new Error("Failed to load the image."));
    };
  });
}

window.addEventListener("resize", function () {
  adoptToScreen();
});
adoptToScreen();
function adoptToScreen() {
  let aniImage = document.getElementById("ani-image");
  aniImage.style.transition = "none";
  aniImage.style.backgroundImage = "";
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width < height) {
    // thumbHeightOrWidth = "thumb-wrapper-height";
    // Apply styles for width smaller than height
    document.querySelector(".container").style.gridTemplateColumns =
      "repeat(3, 1fr)";
    setImages();
  } else {
    // thumbHeightOrWidth = "thumb-wrapper";
    document.querySelector(".container").style.gridTemplateColumns =
      "repeat(6, 1fr)";

    setImages();
  }
}

function recalcImgDimen(imageWidth, imageHeight, screenWidth, screenHeight) {
  // Given image dimensions and screen dimensions

  // Calculate the aspect ratio of the image
  const aspectRatio = imageWidth / imageHeight;

  // Calculate the new dimensions that fit within the screen
  let newWidth = imageWidth;
  let newHeight = imageHeight;

  if (newWidth > screenWidth) {
    newWidth = screenWidth;
    newHeight = newWidth / aspectRatio;
  }

  if (newHeight > screenHeight) {
    newHeight = screenHeight;
    newWidth = newHeight * aspectRatio;
  }

  // Set the image dimensions
  return { width: newWidth, height: newHeight };
}
