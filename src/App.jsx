import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import CartModal from './components/CartModal'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import Orders from './pages/Orders'

function AppContent() {
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearch} />
      <CartModal />
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { borderRadius: '12px', fontSize: '14px' },
              success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
            }}
          />
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
