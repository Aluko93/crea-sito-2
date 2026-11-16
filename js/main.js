"use strict";
// Imposta una vera email PRIMA di pubblicare il sito (esempio: info@tuodominio.it).
const EMAIL_DESTINATARIO = "creailtuositoweb22@gmail.com";

const nav = document.getElementById("nav");
const toggle = document.querySelector(".menu-toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const opened = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(opened));
    toggle.setAttribute("aria-label", opened ? "Chiudi il menu" : "Apri il menu");
    nav.classList.toggle("open", opened);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri il menu");
  }));
}

document.getElementById("year").textContent = new Date().getFullYear();

const dialog = document.getElementById("preview-dialog");
const previewImg = document.getElementById("preview-image");
const previewTitle = document.getElementById("preview-title");
document.querySelectorAll("[data-preview]").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.preview;
    const title = button.closest(".example-card")?.querySelector("h3")?.textContent || "Sito";
    if (!/^(ristorante|hotel|ecommerce|architettura|fitness|artigiani)$/.test(name)) return;
    previewTitle.textContent = `Anteprima: ${title}`;
    previewImg.src = `immagini/anteprime/${name}.webp`;
    previewImg.alt = `Anteprima ingrandita: ${title}`;
    dialog.showModal();
  });
});
document.getElementById("close-preview").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

document.querySelectorAll("[data-plan]").forEach(link => link.addEventListener("click", () => {
  const sel = document.getElementById("tipo");
  sel.value = link.dataset.plan;
}));

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", event => {
  event.preventDefault();
  status.classList.remove("error");
  if (!form.reportValidity()) return;
  if (!EMAIL_DESTINATARIO || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EMAIL_DESTINATARIO)) {
    status.textContent = "Il contatto email non è ancora configurato. Inserisci il tuo indirizzo in js/main.js prima di pubblicare il sito.";
    status.classList.add("error");
    return;
  }
  const data = new FormData(form);
  const nome = String(data.get("nome") || "").trim();
  const email = String(data.get("email") || "").trim();
  const tipo = String(data.get("tipo") || "Da definire");
  const messaggio = String(data.get("messaggio") || "").trim();
  const subject = encodeURIComponent(`Richiesta preventivo sito web — ${nome}`);
  const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\nTipo di progetto: ${tipo}\n\nMessaggio:\n${messaggio}\n`);
  const a = document.createElement("a");
  a.href = `mailto:${EMAIL_DESTINATARIO}?subject=${subject}&body=${body}`;
  a.click();
  status.textContent = "Si è aperta la tua applicazione email: controlla il messaggio e premi Invia. Se non si è aperta, usa il tuo programma di posta per scriverci.";
});
