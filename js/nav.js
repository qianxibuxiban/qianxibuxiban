function navigation() {
  let navItems = ["home", "services", "about", "gallery"];
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
const nav = navigation();

document.getElementById("lang-home").onclick = function () {
  nav.menu("home");
};
document.getElementById("lang-services").onclick = function () {
  nav.menu("services");
};
document.getElementById("lang-about").onclick = function () {
  nav.menu("about");
};

document.getElementById("lang-gallery").onclick = function () {
  nav.menu("gallery");
};

nav.menu("home");
export default navigation;
