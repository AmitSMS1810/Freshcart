import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Package, ArrowLeft } from 'lucide-react'

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: 'Today, 2:30 PM',
    status: 'Delivered',
    items: ['🍅 Fresh Tomatoes', '🥬 Organic Spinach', '🥛 Amul Milk'],
    total: 136,
    statusColor: 'text-green-600 bg-green-50',
  },
  {
    id: 'ORD-2024-002',
    date: 'Yesterday, 11:00 AM',
    status: 'Delivered',
    items: ['🥭 Alphonso Mangoes', '🍌 Bananas', '🧀 Fresh Paneer'],
    total: 245,
    statusColor: 'text-green-600 bg-green-50',
  },
  {
    id: 'ORD-2024-003',
    date: '2 days ago',
    status: 'Delivered',
    items: ['🌾 Basmati Rice', '🫘 Toor Dal', '🥚 Farm Eggs'],
    total: 255,
    statusColor: 'text-green-600 bg-green-50',
  },
]

export default function Orders() {
  const { user, setShowAuthModal } = useAuth()

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h2 className="text-xl font-semibold mb-2">Login to see your orders</h2>
        <p className="text-gray-400 text-sm mb-6">Your order history will appear here</p>
        <button onClick={() => setShowAuthModal(true)} className="btn-green px-6 py-2.5">
          Login / Sign Up
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-semibold">My Orders</h1>
      </div>

      <div className="space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">{order.id}</p>
                <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${order.statusColor}`}>
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-500 mb-3">
              {order.items.join(' · ')}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <span className="text-sm text-gray-400">{order.items.length} items</span>
              <span className="text-sm font-semibold text-green-700">₹{order.total}</span>
            </div>
          </div>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-20">
          <Package size={48} className="text-gray-200 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-600">No orders yet</h3>
          <p className="text-sm text-gray-400 mt-1">Your orders will appear here</p>
          <Link to="/" className="inline-block mt-4 btn-green px-6 py-2.5">Shop Now</Link>
        </div>
      )}
    </div>
  )
}
