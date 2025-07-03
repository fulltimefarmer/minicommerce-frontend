// src/components/ProductList.tsx
import { products } from '@/data/products';
import Link from 'next/link';

export default function ProductList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            <Link href={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
