import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const plansList = [
  {
    id: "automacoes",
    name: "Automações Essenciais",
    desc: "Para otimizar fluxos de trabalho locais e planilhas integradas.",
    priceSub: "Sob medida",
    features: [
      "Integração via APIs",
      "Automação de planilhas/CRMs",
      "Dashboards informativos",
      "Design System Básico",
      "Suporte ticket"
    ],
    popular: false,
  },
  {
    id: "full-stack",
    name: "Aplicações Full-Stack",
    desc: "Para empresas que precisam do seu próprio software robusto.",
    priceSub: "Premium",
    features: [
      "Plataforma completa em Nuvem",
      "Aplicativo PWA (Web, Mobile)",
      "Agentes de IA Integrados",
      "Acesso por Níveis (Roles)",
      "Design de Alta Fidelidade",
      "Suporte Prioritário"
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise SLA",
    desc: "Equipes de tecnologia sob demanda para grandes operações.",
    priceSub: "Escalável",
    features: [
      "Infraestrutura de alta disponibilidade",
      "Múltiplos serviços e microsserviços",
      "Consultoria de arquitetura contínua",
      "Garantia de Uptime 99.9%",
      "Engenheiros Dedicados",
      "Atendimento 24/7"
    ],
    popular: false,
  }
];

export default function Plans() {
  const handleScrollToSimulator = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#simulador");
    if (target) {
      const headerOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="planos" className="py-24 px-4 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/10 blur-[150px] rounded-[100%] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-6">
             Engenharia avançada, <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">previsibilidade financeira.</span>
          </h2>
          <p className="text-slate-400 font-sans leading-relaxed">
            Esqueça o velho modelo de agências. Nossos pacotes de engajamento são focados no escopo, velocidade e rentabilidade da sua companhia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plansList.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 glass-card border transition-all duration-300 ${
                plan.popular 
                  ? "border-brand-accent/50 bg-brand-primary/5 shadow-[0_0_40px_rgba(0,180,255,0.15)] md:scale-105 z-20" 
                  : "border-white/[0.08] hover:border-white/20 z-10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent font-medium text-white text-xs tracking-wider uppercase shadow-lg">
                  Mais Recomendado
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 min-h-[40px]">{plan.desc}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-white/[0.08]">
                <span className={`text-4xl font-display font-medium ${plan.popular ? 'text-brand-accent' : 'text-white'}`}>
                  {plan.priceSub}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-brand-accent' : 'text-brand-primary'}`} />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleScrollToSimulator}
                className={`w-full py-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                plan.popular 
                  ? "bg-brand-primary hover:bg-brand-primary/90 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]" 
                  : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white"
              }`}>
                Assinar Plano
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
