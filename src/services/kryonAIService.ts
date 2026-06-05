import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { kryonKnowledgeBase } from '../data/kryonKnowledgeBase';
import { GoogleGenAI, Type } from "@google/genai";

const ai = import.meta.env.VITE_GEMINI_API_KEY 
  ? new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY }) 
  : null;

const systemInstruction = `Você é a Kryon AI Consultant, assistente comercial oficial da KRYON E-TECH. Seu objetivo é conversar com visitantes do site, entender suas necessidades e explicar como a Kryon pode ajudar com sites, aplicativos PWA, sistemas empresariais, automações, inteligência artificial e integrações.

Você deve ser consultiva, simpática, clara e cativante. Faça perguntas curtas, uma por vez. Nunca peça dados de contato no início. Primeiro entenda o projeto, explique possibilidades e gere valor.

Nunca informe preços fixos. Diga que os projetos são personalizados e que a equipe realiza uma análise gratuita.

Só ofereça cadastro ou formulário quando o cliente demonstrar interesse claro ou após entender o tipo de projeto, segmento, objetivo e recursos desejados.

Não encerre a conversa rapidamente. Continue conduzindo o cliente com perguntas úteis e explicações práticas.

Quando o cliente demonstrar intenção de orçamento, proposta ou contato, ofereça encaminhar para a equipe da Kryon. 

Abaixo está nossa base de conhecimento para você usar como referência técnica e saber o que vendemos:
${kryonKnowledgeBase.map(item => `Pergunta: ${item.question}\nResposta: ${item.answer}`).join("\n\n")}
`;

export interface ExtractedLeadData {
  resumoConversa?: string;
  tipoProjeto?: string;
  segmento?: string;
  objetivoProjeto?: string;
  recursosDesejados?: string;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user' | 'lead_form' | 'options';
  content: string;
  timestamp: Date;
  options?: string[];
  extractedData?: ExtractedLeadData;
}

export interface LeadData {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  mensagem: string;
  origem: string;
  leadQualificado: boolean;
  resumoConversa?: string;
  tipoProjeto?: string;
  segmento?: string;
  objetivoProjeto?: string;
  recursosDesejados?: string;
}

export class KryonAIService {
  private normalizeText(text: string): string {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '');
  }

  public getInitialGreeting(): ChatMessage {
    return {
      id: crypto.randomUUID(),
      type: 'bot',
      content: `Olá! Eu sou a Kryon AI Consultant 🤖✨\nPosso te ajudar a entender qual solução digital combina melhor com sua empresa.\n\nVocê está buscando algo como site, aplicativo, sistema, automação ou inteligência artificial?`,
      timestamp: new Date(),
      options: ['Site', 'Aplicativo', 'Sistema', 'Automação', 'Inteligência Artificial']
    };
  }

  public async processUserQuery(query: string, messageHistory: {user?: string, model?: string}[] = []): Promise<{ message: ChatMessage; needsLeadCapture: boolean; isFallback: boolean }> {
    try {
      if (ai) {
        const contents = messageHistory.map((msg) => {
          if (msg.user) return { role: "user", parts: [{ text: msg.user }] };
          return { role: "model", parts: [{ text: msg.model || "" }] };
        });
        contents.push({ role: "user", parts: [{ text: query }] });

        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: contents as any,
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
        const data = JSON.parse(cleanedJson);

        const extractedData: ExtractedLeadData = {
          resumoConversa: data.resumoConversa,
          tipoProjeto: data.tipoProjeto,
          segmento: data.segmento,
          objetivoProjeto: data.objetivoProjeto,
          recursosDesejados: data.recursosDesejados
        };

        return {
          message: {
            id: crypto.randomUUID(),
            type: 'bot',
            content: data.reply,
            timestamp: new Date(),
            extractedData
          },
          needsLeadCapture: data.needsLeadCapture,
          isFallback: false
        };
      }
    } catch (e) {
      console.warn("Falha ao comunicar com IA, caindo para modo local:", e);
    }

    return this.processUserQueryLocal(query);
  }


  private processUserQueryLocal(query: string): { message: ChatMessage; needsLeadCapture: boolean; isFallback: boolean } {
    const normalizedQuery = this.normalizeText(query);
    const words = normalizedQuery.split(/\s+/);
    
    // Check for exact command / option matches first
    if (query === 'Falar com Consultor') {
       return {
         message: {
           id: crypto.randomUUID(),
           type: 'bot',
           content: 'Ótima escolha! Posso solicitar que a equipe da Kryon entre em contato para uma análise gratuita.',
           timestamp: new Date()
         },
         needsLeadCapture: true,
         isFallback: false
       };
    }

    if (['sites', 'aplicativos pwa', 'sistemas empresariais', 'inteligência artificial'].includes(query.toLowerCase())) {
         const category = query;
         return {
           message: {
             id: crypto.randomUUID(),
             type: 'bot',
             content: `Entendido! Você quer saber mais sobre ${category}. Pode me fazer qualquer pergunta sobre isso, como prazos, funcionalidades, ou como começar.`,
             timestamp: new Date()
           },
           needsLeadCapture: false,
           isFallback: false
         };
    }

    // Keyword matching scoring logic
    let bestMatch = null;
    let highestScore = 0;

    for (const item of kryonKnowledgeBase) {
      let score = 0;
      for (const keyword of item.keywords) {
        const normalizedKeyword = this.normalizeText(keyword);
        if (words.includes(normalizedKeyword)) {
            // Whole word match gives higher score
            score += 2;
        } else if (normalizedQuery.includes(normalizedKeyword)) {
            // Partial match
            score += 1;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // Minimum threshold for a match
    if (bestMatch && highestScore >= 1) {
       // Check if this response should trigger a lead form proposal
       const isLeadTrigger = bestMatch.isLeadTrigger === true || bestMatch.answer.includes("análise gratuita");
       
       let finalContent = bestMatch.answer;

       return {
         message: {
            id: crypto.randomUUID(),
            type: 'bot',
            content: finalContent,
            timestamp: new Date()
         },
         needsLeadCapture: isLeadTrigger,
         isFallback: false
       };
    }

    // Fallback response
    return {
      message: {
        id: crypto.randomUUID(),
        type: 'bot',
        content: 'Ainda não tenho uma resposta específica para essa dúvida, mas nossa equipe pode analisar seu caso sem compromisso.\n\nGostaria de receber uma análise gratuita do seu projeto?',
        timestamp: new Date()
      },
      needsLeadCapture: true,
      isFallback: true
    };
  }

  public async saveLead(data: Omit<LeadData, 'origem' | 'leadQualificado'>) {
    try {
      const leadData: LeadData & { createdAt: any, status: string } = {
        ...data,
        origem: 'IA Kryon',
        leadQualificado: true,
        status: 'novo',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'leads'), leadData);
      return true;
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      return false;
    }
  }

  public getLeadCaptureMessage(): ChatMessage {
    return {
      id: crypto.randomUUID(),
      type: 'lead_form',
      content: 'Por favor, preencha seus dados para receber a análise gratuita da nossa equipe de engenharia e negócios:',
      timestamp: new Date()
    };
  }
}

export const aiService = new KryonAIService();
