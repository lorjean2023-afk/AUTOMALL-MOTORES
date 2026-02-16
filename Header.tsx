
import React from 'react';
import { ShoppingCart, Search, Menu, Phone, MapPin, User, Lock, Unlock } from 'lucide-react';

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeView: string;
  onNavigate: (view: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onCartClick, 
  searchTerm, 
  setSearchTerm, 
  activeView, 
  onNavigate,
  isAdminMode,
  setIsAdminMode
}) => {
  const navItems = [
    { label: 'INICIO', view: 'tienda' },
    { label: 'MOTORES', view: 'tienda' },
    { label: 'REPUESTOS', view: 'repuestos' },
    { label: 'CONTACTO', view: 'contacto' },
    { label: 'SUCURSALES', view: 'sucursales' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-black text-white py-2 px-4 text-[10px] md:text-xs border-b border-red-600/30">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+56963121125" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors font-bold uppercase tracking-widest">
              <Phone size={12} className="text-red-600" /> +56 9 6312 1125
            </a>
            <span className="hidden md:flex items-center gap-2 text-slate-300 font-bold uppercase tracking-widest">
              <MapPin size={12} className="text-red-600" /> Iquique - Zofri
            </span>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all font-black text-[9px] uppercase tracking-widest ${isAdminMode ? 'bg-yellow-400 text-black' : 'text-slate-500 hover:text-white'}`}
            >
              {isAdminMode ? <Unlock size={10} /> : <Lock size={10} />}
              {isAdminMode ? 'MODO EDICIÓN ACTIVO' : 'ACCESO PRIVADO'}
            </button>
            <div className="font-black uppercase tracking-[0.2em] text-red-600 animate-pulse hidden sm:block">
              Despachos a todo Chile 🇨🇱
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('tienda')}
          >
            <div className="w-12 h-12 bg-black rounded-xl flex flex-col items-center justify-center shadow-lg group-hover:bg-red-600 transition-all duration-300 transform group-hover:rotate-3">
              <span className="text-white font-black text-[10px] italic leading-none">AM</span>
              <span className="text-red-600 font-black text-[9px] italic leading-none group-hover:text-white">ZOFRI</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter leading-none group-hover:text-red-600 transition-colors uppercase">
                AUTO <span className="text-red-600">MALL</span>
              </h1>
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.25em] text-slate-400 mt-0.5 uppercase">MOTORES ZOFRI</span>
            </div>
          </div>
          
          <button className="md:hidden text-slate-700 p-2">
            <Menu size={32} />
          </button>
        </div>

        <div className="relative w-full md:max-w-md lg:max-w-xl">
          <input
            type="text"
            placeholder="Busca motores, marcas o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-100 focus:border-red-600 rounded-2xl py-3.5 px-6 pl-14 focus:ring-4 focus:ring-red-50 outline-none transition-all placeholder:text-slate-300 font-bold text-sm"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center gap-2 text-slate-700 hover:text-red-600 transition-all font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl">
            <User size={18} />
            Mi Cuenta
          </button>
          
          <button 
            onClick={onCartClick}
            className="relative p-3.5 bg-black text-white rounded-2xl hover:bg-red-600 transition-all shadow-xl group"
          >
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav className="bg-white border-t border-slate-100 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex whitespace-nowrap justify-center gap-2">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => onNavigate(item.view)}
              className={`px-6 py-4 text-[11px] font-black tracking-[0.1em] transition-all relative group uppercase ${
                activeView === item.view ? 'text-red-600' : 'text-slate-600 hover:text-red-600'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-red-600 transition-all duration-300 rounded-t-full ${
                activeView === item.view ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
