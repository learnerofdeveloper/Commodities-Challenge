import React, { createContext, useState, useContext } from 'react';
import { Product, ProductContextType } from '../types';

// Mock initial products
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Wheat',
    category: 'Grains',
    price: 28.50,
    stock: 150,
    description: 'Premium organic wheat from sustainable farms',
    lastUpdated: '2025-04-10T14:30:00Z'
  },
  {
    id: '2',
    name: 'Crude Oil',
    category: 'Energy',
    price: 75.20,
    stock: 200,
    description: 'Barrel of crude oil, standard grade',
    lastUpdated: '2025-04-09T10:15:00Z'
  },
  {
    id: '3',
    name: 'Gold',
    category: 'Metals',
    price: 1850.75,
    stock: 50,
    description: 'Gold bullion, 99.9% purity',
    lastUpdated: '2025-04-11T09:45:00Z'
  },
  {
    id: '4',
    name: 'Coffee Beans',
    category: 'Agricultural',
    price: 4.25,
    stock: 500,
    description: 'Arabica coffee beans, premium quality',
    lastUpdated: '2025-04-08T16:20:00Z'
  },
  {
    id: '5',
    name: 'Natural Gas',
    category: 'Energy',
    price: 3.15,
    stock: 1000,
    description: 'Natural gas, measured in MMBtu',
    lastUpdated: '2025-04-10T11:30:00Z'
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const addProduct = (productData: Omit<Product, 'id' | 'lastUpdated'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id 
          ? { ...updatedProduct, lastUpdated: new Date().toISOString() } 
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== id)
    );
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};