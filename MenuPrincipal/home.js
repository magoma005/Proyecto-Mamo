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
  // Redirige a la página de terror
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
// Detector de secuencia de letras
// ====================
let buffer = "";

document.addEventListener("keydown", function(e) {
  buffer += e.key.toLowerCase();

  if (buffer.length > 6) buffer = buffer.slice(-6);

  if (buffer.endsWith("meamo")) {
    mostrarPopupMeamo();
    buffer = "";
  }

  if (buffer.endsWith("tony")) {
    activarTony();
    buffer = "";
  }

  if (buffer.endsWith("amor")) {
    mostrarPopupAmor();
    buffer = "";
  }

  if (buffer.endsWith("fini")) {
    mostrarPopupFini();
    buffer = "";
  }
});
