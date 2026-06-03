import React from "react";
import { ArrowRight, ChevronDown, Rocket, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const handleScrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden bg-brand-bg px-4 py-12 md:py-24">
      {/* Visual cyber mesh backdrops and blue-glow ambient orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-70" />
      
      {/* Light highlights / glow bubbles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-[100%] bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      {/* Grid lines for depth */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-brand-light text-xs font-mono mb-8 hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(0,180,255,0.1)]"
        >
          <Cpu className="w-4 h-4 text-brand-accent" />
          <span className="font-semibold tracking-wide text-brand-light/90">TECNOLOGIA ACESSÍVEL PARA PMEs</span>
          <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_#00B4FF]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-normal tracking-tight text-white leading-[1.1] max-w-4xl"
        >
          Inteligência Artificial e Software para impulsionar{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">
            a sua empresa.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed font-sans"
        >
          Soluções inteligentes, automação e aplicativos modernos para empresas que desejam crescer sem aumentar sua complexidade.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => handleScrollToSection("#simulador")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] border border-brand-primary/50 group"
          >
            <span>Solicitar Demonstração</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => handleScrollToSection("#solucoes")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <span>Conhecer Soluções</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          onClick={() => handleScrollToSection("#solucoes")}
          className="mt-20 text-slate-500 hover:text-brand-accent transition-colors hidden md:flex flex-col items-center gap-2 cursor-pointer animate-bounce"
          aria-label="Rolar para soluções"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">Descubra</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
