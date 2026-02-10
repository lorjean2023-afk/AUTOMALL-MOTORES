
import React from 'react';
import { BRANCHES } from '../constants';
import { MapPin, Phone, ExternalLink, Globe } from 'lucide-react';

const Branches: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
          Nuestras <span className="text-blue-700">Sucursales</span> en Chile
        </h2>
        <p className="text-slate-500 max-w-2xl font-medium">
          Contamos con puntos de distribución estratégica en las principales ciudades de Chile para asegurar que la potencia llegue a tu taller de forma rápida y segura.
        </p>
        <div className="h-1.5 w-32 bg-[#D4AF37] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BRANCHES.map((branch) => (
          <div 
            key={branch.id} 
            className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col relative"
          >
            {/* Map Placeholder Image */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={branch.mapImage} 
                alt={`Mapa de ${branch.city}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Badge for Headquarters */}
              {branch.isHeadquarters && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D4AF37] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2">
                    <Globe size={12} /> CASA MATRIZ
                  </span>
                </div>
              )}

              {/* City Label */}
              <div className="absolute bottom-4 left-6">
                <h3 className="text-white font-black text-2xl italic tracking-tighter drop-shadow-md">
                  {branch.city.toUpperCase()}
                </h3>
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  {branch.region}
                </span>
              </div>
            </div>

            <div className="p-8 space-y-6 flex-grow flex flex-col">
              <div className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-xl text-blue-700">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Dirección</span>
                    <p className="text-slate-900 font-bold text-sm leading-relaxed">{branch.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-xl text-[#D4AF37]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Contacto Directo</span>
                    <p className="text-slate-900 font-bold text-sm leading-relaxed">{branch.phone}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex gap-3">
                <button className="flex-grow bg-black text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2">
                  <ExternalLink size={14} /> VER EN GOOGLE MAPS
                </button>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        ))}
      </div>

      {/* Trust Message */}
      <div className="bg-blue-900 rounded-[50px] p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h4 className="text-2xl font-black italic tracking-tight mb-4">¿NO ENCUENTRAS TU CIUDAD?</h4>
          <p className="text-blue-100 max-w-xl mx-auto text-sm font-medium mb-8">
            Enviamos motores y repuestos a todas las regiones de Chile a través de nuestra red logística propia y convenios nacionales.
          </p>
          <a 
            href="https://wa.me/56963121125"
            className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-all shadow-2xl"
          >
            CONTACTAR SOPORTE LOGÍSTICO
          </a>
        </div>
      </div>
    </div>
  );
};

export default Branches;
