
import React, { useState, useRef } from 'react';
import { X, ShoppingCart, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2, Package, Ruler, Loader2, UploadCloud, Camera } from 'lucide-react';
import { Product } from '../types';

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  isAdminMode?: boolean;
  onUpdateProduct?: (p: Product) => void;
};

const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  onClose, 
  onAddToCart,
  isAdminMode,
  onUpdateProduct
}) => {
  if (!product) return null;

  const [activeImg, setActiveImg] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const imgList = Array.isArray(product.image) ? product.image : [product.image];

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(product.precio);

  const nextImg = () => {
    setIsLoading(true);
    setActiveImg((prev) => (prev === imgList.length - 1 ? 0 : prev + 1));
  };

  const prevImg = () => {
    setIsLoading(true);
    setActiveImg((prev) => (prev === 0 ? imgList.length - 1 : prev - 1));
  };

  const processFiles = (files: FileList) => {
    if (!isAdminMode || !onUpdateProduct) return;
    
    const newImages: string[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target?.result as string);
          processedCount++;
          if (processedCount === files.length || processedCount === 4) {
            // Reemplazamos las imágenes por las nuevas subidas (máximo 4)
            onUpdateProduct({ ...product, image: newImages.slice(0, 4) });
            setIsLoading(false);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const getImgUrl = (idx: number) => {
    if (imgErrors[idx]) {
      return `https://picsum.photos/seed/${product.id}-${idx}/800/600`;
    }
    return imgList[idx];
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="bg-white w-full max-w-6xl rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10 flex flex-col md:flex-row h-full max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-3 bg-black/5 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-3/5 bg-slate-50 relative flex flex-col group/modal">
          <div 
            className={`flex-grow relative overflow-hidden flex items-center justify-center p-8 ${isAdminMode ? 'cursor-pointer hover:bg-yellow-50/50' : ''}`}
            onClick={() => isAdminMode && fileInputRef.current?.click()}
          >
            {isAdminMode && (
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/modal:opacity-100 bg-black/20 backdrop-blur-[2px] z-20 transition-all text-white font-black uppercase text-xs tracking-widest gap-2">
                <Camera size={40} className="animate-bounce" />
                Haz clic para subir fotos de la carpeta JAMPIER
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <Loader2 className="animate-spin text-red-600" size={48} />
              </div>
            )}
            
            <img 
              key={`${product.id}-${activeImg}`}
              src={getImgUrl(activeImg)} 
              alt={product.nombre}
              className={`w-full h-full object-contain transition-all duration-700 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} hover:scale-105`}
              onLoad={() => setIsLoading(false)}
              onError={() => setImgErrors(prev => ({ ...prev, [activeImg]: true }))}
            />
            
            {imgList.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-6 p-4 bg-white/90 hover:bg-white rounded-full shadow-2xl transition-all active:scale-90 z-20">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-6 p-4 bg-white/90 hover:bg-white rounded-full shadow-2xl transition-all active:scale-90 z-20">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => e.target.files && processFiles(e.target.files)} 
            multiple 
            accept="image/*" 
            className="hidden" 
          />

          <div className="p-6 bg-white border-t border-slate-100 flex gap-4 overflow-x-auto no-scrollbar justify-center">
            {imgList.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => { setIsLoading(true); setActiveImg(idx); }}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all flex-shrink-0 shadow-sm ${
                  activeImg === idx ? 'border-red-600 scale-105 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img 
                  src={getImgUrl(idx)} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col bg-white">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                {product.estado}
              </span>
              <span className="text-slate-300 font-black text-xs uppercase tracking-tighter">SKU: {product.sku || product.id}</span>
            </div>

            {isAdminMode ? (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Nombre del Motor</label>
                <input
                  className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 font-black text-2xl italic uppercase outline-none"
                  value={product.nombre}
                  onChange={(e) => onUpdateProduct?.({ ...product, nombre: e.target.value })}
                />
              </div>
            ) : (
              <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter leading-tight uppercase">
                {product.nombre}
              </h2>
            )}

            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Inversión Garantizada</span>
              {isAdminMode ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-400">$</span>
                  <input
                    type="number"
                    className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 text-3xl font-black text-red-600 outline-none"
                    value={product.precio}
                    onChange={(e) => onUpdateProduct?.({ ...product, precio: Number(e.target.value) })}
                  />
                </div>
              ) : (
                <span className="text-5xl font-black text-red-600 tracking-tighter">{formattedPrice}</span>
              )}
            </div>

            <div className="py-8 border-y border-slate-100 space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-4 h-[2px] bg-red-600"></div> Especificaciones Técnicas
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-red-50 p-2 rounded-xl text-red-600">
                    <Package size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-tighter">Stock: {product.stock} Unids</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-red-50 p-2 rounded-xl text-red-600">
                    <Ruler size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-tighter">Marca: {product.marca}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-tighter">Garantía Real</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-tighter">Importado</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Descripción Técnica</h4>
              {isAdminMode ? (
                <textarea
                  className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 text-sm font-medium outline-none resize-none"
                  value={product.descripcion}
                  onChange={(e) => onUpdateProduct?.({ ...product, descripcion: e.target.value })}
                  rows={5}
                />
              ) : (
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {product.descripcion}
                </p>
              )}
            </div>
          </div>

          <div className="mt-auto pt-10 space-y-4">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full bg-black text-[#D4AF37] py-6 rounded-3xl font-black text-sm tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 group active:scale-95"
            >
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              AGREGAR AL PEDIDO
            </button>
            <p className="text-center text-[9px] text-slate-300 font-black uppercase tracking-[0.3em]">
              Transacción 100% Protegida por Auto Mall
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
