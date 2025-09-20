function checkPassword() {
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Contraseña secreta
  const correctPassword = "amoamiandre";

  if (password === correctPassword) {
    window.location.href = "../MenuPrincipal/home.html";
  } else {
    errorMessage.textContent = "Mmm... inténtalo otra vez, mi amor 💜";
  }
}
