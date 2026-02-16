
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
import { PRODUCTS as INITIAL_PRODUCTS, BRANCHES as INITIAL_BRANCHES } from './constants';
import { Product, CartItem, Branch } from './types';
import { FilterX, Settings, Code, Copy, Check, X } from 'lucide-react';

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
  
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem('automall_custom_products');
    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleUpdateProduct = (updatedProduct: Product) => {
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(newProducts);
    localStorage.setItem('automall_custom_products', JSON.stringify(newProducts));
    if (selectedProduct?.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const handleUpdateBranch = (updatedBranch: Branch) => {
    const newBranches = branches.map(b => b.id === updatedBranch.id ? updatedBranch : b);
    setBranches(newBranches);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.marca.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || p.marca === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand]);

  const copyFullCode = () => {
    navigator.clipboard.writeText(`export const PRODUCTS = ${JSON.stringify(products, null, 2)};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeView={activeView}
        onNavigate={setActiveView}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />

      {isAdminMode && (
        <div className="bg-yellow-400 p-2 flex justify-center items-center gap-4 sticky top-[140px] z-[45] shadow-md">
          <span className="text-[10px] font-black uppercase text-black flex items-center gap-2">
            <Settings size={14} className="animate-spin" /> MODO EDICIÓN: ABRE UN PRODUCTO PARA SUBIR FOTOS O CAMBIAR DATOS
          </span>
          <button 
            onClick={() => setShowCode(true)}
            className="bg-black text-white px-3 py-1 rounded-full text-[9px] font-black uppercase hover:bg-slate-800 transition-all flex items-center gap-1"
          >
            <Code size={12} /> EXPORTAR
          </button>
        </div>
      )}

      {showCode && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/90 backdrop-blur-md">
          <div className="bg-slate-900 text-emerald-400 p-8 rounded-[40px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-black italic uppercase">Código para constants.tsx</h3>
              <div className="flex gap-4">
                <button onClick={copyFullCode} className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-emerald-400 transition-all">
                  {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copiado' : 'Copiar'}
                </button>
                <button onClick={() => setShowCode(false)} className="text-white hover:text-red-500"><X size={24} /></button>
              </div>
            </div>
            <pre className="flex-grow overflow-auto bg-black/50 p-6 rounded-2xl text-[10px] font-mono leading-relaxed border border-white/5">
              {`export const PRODUCTS = ${JSON.stringify(products, null, 2)};`}
            </pre>
          </div>
        </div>
      )}

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={(p) => setCart([...cart, {...p, quantity: 1}])}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={(id) => setFavorites(f => f.includes(id) ? f.filter(x => x!==id) : [...f, id])}
                    onViewDetail={setSelectedProduct}
                    isAdminMode={isAdminMode}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : activeView === 'sucursales' ? (
          <Branches branches={branches} onUpdateBranch={handleUpdateBranch} isAdminMode={isAdminMode} />
        ) : activeView === 'contacto' ? (
          <Contact />
        ) : (
          <SpareParts 
            onAddToCart={(p) => setCart([...cart, {...p, quantity: 1}])} 
            favorites={favorites} 
            onToggleFavorite={(id) => setFavorites(f => f.includes(id) ? f.filter(x => x!==id) : [...f, id])} 
            onViewDetail={setSelectedProduct} 
          />
        )}
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={(id) => setCart(cart.filter(i => i.id !== id))} />
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={(p) => setCart([...cart, {...p, quantity: 1}])} 
        isAdminMode={isAdminMode}
        onUpdateProduct={handleUpdateProduct}
      />
      <WhatsAppButton />
      <AIAssistant />
    </div>
  );
};

export default App;
