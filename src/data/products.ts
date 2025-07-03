// src/data/products.ts
import { Product } from '@/types';

export const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: `$${(i + 1) * 10}`,
  description: `This is the description for Product ${i + 1}. A high-quality item designed to meet your needs with excellent craftsmanship and attention to detail.`,
}));
