
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Menu, Phone, MapPin, User, Lock, Unlock } from 'lucide-react';

import { User as UserType } from '../types';

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeView: string;
  onNavigate: (view: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  user: UserType | null;
  onAuthClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onCartClick, 
  searchTerm, 
  setSearchTerm, 
  activeView, 
  onNavigate,
  isAdminMode,
  setIsAdminMode,
  user,
  onAuthClick
}) => {
  const navItems = [
    { label: 'INICIO', view: 'tienda' },
    { label: 'MOTORES', view: 'tienda' },
    { label: 'REPUESTOS', view: 'repuestos' },
    { label: 'CONTACTO', view: 'contacto' },
    { label: 'SUCURSALES', view: 'sucursales' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Barra superior negra idéntica a la referencia */}
      <div className="bg-black text-white py-2 px-4 text-[10px] md:text-xs border-b border-red-600/30">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+56963121125" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors font-bold uppercase tracking-widest">
              <Phone size={12} className="text-red-600" /> +56 9 6312 1125
            </a>
            <span className="hidden md:flex items-center gap-2 text-slate-300 font-bold uppercase tracking-widest">
              <MapPin size={12} className="text-red-600" /> Iquique - Recinto Zofri
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
              DESPACHOS A TODO CHILE 🇨🇱
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center justify-between w-full md:w-auto">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('tienda')}
          >
            <div className="w-14 h-14 bg-black rounded-xl flex flex-col items-center justify-center shadow-2xl group-hover:bg-red-600 transition-all duration-300 transform group-hover:rotate-2 border-b-4 border-red-700">
              <span className="text-white font-black text-xs italic leading-none">AUTO</span>
              <span className="text-red-600 font-black text-[10px] italic leading-none group-hover:text-white">MALL</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter leading-none group-hover:text-red-600 transition-colors uppercase">
                AUTO <span className="text-red-600">MALL</span>
              </h1>
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-slate-400 mt-0.5 uppercase">MOTORES Y REPUESTOS</span>
            </div>
          </motion.div>
          
          <button className="md:hidden text-slate-700 p-2">
            <Menu size={32} />
          </button>
        </div>

        {/* Buscador central */}
        <div className="relative w-full md:max-w-md lg:max-w-xl">
          <input
            type="text"
            placeholder="Buscar por motor, marca o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-100 focus:border-red-600 rounded-2xl py-3.5 px-6 pl-14 focus:ring-4 focus:ring-red-50 outline-none transition-all placeholder:text-slate-300 font-bold text-sm shadow-inner"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-red-600" size={22} />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onAuthClick}
            className="hidden lg:flex items-center gap-2 text-slate-700 hover:text-red-600 transition-all font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl"
          >
            {user ? (
              <>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                ) : (
                  <User size={18} />
                )}
                <span className="max-w-[100px] truncate">{user.name}</span>
              </>
            ) : (
              <>
                <User size={18} />
                CUENTA
              </>
            )}
          </button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="relative p-4 bg-black text-white rounded-2xl hover:bg-red-600 transition-all shadow-xl group hover:-translate-y-0.5"
          >
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Navegación idéntica a Max Motores */}
      <nav className="bg-white border-t border-slate-100 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex whitespace-nowrap justify-center gap-4">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => onNavigate(item.view)}
              className={`px-6 py-5 text-[11px] font-black tracking-[0.15em] transition-all relative group uppercase ${
                activeView === item.view ? 'text-red-600' : 'text-slate-600 hover:text-red-600'
              }`}
            >
              {item.label}
              <motion.span 
                layoutId="nav-underline"
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 bg-red-600 transition-all duration-300 rounded-t-full ${
                  activeView === item.view ? 'w-full' : 'w-0 group-hover:w-1/2'
                }`}
              ></motion.span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
