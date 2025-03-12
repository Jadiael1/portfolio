"use strict";

/* -------------- Botão "voltar ao topo" -------------- */
const backToTopBtn = document.querySelector("#backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("jjs:opacity-0", "jjs:invisible");
  } else {
    backToTopBtn.classList.add("jjs:opacity-0", "jjs:invisible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* -------------- Formulário de contato -------------- */
const contactForm = document.querySelector("#form-contact");
contactForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const name = formData.get("nome");
  const phone = encodeURIComponent(formData.get("phone"));
  const email = formData.get("email");
  const message = formData.get("mensagem");
  const messageTemplate = encodeURIComponent(`Estou entrando em contato a partir do seu portifolio\nMeu Nome: ${name}\nMeu E-mail: ${email}\nMensagem:\n${message}`);
  const action = `${evt.target.action}?phone=${phone}&text=${messageTemplate}`;
  window.open(action, "_blank", "noopener,noreferrer");
});

/* -------------- Mensagem de boas-vindas no console -------------- */
console.log(
  `
%c👋 Olá!

%cVamos conversar!
Entre em contato: 
E-mail: jadiael1@gmail.com
WhatsApp: 5581995207789
`,
  "font-size: 20px; font-weight: bold;",
  "font-size: 16px;"
);

const logo = document.querySelector("#logo");
logo.addEventListener("click", (evt) => {
  evt.preventDefault();
  const clicksAttribute = evt.target.getAttribute("clicks");
  if (clicksAttribute === "4") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.3 },
    });
    evt.target.removeAttribute("clicks");
    return;
  }
  evt.target.setAttribute("clicks", Number(clicksAttribute) + 1);
});
