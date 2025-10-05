const questoes = [
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: 2, 10, 12, 16, 17, 18, 19, … ", resposta: "200" },
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: 2, 10, 12, 16, 17, 18, 19, … ", resposta: "200" },
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo:  3, 6, 36, 12, 15, 90, … ", resposta: "30" },
      { pergunta: "Qual é o próximo número na sequência 1, 2, 6, 24, 120, 720, 5040, 40320, …", resposta: "362880"},
      { pergunta: "Qual é o 15º termo da sequência 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377,… ", resposta: "610" },
      { pergunta: "Dada a sequência 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78,…, qual é o próximo número na sequência?", resposta: "91" },
    ];

    let indice = 0;
    let score = 0;
    let numeroMaximo = 5;
    let list = [];
    let tmp;
    let questoesAleatorias = gerarNumeroAleatorio();

    //Função responsável por mostrar a questão atual na tela
    function carregarQuestao() {
      //coloca o texto da pergunta no h2
      document.getElementById("pergunta").textContent = questoes[questoesAleatorias].pergunta;
      //limpa o campo de entrada (para nova resposta).
      document.getElementById("resposta").value = "";
      //limpa qualquer feedback anterior
      document.getElementById("feedback").textContent = "";
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
    let quantidadeDeElementosDaLista = list.length;

    if(quantidadeDeElementosDaLista == numeroMaximo){
        list= [];
    }

    if(list.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        list.push(numeroEscolhido);
        console.log(list);
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
        document.querySelector(".quiz-container").innerHTML = 
          `<h2> Quiz finalizado!</h2><p>Você respondeu todas as questões.</p>
          <p>Sua pontuação foi de ${score} de 1</p>`;
          
      }
      
      
    }
    console.log(questoesAleatorias);
    // Inicia a primeira questão
    carregarQuestao();

