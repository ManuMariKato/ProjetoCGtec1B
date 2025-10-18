// aiConnector.js
// OBJETIVO: fornecer funções para acessar IA local (Ollama) e fallback online via backend.
// ESCOPO: sem UI/DOM; apenas envio/retorno de dados e tratamento de erros de acesso.
// REQUISITO: chamar askSmart(payload) APENAS quando a resposta do aluno estiver errada.
// REFERÊNCIA OLLAMA API: /api/chat com JSON { model, messages, stream } e retorno com message.content. [web:67]

// =========================
// CONFIGURAÇÕES AJUSTÁVEIS
// =========================

// URL do Ollama local. Ajuste se necessário.
// Importante: 0.0.0.0:11434 é o host que o serviço escuta; do navegador, normalmente use http://localhost:11434
// Se seu navegador não alcançar 0.0.0.0 diretamente, troque para "http://localhost:11434".

// Nome do modelo local no Ollama.

// URL do backend (Node.js) que esconde a chave e chama a IA online.
// Em desenvolvimento local, o backend abaixo sobe em http://localhost:3000/api/ai/ask
const ONLINE_PROXY_URL = 'http://localhost:3000/api/ai/ask'; // Endpoint do backend/proxy. [web:54]

// Timeout padrão (ms) para chamadas de rede.
// Mantemos curto no local para permitir fallback rápido; ajuste conforme sua máquina.
const TIMEOUT_MS_ONLINE = 12000; // 12s para online (ajustável). [web:60]

// ================
// FUNÇÕES DE APOIO
// ================

// Cria um AbortController baseado em timeout. Cancela o fetch ao estourar o tempo.
function timeoutSignal(ms) {
  // Em navegadores modernos pode-se usar AbortSignal.timeout(ms), mas para compatibilidade usamos AbortController manualmente. [web:63][web:65]
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(`Timeout após ${ms}ms`), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(id) };
}

// Ajuda a extrair mensagem de erro legível.
function toErrorMessage(err) {
  if (typeof err === 'string') return err;
  if (err && err.message) return err.message;
  return 'Erro desconhecido';
}
// ========================================
// ACESSO AO ONLINE VIA BACKEND (PROXY .env)
// ========================================

// Envia o mesmo payload para o backend Node.js que chama a IA online com a chave escondida no .env.
export async function askOnlineViaProxy(payload) {
  const { signal, cancel } = timeoutSignal(TIMEOUT_MS_ONLINE);
  try {
    const res = await fetch(ONLINE_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });
    cancel();

    // Espera retorno { text: "..." } ou { error: "..." }
    const data = await res.json();
    if (!res.ok) {
      const msg = data?.error || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    const text = data?.text?.trim();
    if (!text) throw new Error('Resposta vazia do backend online');
    return text;
  } catch (err) {
    cancel();
    throw new Error(`Falha no online: ${toErrorMessage(err)}`);
  }
}

// ===================
// ORQUESTRAÇÃO SMART
// ===================

// Tenta primeiro o Ollama; se falhar (timeout/indisponível), usa o online.
// Retorna uma string com a explicação, ou lança erro se ambos falharem.
export async function askSmart(payload) {
  // 1) Tentativa local
  try {
    // Opcionalmente, checa se responde antes de chamar o /api/chat:
    // const ok = await checkLocal();
    // if (!ok) throw new Error('Ollama indisponível');
    const text = await askOllama(payload);
    return text;
  } catch {
    // Ignora detalhes e avança para fallback
  }

  // 2) Fallback online via backend
  const textOnline = await askOnlineViaProxy(payload);
  return textOnline;
}

// ================
// PROMPT DO USUÁRIO
// ================

// Constrói um prompt claro com base no payload (pergunta já formatada).
// NOTA: Se "correct" estiver disponível, podemos citar explicitamente a alternativa correta.
// Caso prefira apenas o conceito sem dizer a resposta, ajuste a frase final.
function makeUserPrompt(payload) {
  const {
    question,
    options,
    selected,
    correct,
    language = 'pt-BR',
    style = 'explicacao', // "explicacao" | "dica"
  } = payload || {};

  // Normaliza exibição das alternativas
  // const optionsStr = Array.isArray(options) && options.length
  //   ? options.map((opt, i) => `${i}: ${opt}`).join(' | ')
  //   : '(sem alternativas fornecidas)';

  const selectedStr = typeof selected === 'number' ? `Índice marcado: ${selected}` : `Marcado: ${selected}`;
  const correctStr = typeof correct === 'number' ? `Índice correto: ${correct}` : `Correto: ${correct}`;

  const modeStr = style === 'dica'
    ? 'Dê uma dica objetiva que leve ao raciocínio correto, sem revelar diretamente a resposta.'
    : 'Explique de forma direta por que a alternativa correta é a certa.';

  return [
    `Idioma desejado: ${language}.`,
    `Pergunta: ${question}`,
    //`Alternativas: ${optionsStr}`,
    `Resposta do aluno: ${selectedStr}`,
    `Gabarito: ${correctStr}`,
    modeStr,
    'Responda em no máximo 3 frases, de forma clara e educativa.',
  ].join('\n');
}
