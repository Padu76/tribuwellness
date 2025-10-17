'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminHeader } from '@/components/AdminAuth'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, TrendingUp, MousePointer, Eye, Activity } from 'lucide-react'
import Link from 'next/link'
import type { Partner } from '@/types'

const AUTH_KEY = 'tribu_admin_auth'

interface AnalyticsData {
  totalVisits: number
  whatsappClicks: number
  activityViews: number
  conversionRate: number
  recentEvents: Array<{
    event_type: string
    timestamp: string
  }>
  dailyStats: Array<{
    date: string
    visits: number
  }>
}

export default function PartnerAnalytics({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [partner, setPartner] = useState<Partner | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    whatsappClicks: 0,
    activityViews: 0,
    conversionRate: 0,
    recentEvents: [],
    dailyStats: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY)
    if (auth !== 'true') {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
      setChecking(false)
      loadData()
    }
  }, [router, params.slug])

  const loadData = async () => {
    setLoading(true)

    // Carica partner
    const { data: partnerData } = await supabase
      .from('partners')
      .select('*')
      .eq('slug', params.slug)
      .single()

    setPartner(partnerData)

    if (!partnerData) {
      setLoading(false)
      return
    }

    // Carica analytics
    const { data: events } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('partner_slug', params.slug)
      .order('timestamp', { ascending: false })

    if (events) {
      const visits = events.filter(e => e.event_type === 'visit')
      const whatsapp = events.filter(e => e.event_type === 'whatsapp_click')
      const activities = events.filter(e => e.event_type === 'activity_view')

      // Conversione
      const conversionRate = visits.length > 0 
        ? Math.round((whatsapp.length / visits.length) * 100)
        : 0

      // Eventi recenti (ultimi 10)
      const recentEvents = events.slice(0, 10).map(e => ({
        event_type: e.event_type,
        timestamp: e.timestamp,
      }))

      // Stats giornaliere (ultimi 7 giorni)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return date.toISOString().split('T')[0]
      })

      const dailyStats = last7Days.map(date => {
        const dayEvents = visits.filter(e => 
          e.timestamp.startsWith(date)
        )
        return {
          date,
          visits: dayEvents.length,
        }
      })

      setAnalytics({
        totalVisits: visits.length,
        whatsappClicks: whatsapp.length,
        activityViews: activities.length,
        conversionRate,
        recentEvents,
        dailyStats,
      })
    }

    setLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    router.push('/admin')
  }

  const eventLabels: Record<string, string> = {
    visit: 'Visita landing',
    whatsapp_click: 'Click WhatsApp',
    activity_view: 'Vista esperienza',
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Caricamento...</p>
      </div>
    )
  }

  if (!isAuthenticated) return null

  if (!partner && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader onLogout={handleLogout} />
        <div className="container mx-auto px-4 text-center py-16">
          <p className="text-gray-600">Partner non trovato</p>
          <Link href="/admin/dashboard/partners" className="btn-primary mt-4">
            Torna ai Partner
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <div className="container mx-auto px-4 pb-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard/partners" className="btn-secondary">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-bold">{partner?.name}</h2>
            <p className="text-gray-600">Analytics dettagliate</p>
          </div>
        </div>

        {loading ? (
          <p>Caricamento analytics...</p>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500 text-white rounded-lg">
                    <Eye size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Visite Totali</p>
                    <p className="text-3xl font-bold">{analytics.totalVisits}</p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-green-50 to-green-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500 text-white rounded-lg">
                    <MousePointer size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Click WhatsApp</p>
                    <p className="text-3xl font-bold">{analytics.whatsappClicks}</p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500 text-white rounded-lg">
                    <Activity size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Esperienze Viste</p>
                    <p className="text-3xl font-bold">{analytics.activityViews}</p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500 text-white rounded-lg">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Conversione</p>
                    <p className="text-3xl font-bold">{analytics.conversionRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grafico Giornaliero */}
            <div className="card mb-8">
              <h3 className="text-xl font-bold mb-4">Visite Ultimi 7 Giorni</h3>
              <div className="space-y-2">
                {analytics.dailyStats.map((day) => (
                  <div key={day.date} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-24">
                      {new Date(day.date).toLocaleDateString('it-IT', { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                      <div
                        className="bg-primary-500 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold"
                        style={{ width: `${Math.max((day.visits / Math.max(...analytics.dailyStats.map(d => d.visits), 1)) * 100, 5)}%` }}
                      >
                        {day.visits}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eventi Recenti */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Eventi Recenti</h3>
              <div className="space-y-2">
                {analytics.recentEvents.length === 0 ? (
                  <p className="text-gray-500">Nessun evento ancora</p>
                ) : (
                  analytics.recentEvents.map((event, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium">{eventLabels[event.event_type]}</span>
                      <span className="text-sm text-gray-600">
                        {new Date(event.timestamp).toLocaleString('it-IT')}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}