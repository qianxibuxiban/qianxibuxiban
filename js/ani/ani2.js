// Get a reference to the container element
const container = document.querySelector(".container");

function addImages(index, path) {
  // Create a new div with the class "thumb-wrapper"
  const thumbWrapper = document.createElement("div");
  thumbWrapper.classList.add("thumb-wrapper");

  // Create the first image element for the thumbnail
  //   const thumbImage = document.createElement("img");
  //   thumbImage.classList.add("thumb");
  //   thumbImage.src = `assets/thumbs/lucija/${i}_thumbnail.jpeg`;
  //   thumbImage.alt = `Thumb ${i}`;

  // Create the second image element for the full image
  const fullImage = document.createElement("div");
  fullImage.classList.add("full-image");
  fullImage.style.backgroundImage = path;
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
for (let i = 0; i < 16; i++) {
  const path = `url('assets/img/lucija/${i + 1}.png')`; //`assets/img/lucija/${i}.png`;
  addImages(i, path);
}
for (let i = 1; i < 13; i++) {
  const path = `url('assets/img/lucija/${i + 1}.png')`;
  addImages(i + 16, path);
}
// style="background:url('http://i.imgur.com/RiX7XfW.jpg')
document.addEventListener("DOMContentLoaded", function () {
  function animate() {
    // Get all the thumbnail wrappers
    const thumbWrappers = document.querySelectorAll(".thumb-wrapper");

    // Function to get a random index
    function getRandomIndex(max) {
      return Math.floor(Math.random() * max);
    }

    // Function to move the thumbnail to the "scale-thumb" div and apply 2x scaling

    // Get a random index to select a random thumbnail
    const randomIndex = getRandomIndex(thumbWrappers.length);

    // Select the thumbnail and full-image elements of the random thumbnail wrapper
    const randomThumbWrapper = thumbWrappers[randomIndex];
    const randomThumb = randomThumbWrapper.querySelector(".full-image");

    let aniImage = document.getElementById("ani-image");

    aniImage.style.backgroundImage = randomThumb.style.backgroundImage;
    aniImage.style.transition = "none";

    originalPosition(aniImage, randomThumb);
    let rect = aniImage.getBoundingClientRect();
    console.log("🚀 ~ file: ani2.js:67 ~ animate ~ rect:", rect);
    aniImage.style.transition =
      "left 2s ease, top 2s ease, width 2s ease, height 2s ease";
    centerScaleThumb(aniImage);
    setTimeout(function () {
      originalPosition(aniImage, randomThumb);
    }, 4000);

    setTimeout(function () {
      animate();
    }, 6000);
  }
  animate();
});

function originalPosition(element, randomT) {
  const rectRandomThumb = randomT.getBoundingClientRect();

  // Apply position and size to aniImage
  element.style.width = `${rectRandomThumb.width}px`;
  element.style.height = `${rectRandomThumb.height}px`;
  element.style.left = `${rectRandomThumb.left}px`;
  element.style.top = `${rectRandomThumb.top}px`;
}
function centerScaleThumb(element) {
  if (element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // Triggering reflow to ensure CSS transition works

    const targetLeft = (viewportWidth - viewportWidth / 1.2) / 2;
    const targetTop = (viewportHeight - viewportHeight / 1.2) / 2;
    element.style.left = `${targetLeft}px`;
    element.style.top = `${targetTop}px`;
    element.style.height = viewportHeight / 1.2 + "px";
    element.style.width = viewportWidth / 1.2 + "px";
  }
  let rect = element.getBoundingClientRect();
}
