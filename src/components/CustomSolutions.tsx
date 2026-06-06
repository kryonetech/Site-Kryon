import React from "react";
import { motion } from "motion/react";
import { 
  Smartphone, 
  Bot, 
  Database, 
  Workflow, 
  ArrowRight, 
  ArrowDown, 
  Check, 
  Sparkles, 
  Mail,
  ChevronDown
} from "lucide-react";
import { useLeadModal } from "../LeadModalContext";

export default function CustomSolutions() {
  const { openModal } = useLeadModal();

  const solutions = [
    {
      id: "pwa",
      title: "Aplicativos PWA",
      icon: Smartphone,
      accent: "from-blue-500 to-cyan-400",
      desc: "Desenvolvemos aplicativos modernos que funcionam em celulares, tablets e computadores sem necessidade de instalação nas lojas.",
      possibleFeatures: [
        "Login de usuários com múltiplos perfis",
        "Área do cliente dedicada",
        "Notificações instantâneas",
        "Integrações de alto desempenho",
        "Painéis administrativos integrados"
      ]
    },
    {
      id: "ia",
      title: "Inteligência Artificial",
      icon: Bot,
      accent: "from-indigo-500 to-purple-400",
      desc: "Automatize tarefas complexas, analise comportamentos e otimize processos estratégicos utilizando IA.",
      possibleFeatures: [
        "Chatbots inteligentes contextuais",
        "Atendimento automatizado integrado",
        "Classificação e estruturação de dados",
        "Geração inteligente de relatórios",
        "Agentes autônomos de IA"
      ]
    },
    {
      id: "systems",
      title: "Sistemas Empresariais",
      icon: Database,
      accent: "from-blue-600 to-indigo-500",
      desc: "Soluções corporativas completas, modeladas para otimizar toda a operação e gestão do seu negócio.",
      possibleFeatures: [
        "Cadastros relacionais dinâmicos",
        "Controle centralizado de clientes",
        "Fluxos de controle financeiro avançado",
        "Mapeamento de gestão operacional",
        "Relatórios analíticos em tempo real"
      ]
    },
    {
      id: "automation",
      title: "Integrações e Automação",
      icon: Workflow,
      accent: "from-cyan-500 to-teal-400",
      desc: "Conectamos os seus sistemas legados para eliminar tarefas manuais e erros operacionais de ponta a ponta.",
      possibleFeatures: [
        "APIs customizadas robustas",
        "Sistemas de Notificação e Disparadores",
        "Sincronização com múltiplos CRMs",
        "Sistemas integrados de ERP",
        "Conexões automáticas com Planilhas",
        "Fluxos automatizados de processos"
      ]
    }
  ];

  const factors = [
    "Banco de dados",
    "Cadastro de clientes",
    "Catálogo de produtos",
    "Área administrativa",
    "Login de usuários",
    "Relatórios integrados",
    "Integrações externas",
    "Aplicativos mobile",
    "Inteligência Artificial",
    "Dashboards",
    "Automações"
  ];

  return (
    <section id="solucoes-sob-medida" className="py-24 md:py-32 relative overflow-hidden border-t border-white/[0.03]">
      {/* Premium ambient light effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/15 text-brand-accent text-xs font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>DESENVOLVIMENTO DE SOFTWARE PERSONALIZADO</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-6 tracking-tight leading-tight"
          >
            Aplicativos e Sistemas desenvolvidos para <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary font-bold">o seu negócio.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 font-sans leading-relaxed text-base md:text-lg"
          >
            Cada empresa possui necessidades únicas. Por isso desenvolvemos soluções personalizadas, escaláveis e inteligentes, projetadas para resolver desafios reais e impulsionar resultados.
          </motion.p>
        </div>

        {/* 4 Custom Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto mb-20 md:mb-28">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl p-6 md:p-8 bg-white/[0.02] border border-white/[0.05] hover:border-brand-accent/30 hover:bg-brand-primary/[0.02] hover:shadow-[0_0_30px_rgba(0,180,255,0.08)] flex flex-col justify-between transition-all duration-300 overflow-hidden"
              >
                {/* Visual hover border glow subtle gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-brand-accent group-hover:text-white group-hover:bg-brand-primary/25 group-hover:border-brand-accent/40 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white group-hover:text-brand-accent transition-colors">
                      {solution.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                    {solution.desc}
                  </p>

                  <div className="w-full h-px bg-white/[0.06] mb-5" />

                  <div className="text-slate-500 text-[11px] font-mono uppercase tracking-widest mb-4">
                    Recursos Possíveis:
                  </div>

                  <ul className="space-y-3 mb-8">
                    {solution.possibleFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                        <div className="mt-1 bg-brand-accent/10 text-brand-accent p-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="text-slate-200">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openModal(solution.title)}
                  className="w-full mt-auto py-3.5 px-4 rounded-xl font-medium text-xs font-mono uppercase tracking-wider text-slate-300 group-hover:text-white border border-white/[0.08] bg-white/[0.01] hover:bg-brand-primary/20 hover:border-brand-accent/40 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                >
                  <span>Analisar este escopo</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Complexity/Resource Investment Section */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.01] border border-white/[0.04] p-8 md:p-12 rounded-3xl relative overflow-hidden backdrop-blur-md">
            
            {/* Left Col - Context & Explanation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">
                <span>COMPLEXIDADE & ESCOPO</span>
              </div>
              <h3 className="text-2xl md:text-3.5xl font-display font-medium text-white tracking-tight leading-tight">
                O investimento de cada projeto varia conforme os recursos necessários.
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Não trabalhamos com pacotes fechados ou limitações artificiais. A engenharia do seu sistema é desenhada especificamente considerando a escala do banco de dados, fluxos de automações, conectores e funcionalidades solicitadas.
              </p>
              
              {/* Factor Tags Grid */}
              <div className="flex flex-wrap gap-2.5 pt-4">
                {factors.map((factor, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300 font-sans hover:text-white hover:border-brand-accent/25 hover:bg-brand-primary/5 transition-colors duration-200"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col - High Tech Visual Flow Component */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-brand-surface/40 border border-white/[0.06] p-6 md:p-8 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/5 blur-xl rounded-full pointer-events-none" />
              
              <div className="text-center w-full space-y-4 relative z-10">
                {/* Resource Top */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
                  <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block mb-1">Volume de Requisitos</span>
                  <span className="text-base font-semibold text-white uppercase tracking-wider block">Mais recursos</span>
                </div>
                
                {/* Arrow down 1 */}
                <div className="flex justify-center text-brand-accent animate-bounce py-1">
                  <ArrowDown className="w-5 h-5 stroke-[2.5]" />
                </div>
                
                {/* Development Mid */}
                <div className="p-4 rounded-xl bg-brand-primary/10 border border-brand-primary/30 shadow-[0_0_15px_rgba(0,102,255,0.15)] transform hover:scale-[1.02] transition-transform duration-300">
                  <span className="text-[11px] font-mono tracking-widest text-brand-accent uppercase block mb-1">Engenharia Customizada</span>
                  <span className="text-base font-semibold text-brand-accent uppercase tracking-wider block">Maior nível de desenvolvimento</span>
                </div>

                {/* Arrow down 2 */}
                <div className="flex justify-center text-brand-accent animate-bounce py-1">
                  <ArrowDown className="w-5 h-5 stroke-[2.5]" />
                </div>

                {/* Robust Project End */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary/80 text-white shadow-[0_0_25px_rgba(0,180,255,0.3)] transform hover:scale-[1.02] transition-transform duration-300">
                  <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase block mb-1">Resultado Final</span>
                  <span className="text-base font-bold uppercase tracking-wider block">Projeto mais robusto</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Final call to action card within the same section context */}
        <div className="max-w-4xl mx-auto pt-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-brand-surface to-brand-bg p-8 md:p-12 text-center shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-accent/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-primary/10 blur-3xl rounded-full pointer-events-none" />

            <h3 className="text-2xl md:text-3.5xl font-display font-medium text-white tracking-tight mb-4 relative z-10 leading-tight">
              Vamos desenvolver a solução ideal para sua empresa?
            </h3>
            
            <p className="text-slate-300 max-w-xl font-sans text-sm md:text-base leading-relaxed mb-8 relative z-10">
              Nossa equipe analisa sua necessidade e cria uma proposta personalizada baseada nos objetivos e funcionalidades do seu projeto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative z-10">
              <button
                onClick={() => openModal("Outro")}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] cursor-pointer"
              >
                <span>Solicitar Análise do Projeto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openModal("Outro")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Mail className="w-4 h-4 text-brand-accent" />
                <span>Falar com Especialista</span>
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
