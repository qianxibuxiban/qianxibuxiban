import { language } from "./text";

const langElements = ["lang-home", "lang-services", "lang-about"];
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

// Event listener for language-select element
document.getElementById("language-select").onchange = function () {
  const selectedLanguage = this.value;
  changeLanguage(selectedLanguage);
};


