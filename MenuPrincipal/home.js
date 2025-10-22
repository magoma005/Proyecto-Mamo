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
// Cuenta regresiva al 24 de Noviembre
// ====================
const contador = document.getElementById("contador");
const fechaObjetivo = new Date(new Date().getFullYear(), 10, 24, 0, 0, 0); 
// Mes 10 = Noviembre (0 = Enero)

function mostrarPopup24N() {
  document.getElementById("popup24N").style.display = "flex";
}

function cerrarPopup24N() {
  document.getElementById("popup24N").style.display = "none";
}

function actualizarCuenta() {
  const ahora = new Date();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    contador.innerHTML = "💜 ¡Hoy es nuestro 24 de Noviembre! 💜";
    mostrarPopup24N(); // 👉 abre el pop-up sorpresa
    clearInterval(intervaloCuenta);
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  contador.innerHTML = `Faltan ${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

actualizarCuenta(); 
const intervaloCuenta = setInterval(actualizarCuenta, 1000);


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

function abrirEvento(event) {
  event.preventDefault();
  window.location.href = "../Evento/event.html"; // o la ruta correcta de tu página del evento
}

