(function () {
  var menuTrigger = document.querySelector("#toggle-menu-main-mobile");

  if (menuTrigger !== null) {
    var body = document.querySelector("body");
    var menuContainer = document.querySelector("#menu-main-mobile");
    var menuContainerCenter = document.querySelector(".menu-main-mobile-center");
    var closeIcon = document.querySelector("#close-overlay");
    var hamburgerIcons = document.querySelectorAll(".hamburger");
    var menuButton = menuTrigger.querySelector("button");

    function setMobileMenuState(isOpen) {
      menuContainer.classList.toggle("open", isOpen);
      hamburgerIcons.forEach((icon) => icon.classList.toggle("is-active", isOpen));
      menuTrigger.classList.toggle("open", isOpen);
      body.classList.toggle("lock-scroll", isOpen);
      menuContainer.setAttribute("aria-hidden", String(!isOpen));
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    }

    function toggleMobileMenu() {
      setMobileMenuState(!menuContainer.classList.contains("open"));
    }

    menuTrigger.addEventListener("click", () => toggleMobileMenu());

    function closeOverlay(e) {
      if (e.target === e.currentTarget) {
        toggleMobileMenu();
      }
    }

    menuContainerCenter.addEventListener("click", (e) => closeOverlay(e));
    closeIcon.addEventListener("click", (e) => toggleMobileMenu(e));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key == "Esc") {
        //if esc key was not pressed in combination with ctrl or alt or shift
        const isNotCombinedKey = !(e.ctrlKey || e.altKey || e.shiftKey);
        const menuIsOpen = menuContainer.classList.contains("open");
        if (isNotCombinedKey && menuIsOpen) {
          setMobileMenuState(false);
          menuButton.focus();
        }
      }
    });
  }
})();
