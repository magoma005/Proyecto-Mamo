window.onload = async () => {
  // --- Secuencia de logos inicial ---
  const logos = [
    document.getElementById("logo1"),
    document.getElementById("logo2"),
    document.getElementById("logo3")
  ];

  for (const logo of logos) {
    logo.style.opacity = 1;
    await wait(1000);
    await wait(1000);
    logo.style.opacity = 0;
    await wait(1000);
  }

  // --- Mostrar contenido principal ---
  const main = document.getElementById("main-content");
  const intro = document.getElementById("intro");
  const mainLogo = document.getElementById("main-logo");
  intro.style.display = "none";
  main.classList.remove("hidden");

  document.body.style.overflowY = "auto";
  await wait(200);
  main.style.opacity = 1;

  // --- Mostrar logo principal ---
  await wait(800);
  mainLogo.classList.add("visible");

  // --- Crear cuadrículas dinámicamente ---
  await createGrid({ total: 24, availableUpTo: 5 });

  // --- Animar aparición de portadas ---
  const items = document.querySelectorAll(".grid-item");
  let delay = 0;
  for (const item of items) {
    setTimeout(() => item.classList.add("visible"), delay);
    delay += 100;
  }
};

// --- Función de espera ---
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Verificar si existe una imagen ---
async function checkImageExists(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

// --- Crear el grid de portadas dinámicamente ---
async function createGrid({ total = 24, availableUpTo = 5 } = {}) {
  const grid = document.getElementById("grid-container");
  grid.innerHTML = ""; // limpiar antes de generar

  for (let i = 1; i <= total; i++) {
    const src = `portada${i}.jpg`;
    const exists = await checkImageExists(src);

    if (!exists) {
      console.warn(`⚠️ Imagen no encontrada: ${src}, se omite.`);
      continue;
    }

    // Crear item y su imagen
    const div = document.createElement("div");
    div.className = "grid-item";
    div.setAttribute("data-available", i <= availableUpTo ? "true" : "false");

    const img = document.createElement("img");
    img.id = `portada${i}`;
    img.src = src;
    img.alt = `Historia ${i}`;

    div.appendChild(img);
    grid.appendChild(div);
  }

  // --- Añadir listeners a cada portada ---
  const validItems = document.querySelectorAll(".grid-item");
  if (validItems.length === 0) {
    console.warn("No hay portadas válidas en el grid.");
    return;
  }

  validItems.forEach(item => {
    const img = item.querySelector("img");
    if (!img) return;

    const match = img.id.match(/portada(\d+)/);
    if (!match) return;

    const num = parseInt(match[1], 10);
    const available = item.getAttribute("data-available") === "true";

    item.addEventListener("click", (e) => {
      e.stopPropagation();

      if (available) {
        const historiaNum = num - 1; // portada1 -> historia0
        console.log(`🟢 Abriendo historia${historiaNum}.html`);
        window.location.href = `historia${historiaNum}.html`;
      } else {
        alert("🚧 Este capítulo aún no está disponible.");
      }
    });
  });
}

// --- Botón volver al menú principal ---
const btnVolver = document.getElementById("btn-volver");
if (btnVolver) {
  btnVolver.addEventListener("click", () => {
    window.location.href = "../MenuPrincipal/home.html";
  });
}

