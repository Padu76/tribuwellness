'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, LogOut } from 'lucide-react'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
const AUTH_KEY = 'tribu_admin_auth'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check solo al mount
    const auth = sessionStorage.getItem(AUTH_KEY)
    setIsAuthenticated(auth === 'true')
  }, [])

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
    router.push('/admin')
  }

  return { isAuthenticated, login, logout }
}

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setTimeout(() => {
        setLoading(false)
        onSuccess()
      }, 300)
    } else {
      setError('Password non corretta')
      setPassword('')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 px-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
            <Lock className="text-primary-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Tribu Wellness</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
              placeholder="Inserisci password admin"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? 'Accesso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}

export function AdminHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Tribu Wellness</p>
        </div>
        <button
          onClick={onLogout}
          className="btn-secondary flex items-center gap-2"
        >
          <LogOut size={18} />
          Esci
        </button>
      </div>
    </header>
  )
}