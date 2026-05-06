import { Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

const badgeStyles = {
  fresh:    'bg-green-50 text-green-700',
  organic:  'bg-emerald-50 text-emerald-700',
  sale:     'bg-orange-50 text-orange-600',
  seasonal: 'bg-yellow-50 text-yellow-700',
  healthy:  'bg-blue-50 text-blue-700',
}

export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useCart()
  const qty = cart[product.id] || 0

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-green-200 hover:shadow-md transition-all group">
      {/* Image area */}
      <div className="h-28 flex items-center justify-center bg-gray-50 text-5xl group-hover:bg-green-50 transition-colors">
        {product.emoji}
      </div>

      <div className="p-3">
        {/* Badge */}
        {product.badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${badgeStyles[product.badge] || 'bg-gray-100 text-gray-600'}`}>
            {product.badge}
          </span>
        )}

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-800 mt-1 leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.unit}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star size={11} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-bold text-green-700">₹{product.price}</span>

          {qty === 0 ? (
            <button
              onClick={() => addToCart(product.id)}
              className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              + Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(product.id)}
                className="w-7 h-7 rounded-full border border-green-200 text-green-700 flex items-center justify-center text-lg font-medium hover:bg-green-50 transition-colors"
              >
                −
              </button>
              <span className="text-sm font-semibold text-green-700 w-4 text-center">{qty}</span>
              <button
                onClick={() => addToCart(product.id)}
                className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-medium hover:bg-green-700 transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
