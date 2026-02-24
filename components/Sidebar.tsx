
import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';

type SidebarProps = {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  selectedCondition: string;
  setSelectedCondition: (val: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedBrand, 
  setSelectedBrand,
}) => {
  const brands = ['Toyota', 'Nissan', 'Hyundai', 'SsangYong', 'Subaru', 'Honda', 'Universal'];
  
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div>
        <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
          <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
          Categorías
        </h3>
        <ul className="space-y-1">
          <li>
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === 'all' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'}`}
            >
              🚀 Todos los Productos
            </motion.button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat.id ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <span className="mr-2 opacity-70">{cat.icon}</span> {cat.name}
              </motion.button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-6 bg-black rounded-full"></span>
          Marcas Principales
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <motion.button
              key={brand}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${selectedBrand === brand ? 'bg-black border-black text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-red-300'}`}
            >
              {brand.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
