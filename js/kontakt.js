const images = [
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 1 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 2 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 3 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 5 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 8 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 13 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 21 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 34 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 55 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 89 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 144 },
  { url: 'url("assets/thumbs/lucija/1_thumbnail.jpeg")', fibonacci: 233 },
  // ... add more images with their corresponding Fibonacci numbers
];

// Sort images based on Fibonacci numbers
images.sort((a, b) => a.fibonacci - b.fibonacci);

const container = document.querySelector(".container");
let x = 0;
let y = 0;

for (const image of images) {
  const thumbWrapper = document.createElement("div");
  thumbWrapper.className = "thumb-wrapper";

  const fullImage = document.createElement("div");
  fullImage.className = "full-image";
  fullImage.style.backgroundImage = `url(${image.url})`;
  fullImage.style.backgroundSize = "cover";
  fullImage.style.backgroundPosition = "center center";
  fullImage.style.backgroundRepeat = "no-repeat";

  // Set width and height of the image based on Fibonacci number
  const fibonacciWidth = image.fibonacci * 100; // Adjust this factor
  const fibonacciHeight = image.fibonacci * 100; // Adjust this factor
  fullImage.style.width = `${fibonacciWidth}px`;
  fullImage.style.height = `${fibonacciHeight}px`;

  thumbWrapper.appendChild(fullImage);
  container.appendChild(thumbWrapper);

  x++;
  if (x >= 7) {
    x = 0;
    y++;
  }
}
