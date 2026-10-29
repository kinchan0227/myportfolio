document.querySelectorAll("[data-current-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-menu-toggle]").forEach((toggle) => {
  if (!(toggle instanceof HTMLButtonElement)) return;

  const header = toggle.closest(".header");
  const navigationId = toggle.getAttribute("aria-controls");
  const navigation = navigationId ? document.getElementById(navigationId) : null;

  if (!(header instanceof HTMLElement) || !(navigation instanceof HTMLElement)) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("header--menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    header.classList.toggle("header--menu-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
});

const skillsSection = document.querySelector("#skills");
const skillCards = skillsSection?.querySelectorAll(".skills__card");

if (skillsSection instanceof HTMLElement && skillCards?.length) {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    skillCards.forEach((card) => card.classList.add("is-visible"));
  } else {
    skillsSection.classList.add("skills--motion-ready");

    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    skillCards.forEach((card) => skillsObserver.observe(card));
  }
}

const contactForm = document.querySelector("#contact-form");
const contactFormStatus = document.querySelector("#contact-form-status");

if (
  contactForm instanceof HTMLFormElement &&
  contactFormStatus instanceof HTMLElement
) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent("お問い合わせ");
    const body = encodeURIComponent(
      `氏名：${name}\nメールアドレス：${email}\n\nお問い合わせ内容：\n${message}`,
    );

    contactFormStatus.textContent =
      "メールアプリを開きました。内容をご確認のうえ送信してください。";
    window.location.href = `mailto:car227na@gmail.com?subject=${subject}&body=${body}`;
  });
}