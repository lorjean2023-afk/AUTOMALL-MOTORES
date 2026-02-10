
import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Eye, ShieldCheck, Heart, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

type ProductCardProps = {
  product: Product;
  onAddToCart: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetail: (p: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isFavorite, onToggleFavorite, onViewDetail }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  
  const imgList = Array.isArray(product.image) ? product.image : [product.image];

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(product.precio);

  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(product.originalPrice) : null;

  const isLowStock = product.stock > 0 && product.stock <= 5;

  const getFallbackUrl = (idx: number) => {
    return `https://images.unsplash.com/photo-1486006920555-c77dcf18193b?auto=format&fit=crop&q=80&w=800&sig=${product.id}-${idx}`;
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === imgList.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? imgList.length - 1 : prev - 1));
  };

  const handleImgError = (idx: number) => {
    if (!imgErrors[idx]) {
      setImgErrors(prev => ({ ...prev, [idx]: true }));
    }
  };

  const activeSrc = imgErrors[currentImg] ? getFallbackUrl(currentImg) : imgList[currentImg];

  return (
    <div className={`group bg-white rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col h-full relative ${
      product.id === 'mot-ssangyong-664' 
      ? 'border-blue-500 ring-2 ring-blue-500/20' 
      : 'border-slate-100 hover:shadow-xl'
    }`}>
      
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
        className={`absolute top-4 left-4 z-20 p-2.5 rounded-2xl backdrop-blur-md transition-all ${
          isFavorite ? 'bg-red-600 text-white' : 'bg-white/80 text-slate-400 hover:text-red-600'
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
          <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
            {product.stock > 0 ? 'En Stock' : 'Agotado'}
          </span>
        </div>
      </div>

      <div 
        className="relative h-64 overflow-hidden bg-slate-200 group/img cursor-pointer"
        onClick={() => onViewDetail(product)}
      >
        <img 
          src={activeSrc} 
          alt={product.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => handleImgError(currentImg)}
        />

        {imgList.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
              <ChevronRight size={20} />
            </button>
          </>
        )}
        
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="bg-black/80 text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-white/10">
            {product.marca}
          </span>
          <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
            product.estado === 'Nuevo' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
          }`}>
            {product.estado}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-widest">ID: {product.id}</span>
          <div className="flex items-center gap-1.5 text-red-600">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase">Garantizado</span>
          </div>
        </div>

        <h3 
          className="text-slate-900 font-black text-xl mb-2 group-hover:text-red-600 line-clamp-2 italic uppercase tracking-tighter cursor-pointer"
          onClick={() => onViewDetail(product)}
        >
          {product.nombre}
        </h3>
        
        <p className="text-slate-500 text-xs mb-6 flex-grow line-clamp-2 font-medium">
          {product.descripcion}
        </p>
        
        <div className="flex items-center justify-between pt-5 border-t border-slate-50">
          <div className="flex flex-col">
            {formattedOriginalPrice && (
              <span className="text-[10px] font-bold text-slate-300 line-through">
                {formattedOriginalPrice}
              </span>
            )}
            <span className="text-2xl font-black text-slate-900 group-hover:text-red-600">
              {formattedPrice}
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="p-4 bg-black text-white rounded-2xl hover:bg-red-600 transition-all shadow-xl"
          >
            <ShoppingCart size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
