import { useState, useMemo } from 'react'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import { SlidersHorizontal } from 'lucide-react'

export default function Home({ search }) {
  const [selectedCat, setSelectedCat] = useState('all')
  const [maxPrice, setMaxPrice] = useState(400)
  const [sortBy, setSortBy] = useState('default')
  const [mobileCat, setMobileCat] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedCat !== 'all') result = result.filter(p => p.category === selectedCat)
    if (search) result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
    result = result.filter(p => p.price <= maxPrice)

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)

    return result
  }, [selectedCat, search, maxPrice, sortBy])

  const currentCat = categories.find(c => c.id === selectedCat)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero banner */}
      {!search && selectedCat === 'all' && (
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-6 mb-6 text-white flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-green-100 text-sm font-medium mb-1">Fresh & Organic</p>
            <h1 className="text-2xl font-bold mb-2">Groceries Delivered<br />in 30 Minutes</h1>
            <p className="text-green-100 text-sm">Free delivery on orders above ₹299</p>
          </div>
          <div className="text-6xl z-10">🛒</div>
          <div className="absolute -right-6 -top-6 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-8 w-28 h-28 bg-white/10 rounded-full" />
        </div>
      )}

      {/* Mobile category scroll */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors shrink-0 ${
              selectedCat === cat.id
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <Sidebar
          selectedCat={selectedCat}
          onCatChange={setSelectedCat}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Section header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                {search ? `Results for "${search}"` : currentCat?.name === 'All' ? 'All Products' : currentCat?.name}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">{filtered.length} item{filtered.length !== 1 ? 's' : ''} found</p>
            </div>
            {/* Mobile sort */}
            <div className="flex items-center gap-2 lg:hidden">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-600 outline-none"
              >
                <option value="default">Sort</option>
                <option value="price-asc">Low → High</option>
                <option value="price-desc">High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-base font-semibold text-gray-600 mb-1">No products found</h3>
              <p className="text-sm text-gray-400">Try adjusting filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
