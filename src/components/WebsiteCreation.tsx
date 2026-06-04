import React from "react";
import { Check, ArrowRight, Sparkles, Shield, Rocket, Flame, Mail, Database, Smartphone, Globe, Layers } from "lucide-react";
import { motion } from "motion/react";

export default function WebsiteCreation() {
  const getEmailLink = (planName: string) => {
    const defaultEmail = "contato@kryonetech.com";
    const subject = `Orçamento - ${planName}`;
    const text = `Olá KRYON E-TECH!\n\nTenho interesse no serviço de Criação de Sites para a minha empresa. Gostaria de receber um orçamento para o "${planName}".\n\nAguardo retorno para conversarmos sobre o meu projeto!`;
    return `mailto:${defaultEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  const getGeneralEmailLink = () => {
    const defaultEmail = "contato@kryonetech.com";
    const subject = "Orçamento de Criação de Site";
    const text = `Olá KRYON E-TECH!\n\nGostaria de falar com um especialista sobre a Criação de um Site Profissional para minha empresa. Podem me passar mais detalhes?`;
    return `mailto:${defaultEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  const creativePlans = [
    {
      id: "start",
      name: "Plano Start",
      icon: Globe,
      badge: "Para Começar",
      desc: "Ideal para empresas que precisam começar com presença digital profissional.",
      features: [
        "Site institucional",
        "Página inicial moderna",
        "Botão de Atendimento Rápido",
        "Design responsivo",
        "SEO básico",
        "Formulário de contato"
      ],
      popular: false,
      ctaLabel: "Solicitar orçamento",
    },
    {
      id: "business",
      name: "Plano Business",
      icon: Rocket,
      badge: "Mais Escolhido",
      desc: "Ideal para empresas que precisam de mais estrutura, páginas internas e apresentação completa dos serviços.",
      features: [
        "Site com múltiplas páginas",
        "Página de serviços",
        "Página sobre a empresa",
        "Integração com Canais de Contato",
        "Formulários personalizados",
        "Otimização para celular",
        "Design premium"
      ],
      popular: true,
      ctaLabel: "Solicitar orçamento",
    },
    {
      id: "advanced",
      name: "Plano Advanced",
      icon: Layers,
      badge: "Sob Medida",
      desc: "Ideal para empresas que precisam de recursos avançados, área administrativa e funcionalidades personalizadas.",
      features: [
        "Banco de dados completo",
        "Cadastro de clientes",
        "Catálogo de produtos ou serviços",
        "Painel administrativo (CMS)",
        "Login e segurança de usuários",
        "Integrações com sistemas externos",
        "Relatórios e dashboards integrados",
        "Recursos de engenharia sob medida"
      ],
      popular: false,
      ctaLabel: "Solicitar orçamento personalizado",
    }
  ];

  return (
    <section id="criacao-sites" className="py-24 md:py-32 px-4 bg-brand-bg relative overflow-hidden border-t border-slate-900">
      {/* Premium background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Thin elegant glowing top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header containing visual badge and core pitch */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-accent text-xs font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>CRIAÇÃO DE SITES PROFISSIONAIS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-6 tracking-tight leading-tight"
          >
            Sites profissionais para empresas que <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary font-bold">querem vender mais.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 font-sans leading-relaxed text-base md:text-lg"
          >
            Criamos websites modernos, rápidos e responsivos, desenvolvidos para transmitir confiança, atrair clientes e facilitar o crescimento da sua empresa no digital.
          </motion.p>
        </div>

        {/* Dynamic Responsive Pricing Cards Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-16 md:mb-20">
          {creativePlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative rounded-3xl p-6 md:p-8 glass-card border flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "border-brand-primary/60 bg-brand-primary/5 shadow-[0_0_35px_rgba(0,102,255,0.18)] lg:scale-[1.03] z-20"
                    : "border-white/[0.06] hover:border-brand-accent/20 z-10 hover:shadow-[0_0_25px_rgba(0,180,255,0.06)]"
                }`}
              >
                {/* Popular highlight pill with elegant subtle blue pulsing */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent font-sans font-semibold text-white text-[11px] tracking-wider uppercase shadow-[0_0_15px_rgba(0,102,255,0.4)] flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl ${plan.popular ? "bg-brand-primary/15 text-brand-accent border border-brand-primary/30" : "bg-white/5 text-slate-300 border border-white/5"}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {!plan.popular && (
                      <span className="text-xs font-mono text-slate-500 font-medium bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-white mb-3">
                    {plan.name}
                  </h3>
                  
                  <p className="text-sm text-slate-400 leading-relaxed font-sans min-h-[48px] border-b border-white/[0.06] pb-5 mb-5 md:pb-6 md:mb-6">
                    {plan.desc}
                  </p>

                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-4">
                    Instalações Inclusas:
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300">
                        <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${plan.popular ? "bg-brand-accent/10 border border-brand-accent/20 text-brand-accent" : "bg-white/5 text-brand-primary"}`}>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-sm leading-tight text-slate-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={getEmailLink(plan.name)}
                  className={`w-full py-4 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? "bg-brand-primary hover:bg-brand-primary/90 text-white shadow-[0_0_20px_rgba(0,102,255,0.45)] hover:shadow-[0_0_30px_rgba(0,102,255,0.65)] hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:border-brand-accent/30 hover:scale-[1.01] active:scale-[0.98]"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>{plan.ctaLabel}</span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Advisory info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto rounded-2xl border border-white/[0.04] bg-brand-surface/40 p-6 md:p-8 backdrop-blur-md mb-20 shadow-inner"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-3 text-brand-accent flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-4">
              <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed">
                “O investimento varia conforme a complexidade do projeto, quantidade de páginas, integrações, banco de dados, catálogo, cadastros, área administrativa e funcionalidades personalizadas.”
              </p>
              <p className="text-slate-400 font-sans text-sm md:text-base leading-relaxed border-t border-white/[0.05] pt-4">
                “Quanto mais recursos o sistema possuir, maior será o nível de desenvolvimento necessário. Por isso, cada projeto é analisado individualmente para entregar a melhor solução com o melhor custo-benefício.”
              </p>
            </div>
          </div>
        </motion.div>

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
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-accent/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-primary/10 blur-3xl rounded-full" />

            <h3 className="text-2xl md:text-3.5xl font-display font-medium text-white tracking-tight mb-4 relative z-10 leading-tight">
              Pronto para ter um site profissional para sua empresa?
            </h3>
            
            <p className="text-slate-300 max-w-xl font-sans text-sm md:text-base leading-relaxed mb-8 relative z-10">
              Fale com a KRYON E-TECH e receba uma proposta personalizada de acordo com a necessidade do seu negócio.
            </p>

            <a
              href={getGeneralEmailLink()}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-medium text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] relative z-10 cursor-pointer"
            >
              <span>Solicitar orçamento agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
