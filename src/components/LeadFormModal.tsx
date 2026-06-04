import React, { useState } from "react";
import { X, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { createLead } from "../services/leadService";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSolution?: string;
}

const SOLUTION_OPTIONS = [
  "Site Institucional",
  "Landing Page",
  "Aplicativo PWA",
  "Sistema Empresarial",
  "Automação",
  "Inteligência Artificial",
  "Integração",
  "Outro",
];

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export default function LeadFormModal({ isOpen, onClose, defaultSolution = "" }: LeadFormModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    telefone: "",
    email: "",
    tipoProjeto: defaultSolution || SOLUTION_OPTIONS[0],
    mensagem: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    if (name === "telefone") {
      value = formatPhoneNumber(value);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(""); // Reset error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Name Validation: ONLY letters
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!nameRegex.test(formData.nome.trim())) {
      setFormError("O campo Nome deve conter apenas letras.");
      return;
    }

    // Email Validation: Must have @ and be fully valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError("Por favor, insira um e-mail válido (contendo '@' e domínio).");
      return;
    }

    // Phone Validation: Min length for DDD + Number
    const digits = formData.telefone.replace(/\D/g, "");
    if (digits.length < 10) {
      setFormError("O telefone deve conter o DDD e pelo menos 10 ou 11 números, ex: (41) 99999-9999.");
      return;
    }

    setStatus("loading");

    try {
      await createLead(formData);

      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({ nome: "", empresa: "", telefone: "", email: "", tipoProjeto: SOLUTION_OPTIONS[0], message: "" } as any);
      }, 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 pointer-events-auto"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-brand-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">Solicitar Orçamento</h3>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    <Check className="w-8 h-8 text-cyan-400 stroke-[3]" />
                  </div>
                  <h4 className="text-xl font-display font-semibold text-white mb-3">Tudo pronto! Estaremos em contato já! ✨</h4>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                    Sua solicitação foi enviada com sucesso! Fique atento(a) ao seu WhatsApp, pois <strong>em poucos instantes</strong> um de nossos especialistas entrará em contato direto para alinhar os detalhes da sua solução.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">Nome *</label>
                      <input
                        required
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">Empresa</label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="Sua empresa"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">E-mail *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Tipo de solução</label>
                    <select
                      name="tipoProjeto"
                      value={formData.tipoProjeto}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
                    >
                      {SOLUTION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Mensagem</label>
                    <textarea
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none"
                      placeholder="Fale um pouco sobre o seu projeto..."
                    />
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs sm:text-sm">
                      {formError}
                    </div>
                  )}

                  {status === "error" && !formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs sm:text-sm">
                      Erro ao salvar no Firebase. Verifique o console.
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Solicitação</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
