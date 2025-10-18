import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Rota para receber a pergunta e a resposta do usuário
app.post("/api/gemini", async (req, res) => {
  const { pergunta, bestResposta } = req.body;

  // Prompt com contexto da IA
  const prompt = `
Você é um agente inteligente especializado em correção de raciocínio lógico e matemática.
Sua função é verificar se a resposta do usuário está correta e explicar o motivo se estiver errada.
Responda de forma educada e objetiva.

Pergunta: ${pergunta}
Resposta do usuário: ${bestResposta}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${process.env.OPENAI_MODEL}:generateContent?key=${process.env.OPENAI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const textoIA =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui gerar uma resposta no momento.";

    res.json({ explicacao: textoIA });
  } catch (erro) {
    console.error("Erro ao consultar o Gemini:", erro);
    res.status(500).json({ explicacao: "Erro ao consultar o modelo de IA." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
