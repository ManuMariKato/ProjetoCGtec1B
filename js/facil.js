const questions = [
    {
        question: "Complete a sequência numérica: <br> 2, …, …, 8, …, …, 14, …",
        answers: [
            {id: 1, text: "4, 6, …, 10, 12, …, 16 ", correct:true},
            {id: 2, text: "6, 7, …, 12, 13, …, 17", correct:false},
            {id: 3, text: "5, 7, …, 9, 10, …, 15", correct:false},
            {id: 4, text: "4, 5, …, 12, 15, …, 18", correct:false}
        ]

    },
    {
        question: "Complete a sequência: <br> 0, …, 8, …, 16, …, …, 28",
        answers: [
            {id: 1, text: "4, …, 10, …, 20, 26, …", correct:false},
            {id: 2, text: "5, …, 9, …,  17, 21, …", correct:false},
            {id: 3, text: "4, …, 12, …, 20, 24, …", correct:true},
            {id: 4, text: "6, …, 12, …, 18, 24, …", correct:false}
        ]

    },
    {
        question: "Seguindo o padrão da sequência numérica, qual o próximo número correspondente na sequência abaixo: <br> (37, 31, 29, 23, 19, 17, …)",
        answers: [
            {id: 1, text: "15", correct:false},
            {id: 2, text: "16", correct:false},
            {id: 3, text: "11", correct:true},
            {id: 4, text: "13", correct:false}
        ]

    },
    {
        question: "Complete a Sequencia a seguir<br> 4, 5, 11, 19, 29, 41, _ ",
        answers: [
            {id: 1, text: "48", correct:false},
            {id: 2, text: "51", correct:false},
            {id: 3, text: "55", correct:true},
            {id: 4, text: "59", correct:false}
        ]

    },
    {
        question: "Qual é o próximo termo da sequência numérica: <br> 1, 4, 9, 16, ? ",
        answers: [
            {id: 1, text: "21", correct:false},
            {id: 2, text: "49", correct:true},
            {id: 3, text: "35", correct:false},
            {id: 4, text: "25", correct:false}
        ]

    },
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
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
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
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