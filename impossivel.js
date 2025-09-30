function mostrarResposta(){
    var texto = document.getElementById("input").value;
    var resposta =  console.log(texto);
    if (texto == 200){
        document.getElementById("botao_enviar").innerHTML = "Você acertou!";
    }
    else{
        document.getElementById("botao_enviar").innerHTML = "Você errou!";
    }
}
function mostrarResposta2(){
    var texto2 = document.getElementById("input2").value;
    var resposta =  console.log(texto2);
    if (texto2 == 30){
        document.getElementById("botao_enviar2").innerHTML = "Você acertou!";
        texto.classList.add("correct");
    }
    else{
        document.getElementById("botao_enviar2").innerHTML = "Você errou!";
        texto.classList.add("incorrect");
    }
}


const questions = [
    {
        question: "1. Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: <br> 2, 10, 12, 16, 17, 18, 19, … ",
        answers: <input
        type="text"
        placeholder="Responda aqui"
        id="input"></input>
    },
    {
        question: "2. Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: <br> 3, 6, 36, 12, 15, 90, … ",
        answers: <input
        type="text"
        placeholder="Responda aqui"
        id="input2"></input>

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