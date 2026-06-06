import React from "react";
import Logo from "./Logo";
import { Phone, Mail, MapPin, ArrowUp, Send, MessageSquare } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-surface/20 backdrop-blur-md border-t border-white/5 text-slate-400 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 space-y-6">
            <a href="#" onClick={handleScrollToTop} className="inline-block group">
              <Logo className="h-11 md:h-14 transition-transform duration-300 group-hover:scale-105" />
            </a>
            
            <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm">
              Desenvolvemos sistemas web, aplicações PWA responsivas, automações inteligentes de processos e soluções de inteligência artificial de alta performance.
            </p>
            
            <p className="text-sm font-semibold text-slate-200">
              Inteligência Artificial &bull; Aplicativos PWA &bull; Sistemas Empresariais &bull; Automação
            </p>

            <div className="text-xs font-mono text-brand-primary font-medium tracking-wider uppercase">
              Tecnologia sem limites.
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-sm font-medium text-white tracking-wide">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" onClick={handleScrollToTop} className="text-slate-400 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#solucoes" onClick={(e) => handleScrollToSection(e, "#solucoes")} className="text-slate-400 hover:text-white transition-colors">
                  Soluções
                </a>
              </li>
              <li>
                <a href="#beneficios" onClick={(e) => handleScrollToSection(e, "#beneficios")} className="text-slate-400 hover:text-white transition-colors">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#solucoes-sob-medida" onClick={(e) => handleScrollToSection(e, "#solucoes-sob-medida")} className="text-slate-400 hover:text-white transition-colors">
                  Soluções Sob Medida
                </a>
              </li>
              <li>
                <a href="#criacao-sites" onClick={(e) => handleScrollToSection(e, "#criacao-sites")} className="text-slate-400 hover:text-white transition-colors">
                  Criação de Sites
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-sm font-medium text-white tracking-wide">
              Fale Conosco
            </h4>
            
            <ul className="space-y-5 text-sm font-sans">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-0.5">Contato corporativo</div>
                  <a
                    href="mailto:contato@kryonetech.com"
                    className="text-white hover:text-brand-primary font-mono transition-colors"
                  >
                    contato@kryonetech.com
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <div className="text-xs font-medium text-slate-500 mb-0.5">Operações</div>
                  <span className="text-white">Remoto & Digital (Global)</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Technologies / Powered By */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
              Powered By
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-semibold text-slate-400 flex items-center gap-2 hover:bg-white/10 hover:text-white transition-colors cursor-default">
              Google
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-semibold text-slate-400 flex items-center gap-2 hover:bg-white/10 hover:text-white transition-colors cursor-default">
              OpenAI
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-semibold text-slate-400 flex items-center gap-2 hover:bg-white/10 hover:text-white transition-colors cursor-default">
              WhatsApp
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-slate-500">
            &copy; {currentYear} KRYON E-TECH. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Voltar para o topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
