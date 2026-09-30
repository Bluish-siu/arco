/* ARCO — site behaviour */

// Contact details shown across the site. Replace the placeholders with real values.
const ARCO_CONTACT = {
  email: "hello@arco.example",
  phone: "+91 00000 00000",
  whatsapp: "910000000000", // digits only, with country code — used for wa.me links
  address: "India",
};

document.documentElement.classList.remove("no-js");

// Fill contact placeholders
document.querySelectorAll("[data-contact]").forEach((el) => {
  const key = el.dataset.contact;
  const value = ARCO_CONTACT[key];
  if (!value) return;
  if (el.tagName === "A") {
    if (key === "email") el.href = `mailto:${value}`;
    if (key === "phone") el.href = `tel:${value.replace(/\s/g, "")}`;
    if (key === "whatsapp") el.href = `https://wa.me/${value}`;
  }
  // Text goes into a [data-contact-text] child if present, otherwise into a plain-text element
  const target = el.querySelector("[data-contact-text]") || (el.children.length ? null : el);
  if (target) target.textContent = value;
});

// Sticky header shadow
const header = document.querySelector(".site-header");
const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile nav
const toggle = document.querySelector(".menu-toggle");
toggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector("use")?.setAttribute("href", `assets/icons.svg#${open ? "close" : "menu"}`);
});

// Dropdown (click for touch / keyboard)
document.querySelectorAll(".has-menu > button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const li = btn.parentElement;
    const open = li.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
});
document.addEventListener("click", (e) => {
  document.querySelectorAll(".has-menu.open").forEach((li) => {
    if (!li.contains(e.target)) {
      li.classList.remove("open");
      li.querySelector("button")?.setAttribute("aria-expanded", "false");
    }
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".has-menu.open").forEach((li) => li.classList.remove("open"));
  document.body.classList.remove("nav-open");
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// Footer year
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Contact form: pre-select interest from ?product=, then hand off to email or WhatsApp
const form = document.querySelector("#contact-form");
if (form) {
  const wanted = new URLSearchParams(location.search).get("product");
  if (wanted) {
    const box = form.querySelector(`input[name="interest"][value="${CSS.escape(wanted)}"]`);
    if (box) box.checked = true;
  }

  const compose = () => {
    const data = new FormData(form);
    const interests = data.getAll("interest").join(", ") || "Not specified";
    return [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "-"}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Email: ${data.get("email")}`,
      `Business type: ${data.get("type")}`,
      `Interested in: ${interests}`,
      "",
      data.get("message") || "",
    ].join("\n");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const subject = encodeURIComponent(`ARCO enquiry — ${new FormData(form).get("company") || new FormData(form).get("name")}`);
    window.location.href = `mailto:${ARCO_CONTACT.email}?subject=${subject}&body=${encodeURIComponent(compose())}`;
    form.classList.add("sent");
  });

  form.querySelector("[data-send-whatsapp]")?.addEventListener("click", () => {
    if (!form.reportValidity()) return;
    window.open(`https://wa.me/${ARCO_CONTACT.whatsapp}?text=${encodeURIComponent(compose())}`, "_blank", "noopener");
    form.classList.add("sent");
  });
}
