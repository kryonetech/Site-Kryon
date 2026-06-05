import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, User, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { aiService, ChatMessage } from '../services/kryonAIService';

interface KryonAIConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KryonAIConsultant({ isOpen, onClose }: KryonAIConsultantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Lead Form State
  const [leadForm, setLeadForm] = useState({ nome: '', empresa: '', telefone: '', email: '', mensagem: '' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [extractedData, setExtractedData] = useState<any>({});

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start with initial greeting
      setIsTyping(true);
      setTimeout(() => {
        setMessages([aiService.getInitialGreeting()]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };
    
    // Convert current messages into history format for the AI
    // We only care about user and bot messages.
    const messageHistory = messages
      .filter(m => m.type === 'user' || m.type === 'bot')
      .map(m => {
        return m.type === 'user' 
          ? { user: m.content } 
          : { model: m.content };
      });

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await aiService.processUserQuery(text, messageHistory);
      
      if (response.message.extractedData) {
        setExtractedData(response.message.extractedData);
      }

      setMessages(prev => {
        let newMessages = [...prev, response.message];
        
        if (response.needsLeadCapture) {
            newMessages.push({
               id: crypto.randomUUID(),
               type: 'lead_form',
               content: 'Posso encaminhar sua necessidade para a equipe da Kryon preparar uma análise gratuita?',
               timestamp: new Date()
            });
        }
        
        return newMessages;
      });
    } catch (error) {
      console.error("Erro ao processar mensagem", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionsClick = (option: string) => {
     handleSendMessage(option);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setLeadError('');
    
    const leadDataToSend = {
      ...leadForm,
      ...extractedData
    };

    const success = await aiService.saveLead(leadDataToSend);
    
    setIsSubmittingLead(false);
    
    if (success) {
      setLeadSuccess(true);
      setTimeout(() => {
         setMessages(prev => [...prev, {
            id: crypto.randomUUID(),
            type: 'bot',
            content: 'Solicitação enviada com sucesso! 🚀 Nossa equipe comercial entrará em contato em breve para conversar sobre o seu projeto.',
            timestamp: new Date()
         }]);
      }, 1000);
    } else {
      setLeadError('Houve um erro ao enviar. Tente novamente mais tarde.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100%-2rem)] sm:w-[400px] h-[550px] max-h-[85vh] z-[1000] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden shadow-brand-primary/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/50 relative">
                   <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping opacity-75"></div>
                  <Bot className="w-6 h-6 text-brand-primary relative z-10" />
                </div>
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    Kryon AI Consultant
                  </h3>
                  <p className="text-xs text-slate-400">Seu consultor digital de tecnologia</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 relative bg-slate-900 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    {msg.type !== 'lead_form' && (
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        msg.type === 'user' ? 'bg-slate-700' : 'bg-brand-primary/20 border border-brand-primary/50'
                        }`}>
                        {msg.type === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-brand-primary" />}
                        </div>
                    )}

                    {/* Message Bubble */}
                    <div className="space-y-3 w-full">
                        {msg.type === 'lead_form' ? (
                             <div className="bg-slate-800/80 border border-brand-primary/30 p-5 rounded-2xl w-full">
                                {leadSuccess ? (
                                    <div className="text-center py-4 text-emerald-400 flex flex-col items-center">
                                       <CheckCircle2 className="w-12 h-12 mb-2" />
                                       <span className="font-medium">Análise Gratuita Solicitada!</span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                                        <p className="text-sm text-slate-300 mb-4">{msg.content}</p>
                                        <div>
                                            <input required type="text" placeholder="Seu Nome *" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm" value={leadForm.nome} onChange={e => setLeadForm({...leadForm, nome: e.target.value})} />
                                        </div>
                                        <div>
                                            <input required type="text" placeholder="Sua Empresa *" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm" value={leadForm.empresa} onChange={e => setLeadForm({...leadForm, empresa: e.target.value})} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input required type="tel" placeholder="WhatsApp *" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm" value={leadForm.telefone} onChange={e => setLeadForm({...leadForm, telefone: e.target.value})} />
                                            <input type="email" placeholder="E-mail (Opcional)" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} />
                                        </div>
                                        <div>
                                            <textarea required placeholder="Resumo do projeto *" rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm resize-none" value={leadForm.mensagem} onChange={e => setLeadForm({...leadForm, mensagem: e.target.value})} />
                                        </div>
                                        
                                        {leadError && (
                                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{leadError}</span>
                                            </div>
                                        )}

                                        <button disabled={isSubmittingLead} type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-slate-900 font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                            {isSubmittingLead ? (
                                                <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                                            ) : (
                                                <>🚀 Receber Análise Gratuita</>
                                            )}
                                        </button>
                                    </form>
                                )}
                             </div>
                        ) : (
                            <div className={`p-4 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                            msg.type === 'user'
                                ? 'bg-slate-800 text-white rounded-tr-sm shadow-inner'
                                : 'bg-slate-800 border border-slate-700 text-slate-300 rounded-tl-sm shadow-md'
                            }`}>
                            {msg.content}
                            </div>
                        )}

                        {/* Options Buttons */}
                        {msg.options && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {msg.options.map(option => (
                                    <button
                                      key={option}
                                      onClick={() => handleOptionsClick(option)}
                                      className="text-xs bg-slate-800 border border-brand-primary/30 hover:bg-brand-primary/20 text-brand-primary px-3 py-1.5 rounded-full transition-colors font-medium flex items-center gap-1"
                                    >
                                        {option} <ChevronRight className="w-3 h-3" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                   <div className="flex gap-3 max-w-[85%] flex-row">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/50 flex-shrink-0 flex items-center justify-center">
                         <Bot className="w-4 h-4 text-brand-primary" />
                      </div>
                      <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                      </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {(!leadSuccess && !isSubmittingLead) && (
              <div className="p-4 bg-slate-900 border-t border-white/10 relative z-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-primary rounded-xl opacity-20 blur-md group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative flex items-center bg-slate-800/80 border border-slate-700 focus-within:border-brand-primary/50 rounded-xl overflow-hidden transition-colors">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Digite sua dúvida..."
                      className="flex-1 bg-transparent border-none px-4 py-3 text-white placeholder:text-slate-500 focus:ring-0 outline-none text-sm"
                      disabled={isSubmittingLead || leadSuccess}
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isSubmittingLead || leadSuccess}
                      className="p-3 text-brand-primary hover:text-cyan-300 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Subtle glow border at bottom */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 relative z-10"></div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
