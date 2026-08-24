document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");

  if (menuButton && menu) {
    const desktopMenuQuery = window.matchMedia("(min-width: 1024px)");

    const closeMenu = ({ returnFocus = false } = {}) => {
      menu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
      document.body.classList.remove("menu-open");

      if (returnFocus) {
        menuButton.focus();
      }
    };

    const openMenu = () => {
      menu.hidden = false;
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "メニューを閉じる");
      document.body.classList.add("menu-open");
      menu.querySelector("a")?.focus();
    };

    const syncMenuMode = () => {
      if (desktopMenuQuery.matches) {
        menu.hidden = false;
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "メニューを開く");
        document.body.classList.remove("menu-open");
        return;
      }

      closeMenu();
    };

    syncMenuMode();
    desktopMenuQuery.addEventListener("change", syncMenuMode);

    menuButton.addEventListener("click", () => {
      if (desktopMenuQuery.matches) {
        return;
      }

      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (!desktopMenuQuery.matches) {
          closeMenu();
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (event.key === "Escape" && isOpen) {
        closeMenu({ returnFocus: true });
        return;
      }

      if (event.key === "Tab" && isOpen) {
        const focusableItems = [menuButton, ...menu.querySelectorAll("a")];
        const firstItem = focusableItems[0];
        const lastItem = focusableItems.at(-1);

        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
    });
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector("button[aria-controls]");
    const panel = button ? document.querySelector(`#${button.getAttribute("aria-controls")}`) : null;

    if (!button || !panel) {
      return;
    }

    button.setAttribute("aria-expanded", "false");
    panel.hidden = true;

    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(willOpen));
      panel.hidden = !willOpen;
    });
  });

  const form = document.querySelector("#reservation-form");
  const phoneInput = document.querySelector("#tel");
  const status = document.querySelector("#form-status");
  const complete = document.querySelector("#form-complete");
  const requiredFields = form ? [...form.querySelectorAll("[required]")] : [];

  const addDescription = (field, id) => {
    const ids = new Set((field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
    ids.add(id);
    field.setAttribute("aria-describedby", [...ids].join(" "));
  };

  const removeDescription = (field, id) => {
    const ids = (field.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter((value) => value && value !== id);

    if (ids.length) {
      field.setAttribute("aria-describedby", ids.join(" "));
    } else {
      field.removeAttribute("aria-describedby");
    }
  };

  const getFieldName = (field) => {
    if (field.id === "consent") {
      return "同意チェック";
    }

    const label = form?.querySelector(`label[for="${field.id}"]`);
    return label?.textContent.replace("必須", "").replace(/\s+/g, " ").trim() || "入力項目";
  };

  const setFieldValidityState = (field, showError) => {
    if (showError) {
      field.setAttribute("aria-invalid", "true");
      addDescription(field, "form-status");
      return;
    }

    field.removeAttribute("aria-invalid");
    removeDescription(field, "form-status");
  };

  const validatePhone = () => {
    if (!phoneInput) {
      return true;
    }

    phoneInput.setCustomValidity("");
    const normalizedPhone = phoneInput.value.replace(/[\s()\-]/g, "");
    const isValid = /^\+?\d{10,15}$/.test(normalizedPhone);

    if (phoneInput.value && !isValid) {
      phoneInput.setCustomValidity("電話番号は、10〜15桁の数字で入力してください。");
      return false;
    }

    return true;
  };

  const showFormResult = () => {
    if (!form || !complete || !status) {
      return;
    }

    validatePhone();

    if (!form.checkValidity()) {
      const firstInvalidField = requiredFields.find((field) => !field.validity.valid);
      requiredFields.forEach((field) => {
        setFieldValidityState(field, !field.validity.valid);
        removeDescription(field, "form-status");
      });

      if (firstInvalidField) {
        addDescription(firstInvalidField, "form-status");
      }

      const fieldName = firstInvalidField ? getFieldName(firstInvalidField) : "入力内容";
      status.textContent = `「${fieldName}」を確認してください。`;
      status.classList.add("is-error");
      form.reportValidity();
      firstInvalidField?.focus();
      return;
    }

    requiredFields.forEach((field) => setFieldValidityState(field, false));
    status.textContent = "";
    status.classList.remove("is-error");
    form.hidden = true;
    complete.hidden = false;
    complete.focus();
  };

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.setCustomValidity("");
    });

    phoneInput.addEventListener("blur", validatePhone);
  }

  requiredFields.forEach((field) => {
    const eventName = field.matches("select, input[type='checkbox']") ? "change" : "input";
    field.addEventListener(eventName, () => {
      if (field === phoneInput) {
        validatePhone();
      }

      if (field.validity.valid) {
        setFieldValidityState(field, false);
      }
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showFormResult();
    });
  }

  const floatingCta = document.querySelector(".floating-cta");
  const heroCta = document.querySelector(".hero .button");
  const reservation = document.querySelector("#reservation");

  if (floatingCta && heroCta && reservation && "IntersectionObserver" in window) {
    let isHeroCtaVisible = true;
    let isReservationVisible = false;
    let hasHeroObservation = false;
    let hasReservationObservation = false;

    const updateFloatingCta = () => {
      const hasInitialState = hasHeroObservation && hasReservationObservation;
      const shouldShow = hasInitialState && !isHeroCtaVisible && !isReservationVisible;
      floatingCta.classList.toggle("is-visible", shouldShow);
    };

    const heroCtaObserver = new IntersectionObserver(
      ([entry]) => {
        isHeroCtaVisible = entry.isIntersecting;
        hasHeroObservation = true;
        updateFloatingCta();
      },
      { threshold: 0 }
    );

    const reservationObserver = new IntersectionObserver(
      ([entry]) => {
        isReservationVisible = entry.isIntersecting;
        hasReservationObservation = true;
        updateFloatingCta();
      },
      { threshold: 0.05 }
    );

    heroCtaObserver.observe(heroCta);
    reservationObserver.observe(reservation);
  }
});
