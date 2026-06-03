import React from "react";
import { Users, Code2, Clock, Star } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Projetos Entregues", value: "200+", icon: Code2 },
  { label: "Sistemas Desenvolvidos", value: "85+", icon: Users },
  { label: "Horas Automatizadas/Mês", value: "50k+", icon: Clock },
  { label: "Satisfação dos Clientes", value: "99%", icon: Star },
];

export default function SocialProof() {
  return (
    <section className="relative py-20 px-4 bg-brand-surface border-y border-white/5 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight"
          >
            Empresas que buscam inovação escolhem a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">KRYON E-TECH.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4 border border-brand-primary/20 text-brand-accent">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-mono text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400 font-sans text-center">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
