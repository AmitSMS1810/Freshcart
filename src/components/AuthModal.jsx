import { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login } = useAuth()
  const [tab, setTab] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  if (!showAuthModal) return null

  const validate = () => {
    const e = {}
    if (tab === 'signup' && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Min 6 characters'
    return e
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const displayName = tab === 'signup' ? form.name : form.email.split('@')[0]
    login(displayName, form.email)
    toast.success(tab === 'login' ? 'Welcome back! 👋' : 'Account created! 🎉')
    setForm({ name: '', email: '', password: '' })
    setErrors({})
  }

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />

      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold">
              {tab === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {tab === 'login' ? 'Login to your FreshKart account' : 'Join FreshKart today'}
            </p>
          </div>
          <button onClick={() => setShowAuthModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
            {['login', 'signup'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}) }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                  tab === t ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">Full Name</label>
                <input
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Rahul Sharma"
                  className={`input-field ${errors.name ? 'border-red-300 focus:border-red-400' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600 font-medium mb-1 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-red-300' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••"
                  className={`input-field pr-10 ${errors.password ? 'border-red-300' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors mt-5"
          >
            {tab === 'login' ? 'Login' : 'Create Account'}
          </button>

          {/* Toggle */}
          <p className="text-center text-sm text-gray-400 mt-4">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setErrors({}) }}
              className="text-green-600 font-medium hover:underline"
            >
              {tab === 'login' ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
