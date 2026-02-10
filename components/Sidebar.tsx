
import React from 'react';
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
  maxPrice,
  setMaxPrice,
  selectedCondition,
  setSelectedCondition
}) => {
  const brands = ['Toyota', 'Nissan', 'Hyundai', 'SsangYong', 'Subaru', 'Honda', 'Universal'];
  const conditions = ['Nuevo', 'Usado', 'Reacondicionado'];

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(maxPrice);

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      {/* Categories Section */}
      <div>
        <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
          <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
          Categorías
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === 'all' ? 'bg-red-600 text-white shadow-lg shadow-red-100' : 'hover:bg-slate-50 text-slate-600'}`}
            >
              🚀 Todos los Productos
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat.id ? 'bg-red-600 text-white shadow-lg shadow-red-100' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <span className="mr-2 opacity-70">{cat.icon}</span> {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-6 bg-black rounded-full"></span>
          Marcas
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${selectedBrand === 'all' ? 'bg-black border-black text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-red-300'}`}
          >
            TODAS
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${selectedBrand === brand ? 'bg-black border-black text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-red-300'}`}
            >
              {brand.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
          Estado
        </h3>
        <div className="space-y-2">
          {['all', ...conditions].map((cond) => (
            <button
              key={cond}
              onClick={() => setSelectedCondition(cond)}
              className={`w-full text-left px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${selectedCondition === cond ? 'bg-red-50 border-red-600 text-red-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >
              {cond === 'all' ? 'CUALQUIERA' : cond.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Presupuesto</h3>
          <span className="text-[10px] font-black text-white bg-red-600 px-2 py-1 rounded">
            {formattedPrice}
          </span>
        </div>
        <div className="px-1">
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-black">
            <span>$0</span>
            <span className="text-red-600">MÁXIMO</span>
          </div>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-br from-red-600 to-black rounded-3xl text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
        <h4 className="font-black text-lg mb-2 italic tracking-tight uppercase">¿Stock Especial?</h4>
        <p className="text-[10px] text-red-100 mb-4 font-medium leading-relaxed">
          Traemos motores exclusivos desde Japón y Corea bajo pedido. Cotiza hoy mismo.
        </p>
        <button className="w-full bg-white text-red-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
          SOLICITAR COTIZACIÓN
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
