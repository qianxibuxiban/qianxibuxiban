import { language } from "./text";

const langElements = [
  "lang-home",
  // "lang-services",
  "lang-about",
  // "lang-gallery",
  "lang-kontakt",
  "lang-aboutText",
];
// Function to handle language change
function changeLanguage(selectedLanguage) {
  for (let i = 0; i < langElements.length; i++) {
    const el = document.getElementById(langElements[i]);
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
    console.log("🚀 ~ file: lang.js:26 ~ selectedLanguage:", selectedLanguage);
    console.log("🚀 ~ file: lang.js:26 ~ this.value;:", this.value);
    changeLanguage(selectedLanguage);
  };
}
initLangSelect();
window.addEventListener("resize", function () {
  initLangSelect();
  console.log("🚀 ~ file: lang.js:33 ~ initLangSelect:", "initLangSelect");
});

// const selectedLanguage = this.value;
changeLanguage("zh");
