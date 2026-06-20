const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const navigationLinks = document.querySelectorAll(".nav-link");
const currentYear = document.querySelector("#current-year");

// Keeps the compact navigation accessible and prevents the page moving behind it.
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navigation.classList.contains("open")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
