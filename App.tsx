
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from '@dnd-kit/sortable';
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
import AuthModal from './components/AuthModal';
import { PRODUCTS as INITIAL_PRODUCTS, BRANCHES as INITIAL_BRANCHES } from './constants';
import { Product, CartItem, Branch, User } from './types';
import { Settings, Code, Copy, Check, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('tienda');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('automall_custom_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading products:', e);
      }
    }
    return INITIAL_PRODUCTS;
  });
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const saveProductsToStorage = (newProducts: Product[]) => {
    try {
      localStorage.setItem('automall_custom_products', JSON.stringify(newProducts));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('⚠️ ERROR DE ALMACENAMIENTO: Has excedido el límite de espacio (probablemente por fotos muy pesadas). Los cambios se mantendrán en esta sesión, pero usa "EXPORTAR CAMBIOS" para guardar el código permanentemente.');
      } else {
        console.error('Error saving products:', e);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        saveProductsToStorage(newArray);
        return newArray;
      });
    }
  };

  const handleCreateProduct = () => {
    const newProduct: Product = {
      id: `new-${Date.now()}`,
      nombre: 'NUEVO PRODUCTO',
      marca: 'Marca',
      precio: 0,
      estado: 'Nuevo',
      stock: 0,
      oferta: false,
      image: ['https://picsum.photos/seed/new/800/600'],
      descripcion: 'Descripción del nuevo producto...',
      sku: `SKU-${Math.floor(Math.random() * 10000)}`,
      category: 'motores'
    };
    const newProducts = [newProduct, ...products];
    setProducts(newProducts);
    saveProductsToStorage(newProducts);
    setSelectedProduct(newProduct);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(newProducts);
    saveProductsToStorage(newProducts);
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
                            p.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (p.sku || '').toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-100 selection:text-red-900">
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeView={activeView}
        onNavigate={setActiveView}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
      />

      <AnimatePresence>
        {isAdminMode && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-yellow-400 overflow-hidden sticky top-[140px] z-[45] shadow-lg border-b border-yellow-500"
          >
            <div className="p-3 flex justify-center items-center gap-4">
              <span className="text-xs font-black uppercase text-black flex items-center gap-2">
                <Settings size={16} className="animate-spin" /> MODO ADMINISTRADOR: PUEDES EDITAR, REORDENAR Y CREAR PRODUCTOS
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={handleCreateProduct}
                  className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                  + NUEVO PRODUCTO
                </button>
                <button 
                  onClick={() => setShowCode(true)}
                  className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Code size={14} /> EXPORTAR CAMBIOS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 text-emerald-400 p-8 rounded-[40px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-black italic uppercase">CÓDIGO GENERADO PARA CONSTANTS.TSX</h3>
                <div className="flex gap-4">
                  <button onClick={copyFullCode} className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-emerald-400 transition-all">
                    {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'COPIADO' : 'COPIAR CÓDIGO'}
                  </button>
                  <button onClick={() => setShowCode(false)} className="text-white hover:text-red-500 transition-colors"><X size={32} /></button>
                </div>
              </div>
              <pre className="flex-grow overflow-auto bg-black/50 p-6 rounded-2xl text-[10px] font-mono leading-relaxed border border-white/5 no-scrollbar">
                {`export const PRODUCTS = ${JSON.stringify(products, null, 2)};`}
              </pre>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-10 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'tienda' ? (
              <div className="flex flex-col lg:flex-row gap-8">
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
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext 
                      items={filteredProducts.map(p => p.id)}
                      strategy={rectSortingStrategy}
                      disabled={!isAdminMode}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={(p) => {
                              const exists = cart.find(i => i.id === p.id);
                              if (exists) {
                                setCart(cart.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i));
                              } else {
                                setCart([...cart, {...p, quantity: 1}]);
                              }
                              setIsCartOpen(true);
                            }}
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={(id) => setFavorites(f => f.includes(id) ? f.filter(x => x!==id) : [...f, id])}
                            onViewDetail={setSelectedProduct}
                            isAdminMode={isAdminMode}
                            onDelete={(id) => {
                              if (confirm('¿Estás seguro de eliminar este producto?')) {
                                const newProducts = products.filter(p => p.id !== id);
                                setProducts(newProducts);
                                saveProductsToStorage(newProducts);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
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
          </motion.div>
        </AnimatePresence>
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={(id) => setCart(cart.filter(i => i.id !== id))} />
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={(p) => {
          const exists = cart.find(i => i.id === p.id);
          if (exists) {
            setCart(cart.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i));
          } else {
            setCart([...cart, {...p, quantity: 1}]);
          }
        }} 
        isAdminMode={isAdminMode}
        onUpdateProduct={handleUpdateProduct}
      />
      <WhatsAppButton />
      <AIAssistant />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={setUser} 
      />
    </div>
  );
};

export default App;
