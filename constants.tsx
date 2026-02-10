
import { Product, Category, Branch, Vendor } from './types';

// Rutas absolutas para asegurar carga desde la carpeta public en cualquier entorno
const ss664Images = [
  "/img/motores/ssangyong-664.jpg",    
  "/img/motores/ssangyong-664-2.jpg",  
  "/img/motores/ssangyong-664-3.jpg",  
  "/img/motores/ssangyong-664-4.jpg"   
];

export const STORE_NAME = "Auto Mall Motores Zofri";

export const CATEGORIES: Category[] = [
  { id: 'motores', name: 'Motores Completos', icon: '🔧' },
  { id: 'turbo', name: 'Turbos', icon: '🌀' },
  { id: 'partes', name: 'Repuestos', icon: '⚙️' },
];

export const PRODUCTS: Product[] = [
  {
    "id": "mot-ssangyong-664",
    "nombre": "Motor SsangYong Euro 3 664",
    "marca": "SsangYong",
    "precio": 1800000,
    "estado": "Usado",
    "stock": 1,
    "oferta": false,
    "sku": "MOT-SS-664-E3",
    "image": ss664Images,
    "descripcion": "Motor Diesel SsangYong Euro 3 modelo 664. Unidad importada testeada y garantizada. Compatible con Actyon, Kyron y Rexton. Entrega inmediata en Iquique y despachos.",
    "category": "motores"
  },
  {
    "id": "mot-2jz-gte",
    "nombre": "Motor Toyota 2JZ-GTE VVTi",
    "marca": "Toyota",
    "precio": 3850000,
    "estado": "Usado",
    "stock": 3,
    "oferta": true,
    "image": "/img/motores/toyota-2jz-gte.jpg",
    "descripcion": "Motor legendario 3.0L Twin Turbo. Directo de Japón. Ideal para proyectos de alta potencia.",
    "category": "motores",
    "originalPrice": 4500000
  },
  {
    "id": "mot-sr20det",
    "nombre": "Motor Nissan SR20DET Black Top",
    "marca": "Nissan",
    "precio": 2450000,
    "estado": "Usado",
    "stock": 2,
    "oferta": true,
    "image": "/img/motores/nissan-sr20det.jpg",
    "descripcion": "Motor 2.0 Turbo ideal para swaps en plataformas S13, S14 y S15.",
    "category": "motores",
    "originalPrice": 2800000
  },
  {
    "id": "turbo-gt35",
    "nombre": "Turbo Garret GT3582R Gen II",
    "marca": "Universal",
    "precio": 680000,
    "estado": "Nuevo",
    "stock": 15,
    "oferta": false,
    "image": "/img/motores/turbo-gt3582r.jpg",
    "descripcion": "Turbo de alto rendimiento con rodamientos cerámicos.",
    "category": "turbo"
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'hospicio',
    city: 'Alto Hospicio',
    region: 'Región de Tarapacá',
    address: 'Av. Las Parcelas 1234, Casa Matriz',
    mapImage: '/img/sucursales/mapa-hospicio.jpg',
    isHeadquarters: true,
    phone: '+56 9 6312 1125'
  }
];

export const VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Jean piere Valencia',
    role: 'Asesor Senior de Motores',
    image: '/img/vendedores/jean-piere.jpg'
  }
];
