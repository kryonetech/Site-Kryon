import React from "react";
import { BrainCircuit, AppWindow, Network, LineChart, Code, Bot } from "lucide-react";
import { motion } from "motion/react";

const solutions = [
  {
    icon: BrainCircuit,
    title: "Inteligência Artificial",
    desc: "Agentes de IA desenvolvidos sob medida para otimizar atendimento, análise de dados e rotinas internas.",
  },
  {
    icon: AppWindow,
    title: "Aplicativos PWA",
    desc: "Aplicações web progressivas com performance de app nativo. Instalação rápida e suporte offline.",
  },
  {
    icon: Network,
    title: "Sistemas Empresariais",
    desc: "Arquiteturas robustas e escaláveis para ERPs, CRMs e plataformas de gestão unificada.",
  },
  {
    icon: Bot,
    title: "Automação de Processos",
    desc: "Eliminação de rotinas manuais com integrações inteligentes entre sistemas, reduzindo gargalos.",
  },
  {
    icon: LineChart,
    title: "Dashboards Inteligentes",
    desc: "Painéis de Business Intelligence que transformam dados complexos em insights visuais e em tempo real.",
  },
  {
    icon: Code,
    title: "APIs e Integrações",
    desc: "Conectamos todo o seu ecossistema, desde meios de pagamento a logísticas locais e globais.",
  }
];

export default function Solutions() {
  return (
    <section id="solucoes" className="py-24 px-4 bg-brand-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-brand-surface/30" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full glass-card text-brand-primary text-xs font-mono font-medium mb-6 uppercase tracking-wider"
          >
            Nosso Expertise
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-medium text-white mb-6"
          >
            Construindo o <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">futuro</span> da sua empresa
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl glass-card overflow-hidden hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Glow behind icon on hover */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-brand-primary/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:border-brand-primary/50 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3 tracking-tight group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
