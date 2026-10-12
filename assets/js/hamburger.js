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

// Ordinary website navigation uses link groups with disclosure buttons.
// It deliberately keeps native navigation semantics and natural Tab order.
(function () {
  const disclosures = [...document.querySelectorAll('[data-site-nav-disclosure]')];
  const close = (button, restoreFocus = false) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    button.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    if (restoreFocus) button.focus();
  };
  disclosures.forEach(button => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    const open = () => {
      disclosures.filter(other => other !== button).forEach(other => close(other));
      button.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    };
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-expanded') === 'true') close(button);
      else open();
    });
    button.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      open();
      panel.querySelector('a[href]')?.focus();
    });
    button.parentElement.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (!button.parentElement.contains(document.activeElement)) close(button);
      });
    });
    document.addEventListener('pointerdown', event => {
      if (!button.parentElement.contains(event.target)) close(button);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openButton = disclosures.find(button => button.getAttribute('aria-expanded') === 'true');
    if (openButton) {
      event.preventDefault();
      close(openButton, true);
    }
  });
  window.addEventListener('resize', () => disclosures.forEach(button => close(button)));
})();
