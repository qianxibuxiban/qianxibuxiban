import { language } from "./text";

const langElements = [
  "lang-home",
  "lang-services",
  "lang-about",
  "lang-gallery",
  "lang-description",
  "lang-description2",
  "lang-facilities",
  "lang-facilities2",
];
// Function to handle language change
function changeLanguage(selectedLanguage) {
  console.log("🚀 ~ file: lang.js:13 ~ changeLanguage ~ el:", "el");
  for (let i = 0; i < langElements.length; i++) {
    const el = document.getElementById(langElements[i]);
    console.log("🚀 ~ file: lang.js:13 ~ changeLanguage ~ el:", el);
    if (el) {
      const elText = langElements[i].split("-")[1];
      el.innerText = language[selectedLanguage][elText];
    }
  }
}

function initLangSelect() {
  // Event listener for language-select element
  document.getElementById("language-select").onchange = function () {
    const selectedLanguage = this.value;
    changeLanguage(selectedLanguage);
  };
}
initLangSelect();
window.addEventListener("resize", function () {
  initLangSelect();
});
