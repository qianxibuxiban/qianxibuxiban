function navigation() {
  let navItems = ["home", "kontakt", "about", "gallery"];
  function menu(page) {
    for (var i = 0; i < navItems.length; i++) {
      if (page !== navItems[i]) {
        document.getElementById(navItems[i]).style.display = "none";
      } else {
        document.getElementById(navItems[i]).style.display = "block";
      }
    }
  }
  return {
    menu: menu,
  };
}
export default navigation;

const menu = `
<ul class="menu-item" id="lang-home">Home</ul>
<ul class="menu-item" id="lang-about">About</ul>
<ul class="menu-item" id="lang-kontakt">Kontakt</ul>
<ul class="menu-item" id="lang-gallery">Gallery</ul>
<ul id="lang-menu">
  <label for="language-select"></label>
  <select id="language-select">
    <option value="en">English</option>
    <option value="hr">Hrvatski</option>
    <option value="it">Italiano</option>
    <option value="sl">Slovenščina</option>
    <option value="de">Deutsch</option>
    <option value="es">Español</option>
    <option value="pt">Português</option>
  </select>
</ul>`;

const topMenu = document.getElementById("menu");

const slideMenuButton = document.getElementById("slide-menu-button");
const slideOutMenu = document.getElementById("slide-menu");
function setMenu() {
  const viewportWidth = window.innerWidth; // Viewport width in pixels
  const viewportHeight = window.innerHeight; // Viewport height in pixels
  const screenSize = viewportWidth * viewportHeight;
  console.log(
    "🚀 ~ file: nav.js:38 ~ setMenu ~ viewportHeight, viewportWidth, screenSize",
    viewportHeight,
    viewportWidth,
    screenSize
  );
  if (screenSize > 600000) {
    topMenu.innerHTML = menu;
    topMenu.style.display = "flex";
    slideOutMenu.style.display = "none";
    slideOutMenu.innerHTML = "";
    const langDropMenu = document.getElementById("lang-menu");
    langDropMenu.style = "";
    langDropMenu.style = `position: absolute;
                          right: 20px;`;
    slideMenuButton.style.display = "none";
  } else if (screenSize < 599999) {
    slideOutMenu.innerHTML = menu;
    topMenu.style.display = "none";
    slideOutMenu.style.display = "none";
    topMenu.innerHTML = "";
    const langDropMenu = document.getElementById("lang-menu");
    langDropMenu.style = "";
    langDropMenu.style = `margin-right: 20px;
                          margin-left: 20px;
                          margin-top: 10px;`;
    slideMenuButton.style.display = "block";
  }
  assignClickHandlers();
}
setMenu();

slideMenuButton.addEventListener("click", () => {
  // slideMenuButton.style.display = "none";

  if (slideOutMenu.style.display !== "block") {
    slideOutMenu.style.display = "block";
  } else if (slideOutMenu.style.display === "block") {
    slideOutMenu.style.display = "none";
  }
});

window.addEventListener("resize", function () {
  setMenu();
});
const nav = navigation();

function assignClickHandlers() {
  document.getElementById("lang-home").onclick = function () {
    nav.menu("home");
  };
  document.getElementById("lang-kontakt").onclick = function () {
    nav.menu("kontakt");
  };
  document.getElementById("lang-about").onclick = function () {
    nav.menu("about");
  };
  document.getElementById("lang-gallery").onclick = function () {
    nav.menu("gallery");
  };
}

// Call the function on page load
assignClickHandlers();

nav.menu("home");
