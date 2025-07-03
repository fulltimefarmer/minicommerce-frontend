// src/data/products.ts
export const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: `$${(i + 1) * 10}`,
  description: `This is the description for Product ${i + 1}.`,
}));
