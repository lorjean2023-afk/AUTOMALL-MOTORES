
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { getMechanicalAdvice } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '¡Bienvenido a Auto Mall Alto Hospicio! Soy tu consultor mecánico IA. ¿Qué motor o repuesto estás buscando hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const advice = await getMechanicalAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: advice || 'Error al procesar consulta técnica.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Disculpa, tenemos una alta demanda técnica. ¿Podrías intentar nuevamente?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-red-600 p-5 rounded-3xl shadow-2xl hover:bg-red-600 hover:text-white transition-all z-40 animate-bounce hover:animate-none group border-2 border-red-600/30"
      >
        <MessageSquare size={30} />
        <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest border border-slate-100">
          Consultor Técnico IA
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[calc(100vw-48px)] max-w-[400px] h-[600px] bg-white rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.2)] z-50 flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="bg-black p-6 flex items-center justify-between text-white border-b border-red-600/20">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-900/40">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest italic">Expert IA <span className="text-red-600">Auto Mall</span></h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#E11D48]"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Soporte Técnico Activo</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/5 p-2 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#fcfcfc] no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-red-600 text-white rounded-br-none shadow-red-100' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-slate-50 bg-white">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Pregúntame sobre compatibilidad..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] py-4 px-5 pr-14 text-xs font-bold focus:border-red-600 focus:bg-white outline-none transition-all placeholder:text-slate-300"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-red-600 p-3 rounded-[15px] hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-400 mt-4 font-black uppercase tracking-widest opacity-60">
              IA certificada Auto Mall Alto Hospicio
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
