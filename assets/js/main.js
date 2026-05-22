(function () {
  const nav = document.querySelector("nav");
  const progress = document.querySelector(".scroll-progress");
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector(".nav-links");
  const sections = [...document.querySelectorAll("section[id]")];
  const statEls = document.querySelectorAll("[data-count]");

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const savedTheme = localStorage.getItem("patricia-theme");
  document.body.dataset.theme = savedTheme || (prefersLight ? "light" : "dark");

  function setTheme(next) {
    document.body.dataset.theme = next;
    localStorage.setItem("patricia-theme", next);
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", next === "light" ? "Ativar tema escuro" : "Ativar tema claro");
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = document.body.dataset.theme === "light" ? "dark" : "light";
      setTheme(next);
    });
  }

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${(y / max) * 100}%` : "0%";
    }

    let current = sections[0]?.id || "";
    sections.forEach((section) => {
      if (y >= section.offsetTop - 120) current = section.id;
    });
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const tick = () => {
          current += step;
          if (current >= target) {
            el.textContent = `${target}${suffix}`;
            return;
          }
          el.textContent = `${current}${suffix}`;
          requestAnimationFrame(tick);
        };
        tick();
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  statEls.forEach((el) => observer.observe(el));

  const modal = document.getElementById("cert-modal");
  const modalImg = modal?.querySelector("img");
  const modalTitle = modal?.querySelector(".modal-title");
  const modalDesc = modal?.querySelector(".modal-desc");

  document.querySelectorAll("[data-cert]").forEach((card) => {
    card.addEventListener("click", () => {
      if (!modal || !modalImg) return;
      modalImg.src = card.dataset.src;
      modalImg.alt = card.dataset.title || "Certificado";
      if (modalTitle) modalTitle.textContent = card.dataset.title || "";
      if (modalDesc) modalDesc.textContent = card.dataset.desc || "";
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  modal?.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("open")) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
})();
