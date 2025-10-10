const questoes = [
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: 2, 10, 12, 16, 17, 18, 19, … ", resposta: "200" },
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: 2, 10, 12, 16, 17, 18, 19, … ", resposta: "200" },
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo:  3, 6, 36, 12, 15, 90, … ", resposta: "30" },
      { pergunta: "Qual é o próximo número na sequência 1, 2, 6, 24, 120, 720, 5040, 40320, …", resposta: "362880"},
      { pergunta: "Qual é o 15º termo da sequência 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377,… ", resposta: "610" },
      { pergunta: "Dada a sequência 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78,…, qual é o próximo número na sequência?", resposta: "91" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 4, 27, 256, 3125, …", resposta: "46656" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 2, 6, 20, 70, 252, …", resposta: "924" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 3, 8, 21, 55, 144, …", resposta: "377" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 3, 7, 31, 127, …", resposta: "8191" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 5, 12, 22, 35, …", resposta: "51" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 1, 3, 15, 105, 945, …", resposta: "10395" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 6, 15, 28, 45, …", resposta: "66" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 3, 9, 33, 153, 873, …", resposta: "5913" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 8, 21, 40, 65, …", resposta: "96" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 3, 8, 21, 55, 144, 377, …", resposta: "987" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 2, 5, 12, 29, 70, …", resposta: "169" },
      { pergunta: "Dada a sequência: 2, 3, 7, 43, …, qual é o próximo número?", resposta: "1807" },
      { pergunta: "Dada a sequência: 1, 1, 3, 15, 105, … , qual é o próximo número?", resposta: "10395" },
      { pergunta: "Dada a sequência: 1, 4, 10, 20, 35, …, qual é o próximo número?", resposta: "56" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 2, 7, 34, 209, …", resposta: "1546" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 3, 12, 60, 360, …", resposta: "2520" },
      { pergunta: "Seguindo o padrão, qual o próximo número: 1, 2, 5, 14, 41, 122, … ", resposta: "365" },
      { pergunta: "Dada a sequência: 1, 3, 6, 10, 15, …, qual é o próximo número?", resposta: "21" },
      { pergunta: "Dada a sequência: 1, 4, 10, 20, 35, …, qual é o próximo número?", resposta: "56" },
      { pergunta: "Dada a sequência: 1, 2, 5, 14, 42, …, qual é o próximo número?", resposta: "132" },
      { pergunta: "Dada a sequência: 1, 2, 5, 14, 41, …, qual é o próximo número?", resposta: "122" },
      { pergunta: "Dada a sequência: 2, 3, 7, 43, …, qual é o próximo número?", resposta: "1807" },
      { pergunta: "Dada a sequência: 3, 5, 17, 257, …, qual é o próximo número?", resposta: "65537" },
      { pergunta: "Seguindo o padrão, qual o próximo número:1, 1, 2, 5, 15, 52, …", resposta: "203" },
    ];

    let indice = 0;
    let score = 0;
    let numeroMaximo = 30;
    let perguntasSorteadas = [];
    let tmp;
    const nextButton = document.getElementById("next-btn");
    const responstaEnviar = document.getElementById("respostaEnviar");
    const botaoNovamente = document.getElementById("botao_nj");
    let questoesAleatorias = gerarNumeroAleatorio();
    const bestResposta = document.getElementById("resposta");

    //Função responsável por mostrar a questão atual na tela
    function carregarQuestao() {
      //coloca o texto da pergunta no h2
      document.getElementById("pergunta").textContent = questoes[questoesAleatorias].pergunta;
      //limpa o campo de entrada (para nova resposta).
      document.getElementById("resposta").value = "";
      //limpa qualquer feedback anterior
      document.getElementById("feedback").textContent = "";
      botaoNovamente.classList.add("desabilitado");
    }

    function mudarQuestao(){
      switch (questoesAleatorias){
        case 1:
          carregarQuestao();
          verificarResposta();
          break;
        case 2:
          carregarQuestao();
          verificarResposta();
          break;
        case 3:
          carregarQuestao();
          verificarResposta();
          break;
        case 4:
          carregarQuestao();
          verificarResposta();
          break;
        case 5:
          carregarQuestao();
          verificarResposta();
          break;
      }
    }

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosDaLista = questoes.length;

    if(quantidadeDeElementosDaLista == numeroMaximo){
        perguntasSorteadas = [];
    }

    if(perguntasSorteadas.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        perguntasSorteadas.push(numeroEscolhido);
        console.log(perguntasSorteadas);
        return numeroEscolhido;
    }
}

    function verificarResposta() {
      const respostaUsuario = document.getElementById("resposta").value.trim();
      const respostaCorreta = questoes[questoesAleatorias].resposta;
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
      } else {
        feedback.textContent = "❌ Incorreto! A resposta correta é: " + respostaCorreta;
        feedback.className = "feedback incorreto";
      }
      if (questoesAleatorias < questoes.length) {
        mudarScore();
      }
    }

    function mudarScore(){
      document.getElementById("pergunta").innerHTML = 
          `<h2> Quiz finalizado!</h2><p>Você respondeu todas as questões.</p>
          <p>Sua pontuação foi de ${score} de 1</p>`;
      feedback.remove();
      bestResposta.remove();
      responstaEnviar.remove();
      botaoNovamente.classList.remove("desabilitado");
    }
    console.log(questoesAleatorias);
    // Inicia a primeira questão
    carregarQuestao();

