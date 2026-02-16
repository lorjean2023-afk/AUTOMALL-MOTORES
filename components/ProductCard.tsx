
import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, ShieldCheck, Loader2 } from 'lucide-react';

type ProductCardProps = {
  product: Product;
  onAddToCart: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetail: (p: Product) => void;
  isAdminMode?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetail,
  isAdminMode
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const images = Array.isArray(product.image) ? product.image : [product.image];
  const activeSrc = imgError 
    ? `https://picsum.photos/seed/${product.id}/800/600` 
    : images[0];

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(product.precio);

  return (
    <div 
      className={`group bg-white rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col h-full relative border-slate-100 shadow-sm hover:shadow-2xl ${
        isAdminMode ? 'ring-2 ring-yellow-400/50' : ''
      }`}
    >
      {isAdminMode && (
        <div className="absolute top-4 right-4 z-20 bg-yellow-400 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
          Modo Edición
        </div>
      )}

      <button 
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
        className={`absolute top-4 left-4 z-20 p-2.5 rounded-2xl backdrop-blur-md transition-all ${
          isFavorite ? 'bg-red-600 text-white shadow-lg' : 'bg-white/80 text-slate-400 hover:text-red-600'
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <div 
        className="relative h-72 overflow-hidden bg-slate-200 group/img cursor-pointer"
        onClick={() => onViewDetail(product)}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        )}

        <img 
          src={activeSrc} 
          alt={product.nombre}
          className={`w-full h-full object-cover transition-all duration-700 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => setImgError(true)}
        />
        
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-emerald-500/90 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-xl flex items-center gap-2 uppercase tracking-[0.2em] shadow-lg border border-white/20">
            <ShieldCheck size={12} /> Motor Verificado
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">COREA / JAPÓN</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">REF: {product.sku}</span>
        </div>

        <h3 className="text-slate-900 font-black text-lg mb-2 group-hover:text-red-600 italic uppercase tracking-tighter transition-colors line-clamp-2 leading-none">
          {product.nombre}
        </h3>
        
        <p className="text-slate-500 text-xs mb-6 line-clamp-2 font-medium leading-relaxed italic opacity-80">
          {product.descripcion}
        </p>
        
        <div className="flex items-center justify-between pt-5 border-t border-slate-50 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Inversión Garantizada</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">{formattedPrice}</span>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="p-4 bg-black text-[#D4AF37] rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95 border border-[#D4AF37]/20"
          >
            <ShoppingCart size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
