
import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processStep, setProcessStep] = useState(0);

  const total = items.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
  const formattedTotal = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(total);

  const steps = [
    "Verificando disponibilidad de stock...",
    "Validando credenciales de seguridad...",
    "Generando orden de importación...",
    "Finalizando pedido..."
  ];

  const handleCheckout = () => {
    setShowConfirm(true);
    setIsSuccess(false);
  };

  const confirmPurchase = () => {
    setIsProcessing(true);
    setProcessStep(0);

    const interval = setInterval(() => {
      setProcessStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 800);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 4000);
  };

  const closeAll = () => {
    setShowConfirm(false);
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-black text-white">
            <h2 className="text-xl font-black italic tracking-tighter flex items-center gap-3">
              <div className="bg-[#D4AF37] p-2 rounded-xl">
                <ShoppingBag className="text-black" size={24} />
              </div>
              CARRITO <span className="text-[#D4AF37]">PREMIUM</span>
            </h2>
            <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
              <X size={24} className="text-[#D4AF37]" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-8 no-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-slate-50 p-12 rounded-full mb-6 border border-slate-100 shadow-inner">
                  <ShoppingBag size={80} className="text-slate-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 italic">TU BOLSA ESTÁ VACÍA</h3>
                <p className="text-slate-400 text-sm mt-3 font-medium max-w-[240px] leading-relaxed">
                  Agrega los mejores componentes para tu taller y mejora el rendimiento de tus vehículos.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-10 bg-black text-[#D4AF37] px-10 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl"
                >
                  VOLVER A LA TIENDA
                </button>
              </div>
            ) : (
              items.map((item) => {
                const displayImage = Array.isArray(item.image) ? item.image[0] : item.image;
                return (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-28 h-28 rounded-3xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                      <img src={displayImage} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow flex flex-col py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-black text-slate-900 text-sm line-clamp-1 italic">{item.nombre}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">SKU: {item.sku}</span>
                      <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                          <span className="text-slate-900 font-black text-xs">CANT. {item.quantity}</span>
                        </div>
                        <span className="text-red-600 font-black text-lg">
                          {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(item.precio)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 border-t border-slate-100 bg-[#fafafa] space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Subtotal Bruto</span>
                  <span className="text-slate-900 font-bold">{formattedTotal}</span>
                </div>
                <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                  <span className="text-slate-900 font-black uppercase text-xs tracking-[0.2em]">Total Inversión</span>
                  <span className="text-3xl font-black text-black">{formattedTotal}</span>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-2xl flex items-start gap-3 border border-red-100">
                <div className="bg-red-600 text-white p-1 rounded-lg">
                   <ArrowRight size={14} />
                </div>
                <p className="text-[9px] text-red-800 font-bold uppercase leading-relaxed tracking-tighter">
                  Precios finales exclusivos para Auto Mall. Envío a regiones coordinado tras la compra.
                </p>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-[#D4AF37] py-5 rounded-[24px] font-black text-sm tracking-widest shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1 border-2 border-[#D4AF37]/30"
              >
                PROCESAR PEDIDO SEGURO
              </button>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => !(isProcessing || isSuccess) && setShowConfirm(false)} />
          
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-sm overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
            {!isProcessing && !isSuccess && (
              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                  <AlertCircle className="text-red-600" size={40} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase">¿Confirmar Pedido?</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Estás a punto de procesar una inversión de <span className="text-black font-black">{formattedTotal}</span>. 
                    ¿Deseas continuar con la transacción?
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button 
                    onClick={confirmPurchase}
                    className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-xl"
                  >
                    <CheckCircle size={18} /> SÍ, CONFIRMAR AHORA
                  </button>
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-slate-200 transition-all"
                  >
                    VOLVER AL CARRITO
                  </button>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="p-10 text-center space-y-8">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-red-600 animate-pulse" size={32} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-slate-900 italic uppercase tracking-tight">Procesando Inversión</h3>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600 transition-all duration-500 ease-out"
                      style={{ width: `${((processStep + 1) / steps.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-red-600 font-black uppercase tracking-widest animate-pulse">
                    {steps[processStep]}
                  </p>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="p-8 text-center space-y-6 bg-gradient-to-b from-emerald-50 to-white">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto border-8 border-white shadow-2xl animate-bounce">
                  <CheckCircle className="text-white" size={48} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">¡ÉXITO TOTAL!</h3>
                  <p className="text-sm text-slate-600 font-medium px-4">
                    Su pedido ha sido procesado correctamente. Un ejecutivo de <span className="text-red-600 font-bold">Auto Mall</span> se pondrá en contacto con usted en breve.
                  </p>
                </div>

                <button 
                  onClick={closeAll}
                  className="w-full bg-black text-[#D4AF37] py-5 rounded-3xl font-black text-sm tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-emerald-100"
                >
                  FINALIZAR Y VOLVER
                </button>
              </div>
            )}
            
            <div className={`py-3 text-center transition-colors duration-500 ${isSuccess ? 'bg-emerald-500' : 'bg-black'}`}>
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isSuccess ? 'text-white' : 'text-[#D4AF37]'}`}>
                TRANSACCIÓN SEGURA AUTO MALL
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
