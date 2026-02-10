
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import AIAssistant from './components/AIAssistant';
import WhatsAppButton from './components/WhatsAppButton';
import Branches from './components/Branches';
import Contact from './components/Contact';
import SpareParts from './components/SpareParts';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { FilterX, Trophy, MapPin, Truck, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('tienda');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load favorites and cart from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('automall_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error loading favorites", e);
      }
    }
  }, []);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('automall_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (p.sku?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                            p.marca.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || p.marca === selectedBrand;
      const matchesPrice = p.precio <= maxPrice;
      const matchesCondition = selectedCondition === 'all' || p.estado === selectedCondition;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesCondition;
    });
  }, [searchTerm, selectedCategory, selectedBrand, maxPrice, selectedCondition]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      }
      return [...prev, id];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMaxPrice(5000000);
    setSelectedCondition('all');
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeView={activeView}
        onNavigate={handleNavigate}
      />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {activeView === 'tienda' ? (
          <div className="flex flex-col md:flex-row gap-8">
            <Sidebar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedCondition={selectedCondition}
              setSelectedCondition={setSelectedCondition}
            />

            <div className="flex-grow">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
                    Catálogo <span className="text-red-600">automallmotores.cl</span>
                  </h2>
                  <div className="h-1 w-20 bg-red-600 mt-1 rounded-full"></div>
                </div>
                <div className="flex items-center gap-6">
                  {(searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || maxPrice < 5000000 || selectedCondition !== 'all') && (
                    <button 
                      onClick={resetFilters}
                      className="text-xs font-black text-red-600 hover:text-black transition-colors flex items-center gap-1.5 bg-red-50 px-4 py-2 rounded-xl"
                    >
                      <FilterX size={14} /> REINICIAR FILTROS
                    </button>
                  )}
                  <div className="text-xs text-slate-400 font-black tracking-widest uppercase">
                    Stock: <span className="text-slate-900">{filteredProducts.length}</span>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetail={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border-4 border-dashed border-slate-100">
                  <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <FilterX size={40} className="text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 italic">SIN COINCIDENCIAS</h3>
                  <p className="text-slate-400 mt-3 font-medium max-w-sm mx-auto">
                    No encontramos lo que buscas en automallmotores.cl. ¿Por qué no pruebas con el Asistente IA?
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="mt-8 bg-black text-white px-10 py-4 rounded-2xl font-black tracking-widest hover:bg-red-600 transition-all shadow-2xl"
                  >
                    VER TODO EL STOCK
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : activeView === 'sucursales' ? (
          <Branches />
        ) : activeView === 'contacto' ? (
          <Contact />
        ) : activeView === 'repuestos' ? (
          <SpareParts 
            onAddToCart={handleAddToCart} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
            onViewDetail={setSelectedProduct}
          />
        ) : (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center">
             <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={40} className="text-red-600" />
             </div>
             <h2 className="text-3xl font-black text-slate-900 italic uppercase">Sección {activeView.toUpperCase()}</h2>
             <p className="text-slate-400 mt-2 font-medium">Contenido en preparación. Estamos mejorando tu experiencia en automallmotores.cl</p>
             <button 
               onClick={() => setActiveView('tienda')}
               className="mt-8 bg-black text-white px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase"
             >
               VOLVER A LA TIENDA
             </button>
          </div>
        )}
      </main>

      <section className="bg-black py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-100/5 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center relative z-10">
          <div className="group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-500">
              <Trophy className="text-red-600 group-hover:text-white transition-colors" size={32} />
            </div>
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-3">Máxima Calidad</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Importación certificada disponible en automallmotores.cl</p>
          </div>
          <div className="group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-500">
              <ShieldCheck className="text-red-600 group-hover:text-white transition-colors" size={32} />
            </div>
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-3">Garantía Total</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Seguridad técnica en cada compra online.</p>
          </div>
          <div className="group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
              <Truck className="text-slate-300 group-hover:text-black transition-colors" size={32} />
            </div>
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-3">Despachos Express</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Conectamos Iquique con todo Chile vía automallmotores.cl</p>
          </div>
          <div className="group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-500">
              <MapPin className="text-red-600 group-hover:text-white transition-colors" size={32} />
            </div>
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-3">Zona Franca</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Precios directos de Zofri en tu pantalla.</p>
          </div>
        </div>
      </section>

      <footer className="bg-white py-24 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="relative inline-block mb-10">
             <div className="w-24 h-24 rounded-full border-4 border-black bg-white mx-auto flex flex-col items-center justify-center shadow-2xl relative z-10">
                <span className="text-slate-900 font-black text-[10px] italic leading-none">AUTO</span>
                <span className="text-red-600 font-black text-[10px] italic leading-none">MALL</span>
                <span className="text-slate-400 font-black text-[8px] mt-1">ZOFRI</span>
             </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-none italic tracking-tighter uppercase">
            AUTO <span className="text-red-600">MALL</span> MOTORES ZOFRI<br/>
            <span className="text-sm tracking-[0.2em] font-black text-white bg-black px-4 py-1 inline-block mt-3 rounded-full uppercase">WWW.AUTOMALLMOTORES.CL</span>
          </h2>
          
          <p className="text-sm text-slate-400 mt-8 max-w-lg mx-auto font-medium leading-relaxed">
            Tu plataforma digital líder en Iquique para la potencia de tu motor. Importación directa desde Zona Franca y calidad garantizada en cada componente.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12">
            <button onClick={() => handleNavigate('sucursales')} className="text-slate-900 hover:text-red-600 transition-all text-[11px] font-black tracking-widest uppercase border-b-2 border-transparent hover:border-red-600 pb-1">Sucursales</button>
            <button onClick={() => handleNavigate('contacto')} className="text-slate-900 hover:text-red-600 transition-all text-[11px] font-black tracking-widest uppercase border-b-2 border-transparent hover:border-red-600 pb-1">Ventas</button>
            <button onClick={() => handleNavigate('repuestos')} className="text-slate-900 hover:text-red-600 transition-all text-[11px] font-black tracking-widest uppercase border-b-2 border-transparent hover:border-red-600 pb-1">Repuestos</button>
            <a href="https://wa.me/56963121125" className="text-slate-900 hover:text-red-600 transition-all text-[11px] font-black tracking-widest uppercase border-b-2 border-transparent hover:border-red-600 pb-1">WhatsApp</a>
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-50 text-[10px] text-slate-300 font-black tracking-[0.2em] uppercase">
            © 2024 WWW.AUTOMALLMOTORES.CL - POTENCIA PURA DESDE ZOFRI IQUIQUE
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={handleRemoveFromCart}
      />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart}
      />
      
      <WhatsAppButton />
      <AIAssistant />
    </div>
  );
};

export default App;
