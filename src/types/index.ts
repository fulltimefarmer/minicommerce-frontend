export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
} 