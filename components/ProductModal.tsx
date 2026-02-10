
import React, { useState } from 'react';
import { X, ShoppingCart, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2, Package, Ruler } from 'lucide-react';
import { Product } from '../types';

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
};

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const [activeImg, setActiveImg] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  
  const imgList = Array.isArray(product.image) ? product.image : [product.image];

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(product.precio);

  const nextImg = () => setActiveImg((prev) => (prev === imgList.length - 1 ? 0 : prev + 1));
  const prevImg = () => setActiveImg((prev) => (prev === 0 ? imgList.length - 1 : prev - 1));

  const handleImgError = (idx: number) => {
    setImgErrors(prev => ({ ...prev, [idx]: true }));
  };

  const getImgUrl = (idx: number) => {
    if (imgErrors[idx]) {
      return `https://images.unsplash.com/photo-1486006920555-c77dcf18193b?auto=format&fit=crop&q=80&w=1200&sig=${product.id}-${idx}`;
    }
    return imgList[idx];
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="bg-white w-full max-w-6xl rounded-[40px] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-full max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-3 bg-black/5 hover:bg-red-600 hover:text-white rounded-2xl transition-all"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-3/5 bg-slate-50 relative flex flex-col">
          <div className="flex-grow relative overflow-hidden flex items-center justify-center">
            <img 
              src={getImgUrl(activeImg)} 
              alt={product.nombre}
              className="w-full h-full object-contain transition-transform duration-700 hover:scale-110"
              onError={() => handleImgError(activeImg)}
            />
            
            {imgList.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-6 p-4 bg-white/90 hover:bg-white rounded-full shadow-2xl">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImg} className="absolute right-6 p-4 bg-white/90 hover:bg-white rounded-full shadow-2xl">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100 flex gap-4 overflow-x-auto no-scrollbar justify-center">
            {imgList.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all flex-shrink-0 ${
                  activeImg === idx ? 'border-red-600 scale-105 shadow-lg' : 'border-transparent opacity-50'
                }`}
              >
                <img 
                  src={getImgUrl(idx)} 
                  className="w-full h-full object-cover"
                  onError={() => handleImgError(idx)}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col bg-white">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest">
                {product.estado}
              </span>
              <span className="text-slate-300 font-black text-xs uppercase tracking-tighter">SKU: {product.sku}</span>
            </div>

            <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none uppercase">
              {product.nombre}
            </h2>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-red-600">{formattedPrice}</span>
            </div>

            <div className="py-6 border-y border-slate-100 space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Especificaciones Técnicas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <Package size={18} className="text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Stock: {product.stock} Unids</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Ruler size={18} className="text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Marca: {product.marca}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <ShieldCheck size={18} className="text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Garantía Real</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Importado</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              {product.descripcion}
            </p>
          </div>

          <div className="mt-auto pt-10">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full bg-black text-[#D4AF37] py-6 rounded-3xl font-black text-sm tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 group"
            >
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              AGREGAR AL PEDIDO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
