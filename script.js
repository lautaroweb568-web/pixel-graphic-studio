// =========================================
// PIXEL GRAPHIC STUDIO
// =========================================

// Número de WhatsApp.
// Argentina: 549 + código de área + número.
// Sin +, espacios, guiones ni el 15.
const WHATSAPP_NUMBER = "5492235068882";

// Generar enlace de WhatsApp
function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// -----------------------------------------
// Botón flotante de WhatsApp
// -----------------------------------------
const whatsappFloat = document.getElementById("whatsappFloat");

if (whatsappFloat) {
  whatsappFloat.href = whatsappUrl(
    "Hola! Quiero consultar por los servicios de Pixel Graphic Studio."
  );
  whatsappFloat.target = "_blank";
  whatsappFloat.rel = "noopener noreferrer";
}

// -----------------------------------------
// Menú para celulares
// -----------------------------------------
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

menuToggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    setMenu(false);
    menuToggle.focus();
  }
});

// Cerrar el menú si se agranda la pantalla
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) setMenu(false);
});

// -----------------------------------------
// Encabezado compacto al hacer scroll
// -----------------------------------------
const header = document.getElementById("header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// -----------------------------------------
// Resaltar la sección activa en el menú
// -----------------------------------------
const navLinks = [...nav.querySelectorAll("a:not(.nav-button)")];

const sections = navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);

          if (active) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(section => sectionObserver.observe(section));
}

// -----------------------------------------
// Animación de aparición al hacer scroll
// -----------------------------------------
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealTargets = document.querySelectorAll(
    ".section-heading, .service-card, .statement .section-container > *, " +
    ".portfolio-card, .portfolio-bottom, .process-item, .faq-item, " +
    ".contact-copy, .contact-form"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

// -----------------------------------------
// Seleccionar automáticamente el servicio al hacer clic
// -----------------------------------------
const serviceSelect = document.getElementById("service");

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const service = link.dataset.service.toLowerCase();

    const option = [...serviceSelect.options].find(
      item => item.text.trim().toLowerCase() === service
    );

    if (option) {
      serviceSelect.value = option.value || option.text;
      serviceSelect.classList.remove("invalid");
    }
  });
});

// -----------------------------------------
// Formulario de contacto
// -----------------------------------------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showStatus(text, type) {
  formStatus.textContent = text;
  formStatus.className = `form-status ${type || ""}`.trim();
}

// Quitar el aviso de error apenas la persona corrige el campo
contactForm.querySelectorAll("input, select, textarea").forEach(field => {
  field.addEventListener("input", () => field.classList.remove("invalid"));
  field.addEventListener("change", () => field.classList.remove("invalid"));
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "TU_NUMERO") {
    showStatus("Falta configurar el número de WhatsApp en script.js.", "error");
    return;
  }

  const data = new FormData(contactForm);

  const name = (data.get("name") || "").toString().trim();
  const business = (data.get("business") || "").toString().trim() || "No especificado";
  const service = (data.get("service") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim() || "Quisiera recibir información.";

  // Validación con mensajes claros
  const nameField = contactForm.elements.name;
  const serviceField = contactForm.elements.service;

  nameField.classList.toggle("invalid", !name);
  serviceField.classList.toggle("invalid", !service);

  if (!name) {
    showStatus("Contanos tu nombre para poder responderte.", "error");
    nameField.focus();
    return;
  }

  if (!service) {
    showStatus("Seleccioná qué servicio estás buscando.", "error");
    serviceField.focus();
    return;
  }

  const text = `Hola! Soy ${name}.
Mi negocio: ${business}.
Me interesa: ${service}.
Consulta: ${message}

Llegué desde la web de Pixel Graphic Studio.`;

  const url = whatsappUrl(text);
  const popup = window.open(url, "_blank", "noopener,noreferrer");

  // Si el navegador bloquea la ventana nueva, abrir en la misma pestaña
  if (!popup) {
    window.location.href = url;
  }

  showStatus("¡Listo! Te abrimos WhatsApp con tu consulta.", "ok");
  contactForm.reset();
});

// -----------------------------------------
// Año automático
// -----------------------------------------
document.querySelectorAll(".year").forEach(element => {
  element.textContent = new Date().getFullYear();
});
