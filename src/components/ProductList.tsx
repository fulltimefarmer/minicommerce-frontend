// src/components/ProductList.tsx
import { products } from '@/data/products';
import Link from 'next/link';

export default function ProductList() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <span className="text-sm text-gray-500">{products.length} items</span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {products.slice(0, 20).map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              
              {/* Product Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-semibold text-blue-600">
                  {product.price}
                </p>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
          Load More Products
        </button>
      </div>
    </div>
  );
}
