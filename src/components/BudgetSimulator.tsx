import React, { useState } from "react";
import { Check, ClipboardList, Send, Sparkles, MessageSquare, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceOption {
  id: string;
  label: string;
  description: string;
  badge: string;
  avgTime: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "site",
    label: "Criação de Sites",
    description: "Sites institucionais, landing pages de alta conversão e portfólios rápidos totalmente otimizados.",
    badge: "Presença Online",
    avgTime: "3-7 dias"
  },
  {
    id: "sistema",
    label: "Sistemas sob Medida",
    description: "Plataformas internas exclusivas para gerenciar seu negócio de ponta a ponta.",
    badge: "Alta Eficiência",
    avgTime: "15-30 dias"
  },
  {
    id: "pwa",
    label: "Aplicativos PWA",
    description: "Aplicativos leves e rápidos que funcionam direto no navegador e no celular sem ocupar memória.",
    badge: "Instalação Direta",
    avgTime: "10-20 dias"
  },
  {
    id: "ia",
    label: "Inteligência Artificial",
    description: "Integração de chatbots inteligentes de atendimento ao cliente ou análise automática de dados.",
    badge: "Automação Inteligente",
    avgTime: "7-15 dias"
  },
  {
    id: "auto",
    label: "Automação de Processos",
    description: "Integração entre sistemas, emissão de notas fiscais automática, envios automáticos e relatórios.",
    badge: "Economia de Tempo",
    avgTime: "5-12 dias"
  },
  {
    id: "dash",
    label: "Dashboards e Relatórios",
    description: "Painéis visuais em tempo real para controle financeiro, de vendas e estoque.",
    badge: "Decisões Certas",
    avgTime: "5-10 dias"
  },
  {
    id: "integra",
    label: "Integrações de Plataformas",
    description: "Conexão de seus sistemas legados com WhatsApp, ERPs, marketplaces e gateways de pagamento.",
    badge: "Fluidez Absoluta",
    avgTime: "4-10 dias"
  }
];

export default function BudgetSimulator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [businessSize, setBusinessSize] = useState<string>("MEI / Microempresa");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg("Por favor, preencha nome, e-mail e telefone para continuar.");
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMsg("Selecione pelo menos 1 solução desejada para o seu projeto.");
      return;
    }
    setErrorMsg("");
    
    // Simulating form submission or generating WhatsApp request link
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setSelectedServices([]);
    setBusinessSize("MEI / Microempresa");
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
    setIsSubmitted(false);
  };

  // Generate WhatsApp text link
  const getWhatsAppLink = () => {
    const defaultPhone = "5511999999999"; // Default placeholder if real is not requested, or they can copy.
    const selectedLabels = serviceOptions
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.label)
      .join(", ");

    const text = `Olá KRYON E-TECH! Gostaria de solicitar um orçamento para:\n\n*Serviços Selecionados:* ${selectedLabels}\n*Nome:* ${name}\n*Empresa:* ${company || "Não informado"}\n*Segmento/Porte:* ${businessSize}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Mensagem:* ${message || "Nenhuma mensagem adicional."}\n\nVi esse detalhamento no Simulador do site e gostaria de bater um papo!`;
    return `https://wa.me/${defaultPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="simulador" className="relative py-12 md:py-20 overflow-hidden bg-slate-950/40 border-t border-b border-slate-900">
      {/* Background glow flares */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLUÇÃO INTELIGENTE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Monte sua Solução & Simule o Escopo
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
            Selecione as tecnologias que sua empresa precisa. Nosso algoritmo organizará o pré-projeto focado em alto custo-benefício para o fechamento do seu plano.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-cyan-950/20">
          {!isSubmitted ? (
            <form onSubmit={handleCalculate}>
              {/* Step 1: Select services */}
              <div className="mb-8">
                <h3 className="text-base font-display font-semibold text-sky-400 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-bold text-sky-400">1</span>
                  Selecione as tecnologias desejadas:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceOptions.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`relative p-5 rounded-xl border cursor-pointer transition-all duration-300 select-none flex flex-col justify-between group ${
                          isSelected
                            ? "bg-slate-900/90 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] md:scale-[1.01]"
                            : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/40"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded-md ${
                              isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-900 text-slate-400"
                            }`}>
                              {service.badge}
                            </span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-cyan-500 border-cyan-400 text-slate-950"
                                : "border-slate-800 bg-slate-950 group-hover:border-slate-600"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {service.label}
                          </h4>
                          <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>Tempo Médio:</span>
                          <span className={isSelected ? "text-cyan-400 font-medium" : "text-slate-400"}>
                            {service.avgTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Customer / Business details */}
              <div className="mb-8 pt-6 border-t border-slate-800/50">
                <h3 className="text-base font-display font-semibold text-sky-400 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-bold text-sky-400">2</span>
                  Quem é a sua empresa?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"> Porte do Negócio </label>
                    <select
                      value={businessSize}
                      onChange={(e) => setBusinessSize(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors cursor-pointer font-sans"
                    >
                      <option value="MEI / Microempresa">MEI / Microempresa</option>
                      <option value="Pequena Empresa (até 20 func.)">Pequena Empresa (até 20 func.)</option>
                      <option value="Média Empresa (20+ func.)">Média Empresa (20+ func.)</option>
                      <option value="Startup / Novo Produto">Startup / Novo Produto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"> Nome do Contato * </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"> Nome da Empresa </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Padaria Bella Vista"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"> E-mail Comercial * </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="joao@suaempresa.com.br"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"> WhatsApp / Telefone * </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-sans"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"> Descreva brevemente seu objetivo ou processo atual </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ex: Quero organizar minhas vendas no WhatsApp e enviar relatórios direto para o meu notebook."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-sans resize-none"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm px-4 py-3 rounded-lg mb-6">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-800/50">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  <span>Seus dados estão protegidos e serão usados apenas para a proposta.</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 hover:from-sky-600 hover:via-cyan-600 hover:to-teal-600 text-slate-950 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-98"
                >
                  <span>Gerar Minha Proposta</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/30 text-cyan-400 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Simulação Concluída com Sucesso!
              </h3>
              <p className="text-cyan-400 text-sm font-semibold mb-6">
                Montamos um pré-escopo focado no melhor custo-benefício.
              </p>

              <div className="max-w-md mx-auto bg-slate-950/80 border border-slate-800/85 rounded-xl p-5 mb-8 text-left leading-relaxed">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-900 pb-2">
                  Resumo do Pré-Projeto
                </div>
                <div className="text-xs text-slate-300 space-y-2 font-mono">
                  <div><span className="text-slate-500">Cliente:</span> {name}</div>
                  <div><span className="text-slate-500">Empresa:</span> {company || "Não fornecido"}</div>
                  <div><span className="text-slate-500">Porte:</span> {businessSize}</div>
                  <div><span className="text-slate-500">Tecnologias Selecionadas:</span></div>
                  <ul className="list-disc list-inside text-cyan-300 pl-2 text-xs space-y-1 font-sans mt-1">
                    {serviceOptions
                      .filter((s) => selectedServices.includes(s.id))
                      .map((s) => (
                        <li key={s.id}>{s.label}</li>
                      ))}
                  </ul>
                  <div className="pt-2 border-t border-slate-900 mt-2 flex justify-between font-sans">
                    <span className="text-slate-400 font-medium">Investimento Estimado:</span>
                    <span className="text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded text-xs border border-cyan-800/30">
                      Custo-Benefício Sob Medida
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20 active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enviar via WhatsApp</span>
                </a>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 font-semibold text-sm transition-all cursor-pointer active:scale-98"
                >
                  Fazer Nova Simulação
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
