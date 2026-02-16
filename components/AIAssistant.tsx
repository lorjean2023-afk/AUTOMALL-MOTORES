
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Zap, Truck, ShieldCheck, ShoppingCart } from 'lucide-react';
import { getMechanicalAdvice } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '¡Hola! Soy tu Asistente de Ventas de Auto Mall. ¿Buscas algún motor en específico o tienes dudas sobre nuestros despachos a regiones?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: '¿Hacen envíos?', icon: <Truck size={12} />, prompt: '¿Cómo funcionan los despachos a regiones?' },
    { label: 'Garantía', icon: <ShieldCheck size={12} />, prompt: '¿Qué garantía tienen los motores usados?' },
    { label: 'Precios Zofri', icon: <Zap size={12} />, prompt: '¿Por qué los precios son más baratos en Zofri?' },
    { label: 'Stock Actual', icon: <ShoppingCart size={12} />, prompt: '¿Tienen stock disponible de motores Toyota o SsangYong?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;
    
    const userMsg = textToSend;
    if (!customPrompt) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const advice = await getMechanicalAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: advice || 'Error al procesar consulta.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Tenemos una alta demanda. ¿Podrías intentar nuevamente en unos segundos?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón Flotante Principal */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-red-600 p-5 rounded-3xl shadow-2xl hover:bg-red-600 hover:text-white transition-all z-40 animate-pulse hover:animate-none group border-2 border-red-600/30"
      >
        <Bot size={30} />
        <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest border border-slate-100">
          Asistente de Ventas IA
        </span>
      </button>

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[calc(100vw-48px)] max-w-[420px] h-[650px] bg-white rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] z-50 flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-12 duration-500">
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-black via-slate-900 to-black p-6 flex items-center justify-between text-white border-b border-red-600/20">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-900/40 relative">
                <Bot size={24} className="text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse"></span>
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest italic">VENTAS <span className="text-red-600">AUTO MALL</span></h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Consultor Comercial 24/7</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/5 p-2 rounded-xl hover:bg-red-600 transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#f8f9fa] no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-xs font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-red-600 text-white rounded-br-none' 
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

          {/* Acciones Rápidas */}
          <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-white">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action.prompt)}
                className="flex-shrink-0 flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>

          {/* Entrada de Texto */}
          <div className="p-6 bg-white border-t border-slate-50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Escribe tu consulta de ventas..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 px-5 pr-14 text-xs font-bold focus:border-red-600 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-red-600 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex justify-center items-center gap-6 mt-4 opacity-50">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Ventas Seguras</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Soporte Técnico</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Logística Chile</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
