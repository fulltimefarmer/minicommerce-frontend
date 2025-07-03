// src/app/product/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { Product } from '@/types';

async function getProduct(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === parseInt(id, 10));
}

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      const { id } = await params;
      const foundProduct = await getProduct(id);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }
    loadProduct();
  }, [params]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate adding delay for better UX
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAddingToCart(false);
      // Reset quantity to 1 after adding
      setQuantity(1);
    }, 500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center">
          <Link 
            href="/"
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="text-xl">←</span>
          </Link>
          <h1 className="flex-1 text-lg font-semibold text-gray-900 text-center mr-10">
            Product Details
          </h1>
        </div>
      </header>

      {/* Product Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <span className="text-8xl">📦</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600">{product.price}</span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-gray-500">(4.5)</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Product Features */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-600">High Quality Materials</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-600">Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-600">30-Day Return Policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-600">Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center text-xl font-semibold border border-gray-200 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 99}
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Total: {product.price.replace('$', '')} × {quantity} = ${(parseFloat(product.price.replace('$', '')) * quantity).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Reviews Preview */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              See All
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="font-medium text-gray-900">John D.</span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-600 text-sm">Great product! Exactly what I was looking for. Fast delivery and excellent quality.</p>
            </div>
            
            <div className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="font-medium text-gray-900">Sarah M.</span>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-gray-600 text-sm">Amazing value for money. Highly recommend this product to everyone!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Add to Wishlist
          </button>
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : (
              `Add ${quantity} to Cart`
            )}
          </button>
        </div>
      </div>

      {/* Bottom padding to account for fixed action bar */}
      <div className="h-20"></div>
    </div>
  );
}
