// src/app/product/[id]/page.tsx
import { products } from '@/data/products';
import Link from 'next/link';

async function getProduct(id: string) {
  return products.find((p) => p.id === parseInt(id, 10));
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-24">
      <Link href="/">Back to Product List</Link>
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl mt-2">{product.price}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}
