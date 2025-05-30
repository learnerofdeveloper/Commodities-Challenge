export type User = {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'storekeeper';
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  lastUpdated: string;
};

export type Order = {
  id: string;
  productId: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
};