// organiza.js (reemplaza el archivo existente)

// Horarios 12 am -> 11 pm
const horarios = [
  "12 am","1 am","2 am","3 am","4 am","5 am","6 am","7 am","8 am","9 am",
  "10 am","11 am","12 pm","1 pm","2 pm","3 pm","4 pm","5 pm","6 pm","7 pm",
  "8 pm","9 pm","10 pm","11 pm"
];

// Generar filas en la tabla al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tabla-horarios");
  if (!tbody) return;
  horarios.forEach(hora => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:700; width:120px;">${hora}</td>
      <td><input type="text" placeholder="" /></td>
      <td><input type="text" placeholder="" /></td>
      <td><input type="text" placeholder="" /></td>
      <td><input type="text" placeholder="" /></td>
      <td><input type="text" placeholder="" /></td>
    `;
    tbody.appendChild(tr);
  });
});

/**
 * Muestra un mensaje bonito en pantalla y desaparece solo.
 * @param {string} texto
 */
function showMessage(texto) {
  const box = document.createElement("div");
  box.innerHTML = texto;
  // Estilos inline para no tener que tocar el CSS
  Object.assign(box.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(135deg, rgba(255,182,193,0.95), rgba(255,153,204,0.95))",
    color: "#5a0033",
    padding: "22px 26px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    fontFamily: "'Pacifico', 'Dancing Script', cursive, sans-serif",
    fontSize: "20px",
    zIndex: 9999,
    textAlign: "center",
    opacity: "0",
    transition: "opacity 0.35s, transform 0.35s"
  });
  document.body.appendChild(box);
  // animar entrada
  requestAnimationFrame(() => {
    box.style.opacity = "1";
    box.style.transform = "translate(-50%, -50%) scale(1)";
  });
  // desaparición automática
  setTimeout(() => {
    box.style.opacity = "0";
    box.style.transform = "translate(-50%, -50%) scale(0.9)";
    box.addEventListener("transitionend", () => box.remove(), { once: true });
  }, 2200);
}

/**
 * Genera y descarga el archivo Word.
 * Intentará crear .docx con 'docx' si está disponible.
 * Si falla, creará un .doc (HTML convertido) como fallback.
 */
async function generarWord() {
  // Recolectar datos
  const semana = document.getElementById("semana")?.value?.trim() || "Mi_semana";
  const filas = Array.from(document.querySelectorAll("table tbody tr"));

  // Preparar matriz de datos: cada fila -> array de strings (hora + 5 dias)
  const datos = filas.map(tr => {
    const tds = Array.from(tr.querySelectorAll("td"));
    return tds.map((td, i) => {
      if (i === 0) return td.textContent.trim();
      const input = td.querySelector("input");
      return (input && input.value) ? input.value.trim() : "";
    });
  });

  // Intenta usar docx si está cargado
  if (window.docx && window.docx.Packer) {
    try {
      const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun } = window.docx;

      // Construir filas para docx
      const headerRow = new TableRow({
        children: [
          "Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"
        ].map(t => new TableCell({
          children: [ new Paragraph({ children:[ new TextRun({ text: t, bold: true }) ] }) ]
        }))
      });

      const docxRows = datos.map(row => new TableRow({
        children: row.map(cellText => new TableCell({
          children: [ new Paragraph({ children:[ new TextRun({ text: cellText || " " }) ] }) ]
        }))
      }));

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({ children: [ new TextRun({ text: `Agenda de la semana: ${semana}`, bold: true, size: 28 }) ] }),
            new Paragraph({ text: "" }),
            new Table({ rows: [headerRow, ...docxRows] })
          ]
        }]
      });

      const blob = await Packer.toBlob(doc);
      triggerDownload(blob, `Semana_${semana}.docx`);
      showMessage("Semana lista mi niña hermosa!! 💖");
      return;
    } catch (err) {
      // Si algo falla con docx, seguimos a fallback
      console.error("Error generando .docx con docx lib:", err);
    }
  }

  // FALLBACK: generar un .doc (HTML) — Word lo abre sin problema
  try {
    const html = buildHTMLDoc(semana, datos);
    const blob = new Blob([html], { type: "application/msword" });
    triggerDownload(blob, `Semana_${semana}.doc`);
    showMessage("Semana lista mi niña hermosa!! 💖");
  } catch (err) {
    console.error("Error generando fallback .doc:", err);
    alert("Ups! No se pudo generar el archivo. Revisa la consola para más detalles.");
  }
}

/**
 * Crea el HTML usado en el fallback .doc
 * @param {string} semana
 * @param {Array<Array<string>>} datos
 */
function buildHTMLDoc(semana, datos) {
  const styles = `
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #aaa; padding: 6px 8px; text-align: left; vertical-align: top; }
      th { background: #ffcce6; font-weight: bold; }
      h1 { color: #c2185b; }
    </style>
  `;
  const header = `<h1>Agenda de la semana: ${semana}</h1>`;
  const thead = `<tr>
    <th>Hora</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th>
  </tr>`;
  const rowsHtml = datos.map(row => {
    const cells = row.map((c, i) => `<td>${escapeHtml(c)}</td>`).join("");
    return `<tr>${cells}</tr>`;
  }).join("\n");

  return `<!doctype html><html><head><meta charset="utf-8">${styles}</head><body>${header}<table>${thead}${rowsHtml}</table></body></html>`;
}

/** Escapa html simple */
function escapeHtml(s) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Fuerza la descarga del blob con filename */
function triggerDownload(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Liberar URL tras un rato
  setTimeout(() => URL.revokeObjectURL(link.href), 1000 * 60);
}

function irHome() {
  window.location.href = "../MenuPrincipal/home.html";
}
