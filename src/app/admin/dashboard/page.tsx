'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminHeader } from '@/components/AdminAuth'
import { supabase } from '@/lib/supabase'
import { Users, Activity, BarChart3, Building2 } from 'lucide-react'
import Link from 'next/link'

const AUTH_KEY = 'tribu_admin_auth'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [stats, setStats] = useState({
    partners: 0,
    activities: 0,
    totalVisits: 0,
    leads: 0,
  })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY)
    if (auth !== 'true') {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
      setChecking(false)
      loadStats()
    }
  }, [router])

  const loadStats = async () => {
    try {
      const [partnersRes, activitiesRes, visitsRes, leadsRes] = await Promise.all([
        supabase.from('partners').select('id', { count: 'exact', head: true }),
        supabase.from('activities').select('id', { count: 'exact', head: true }),
        supabase.from('analytics_events').select('id', { count: 'exact', head: true }),
        supabase.from('partner_leads').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        partners: partnersRes.count || 0,
        activities: activitiesRes.count || 0,
        totalVisits: visitsRes.count || 0,
        leads: leadsRes.count || 0,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    router.push('/admin')
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Caricamento...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <div className="container mx-auto px-4 pb-16">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 text-white rounded-lg">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Partner</p>
                <p className="text-3xl font-bold">{loadingStats ? '...' : stats.partners}</p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 text-white rounded-lg">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Esperienze</p>
                <p className="text-3xl font-bold">{loadingStats ? '...' : stats.activities}</p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500 text-white rounded-lg">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Visite Totali</p>
                <p className="text-3xl font-bold">{loadingStats ? '...' : stats.totalVisits}</p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500 text-white rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Richieste Lead</p>
                <p className="text-3xl font-bold">{loadingStats ? '...' : stats.leads}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/dashboard/partners" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Building2 className="text-primary-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Gestione Partner</h2>
                <p className="text-gray-600">Aggiungi, modifica o elimina partner</p>
              </div>
            </div>
            <div className="text-primary-600 font-semibold">
              Vai alla gestione →
            </div>
          </Link>

          <Link href="/admin/dashboard/activities" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent-100 rounded-lg">
                <Activity className="text-accent-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Gestione Esperienze</h2>
                <p className="text-gray-600">Aggiungi, modifica o elimina attività</p>
              </div>
            </div>
            <div className="text-accent-600 font-semibold">
              Vai alla gestione →
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}