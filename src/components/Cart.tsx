'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartProps {
  onContinueShopping?: () => void;
}

export default function Cart({ onContinueShopping }: CartProps) {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        {/* Empty Cart */}
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart to get started!</p>
          <button 
            onClick={handleContinueShopping}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <button 
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              {/* Product Image */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📦</span>
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product.id}`}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {item.product.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-semibold text-blue-600">
                    {item.product.price}
                  </span>
                  <span className="text-xs text-gray-400">
                    Added {item.addedAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity Controls and Remove */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right mt-2">
              <span className="text-sm text-gray-500">Subtotal: </span>
              <span className="text-lg font-semibold text-gray-900">
                ${(parseFloat(item.product.price.replace('$', '')) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="space-y-3">
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-semibold">{getTotalItems()}</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span className="text-gray-900">Total Price:</span>
            <span className="text-blue-600">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link 
            href="/checkout/summary"
            className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
          >
            Proceed to Checkout
          </Link>
          <button 
            onClick={handleContinueShopping}
            className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((id) => (
            <Link key={id} href={`/product/${id}`} className="group">
              <div className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Product {id}
                </p>
                <p className="text-sm text-blue-600 font-semibold">${id * 10}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 