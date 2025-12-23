// --- Hamburger menu ---
const hamburger = document.getElementById("hamburger");
const header = document.querySelector(".site-header");
hamburger.addEventListener("click", () => header.classList.toggle("nav-open"));

// --- Program keahlian interactions ---
const progItems = document.querySelectorAll(".prog-item");
const progPanels = document.querySelectorAll(".prog-panel");

function resetStudentCount(panel) {
  const spans = panel.querySelectorAll(".student-count");
  spans.forEach((s) => (s.textContent = "0"));
}

function typeNumber(el, target) {
  el.textContent = "";
  const s = String(target);
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += s[i++];
    if (i >= s.length) clearInterval(iv);
  }, 70);
}

progItems.forEach((item) => {
  item.addEventListener("click", () => {
    progItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    const target = item.dataset.target;
    progPanels.forEach((p) => {
      p.classList.remove("show");
    });
    const panel = document.getElementById(target);
    if (panel) {
      panel.classList.add("show");
      // run typing animation for number inside panel
      const countEl = panel.querySelector(".student-count");
      if (countEl) {
        const targetNum = countEl.dataset.count || countEl.textContent || "0";
        typeNumber(countEl, targetNum);
      }
    }
  });
});

// open first program by default
if (progItems.length) {
  progItems[0].click();
}

// --- Prestasi modal ---
const cards = document.querySelectorAll(".card");
const prestModal = document.getElementById("prestasiModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");
const closePrestasi = document.getElementById("closePrestasi");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.dataset.title || "";
    const desc = card.dataset.desc || "";
    const img = card.dataset.img || "";
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    if (img) {
      modalImg.src = img;
      modalImg.style.display = "block";
    } else {
      modalImg.style.display = "none";
    }
    prestModal.classList.add("show");
  });
});

closePrestasi.addEventListener("click", () =>
  prestModal.classList.remove("show")
);
prestModal.addEventListener("click", (e) => {
  if (e.target === prestModal) prestModal.classList.remove("show");
});

// --- Fasilitas interactions ---
const facThumbs = document.querySelectorAll(".fac-thumb");
const facDisplay = document.getElementById("facDisplay");

facThumbs.forEach((t) => {
  t.addEventListener("click", () => {
    const img = t.dataset.img;
    const desc = t.dataset.desc;
    facDisplay.innerHTML =
      `<div style=\"text-align:left;max-width:520px;\">` +
      `<img src=\"${img}\" alt=\"fasilitas\" style=\"width:100%;border-radius:8px;margin-bottom:12px;\">` +
      `<div style=\"font-weight:700;margin-bottom:6px;\">${t.textContent}</div>` +
      `<div style=\"color:#475569;\">${desc}</div>` +
      `</div>`;
  });
});

// ensure images that might not exist show placeholder
function safeImage(imgSelector, placeholder) {
  const imgs = document.querySelectorAll(imgSelector);
  imgs.forEach((im) => {
    im.addEventListener("error", () => {
      im.src = placeholder;
      im.style.opacity = 0.6;
    });
  });
}
safeImage(
  "img",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23e2e8f0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23737474' font-size='18'>gambar tidak tersedia</text></svg>"
);

// keyboard accessibility: allow Enter on items
document.querySelectorAll(".prog-item, .fac-thumb, .card").forEach((el) => {
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") el.click();
  });
});
