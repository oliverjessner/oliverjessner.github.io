(function () {
  var menuTrigger = document.querySelector("#toggle-menu-main-mobile");

  if (menuTrigger !== null) {
    var body = document.querySelector("body");
    var menuContainer = document.querySelector("#menu-main-mobile");
    var menuContainerCenter = document.querySelector(".menu-main-mobile-center");
    var closeIcon = document.querySelector("#close-overlay");
    var hamburgerIcons = document.querySelectorAll(".hamburger");
    var menuButton = menuTrigger.querySelector("button");

    function getMenuFocusables() {
      return Array.from(
        menuContainer.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("hidden"));
    }

    function setMobileMenuState(isOpen) {
      menuContainer.classList.toggle("open", isOpen);
      hamburgerIcons.forEach((icon) => icon.classList.toggle("is-active", isOpen));
      menuTrigger.classList.toggle("open", isOpen);
      body.classList.toggle("lock-scroll", isOpen);
      menuContainer.setAttribute("aria-hidden", String(!isOpen));
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");

      if (isOpen) {
        window.requestAnimationFrame(() => {
          if (menuContainer.classList.contains("open")) {
            closeIcon.focus();
          }
        });
      }
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
    closeIcon.addEventListener("click", () => {
      setMobileMenuState(false);
      menuButton.focus();
    });

    document.addEventListener("keydown", (e) => {
      const menuIsOpen = menuContainer.classList.contains("open");

      if (e.key === "Tab" && menuIsOpen) {
        const focusables = getMenuFocusables();
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        } else if (!menuContainer.contains(document.activeElement)) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }

      if (e.key === "Escape" || e.key == "Esc") {
        //if esc key was not pressed in combination with ctrl or alt or shift
        const isNotCombinedKey = !(e.ctrlKey || e.altKey || e.shiftKey);
        if (isNotCombinedKey && menuIsOpen) {
          setMobileMenuState(false);
          menuButton.focus();
        }
      }
    });
  }
})();
