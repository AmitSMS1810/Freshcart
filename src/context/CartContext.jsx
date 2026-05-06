import { createContext, useContext, useState } from 'react'
import { products } from '../data/products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({})
  const [showCart, setShowCart] = useState(false)

  const addToCart = (productId) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }))
  }

  const removeFromCart = (productId) => {
    setCart(prev => {
      const updated = { ...prev }
      if (updated[productId] > 1) {
        updated[productId] -= 1
      } else {
        delete updated[productId]
      }
      return updated
    })
  }

  const clearCart = () => setCart({})

  const cartItems = products.filter(p => cart[p.id] > 0).map(p => ({
    ...p,
    quantity: cart[p.id],
    total: p.price * cart[p.id],
  }))

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.total, 0)

  const deliveryFee = cartSubtotal > 299 ? 0 : 29

  const cartTotal = cartSubtotal + deliveryFee

  return (
    <CartContext.Provider value={{
      cart,
      cartItems,
      cartCount,
      cartSubtotal,
      cartTotal,
      deliveryFee,
      addToCart,
      removeFromCart,
      clearCart,
      showCart,
      setShowCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
