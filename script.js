
// PIXEL GRAPHIC STUDIO

// Reemplazá este número por tu WhatsApp.
// Argentina: 549 + código de área + número.
// Sin +, espacios, guiones ni el 15.
const WHATSAPP_NUMBER = "5492235068882";

// Generar enlace de WhatsApp
function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Botón flotante
const whatsappFloat = document.getElementById("whatsappFloat");

whatsappFloat.href = whatsappUrl(
  "Hola! Quiero consultar por los servicios de Pixel Graphic Studio."
);

whatsappFloat.target = "_blank";
whatsappFloat.rel = "noopener noreferrer";

// Menú para celulares
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Seleccionar automáticamente el servicio al hacer clic
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const service = link.dataset.service;
    const select = document.getElementById("service");

    const option = [...select.options].find(
      item => item.text.toLowerCase() === service.toLowerCase()
    );

    if (option) {
      select.value = option.value;
    }
  });
});

// Formulario de contacto
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "TU_NUMERO") {
  alert("Primero configurá tu número de WhatsApp en script.js");
  return;
}

  const data = new FormData(contactForm);

  const name = data.get("name").trim();
  const business = data.get("business").trim() || "No especificado";
  const service = data.get("service");
  const message = data.get("message").trim() || "Quisiera recibir información.";

  const text = `Hola! Soy ${name}.
Mi negocio: ${business}.
Me interesa: ${service}.
Consulta: ${message}

Llegué desde la web de Pixel Graphic Studio.`;

  window.open(
    whatsappUrl(text),
    "_blank",
    "noopener,noreferrer"
  );
});

// Año automático
document.getElementById("year").textContent = new Date().getFullYear();
