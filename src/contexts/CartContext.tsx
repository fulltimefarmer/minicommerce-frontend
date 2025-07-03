'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, CartContextType } from '@/types';

// Cart actions
type CartAction = 
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

// Cart reducer
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item.product.id === action.product.id);
      
      if (existingItem) {
        return state.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      }
      
      return [...state, {
        id: Date.now(),
        product: action.product,
        quantity: action.quantity,
        addedAt: new Date()
      }];
    }
    
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.productId);
    
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter(item => item.product.id !== action.productId);
      }
      return state.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    
    case 'CLEAR_CART':
      return [];
    
    case 'LOAD_CART':
      return action.items;
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('minicommerce-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert date strings back to Date objects
        const cartWithDates = parsedCart.map((item: Omit<CartItem, 'addedAt'> & { addedAt: string }) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        dispatch({ type: 'LOAD_CART', items: cartWithDates });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('minicommerce-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 