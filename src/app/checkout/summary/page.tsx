'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutSummary() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const router = useRouter();

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Items to Checkout</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart first!</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-gray-500 mb-6">Order #MC{Date.now()}</p>
          <div className="space-y-3">
            <Link 
              href="/"
              className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
            <button 
              onClick={() => router.back()}
              className="block w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              View Order Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  const shippingCost = 10.00;
  const tax = getTotalPrice() * 0.08; // 8% tax
  const finalTotal = getTotalPrice() + shippingCost + tax;

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
            Checkout Summary
          </h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Order Items */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items ({getTotalItems()})</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📦</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${(parseFloat(item.product.price.replace('$', '')) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-gray-600">123 Main St</p>
              <p className="text-gray-600">Anytown, USA 12345</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">Estimated Delivery: 3-5 business days</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">CARD</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">**** **** **** 1234</p>
              <p className="text-sm text-gray-500">Expires 12/26</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing Order...
              </>
            ) : (
              `Place Order - $${finalTotal.toFixed(2)}`
            )}
          </button>
          
          <Link 
            href="/"
            className="block w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Security Note */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">🔒</span>
            <p className="text-sm text-green-800">
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 