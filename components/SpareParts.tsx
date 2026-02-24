
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Search, Filter, Car, Gauge, Disc, Wrench, Hammer } from 'lucide-react';

type SparePartsProps = {
  onAddToCart: (p: Product) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewDetail: (p: Product) => void;
};

const SpareParts: React.FC<SparePartsProps> = ({ onAddToCart, favorites, onToggleFavorite, onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const brands = ['Toyota', 'Nissan', 'BMW', 'Hyundai', 'SsangYong', 'Subaru', 'Mazda', 'Mitsubishi', 'Mercedes', 'Universal'];
  
  const spareCategories = useMemo(() => ['turbo', 'partes-motor', 'desarme', 'martillos', 'neumaticos', 'culatas', 'cajas'], []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const isSparePart = p.category ? spareCategories.includes(p.category) : false;
      if (!isSparePart && selectedCategory === 'all') return false;

      const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (p.sku?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'all' || p.marca === selectedBrand;
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [searchTerm, selectedBrand, selectedCategory, spareCategories]);

  const categoryIcons: Record<string, React.ReactNode> = {
    'turbo': <Gauge size={24} />,
    'partes-motor': <Wrench size={24} />,
    'desarme': <Car size={24} />,
    'martillos': <Hammer size={24} />,
    'neumaticos': <Disc size={24} />,
  };

  return (
    <div className="space-y-12">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black rounded-[50px] p-12 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-6 max-w-xl">
            <h2 className="text-5xl font-black italic tracking-tighter leading-none">
              CENTRAL DE <span className="text-[#D4AF37]">REPUESTOS</span>
            </h2>
            <p className="text-slate-400 font-medium">
              El stock más completo de Chile en componentes de motor, turbos y desarme especializado para marcas premium y japonesas.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                <Car size={14} className="text-[#D4AF37]" /> +500 Vehículos en Desarme
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                <Gauge size={14} className="text-blue-400" /> Turbos Certificados
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[40px] space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Buscador Avanzado</h4>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Buscar SKU, pieza o modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border-2 border-transparent focus:border-[#D4AF37] rounded-2xl py-4 px-6 outline-none transition-all font-bold text-sm text-white placeholder:text-slate-500"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Filtrar por Marca</h4>
              <div className="grid grid-cols-3 gap-2">
                {brands.slice(0, 9).map(brand => (
                  <motion.button 
                    key={brand}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBrand(prev => prev === brand ? 'all' : brand)}
                    className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                      selectedBrand === brand ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {brand}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {spareCategories.slice(0, 5).map(catId => {
          const cat = CATEGORIES.find(c => c.id === catId);
          if (!cat) return null;
          const isActive = selectedCategory === catId;
          return (
            <motion.button 
              key={catId}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(isActive ? 'all' : catId)}
              className={`p-6 rounded-[32px] border flex flex-col items-center gap-4 transition-all duration-300 group ${
                isActive 
                ? 'bg-blue-700 text-white border-blue-700 shadow-2xl shadow-blue-200' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-blue-700 hover:text-blue-700 hover:shadow-xl'
              }`}
            >
              <div className={`p-4 rounded-2xl transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-50 group-hover:bg-blue-50'}`}>
                {categoryIcons[catId] || cat.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-center">{cat.name}</span>
            </motion.button>
          );
        })}
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
             <div className="bg-blue-700 p-2 rounded-lg text-white">
                <Filter size={18} />
             </div>
             <h3 className="text-xl font-black italic tracking-tighter text-slate-900 uppercase">
               Resultados en <span className="text-blue-700">{selectedBrand === 'all' ? 'Todas las Marcas' : selectedBrand}</span>
             </h3>
          </div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{filteredProducts.length} Items Encontrados</span>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                  onViewDetail={onViewDetail}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[50px] p-24 text-center border-4 border-dashed border-slate-50"
            >
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <Search size={48} />
               </div>
               <h4 className="text-2xl font-black text-slate-900 italic mb-2 uppercase">Sin coincidencias exactas</h4>
               <p className="text-slate-400 font-medium max-w-md mx-auto">
                 No encontramos repuestos de {selectedBrand} para {selectedCategory} con el término "{searchTerm}". 
                 Prueba ampliando los filtros o contacta a un vendedor.
               </p>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => {setSelectedBrand('all'); setSelectedCategory('all'); setSearchTerm('')}}
                 className="mt-8 bg-black text-[#D4AF37] px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-blue-700 transition-all"
               >
                 LIMPIAR TODOS LOS FILTROS
               </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default SpareParts;
