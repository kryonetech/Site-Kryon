import React from "react";
import { DollarSign, Shield, Zap, TrendingUp, HandCoins, Laptop } from "lucide-react";
import { motion } from "motion/react";

const benefitsList = [
  {
    id: "custo",
    icon: DollarSign,
    title: "Redução de Custos",
    desc: "Automatize tarefas repetitivas e elimine licenças caras de múltiplas ferramentas desconexas.",
  },
  {
    id: "produtividade",
    icon: Zap,
    title: "Ganho de Produtividade",
    desc: "Suas equipes produzem mais com fluxos de trabalho otimizados por inteligência artificial.",
  },
  {
    id: "crescimento",
    icon: TrendingUp,
    title: "Crescimento Escalável",
    desc: "Sistemas preparados para suportar milhares de acessos sem perder estabilidade ou performance.",
  },
  {
    id: "acesso",
    icon: Laptop,
    title: "Acesso em Qualquer Dispositivo",
    desc: "Aplicações PWA que funcionam perfeitamente em desktop, tablet e mobile.",
  }
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 px-4 bg-brand-surface/20 backdrop-blur-sm relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -left-40 top-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-40 bottom-40 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-accent text-xs font-mono mb-6"
          >
            VANTAGENS EXCLUSIVAS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-medium text-white mb-6 tracking-tight"
          >
            Resultados reais, <br/><span className="text-brand-accent">sem enrolação.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 font-sans leading-relaxed"
          >
            Nossa arquitetura prioriza velocidade, segurança e lucro para o seu negócio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {benefitsList.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex gap-6 p-8 rounded-2xl glass-card transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,180,255,0.15)] hover:border-brand-accent/30"
              >
                {/* Spotlight effect for specific dark style */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                <div className="flex-shrink-0 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-brand-primary group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,180,255,0.3)]">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                {/* Arrow hint icon */}
                <div className="absolute top-8 right-8 text-white/5 group-hover:text-brand-accent/30 transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
