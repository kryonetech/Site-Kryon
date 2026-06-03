import React from "react";
import { Handshake, HelpCircle, ShieldCheck, Milestone } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <section id="sobre" className="relative py-20 px-4 bg-slate-900/10 border-t border-slate-900/60 overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-cyan-950/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Vision Statements */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-cyan-400 text-xs font-mono font-semibold tracking-widest uppercase block">
              Conheça Nossa Missão
            </span>
            
            {/* The exact text requested by the user, highlighted beautifully */}
            <h2 className="text-2xl md:text-3xl font-display font-medium text-slate-100 leading-relaxed tracking-tight">
              "A <strong className="text-white font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-450 via-cyan-400 to-teal-400">KRYON E-TECH</strong> nasceu para tornar a tecnologia mais acessível para pequenas empresas. Criamos soluções digitais modernas, inteligentes e fáceis de usar, ajudando negócios a vender mais, organizar processos e economizar tempo."
            </h2>

            <div className="h-px w-20 bg-cyan-500/50 mt-6" />
          </div>

          {/* Right Block: Core Values / Company Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/65 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 flex items-center justify-center mb-4">
                <Handshake className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-semibold text-white font-display mb-2">Parceria Próxima</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Acompanhamos sua equipe em cada etapa de implantação. Nada de solidão com softwares desconhecidos.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/65 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-semibold text-white font-display mb-2">Tecnologia sem Frescura</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Código limpo, arquitetura veloz e sem jargões corporativos. Focamos no que traz vendas e organização.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/65 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 flex items-center justify-center mb-4">
                <Milestone className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-semibold text-white font-display mb-2">Foco no Custo-Benefício</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                A menor infraestrutura possível para o maior resultado operacional. Seu bolso respeitado sempre.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/65 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-semibold text-white font-display mb-2">Fácil Adaptabilidade</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Nossos apps PWA e sistemas rodam perfeitamente em celulares mais antigos ou computadores comuns.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
