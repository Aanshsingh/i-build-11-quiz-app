/* ===================================================== 1. QUIZ DATA ===================================================== */ const questions =
  [
    {
      q: "Which language runs in the browser?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: 1,
    },
    {
      q: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: 1,
    },
    {
      q: "Which HTML tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: 1,
    },
    {
      q: "Which keyword declares a constant in JS?",
      options: ["var", "let", "const", "static"],
      answer: 2,
    },
    {
      q: "What is the result of 2 + '2' in JS?",
      options: ["4", "22", "NaN", "Error"],
      answer: 1,
    },
  ];
/* ===================================================== 2. QUIZ STATE ===================================================== */ let current = 0;
let score = 0;
let answered = false;
/* ===================================================== 3. GET ELEMENTS ===================================================== */ const $ =
  (id) => document.getElementById(id);
const qEl = $("question");
const optsEl = $("options");
const nextBtn = $("next");
/* ===================================================== 4. LOAD QUESTION ===================================================== */ function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  const data = questions[current];
  /* Question */ qEl.textContent = data.q;
  /* Counter */ $("counter").textContent =
    `Question ${current + 1} of ${questions.length}`;
  /* Score */ $("score").textContent = `Score: ${score}`;
  /* Progress */ $("progress").style.width =
    `${(current / questions.length) * 100}%`;
  /* Next button */ nextBtn.textContent =
    current === questions.length - 1 ? "See result" : "Next question";
  /* Clear old options */ optsEl.innerHTML = "";
  /* Create options */ data.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    /* Letter */ const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + index);
    /* Text */ const optionText = document.createElement("span");
    optionText.textContent = text;
    /* Add elements */ btn.appendChild(letter);
    btn.appendChild(optionText);
    /* Answer */ btn.onclick = () => selectAnswer(index);
    optsEl.appendChild(btn);
  });
}
/* ===================================================== 5. SELECT ANSWER ===================================================== */ function selectAnswer(
  chosen,
) {
  /* Prevent multiple answers */ if (answered) return;
  answered = true;
  const correct = questions[current].answer;
  const buttons = optsEl.querySelectorAll(".opt");
  /* Check answer */ if (chosen === correct) {
    score++;
    buttons[chosen].classList.add("correct");
  } else {
    buttons[chosen].classList.add("wrong");
    buttons[correct].classList.add("correct");
  }
  /* Disable every option */ buttons.forEach((button) => {
    button.disabled = true;
  });
  /* Update score */ $("score").textContent = `Score: ${score}`;
  /* Enable next */ nextBtn.disabled = false;
}
/* ===================================================== 6. NEXT QUESTION ===================================================== */ nextBtn.onclick =
  () => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  };
/* ===================================================== 7. SHOW RESULT ===================================================== */ function showResult() {
  $("quiz").classList.add("hidden");
  $("result").classList.remove("hidden");
  $("finalScore").textContent = `${score} / ${questions.length}`;
  const percentage = score / questions.length;
  if (percentage === 1) {
    $("message").textContent = "Perfect score! 🔥 Amazing work.";
  } else if (percentage >= 0.6) {
    $("message").textContent = "Good work! Review the ones you missed.";
  } else {
    $("message").textContent = "Keep practising and try again. 💪";
  }
}
/* ===================================================== 8. RESTART QUIZ ===================================================== */ $(
  "restart",
).onclick = () => {
  current = 0;
  score = 0;
  $("result").classList.add("hidden");
  $("quiz").classList.remove("hidden");
  loadQuestion();
};
/* ===================================================== 9. START QUIZ ===================================================== */ loadQuestion();

loadQuestion();