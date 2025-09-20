const quizData = [
  {
    question: "¿Cuándo empezamos a ser novios?",
    answers: {
      a: "24 de Noviembre",
      b: "28 de Mayo",
      c: "18 de Enero",
      d: "27 de Enero"
    },
    correct: "a"
  },
  {
    question: "¿Cuál fue nuestra primera salida?",
    answers: {
      a: "Cine",
      b: "Parque",
      c: "Ir a mirar maquillaje",
      d: "En nuestras casas"
    },
    correct: "c"
  },
  {
    question: "¿Cuál es NUESTRA CANCION?",
    answers: {
      a: "En Algun Lugar",
      b: "All of Me",
      c: "Tu Veneno",
      d: "Photograph"
    },
    correct: "a"
  },
  {
    question: "¿Qué película vimos juntos primero en el cine?",
    answers: {
      a: "Guardianes de la Galaxia Vol 3",
      b: "Mario Bros",
      c: "Thunderbolts",
      d: "Indiana Jones y el dial del destino"
    },
    correct: "b"
  },
  {
    question: "¿Dónde nos dimos el primer pico?",
    answers: {
      a: "Tu Casa",
      b: "Mi Casa",
      c: "Cine",
      d: "En el OXXO"
    },
    correct: "c"
  },
  {
    question: "Donde nos hicimos novios?",
    answers: {
      a: "Cafe de Laureles",
      b: "Parque de la Vida",
      c: "Mi Casa",
      d: "Molino Rojo"
    },
    correct: "d"
  },
  {
    question: "¿Cuando fue nuestra primera vez?",
    answers: {
      a: "11 de Diciembre",
      b: "12 de Diciembre",
      c: "9 de Diciembre",
      d: "30 de Diciembre"
    },
    correct: "a"
  },
  {
    question: "Cual es el videojuego que mas hemos jugado juntos?",
    answers: {
      a: "Mortal Kombat 9",
      b: "Roblox",
      c: "Lego Batman",
      d: "Saw II: Flesh & Blood"
    },
    correct: "a"
  },
  {
    question: "¿Qué apodo usamos más?",
    answers: {
      a: "Amor",
      b: "Mamor",
      c: "Wawi",
      d: "Todas son tecnicamente correctas"
    },
    correct: "d"
  },
  {
    question: "¿Como se llamo nuestra primera mascota virtual?",
    answers: {
      a: "Canelita",
      b: "Capuchino",
      c: "Kathe 2",
      d: "Leon"
    },
    correct: "a"
  }
];

// Renderizar preguntas
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");

function buildQuiz() {
  const output = [];

  quizData.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter}: ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    output.push(
      `<div class="question">${currentQuestion.question}</div>
      <div class="answers">${answers.join("")}</div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let score = 0;

  quizData.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correct) {
      score++;
    }
  });

  let message = "";
  if (score === 10) {
    message = "💖 10/10 — Te invitaré a algo especial 💖";
  } else if (score >= 8) {
    message = "✨ " + score + "/10 — Cerca, pero te invitaré a algo";
  } else if (score >= 5) {
    message = "😏 " + score + "/10 — Hmmm...";
  } else if (score === 3) {
    message = "🤨 3/10 — ¿Lo respondiste al azar para probarlo, no?";
  } else if (score === 1) {
    message = "😂 1/10 — Imagino que es la fecha de aniversario, ¿no?";
  } else if (score === 0) {
    message = "💔 0/10 — Ouch!";
  } else {
    message = score + "/10 — Sigue intentando 😅";
  }

  resultContainer.innerHTML = message;
}

buildQuiz();
submitButton.addEventListener("click", showResults);
