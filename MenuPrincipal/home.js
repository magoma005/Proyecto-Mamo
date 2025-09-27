// ====================
// Funciones Pop-up Normal
// ====================
function mostrarPopup() {
  document.getElementById("popup").style.display = "flex";
}

function cerrarPopup() {
  document.getElementById("popup").style.display = "none";
}

// ====================
// Pop-up "meamo"
// ====================
function mostrarPopupMeamo() {
  const popup = document.getElementById("popupMeamo");
  const video = document.getElementById("videoMeamo");
  const message = document.getElementById("finalMessage");

  popup.style.display = "flex";
  message.style.display = "none"; // oculta mensaje al inicio
  video.currentTime = 0; // reinicia el video
  video.play();

  video.onended = function() {
    message.style.display = "block";
  };
}

function cerrarPopupMeamo() {
  const popup = document.getElementById("popupMeamo");
  const video = document.getElementById("videoMeamo");
  popup.style.display = "none";
  video.pause();
}

// ====================
// Pop-up "amor"
// ====================
function mostrarPopupAmor() {
  const popup = document.getElementById("popupAmor");
  popup.style.display = "flex";
}

function cerrarPopupAmor() {
  const popup = document.getElementById("popupAmor");
  popup.style.display = "none";
}

// ====================
// Easter Egg "tony"
// ====================
function activarTony() {
  window.location.href = "tony.html";
}

// ====================
// Pop-up "fini"
// ====================
function mostrarPopupFini() {
  const popup = document.getElementById("popupFini");
  popup.style.display = "flex";
}

function cerrarPopupFini() {
  const popup = document.getElementById("popupFini");
  popup.style.display = "none";
}

// ====================
// Pop-up "yoda"
// ====================
function mostrarPopupYoda() {
  const popup = document.getElementById("popupYoda");
  popup.style.display = "flex";
}

function cerrarPopupYoda() {
  const popup = document.getElementById("popupYoda");
  popup.style.display = "none";
}

// ====================
// Pop-up "canelita"
// ====================
function mostrarPopupCanelita() {
  const popup = document.getElementById("popupCanelita");
  popup.style.display = "flex";
}

function cerrarPopupCanelita() {
  const popup = document.getElementById("popupCanelita");
  popup.style.display = "none";
}

// ====================
// Pop-up "kurt"
// ====================
function mostrarPopupKurt() {
  const popup = document.getElementById("popupKurt");
  popup.style.display = "flex";
}

function cerrarPopupKurt() {
  const popup = document.getElementById("popupKurt");
  popup.style.display = "none";
}

// ====================
// Pop-up "andre"
// ====================
function mostrarPopupAndre() {
  const popup = document.getElementById("popupAndre");
  popup.style.display = "flex";
}

function cerrarPopupAndre() {
  const popup = document.getElementById("popupAndre");
  popup.style.display = "none";
}

// ====================
// Pop-up "Mamor te necesito"
// ====================
emailjs.init("SrqUEnG3AFFI-FgLO");

function mostrarPopupMamor(event) {
  if (event) event.preventDefault();
  document.getElementById("popupMamor").style.display = "flex";
}

function cerrarPopupMamor() {
  document.getElementById("popupMamor").style.display = "none";
}

function enviarCorreoMamor() {
  const mensaje = document.getElementById("mensajeMamor").value.trim();
  if (mensaje === "") {
    alert("Por favor escribe algo antes de enviar 💌");
    return;
  }

emailjs.send("service_a8urice", "template_d36xvan", {
  name: "Tu mamor",  // coincide con {{name}} en la plantilla
  message: mensaje
})

  .then(() => {
    alert("Correo enviado a Mamor ❤️");
    document.getElementById("mensajeMamor").value = ""; 
    cerrarPopupMamor();
  })
  .catch(err => {
    console.error(err);
    alert("Ups! Ocurrió un error al enviar 😢");
  });
}

// ====================
// Detector actualizado de teclas
// ====================
let buffer = "";

document.addEventListener("keydown", function(e) {
  buffer += e.key.toLowerCase();
  if (buffer.length > 8) buffer = buffer.slice(-8);

  if (buffer.endsWith("meamo")) { mostrarPopupMeamo(); buffer = ""; }
  if (buffer.endsWith("tony")) { activarTony(); buffer = ""; }
  if (buffer.endsWith("amor")) { mostrarPopupAmor(); buffer = ""; }
  if (buffer.endsWith("fini")) { mostrarPopupFini(); buffer = ""; }
  if (buffer.endsWith("yoda")) { mostrarPopupYoda(); buffer = ""; }
  if (buffer.endsWith("canelita")) { mostrarPopupCanelita(); buffer = ""; }
  if (buffer.endsWith("kurt")) { mostrarPopupKurt(); buffer = ""; }
  if (buffer.endsWith("andre")) { mostrarPopupAndre(); buffer = ""; }
});
