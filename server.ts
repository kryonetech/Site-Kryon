import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { kryonKnowledgeBase } from "./src/data/kryonKnowledgeBase.js";

dotenv.config();

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Generate the system prompt from the Knowledge Base
const systemInstruction = `Você é a Kryon AI Consultant, assistente comercial oficial da KRYON E-TECH. Seu objetivo é conversar com visitantes do site, entender suas necessidades e explicar como a Kryon pode ajudar com sites, aplicativos PWA, sistemas empresariais, automações, inteligência artificial e integrações.

Você deve ser consultiva, simpática, clara e cativante. Faça perguntas curtas, uma por vez. Nunca peça dados de contato no início. Primeiro entenda o projeto, explique possibilidades e gere valor.

Nunca informe preços fixos. Diga que os projetos são personalizados e que a equipe realiza uma análise gratuita.

Só ofereça cadastro ou formulário quando o cliente demonstrar interesse claro ou após entender o tipo de projeto, segmento, objetivo e recursos desejados.

Não encerre a conversa rapidamente. Continue conduzindo o cliente com perguntas úteis e explicações práticas.

Quando o cliente demonstrar intenção de orçamento, proposta ou contato, ofereça encaminhar para a equipe da Kryon. 

Abaixo está nossa base de conhecimento para você usar como referência técnica e saber o que vendemos:
${kryonKnowledgeBase.map(item => `Pergunta: ${item.question}\nResposta: ${item.answer}`).join("\n\n")}
`;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Gemini Chat Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = req.body;

      if (!ai) {
        throw new Error("GEMINI_API_KEY não configurada.");
      }

      // Convert conversationHistory to contents array if needed.
      const contents = conversationHistory.map((msg: { user?: string; model?: string }) => {
        if (msg.user) return { role: "user", parts: [{ text: msg.user }] };
        return { role: "model", parts: [{ text: msg.model }] };
      });
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description: "A resposta formatada e educada da consultora.",
              },
              needsLeadCapture: {
                type: Type.BOOLEAN,
                description: "Defina como true APENAS caso o cliente demonstre intenção clara de fechar negócio, peça orçamento formal, ou aceite a análise gratuita. NÃO defina como true para perguntas iniciais.",
              },
              resumoConversa: {
                type: Type.STRING,
                description: "Resumo do que foi conversado até agira (preencher qndo needsLeadCapture for true).",
              },
              tipoProjeto: {
                type: Type.STRING,
                description: "Tipo de projeto desejado (ex: Site, App PWA, Sistema, IA) (preencher qndo needsLeadCapture for true).",
              },
              segmento: {
                type: Type.STRING,
                description: "Segmento de mercado do cliente (preencher qndo needsLeadCapture for true).",
              },
              objetivoProjeto: {
                type: Type.STRING,
                description: "Objetivo principal do projeto (preencher qndo needsLeadCapture for true).",
              },
              recursosDesejados: {
                type: Type.STRING,
                description: "Recursos que o cliente mencionou que deseja (preencher qndo needsLeadCapture for true).",
              }
            },
            required: ["reply", "needsLeadCapture"]
          }
        }
      });

      const rawText = response.text || "{}";
      const cleanedJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanedJson);

      res.json({
        reply: parsed.reply,
        needsLeadCapture: parsed.needsLeadCapture,
        resumoConversa: parsed.resumoConversa,
        tipoProjeto: parsed.tipoProjeto,
        segmento: parsed.segmento,
        objetivoProjeto: parsed.objetivoProjeto,
        recursosDesejados: parsed.recursosDesejados
      });
    } catch (error: any) {
      // Suppress stack trace for expected preview environment API key errors
      if (error?.message?.includes("API key not valid") || error?.message?.includes("GEMINI_API_KEY não configurada")) {
         console.warn("Aviso: GEMINI_API_KEY inválida ou ausente. O chatbot usará respostas offline com regra estrita.");
      } else {
         console.error("AI Error:", error.message || error);
      }
      res.status(500).json({ error: error.message || "Erro no servidor." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
