import { X, ShoppingCart, Truck, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CartModal() {
  const { showCart, setShowCart, cartItems, cartCount, cartSubtotal, cartTotal, deliveryFee, addToCart, removeFromCart, clearCart } = useCart()
  const { user, setShowAuthModal } = useAuth()
  const [ordered, setOrdered] = useState(false)

  if (!showCart) return null

  const handleOrder = () => {
    if (!user) {
      setShowCart(false)
      setShowAuthModal(true)
      return
    }
    setOrdered(true)
    clearCart()
    toast.success('Order placed successfully!')
  }

  const handleClose = () => {
    setShowCart(false)
    setOrdered(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Drawer */}
      <div className="w-full max-w-md bg-white flex flex-col h-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-green-600" />
            <h2 className="text-lg font-semibold">
              {ordered ? 'Order Placed!' : `Your Cart${cartCount > 0 ? ` (${cartCount})` : ''}`}
            </h2>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {ordered ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Order Confirmed!</h3>
              <p className="text-gray-500 text-sm mb-1">Your fresh groceries are on their way.</p>
              <p className="text-gray-400 text-sm">Estimated delivery: <span className="font-medium text-gray-600">30–45 mins</span></p>
              <button onClick={handleClose} className="mt-6 btn-green px-6 py-2.5">
                Continue Shopping
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold mb-1">Your cart is empty</h3>
              <p className="text-gray-400 text-sm">Add fresh groceries to get started</p>
              <button onClick={handleClose} className="mt-4 btn-green px-6 py-2.5">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="px-5 py-4 space-y-4">
              {/* Delivery banner */}
              {deliveryFee > 0 ? (
                <div className="bg-orange-50 text-orange-700 text-xs rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <Truck size={14} />
                  Add ₹{299 - cartSubtotal} more for free delivery
                </div>
              ) : (
                <div className="bg-green-50 text-green-700 text-xs rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <Truck size={14} />
                  You've unlocked free delivery! 🎉
                </div>
              )}

              {/* Cart items */}
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-14 text-right shrink-0">₹{item.total}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - bill summary + checkout */}
        {!ordered && cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                  {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-green-700">₹{cartTotal}</span>
              </div>
            </div>
            <button
              onClick={handleOrder}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              {user ? '🛒 Place Order' : '🔐 Login to Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
