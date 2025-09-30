const questions = [
    {
        question: " Qual é o próximo termo da sequência numérica: <br>  0, 1, 3, 7, 15, …",
        answers: [
            {id: 1, text: "A) 31", correct:true},
            {id: 2, text: "B) 19", correct:false},
            {id: 3, text: "C) 21", correct:false},
            {id: 4, text: "D) 27", correct:false}
        ]

    },
    {
        question: " Mantendo-se a regularidade da sequência numérica -3, 1, -5, 3, -7, 5, …, os dois próximos elementos dessa sequência serão, respectivamente:",
        answers: [
            {id: 1, text: "A) -10 e 6", correct:false},
            {id: 2, text: "B) -9 e 7", correct:true},
            {id: 3, text: "C) -11 e 5", correct:false},
            {id: 4, text: "D) -12 e 4", correct:false}
        ]

    }
    // {
    //     question: "3. Determine a soma dos próximos termos da sequência com ordem lógica: <br> 0, 2, 6, 2, 4, 12, 4, 6, 18, 6, …",
    //     //QUESTÃO DISSERTATIVA!!!!!!!!
    // },
    // {
    //     question: "4. Complete a Sequencia a seguir <br> 1, 2, 6, 16, 44, 120, _  ",
    //     //OUTRA DISSERTATIVA !!!!

    // },
    // {
    //     question: "5. Qual é o Próximo número? <br> 3, 13, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, _ ",
    //     // OUTRA OUTRA DISSERTATIVA!!!!!!!!

    // },
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const dificilButton = document.getElementById("botao_dificil");

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
  dificilButton.style.display = "none";
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
  dificilButton.style.display = "block";
  dificilButton.link("dificil.html");
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