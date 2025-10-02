const questoes = [
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: 2, 10, 12, 16, 17, 18, 19, … ", resposta: "200" },
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo:  3, 6, 36, 12, 15, 90, … ", resposta: "30" },
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: 2, 10, 12, 16, 17, 18, 19, … ", resposta: "200" },
      { pergunta: "Sequência: 2, 12, 1112, 3112, 132112, ...", resposta: "1113122112" },
      { pergunta: "Qual é o próximo número da sequência? <br> 2, 6, 30, 210, 2310, ...", resposta: "30030" }
    ];

    let indice = 0;
    let score = 0;
    let numeroMaximo = 5;
    let questoesAleatorias = parseInt(Math.random() * numeroMaximo + 1);

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
        indice++
        score++
      } else {
        feedback.textContent = "❌ Incorreto! A resposta correta é: " + respostaCorreta;
        feedback.className = "feedback incorreto";
        indice++
      }
      if (questoesAleatorias < questoes.length) {
        document.querySelector(".quiz-container").innerHTML = 
          `<h2> Quiz finalizado!</h2><p>Você respondeu todas as questões.</p>
          <p>Sua pontuação foi de ${score} de 1</p>`;
          
      }
      // Avança para a próxima questão depois de 2 segundos
      // setTimeout(() => {
      //   indice++;
      //   if (indice < questoes.length) {
      //     carregarQuestao();
      //   } else {
      //     document.querySelector(".quiz-container").innerHTML = 
      //       `<h2> Quiz finalizado!</h2><p>Você respondeu todas as questões.</p>`;
      //   }
      // }, 2000);
    }
    console.log(questoesAleatorias);
    // Inicia a primeira questão
    carregarQuestao();
