import { categories } from '../data/products'
import { SlidersHorizontal } from 'lucide-react'

export default function Sidebar({ selectedCat, onCatChange, maxPrice, onPriceChange, sortBy, onSortChange }) {
  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sticky top-20">
        {/* Categories */}
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-0.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCatChange(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-left transition-colors ${
                selectedCat === cat.id
                  ? 'bg-green-50 text-green-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Price filter */}
        <div className="mt-5 pt-5 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal size={13} className="text-gray-400" />
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Max Price</h3>
          </div>
          <input
            type="range"
            min={10}
            max={400}
            step={5}
            value={maxPrice}
            onChange={e => onPriceChange(+e.target.value)}
            className="w-full accent-green-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹10</span>
            <span className="text-green-700 font-semibold">₹{maxPrice}</span>
            <span>₹400</span>
          </div>
        </div>

        {/* Sort */}
        <div className="mt-5 pt-5 border-t border-gray-100">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sort By</h3>
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-green-400 text-gray-700"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name A–Z</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </aside>
  )
}
