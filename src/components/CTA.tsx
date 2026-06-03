import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="relative py-32 px-4 bg-brand-bg overflow-hidden border-t border-white/5">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,102,255,0.08)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="inline-flex flex-col items-center justify-center p-12 md:p-16 rounded-[2.5rem] glass-card shadow-[0_0_50px_rgba(0,180,255,0.05)] border-white/10 w-full"
        >
          <Sparkles className="w-10 h-10 text-brand-accent mb-6 opacity-80" />
          
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-6 leading-tight">
            Pronto para levar sua empresa para o <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">próximo nível?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-sans leading-relaxed mb-10">
            Descubra como a tecnologia pode reduzir custos, aumentar produtividade e acelerar seus resultados.
          </p>

          <button
            onClick={() => {
              document.querySelector("#simulador")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white text-brand-bg font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:text-brand-primary cursor-pointer"
          >
            <span className="relative z-10">Falar com um Especialista</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
