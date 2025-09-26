const questions = [
    {
        question: "Complete a sequência numérica: <br> … , 4, 6, 9, … , 18, 24, … , 39, … , 58",
        answers: [
            {id: 1, text: "A) 3, …, …, …, 13, …, …, 31, …, 48, … ", correct:true},
            {id: 2, text: "B) 1, …, …, …, 10, …, …, 25, …, 57, … ", correct:false},
            {id: 3, text: "C) 2, …, …, …, 12, …, …, 35, …, 50, … ", correct:false},
            {id: 4, text: "D) 2, …, …, …, 14, …, …, 28, …, 50, … ", correct:false}
        ]

    },
    {
        question: "Complete a sequência numérica: <br> 5, 11, … , 29, 41, …",
        answers: [
            {id: 1, text: "A) …, …, 17, …, …, 47 ", correct:false},
            {id: 2, text: "B) …, …, 15, …, …, 45 ", correct:false},
            {id: 3, text: "C) …, …, 19, …, …, 55 ", correct:true},
            {id: 4, text: "D) …, …, 20, …, …, 45 ", correct:false}
        ]

    },
    {
        question: "Seguindo o padrão da sequência numérica, qual o próximo número correspondente na sequência abaixo: <br> 1, 2, 6, 16, 44, 120, …",
        answers: [
            {id: 1, text: "A) 420", correct:false},
            {id: 2, text: "B) 328", correct:true},
            {id: 3, text: "C) 166", correct:false},
            {id: 4, text: "D) 240", correct:false}
        ]

    },
    {
        question: "Seguindo o padrão da sequência numérica, qual o número que falta na sequência abaixo: <br> 4, 16, … , 65536",
        answers: [
            {id: 1, text: "A) 256", correct:true},
            {id: 2, text: "B) 1600", correct:false},
            {id: 3, text: "C) 365", correct:false},
            {id: 4, text: "D) 636", correct:false}
        ]

    },
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const impossibleButton = document.getElementById("botao_impossivel");


let currentQuestionIndex = 0;
let score = 0;

document.getElementById("botao_menu").addEventListener = ("click", clickInicio);

function clickInicio(){
  let confirmar = confirm("Deseja realmente sair?");
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próximo";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    button.dataset.id = answer.id;

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  impossibleButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.filter((answer) => answer.correct == true)[0];
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
  impossibleButton.style.display = "block";
  impossibleButton.link("impossivel.html")
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});



startQuiz();