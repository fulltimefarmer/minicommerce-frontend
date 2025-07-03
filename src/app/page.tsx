'use client';

import { useState } from 'react';
import ProductList from '@/components/ProductList';
import UserInfo from '@/components/UserInfo';
import Cart from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';

type TabType = 'products' | 'cart' | 'profile';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const { getTotalItems } = useCart();

  const handleContinueShopping = () => {
    setActiveTab('products');
  };

  const tabs = [
    {
      id: 'products' as TabType,
      label: 'Products',
      icon: '🛍️',
      component: <ProductList />
    },
    {
      id: 'cart' as TabType,
      label: 'Cart',
      icon: '🛒',
      component: <Cart onContinueShopping={handleContinueShopping} />,
      badge: getTotalItems()
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: '👤',
      component: <UserInfo />
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            MiniCommerce
          </h1>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 pb-20">
        <div className="px-4 py-4">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors duration-200 relative ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <span className="text-2xl mb-1">{tab.icon}</span>
                {/* Badge for cart items */}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${
                activeTab === tab.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}
