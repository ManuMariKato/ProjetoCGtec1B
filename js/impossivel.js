const questoes = [
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo: 2, 10, 12, 16, 17, 18, 19, … ", resposta: "200" },
      { pergunta: "Seguindo o padrão da sequência numérica, qual o número final na sequência abaixo:  3, 6, 36, 12, 15, 90, … ", resposta: "30" }
    ];

    let indice = 0;

    //Função responsável por mostrar a questão atual na tela
    function carregarQuestao() {
      //coloca o texto da pergunta no h2
      document.getElementById("pergunta").textContent = questoes[indice].pergunta;
      //limpa o campo de entrada (para nova resposta).
      document.getElementById("resposta").value = "";
      //limpa qualquer feedback anterior
      document.getElementById("feedback").textContent = "";
    }

    function verificarResposta() {
      const respostaUsuario = document.getElementById("resposta").value.trim();
      const respostaCorreta = questoes[indice].resposta;
      const feedback = document.getElementById("feedback");

      if (respostaUsuario === "") {
        feedback.textContent = "⚠️ Digite uma resposta!";
        feedback.className = "feedback incorreto";
        return;
      }

      if (respostaUsuario === respostaCorreta) {
        feedback.textContent = "✅ Correto!";
        feedback.className = "feedback correto";
      } else {
        feedback.textContent = "❌ Incorreto! A resposta correta é: " + respostaCorreta;
        feedback.className = "feedback incorreto";
      }
      // Avança para a próxima questão depois de 2 segundos
      setTimeout(() => {
        indice++;
        if (indice < questoes.length) {
          carregarQuestao();
        } else {
          document.querySelector(".quiz-container").innerHTML = 
            `<h2> Quiz finalizado!</h2><p>Você respondeu todas as questões.</p>`;
        }
      }, 2000);
    }

    // Inicia a primeira questão
    carregarQuestao();
