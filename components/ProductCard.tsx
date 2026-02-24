
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Product } from '../types';
import { ShoppingCart, Heart, ShieldCheck, Loader2, Trash2, GripVertical } from 'lucide-react';

type ProductCardProps = {
  product: Product;
  onAddToCart: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetail: (p: Product) => void;
  isAdminMode?: boolean;
  onDelete?: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetail,
  isAdminMode,
  onDelete
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };
  
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
    <motion.div 
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      className={`group bg-white rounded-[32px] border-2 overflow-hidden transition-all duration-500 flex flex-col h-full relative border-slate-100 shadow-sm hover:shadow-2xl ${
        isAdminMode ? 'ring-2 ring-yellow-400' : ''
      }`}
    >
      {/* Etiqueta Modo Edición solo para admin */}
      {isAdminMode && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
            ● MODO EDICIÓN
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete?.(product.id); }}
            className="bg-red-600 text-white p-1.5 rounded-full shadow-md hover:bg-red-700 transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <div 
            {...attributes} 
            {...listeners}
            className="bg-black text-white p-1.5 rounded-full shadow-md cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={14} />
          </div>
        </div>
      )}

      {/* Botón Favorito */}
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
        className={`absolute top-4 left-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all ${
          isFavorite ? 'bg-red-600 text-white' : 'bg-white/70 text-slate-400 hover:text-red-600'
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      {/* Imagen con Sello de Verificación */}
      <div 
        className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onViewDetail(product)}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        )}

        <motion.img 
          src={activeSrc} 
          alt={product.nombre}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => setImgError(true)}
        />
        
        {/* Sello "MOTOR VERIFICADO" igual a la imagen */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-[#2ecc71] text-white text-[9px] font-black px-4 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-widest shadow-lg">
            <ShieldCheck size={14} /> MOTOR VERIFICADO
          </div>
        </div>
      </div>
      
      {/* Contenido de la Tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="bg-red-50 px-3 py-1 rounded-full">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest italic">COREA / JAPÓN</span>
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase">REF: {product.sku || 'N/A'}</span>
        </div>

        <h3 className="text-slate-900 font-black text-xl mb-2 group-hover:text-red-600 italic uppercase tracking-tighter transition-colors line-clamp-2 leading-none min-h-[40px]">
          {product.nombre}
        </h3>
        
        <p className="text-slate-500 text-xs mb-6 line-clamp-2 font-medium leading-relaxed opacity-70">
          {product.descripcion}
        </p>
        
        {/* Footer de Precio y Carrito */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inversión Garantizada</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">{formattedPrice}</span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="p-4 bg-black text-[#D4AF37] rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95 border-b-4 border-red-900"
          >
            <ShoppingCart size={22} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
