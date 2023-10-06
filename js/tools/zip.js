import localforage from "localforage";

// import JSZip from "jszip";

const FONT_KEY = "cttkf";

localforage.getItem(FONT_KEY).then((font) => {
  if (font) {
    console.log("Font found in localforage.");
    useFont(font); // Your function to use the font.
  } else {
    fetch("/assets/data/font/Chinese Trad Taiwan Kai.zip")
      .then((response) => {
        if (!response.ok) throw new Error("Fetch error " + response.statusText);
        return response.blob();
      })
      .then((data) => JSZip.loadAsync(data))
      .then((zip) => {
        return zip.file("Chinese Trad Taiwan Kai.ttf").async("uint8array");
      })
      .then((content) => {
        // Convert the uint8array to a Blob to store in localforage.
        const blob = new Blob([content], { type: "font/ttf" });
        localforage.setItem(FONT_KEY, blob).then(() => {
          console.log("Font saved to localforage.");
          useFont(blob); // Your function to use the font.
        });
      })
      .catch((error) => console.error(error));
  }
});

function useFont(fontBlob) {
  const url = URL.createObjectURL(fontBlob);
  const style = document.createElement("style");
  style.textContent = `
    @font-face {
        font-family: 'Chinese Trad Taiwan Kai';
        src: url(${url}) format('truetype');
    }`;
  document.head.append(style);
  // You can now use 'My Custom Font' in your styles.
}
