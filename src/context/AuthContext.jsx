import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const login = (name, email) => {
    setUser({ name, email, avatar: name[0].toUpperCase() })
    setShowAuthModal(false)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, showAuthModal, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
