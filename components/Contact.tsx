
import React, { useState } from 'react';
import { VENDORS } from '../constants';
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [activeVendorIndex, setActiveVendorIndex] = useState(0);

  const nextVendor = () => {
    setActiveVendorIndex((prev) => (prev + 1) % VENDORS.length);
  };

  const prevVendor = () => {
    setActiveVendorIndex((prev) => (prev - 1 + VENDORS.length) % VENDORS.length);
  };

  const activeVendor = VENDORS[activeVendorIndex];

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Team Carousel Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
            Nuestro Equipo de <span className="text-[#D4AF37]">Ventas</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">
            Profesionales altamente capacitados para asesorarte en la mejor inversión para tu vehículo.
          </p>
          <div className="h-1.5 w-24 bg-blue-700 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel Card */}
          <div className="bg-white rounded-[50px] shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[500px]">
            {/* Vendor Image Container */}
            <div className="relative w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden bg-slate-100">
              <img 
                key={activeVendor.id}
                src={activeVendor.image} 
                alt={activeVendor.name} 
                className="w-full h-full object-cover animate-in zoom-in-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10"></div>
              
              {/* Name Overlay (at the top as requested) */}
              <div className="absolute top-8 left-8 right-8 z-10">
                <div className="inline-block bg-black text-[#D4AF37] px-6 py-3 rounded-2xl shadow-2xl border-2 border-[#D4AF37]/30 transform -rotate-2">
                  <h3 className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">
                    {activeVendor.name}
                  </h3>
                </div>
              </div>

              {/* Mobile Info Overlay */}
              <div className="absolute bottom-8 left-8 md:hidden">
                <span className="bg-blue-700 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                  {activeVendor.role}
                </span>
              </div>
            </div>

            {/* Vendor Info Content */}
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center space-y-8 bg-white">
              <div className="hidden md:block">
                <span className="bg-blue-50 text-blue-700 text-xs font-black px-5 py-2.5 rounded-full uppercase tracking-widest border border-blue-100">
                  {activeVendor.role}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-black text-slate-900 italic leading-tight">
                  Expertiz técnica de clase mundial a su servicio.
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Comprometidos con brindarle la mejor asesoría en motores y componentes de alta gama de automallmotores.cl.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a 
                  href="https://wa.me/56963121125"
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-[24px] font-black text-sm tracking-widest hover:bg-black transition-all shadow-xl shadow-emerald-100"
                >
                  <MessageCircle size={20} /> CONTACTAR A {activeVendor.name.split(' ')[0].toUpperCase()}
                </a>
              </div>

              {/* Progress Indicators */}
              <div className="flex items-center gap-2 pt-4">
                {VENDORS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeVendorIndex ? 'w-10 bg-blue-700' : 'w-2 bg-slate-200'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prevVendor}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 bg-white text-slate-900 p-5 rounded-full shadow-2xl border border-slate-100 hover:bg-black hover:text-[#D4AF37] transition-all z-20 group"
          >
            <ChevronLeft size={28} className="group-hover:scale-125 transition-transform" />
          </button>
          <button 
            onClick={nextVendor}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-1/2 bg-white text-slate-900 p-5 rounded-full shadow-2xl border border-slate-100 hover:bg-black hover:text-[#D4AF37] transition-all z-20 group"
          >
            <ChevronRight size={28} className="group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        <div className="bg-white rounded-[40px] p-10 md:p-14 border border-slate-100 shadow-sm space-y-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">ENVÍANOS UN <span className="text-blue-700">MENSAJE</span></h3>
            <p className="text-slate-400 text-sm font-medium">Responderemos a tu consulta técnica en menos de 30 minutos.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nombre Completo</label>
                <input type="text" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-700 rounded-2xl py-4 px-6 outline-none transition-all font-bold text-sm" placeholder="Ej: Juan Pérez" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Correo Electrónico</label>
                <input type="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-700 rounded-2xl py-4 px-6 outline-none transition-all font-bold text-sm" placeholder="juan@correo.cl" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Mensaje o Cotización</label>
              <textarea rows={4} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-700 rounded-2xl py-4 px-6 outline-none transition-all font-bold text-sm resize-none" placeholder="¿Qué motor estás buscando?"></textarea>
            </div>
            <button className="w-full bg-black text-[#D4AF37] py-5 rounded-[24px] font-black text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 hover:text-white transition-all shadow-xl">
              <Send size={18} /> ENVIAR CONSULTA SEGURA
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-black text-white rounded-[40px] p-12 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-2xl font-black italic tracking-tighter mb-8 uppercase">Información de Contacto</h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl text-[#D4AF37]">
                  <Phone size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Ventas & Soporte</span>
                  <p className="text-xl font-bold">+56 9 6312 1125</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email Corporativo</span>
                  <p className="text-xl font-bold">ventas@automallmotores.cl</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl text-emerald-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Casa Matriz</span>
                  <p className="text-xl font-bold">Av. Las Parcelas 1234, Alto Hospicio</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-700 text-white rounded-[40px] p-10 text-center">
            <h4 className="font-black text-lg italic uppercase mb-2">Horario de Atención</h4>
            <p className="text-blue-100 text-sm font-medium">Lunes a Viernes: 09:00 - 19:00 hrs</p>
            <p className="text-blue-100 text-sm font-medium">Sábados: 09:30 - 14:00 hrs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
