
export type Product = {
  id: string;
  nombre: string;
  marca: string;
  precio: number;
  estado: 'Nuevo' | 'Usado' | 'Reacondicionado';
  stock: number;
  oferta: boolean;
  image: string | string[];
  descripcion: string;
  sku?: string;
  category?: string;
  originalPrice?: number;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Branch = {
  id: string;
  city: string;
  region: string;
  address: string;
  mapImage: string;
  isHeadquarters?: boolean;
  phone: string;
};

export type Vendor = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isGuest?: boolean;
  avatar?: string;
};
