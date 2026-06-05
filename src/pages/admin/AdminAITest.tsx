import React, { useState } from "react";
import { KryonAIService } from "../../services/kryonAIService";
import { Bot, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

export default function AdminAITest() {
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [log, setLog] = useState<string[]>([]);
  const aiService = new KryonAIService();

  const addLog = (message: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const runTest = async () => {
    setTestStatus("running");
    setLog([]);
    addLog("Iniciando teste de conexão com o Gemini...");

    try {
      const response = await aiService.processUserQuery("Olá, qual seu nome?");
      
      addLog(`Resposta recebida: ${response.message.content}`);
      
      if (response.isFallback) {
         addLog("⚠️ ATENÇÃO: A resposta veio do fallback local. A chave da API pode estar inválida, ausente, ou o modelo falhou.");
         setTestStatus("error");
      } else {
         addLog("✅ Conexão via API Gemini bem-sucedida!");
         setTestStatus("success");
      }
    } catch (err: any) {
      addLog(`❌ Erro no teste: ${err.message || err.toString()}`);
      setTestStatus("error");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2 font-display">Teste de Conexão com IA</h1>
        <p className="text-slate-400 text-sm">
          Execute este teste para garantir que a chave da API do Gemini está configurada e funcionando corretamente.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={runTest}
            disabled={testStatus === "running"}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg flex items-center gap-2 hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
          >
            {testStatus === "running" ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
            Executar Teste
          </button>
          
          {testStatus === "success" && (
            <span className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Teste passou
            </span>
          )}
          {testStatus === "error" && (
            <span className="flex items-center gap-2 text-red-400 text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              Teste falhou
            </span>
          )}
        </div>

        <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 min-h-[300px] overflow-auto">
          <div className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-wider">Logs da Execução</div>
          {log.length === 0 ? (
            <div className="text-slate-600 text-sm italic font-mono">Nenhum teste executado ainda...</div>
          ) : (
            <div className="space-y-2 font-mono text-sm">
              {log.map((line, i) => (
                <div key={i} className={`${line.includes("✅") ? "text-green-400" : line.includes("❌") || line.includes("⚠️") ? "text-red-400" : "text-slate-300"}`}>
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
