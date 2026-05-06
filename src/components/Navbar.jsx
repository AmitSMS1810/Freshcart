import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar({ onSearch }) {
  const { user, logout, setShowAuthModal } = useAuth()
  const { cartCount, setShowCart } = useCart()
  const [searchVal, setSearchVal] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
    onSearch && onSearch(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate('/')
    onSearch && onSearch(searchVal)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center text-xl">
            🛒
          </div>
          <span className="text-xl font-semibold text-green-700 hidden sm:block">FreshKart</span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchVal}
            onChange={handleSearch}
            placeholder="Search groceries, fruits, vegetables..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all outline-none"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/orders" className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold text-sm">
                  {user.avatar}
                </div>
                <span className="font-medium">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="hidden sm:flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="hidden sm:flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <User size={15} />
              Login
            </button>
          )}

          {/* Cart button */}
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 bg-green-600 text-white text-sm px-3 py-2 rounded-xl hover:bg-green-700 transition-colors"
          >
            <ShoppingCart size={17} />
            <span className="hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-50"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="sm:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 bg-white">
          {user ? (
            <>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                  {user.avatar}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <Link to="/orders" className="text-sm text-gray-600" onClick={() => setMobileMenu(false)}>My Orders</Link>
              <button onClick={() => { logout(); setMobileMenu(false) }} className="text-sm text-red-500 text-left">Logout</button>
            </>
          ) : (
            <button
              onClick={() => { setShowAuthModal(true); setMobileMenu(false) }}
              className="text-sm text-green-600 font-medium text-left"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
