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

    },
    {
      question: "Qual é o próximo termo da sequência númerica: <br> 2, 6, 12, 20, 30, ...",
      answers: [
        {id: 1, text: "A) 40", correct:false},
        {id: 2, text: "B) 62", correct:false},
        {id: 3, text: "C) 50", correct:false},
        {id: 4, text: "D) 42", correct:true}
      ]
    },
    {
      question: "Qual é o próximo termo da sequência númerica: <br> 50, 45, 41, 38, 36, 35, ...",
      answers: [
        {id: 1, text: "A) 34", correct:false},
        {id: 2, text: "B) 32", correct:false},
        {id: 3, text: "C) 31", correct:false},
        {id: 4, text: "D) 35", correct:true}
      ]
    },
    {
      question: "O 10º termo da sequência numérica: –2, 3, 8, 13, ... é",
      answers: [
        {id: 1, text: "A) 42", correct:false},
        {id: 2, text: "B) 43", correct:true},
        {id: 3, text: "C) 48", correct:false},
        {id: 4, text: "D) 49", correct:false}
      ]
    },
    {
      question: "Qual é o 7º termo da sequência numérica, sendo ela: 4, 9, 14, 19, ...",
      answers: [
        {id: 1, text: "A) 29", correct:false},
        {id: 2, text: "B) 30", correct:false},
        {id: 3, text: "C) 31", correct:false},
        {id: 4, text: "D) 34", correct:true}
      ]
    },
    {
      question: "Complete a sequência: <br> 1, 2, 6, 24, 120, ...",
      answers: [
        {id: 1, text: "A) 240", correct:false},
        {id: 2, text: "B) 360", correct:false},
        {id: 3, text: "C) 720", correct:true},
        {id: 4, text: "D) 840", correct:false}
      ]
    },
    {
      question: "Sequência: 1, ..., ..., ..., ... <br> cada termo é o número de divisores do termo anterior. Qual o 15º ?",
      answers: "1"
    }
    
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const dificilButton = document.getElementById("botao_dificil");
const bestResposta = document.getElementById("resposta");
const enviarResposta = document.getElementById("enviarResposta");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  bestResposta.classList.add("desabilitado");
  enviarResposta.classList.add("desabilitado");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  if(currentQuestionIndex == 7){
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    

  } else{
    currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    button.dataset.id = answer.id;

    button.addEventListener("click", selectAnswer);
  });
  }
  
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
  bestResposta.classList.add("desabilitado");
  enviarResposta.classList.add("desabilitado");
  feedback.remove();
  dificilButton.style.display = "block";
  dificilButton.link("dificil.html");
  

}

function handleNextButton() {
  currentQuestionIndex++;

  if(currentQuestionIndex == 7){

    showQuestion();
    bestResposta.classList.remove("desabilitado");
    enviarResposta.classList.remove("desabilitado");
    feedback.display.remove("desabilitado");
    verificarResposta();
  }

  if (currentQuestionIndex < questions.length) {
    showQuestion();
    feedback.display.add("desabilitado");
  } 
  else {
    showScore();
  }
}

 function verificarResposta() {
      const respostaUsuario = document.getElementById("resposta").value.trim();
      const respostaCorreta = questions[currentQuestionIndex].answers;
      const feedback = document.getElementById("feedback");

      if (respostaUsuario === "") {
        feedback.textContent = "⚠️ Digite uma resposta!";
        feedback.className = "feedback incorreto";
        return;
      }

      if (respostaUsuario === respostaCorreta) {
        feedback.textContent = "✅ Correto!";
        feedback.className = "feedback correto";
        score++
        nextButton.style.display = "block";
      } else {
        feedback.textContent = "❌ Incorreto! A resposta correta é: " + respostaCorreta;
        feedback.className = "feedback incorreto";
        nextButton.style.display = "block";
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
