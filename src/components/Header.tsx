import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "#" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Planos", href: "#planos" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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

  const handleBudgetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector("#simulador");
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-surface/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-transparent py-5"
        }`}
      >
        {scrolled && (
          <div className="absolute inset-0 bg-brand-primary/5 blur-xl -z-10" />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" onClick={(e) => handleScrollTo(e, "#")} className="flex items-center group">
              <Logo className="h-11 md:h-14 transition-transform duration-300 group-hover:scale-105" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="text-sm font-medium text-slate-300 hover:text-white font-sans transition-colors duration-200 tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Action Button */}
            <div className="hidden md:block">
              <button
                onClick={handleBudgetClick}
                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(0,180,255,0.05)] hover:shadow-[0_0_20px_rgba(0,180,255,0.1)] hover:border-brand-accent/30 cursor-pointer"
              >
                Solicitar orçamento
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-brand-accent active:bg-white/5 transition-colors cursor-pointer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-brand-surface border-b border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="block text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl px-4 py-3 transition-colors font-sans"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={handleBudgetClick}
                    className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-medium text-sm text-center flex items-center justify-center transition-all cursor-pointer box-border"
                  >
                    Solicitar orçamento
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacemaker to avoid layout jump with fixed header */}
      <div className="h-20" />
    </>
  );
}
