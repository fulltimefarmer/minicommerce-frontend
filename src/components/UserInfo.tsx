// src/components/UserInfo.tsx
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, USA',
  joinDate: 'January 2023',
  membershipLevel: 'Gold Member',
  orders: 42,
  points: 1250,
};

export default function UserInfo() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">👤</span>
          </div>
          
          {/* User Basic Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-blue-600 font-medium">{user.membershipLevel}</p>
            <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
          </div>
          
          {/* Edit Button */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="text-xl">✏️</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{user.orders}</div>
          <div className="text-sm text-gray-500 mt-1">Total Orders</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{user.points}</div>
          <div className="text-sm text-gray-500 mt-1">Reward Points</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        </div>
        <div className="p-6 space-y-4">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">📧</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900 font-medium">{user.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-green-600">📱</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900 font-medium">{user.phone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <span className="text-orange-600">📍</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900 font-medium">{user.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6 space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📦</span>
              <span className="font-medium text-gray-900">Order History</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-xl">❤️</span>
              <span className="font-medium text-gray-900">Wishlist</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-xl">⚙️</span>
              <span className="font-medium text-gray-900">Settings</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          Sign Out
        </button>
      </div>
    </div>
  );
}
