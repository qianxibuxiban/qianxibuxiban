// // <!-- generate thumbes -->
// // <label>Image File:</label><br/>
// // <input type="file" id="imageLoader" name="imageLoader"/>
// // <canvas id="imageCanvas"></canvas>
// // <div id="imageContainer"></div>
// // <div id="getDimension"></div>
// // <!-- generate thumbes -->

// // JavaScript
// import localforage from "localforage";

// var imageLoader = document.getElementById("imageLoader");
// imageLoader.addEventListener("change", handleImage, false);
// var canvas = document.getElementById("imageCanvas");
// var ctx = canvas.getContext("2d");

// function handleImage(e) {
//   const file = e.target.files[0]; // Get the selected file
//   const fileName = file ? file.name.split(".")[0] : "No file selected";

//   var reader = new FileReader();
//   reader.onload = function (event) {
//     var img = new Image();
//     img.onload = function () {
//       // Set the canvas size to your desired thumbnail dimensions
//       canvas.width = 300;
//       canvas.height = 300;

//       getImageDimensions(img)
//         .then(function (size) {
//           // The image has loaded successfully, and the size contains [width, height].
//           var width = size[0];
//           var height = size[1];
//           canvas.width = width * 0.5; // 300
//           canvas.height = height * 0.5; // 300
//           console.trace(
//             "Image loaded successfully. Width:",
//             width,
//             "Height:",
//             height
//           );

//           var cropSize = Math.min(width, height); // Size of the square to crop

//           var cropX = Math.floor((width - cropSize) / 2); // Starting x-coordinate for cropping
//           var cropY = Math.floor((height - cropSize) / 2); // Starting y-coordinate for cropping

//           // Draw the cropped image on the canvas
//           ctx.drawImage(
//             img,
//             // cropX, // Start cropping from the calculated x-coordinate
//             // cropY, // Start cropping from the calculated y-coordinate
//             // cropSize, // Width of the square to crop
//             // cropSize, // Height of the square to crop
//             0,
//             0,
//             width * 0.5, // 300
//             height * 0.5 // 300
//           );

//           downloadImg(canvas);
//         })
//         .catch(function (error) {
//           // An error occurred while loading the image.
//           console.error(error.message);
//         });

//       // Draw the image on the canvas

//       function downloadImg(canvas) {
//         // Convert canvas content to Blob with JPEG format and set compression level
//         canvas.toBlob(
//           function (blob) {
//             // Store the Blob in localForage
//             localforage
//               .setItem(fileName, blob)
//               .then(function () {
//                 // Create a link for downloading the thumbnail
//                 const downloadLink = document.createElement("a");
//                 downloadLink.href = URL.createObjectURL(blob);
//                 downloadLink.download = fileName + "_thumbnail.jpeg";

//                 // Trigger a click event to initiate the download
//                 downloadLink.click();
//               })
//               .catch(function (error) {
//                 console.error(
//                   "Error saving canvas image to localForage:",
//                   error
//                 );
//               });
//           },
//           "image/jpeg",
//           0.5
//         ); // You can adjust the compression level here (0.0 to 1.0)
//       }
//     };
//     img.src = event.target.result;
//   };
//   reader.readAsDataURL(file);
// }

// // Function to show canvas image from localForage
// function showCanvasImageFromLocalForage() {
//   // Retrieve the Blob from localForage
//   localforage
//     .getItem("2ul6slfy")
//     .then(function (blob) {
//       if (blob) {
//         // Create an image element
//         var img = document.createElement("img");
//         img.src = URL.createObjectURL(blob);

//         // Append the image to the image container
//         var imageContainer = document.getElementById("imageContainer");
//         imageContainer.innerHTML = "";
//         imageContainer.appendChild(img);
//       } else {
//         console.log("Canvas image not found in localForage.");
//       }
//     })
//     .catch(function (error) {
//       console.error("Error retrieving canvas image from localForage:", error);
//     });
// }

// showCanvasImageFromLocalForage();

// // get img dimensions
// function getImageDimensions(imageData) {
//   // Extract the base64 image data from the src attribute of the img element
//   var base64Data = imageData.src.split(",")[1];

//   // Convert the base64 image data to a Blob
//   var blob = base64ToBlob(base64Data);

//   // Create a new Image object
//   var image = new Image();

//   // Return a promise to handle the asynchronous loading of the image
//   return new Promise(function (resolve, reject) {
//     // Once the image is loaded, resolve the promise with its width and height
//     image.onload = function () {
//       var width = this.width;
//       var height = this.height;
//       resolve([width, height]);

//       // Cleanup: revoke the object URL to free up resources
//       URL.revokeObjectURL(image.src);
//     };

//     // If there's an error loading the image, reject the promise
//     image.onerror = function () {
//       reject(new Error("Failed to load the image."));
//     };

//     // Create an object URL from the Blob and set it as the source of the Image object
//     image.src = URL.createObjectURL(blob);
//   });
// }

// // Helper function to convert base64 to Blob
// function base64ToBlob(base64Data) {
//   var contentType = "image/png"; // Change this if the image format is different
//   var sliceSize = 512;
//   var byteCharacters = atob(base64Data);
//   var byteArrays = [];

//   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     var slice = byteCharacters.slice(offset, offset + sliceSize);
//     var byteNumbers = new Array(slice.length);

//     for (var i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     var byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   return new Blob(byteArrays, { type: contentType });
// }

// // get img dimensions
