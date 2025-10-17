'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminHeader } from '@/components/AdminAuth'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, ExternalLink, QrCode } from 'lucide-react'
import type { Activity } from '@/types'

const AUTH_KEY = 'tribu_admin_auth'

export default function ActivitiesManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [qrActivity, setQrActivity] = useState<Activity | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'wellness' as 'spa' | 'outdoor' | 'food' | 'wellness' | 'fitness',
    description: '',
    location: '',
    image_url: '',
    website_url: '',
    maps_url: '',
    discount_percentage: 0,
  })

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY)
    if (auth !== 'true') {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
      setChecking(false)
      loadActivities()
    }
  }, [router])

  const loadActivities = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
    
    setActivities(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingActivity) {
      await supabase
        .from('activities')
        .update(formData)
        .eq('id', editingActivity.id)
    } else {
      await supabase
        .from('activities')
        .insert([formData])
    }

    resetForm()
    loadActivities()
  }

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)
    setFormData({
      title: activity.title,
      category: activity.category,
      description: activity.description,
      location: activity.location,
      image_url: activity.image_url || '',
      website_url: activity.website_url || '',
      maps_url: activity.maps_url || '',
      discount_percentage: activity.discount_percentage || 0,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa attività?')) return
    
    await supabase
      .from('activities')
      .delete()
      .eq('id', id)
    
    loadActivities()
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingActivity(null)
    setFormData({
      title: '',
      category: 'wellness',
      description: '',
      location: '',
      image_url: '',
      website_url: '',
      maps_url: '',
      discount_percentage: 0,
    })
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    router.push('/admin')
  }

  const categoryEmoji: Record<string, string> = {
    spa: '💆',
    outdoor: '🏃',
    food: '🥗',
    wellness: '🧘',
    fitness: '💪',
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Caricamento...</p>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <div className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Gestione Esperienze</h2>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Nuova Esperienza
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card mb-8">
            <h3 className="text-xl font-bold mb-4">
              {editingActivity ? 'Modifica Esperienza' : 'Nuova Esperienza'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Titolo *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Spa Relax Verona"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Categoria *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="spa">💆 SPA</option>
                    <option value="outdoor">🏃 Outdoor</option>
                    <option value="food">🥗 Food</option>
                    <option value="wellness">🧘 Wellness</option>
                    <option value="fitness">💪 Fitness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Via Roma 10, Verona"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Sconto Ospiti Hotel (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount_percentage}
                    onChange={(e) => setFormData({...formData, discount_percentage: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="0 = nessuno sconto, 20 = 20%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Immagine URL</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Descrizione *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Centro benessere con sauna e massaggi"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Sito Web URL</label>
                  <input
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Google Maps URL</label>
                  <input
                    type="url"
                    value={formData.maps_url}
                    onChange={(e) => setFormData({...formData, maps_url: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingActivity ? 'Aggiorna' : 'Crea'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Annulla
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista Attività */}
        <div className="space-y-4">
          {loading ? (
            <p>Caricamento...</p>
          ) : activities.length === 0 ? (
            <p className="text-gray-500">Nessuna esperienza ancora.</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span>{categoryEmoji[activity.category]}</span>
                    {activity.title}
                    {activity.discount_percentage > 0 && (
                      <span className="bg-accent-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{activity.discount_percentage}%
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {activity.location} • {activity.category}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href="/esperienze"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Vedi
                  </a>
                  <button
                    onClick={() => setQrActivity(activity)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm flex items-center gap-2"
                  >
                    <QrCode size={16} />
                    QR Code
                  </button>
                  <button
                    onClick={() => handleEdit(activity)}
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Elimina
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {qrActivity && (
        <QRCodeGenerator
          activity={qrActivity}
          onClose={() => setQrActivity(null)}
        />
      )}
    </div>
  )
}