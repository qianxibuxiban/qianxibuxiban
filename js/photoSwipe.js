import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

let lucija2Img = [];
let lucijaImg = [];

loadImages(
  "lucija2",
  lucija2Img,
  13,
  "assets/img/lucija2/",
  "assets/thumbs/lucija2/"
);
loadImages(
  "lucija",
  lucijaImg,
  17,
  "assets/img/lucija/",
  "assets/thumbs/lucija/"
);

function loadImages(id, images, num, imgPath, thumbPath) {
  for (let i = 1; i < num; i++) {
    images.push({
      src: `${thumbPath}${i}_thumbnail.jpeg`,
      href: `${imgPath}${i}.png`,
      alt: `Image${i}`,
    });
  }
  const lightbox = new PhotoSwipeLightbox({
    // may select multiple "galleries"
    gallery: `#${id}`,
    // Elements within gallery (slides)
    children: "a",
    // setup PhotoSwipe Core dynamic import
    pswpModule: () => import("photoswipe"),
  });
  // Create an array of image data

  // Get the gallery container element
  const galleryContainer = document.getElementById(id);

  // Loop through the image data array and create image elements
  images.forEach((data) => {
    const anchor = document.createElement("a");
    anchor.href = data.href;
    anchor.target = "_blank";
    anchor.style.marginRight = "10px";
    const image = document.createElement("img");
    image.src = data.src;
    image.alt = data.alt;
    image.style.marginBottom = "10px"; // Add bottom margin to create spacing between thumbnails

    anchor.appendChild(image);

    if (data.cropped) {
      anchor.setAttribute("data-cropped", "true");
      anchor.appendChild(document.createTextNode("Cropped"));
    }

    galleryContainer.appendChild(anchor);
  });

  // Initialize the lightbox after adding all images
  lightbox.init();

  // Example of how to use the getImageDimensions function for each full-size image
  images.forEach((data) => {
    getImageDimensions(data.href)
      .then(function (dimensions) {
        var width = dimensions[0];
        var height = dimensions[1];

        // Update the data-pswp-width and data-pswp-height attributes of the anchor element
        var anchor = galleryContainer.querySelector(`[href="${data.href}"]`);
        anchor.setAttribute("data-pswp-width", width);
        anchor.setAttribute("data-pswp-height", height);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  // image dimension
}

// image dimension
// Function to get image width and height
function getImageDimensions(imageUrl) {
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
    };
    // If there's an error loading the image, reject the promise
    image.onerror = function () {
      reject(new Error("Failed to load the image."));
    };
  });
}

// <!-- Gallery select dropdown -->
// <div class="dropdown">
//   <ul class="dropdown-btn">Gallery</ul>
//   <ul id="gallery-select">
//     <li class="menu-item" data-target="lang-lucija">Lucija</li>
//     <li class="menu-item" data-target="lang-lucija2">Lucija2</li>
//   </ul>
// </div>

// <!-- Galleries -->
// <ul class="gallery" id="lang-lucija">
//   <!-- Gallery content for Lucija -->
//   <!-- Set "display: none" in the CSS to initially hide the gallery -->
// </ul>

// <ul class="gallery" id="lang-lucija2">
//   <!-- Gallery content for Lucija2 -->
//   <!-- Set "display: none" in the CSS to initially hide the gallery --></ul>
