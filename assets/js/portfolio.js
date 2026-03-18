const header = document.getElementById("site-header");
const navLinks = Array.from(document.querySelectorAll(".search-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

window.addEventListener("scroll", () => {
  if (window.scrollY > 24) {
    header.classList.add("compact");
  } else {
    header.classList.remove("compact");
  }
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  }
);

sections.forEach((section) => navObserver.observe(section));

const revealTargets = Array.from(document.querySelectorAll("[data-animate]"));
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const cards = Array.from(document.querySelectorAll(".project-card"));
cards.forEach((card) => {
  const images = (card.dataset.images || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const img = card.querySelector(".media img");
  const prev = card.querySelector(".carousel-btn.prev");
  const next = card.querySelector(".carousel-btn.next");

  if (!img || images.length < 2) {
    card.classList.remove("loading");
    return;
  }

  let index = 0;

  const render = () => {
    img.src = images[index];
  };

  prev?.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    render();
  });

  next?.addEventListener("click", () => {
    index = (index + 1) % images.length;
    render();
  });

  img.addEventListener("load", () => {
    card.classList.remove("loading");
  });

  window.setTimeout(() => {
    card.classList.remove("loading");
  }, 700);
});

const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.getAttribute("aria-controls");

    tabButtons.forEach((btn) => {
      const selected = btn === button;
      btn.classList.toggle("active", selected);
      btn.setAttribute("aria-selected", String(selected));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

const favButtons = Array.from(document.querySelectorAll(".fav"));
favButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const liked = btn.classList.toggle("liked");
    btn.textContent = liked ? "♥" : "♡";
  });
});
