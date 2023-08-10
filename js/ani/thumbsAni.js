{
  /* <div class="thumb-wrapper">
          <img class="thumb" src="assets/thumbs/lucija/1_thumbnail.jpeg" alt="Thumb 1">
          <img class="full-image" src="assets/img/lucija/1.png" alt="Full Image 1">
        </div> */
}

document.addEventListener("DOMContentLoaded", function () {
  // Get all the thumbnail wrappers
  const thumbWrappers = document.querySelectorAll(".thumb-wrapper");

  // Function to get a random index
  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  // Function to move the thumbnail to the "scale-thumb" div and apply 2x scaling
  function moveThumbnailToScaleThumb() {
    // Get a random index to select a random thumbnail
    const randomIndex = getRandomIndex(thumbWrappers.length);

    // Select the thumbnail and full-image elements of the random thumbnail wrapper
    const randomThumbWrapper = thumbWrappers[randomIndex];

    const randomThumb = randomThumbWrapper.querySelector(".thumb");
    let scalethumb = document.getElementById("scale-thumb");
    const rect = randomThumb.getBoundingClientRect();
    scalethumb.style.left = `${rect.left}px`;
    scalethumb.style.top = `${rect.top}px`;

    const randomFullImage = randomThumbWrapper.querySelector(".full-image");

    // Clone the random thumbnail and add it to the "scale-thumb" div
    const clonedThumb = randomThumb.cloneNode(true);
    console.log(
      "🚀 ~ file: index.html:198 ~ moveThumbnailToScaleThumb ~ clonedThumb:",
      clonedThumb.src
    );
    // clonedThumb.src = randomFullImage.src
    // Set initial scale to 0 and position to center of the screen using CSS animation
    // document.getElementById("scale-thumb").appendChild(clonedThumb);

    scalethumb.style.display = "block";
    const position = getLeftTopPosition(randomThumb);

    console.log(
      "🚀 ~ file: index.html:202 ~ moveThumbnailToScaleThumb ~ scalethumb.style.left:",
      scalethumb.style.left
    );
    console.log(
      "🚀 ~ file: index.html:203 ~ moveThumbnailToScaleThumb ~ scalethumb.style.top:",
      scalethumb.style.top
    );

    // returnScaleThumb(scalethumb)

    const currentChild = scalethumb.querySelector("img");
    scalethumb.replaceChild(clonedThumb, currentChild);
    // scalethumb.style.display = 'block'
    // Function to get the left and top position of an element

    // Replace 'elementId' with the actual ID of the element you want to get dimensions for

    // Get and display the left and top position of the element

    // Function to set the left and top position of an element
    function setLeftTopPosition(element, left, top) {
      // element.style.position = "absolute"; // Make sure the position is absolute or fixed
      element.style.left = left + "px";
      element.style.top = top + "px";
    }
    // Set the left and top position for the "clonedThumb" element

    // setLeftTopPosition(scalethumb, position.left, position.top);
    console.log(
      "🚀 ~ file: index.html:202 ~ moveThumbnailToScaleThumb ~ scalethumb.style.left:",
      scalethumb.style.left
    );
    console.log(
      "🚀 ~ file: index.html:203 ~ moveThumbnailToScaleThumb ~ scalethumb.style.top:",
      scalethumb.style.top
    );
    centerScaleThumb(scalethumb);
    function returnScaleThumb(element) {
      element.style.left = `${position.left}px`;
      element.style.top = `${position.top}px`;
    }
    function centerScaleThumb(element) {
      if (element) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const targetLeft = (viewportWidth - 500) / 2;
        const targetTop = (viewportHeight - 500) / 2;
        console.log(
          "🚀 ~ file: thumbsAni.js:88 ~ centerScaleThumb ~ element.offsetHeight:",
          element.offsetHeight
        );

        // Triggering reflow to ensure CSS transition works
        element.getBoundingClientRect();

        element.style.left = `${targetLeft}px`;
        element.style.top = `${targetTop}px`;
        element.style.height = "500px";
        element.style.width = "500px";
      }
    }
    let fullImage = document.getElementById("full-image");
    setTimeout(() => {
      fullImage.src = randomFullImage.src;
    }, 2000);
    setTimeout(() => {
      (fullImage.src = ""),
        (scalethumb.style.scale = 1),
        returnScaleThumb(scalethumb),
        (scalethumb.style.height = "100px"),
        (scalethumb.style.width = "100px");
    }, 4000);
    setTimeout(() => {
      (randomThumb.style.display = "block"),
        (scalethumb.style.display = "none");
    }, 6000);

    setTimeout(() => {
      moveThumbnailToScaleThumb();
    }, 8000);

    // Hide the original thumbnail after the animation is complete

    randomThumb.style.display = "none";
    // Hide after 1 second (matching the animation duration)

    // Optionally, show the full image in the console for reference
  }

  // Call the function to move the thumbnail to "scale-thumb" on page load
  moveThumbnailToScaleThumb();
});

function getLeftTopPosition(element) {
  const rect = element.getBoundingClientRect();
  if (element) {
    const parentElement = element.parentElement;

    if (parentElement) {
      const rect = parentElement.getBoundingClientRect();
      const left = rect.left;
      const top = rect.top;
      console.log(`Parent left: ${left}px`);
      console.log(`Parent top: ${top}px`);
    } else {
      console.log("Parent element not found.");
    }
  } else {
    console.log("Child element not found.");
  }
  console.log({ left: rect.left, top: rect.top });
  return { left: rect.left, top: rect.top };
}

//    <!-- Add 16 thumb images here -->
//    <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/1_thumbnail.jpeg" alt="Thumb 1">
//    <img class="full-image" src="assets/img/lucija/1.png" alt="Full Image 1">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/2_thumbnail.jpeg" alt="Thumb 2">
//    <img class="full-image" src="assets/img/lucija/2.png" alt="Full Image 2">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/3_thumbnail.jpeg" alt="Thumb 3">
//    <img class="full-image" src="assets/img/lucija/3.png" alt="Full Image 3">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/4_thumbnail.jpeg" alt="Thumb 4">
//    <img class="full-image" src="assets/img/lucija/4.png" alt="Full Image 4">
//  </div>

//  <!-- Repeat the above code for the remaining sets -->
//  <!-- Assuming the images continue with the same naming convention -->
//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/5_thumbnail.jpeg" alt="Thumb 5">
//    <img class="full-image" src="assets/img/lucija/5.png" alt="Full Image 5">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/6_thumbnail.jpeg" alt="Thumb 6">
//    <img class="full-image" src="assets/img/lucija/6.png" alt="Full Image 6">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/7_thumbnail.jpeg" alt="Thumb 7">
//    <img class="full-image" src="assets/img/lucija/7.png" alt="Full Image 7">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/8_thumbnail.jpeg" alt="Thumb 8">
//    <img class="full-image" src="assets/img/lucija/8.png" alt="Full Image 8">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/9_thumbnail.jpeg" alt="Thumb 9">
//    <img class="full-image" src="assets/img/lucija/9.png" alt="Full Image 9">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/10_thumbnail.jpeg" alt="Thumb 10">
//    <img class="full-image" src="assets/img/lucija/10.png" alt="Full Image 10">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/11_thumbnail.jpeg" alt="Thumb 11">
//    <img class="full-image" src="assets/img/lucija/11.png" alt="Full Image 11">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/12_thumbnail.jpeg" alt="Thumb 12">
//    <img class="full-image" src="assets/img/lucija/12.png" alt="Full Image 12">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/13_thumbnail.jpeg" alt="Thumb 13">
//    <img class="full-image" src="assets/img/lucija/13.png" alt="Full Image 13">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/14_thumbnail.jpeg" alt="Thumb 14">
//    <img class="full-image" src="assets/img/lucija/14.png" alt="Full Image 14">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/15_thumbnail.jpeg" alt="Thumb 15">
//    <img class="full-image" src="assets/img/lucija/15.png" alt="Full Image 15">
//  </div>

//  <div class="thumb-wrapper">
//    <img class="thumb" src="assets/thumbs/lucija/16_thumbnail.jpeg" alt="Thumb 16">
//    <img class="full-image" src="assets/img/lucija/16.png" alt="Full Image 16">
//  </div>
