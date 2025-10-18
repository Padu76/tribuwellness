'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminHeader } from '@/components/AdminAuth'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, ExternalLink, BarChart3, QrCode } from 'lucide-react'
import Link from 'next/link'
import type { Partner } from '@/types'

const AUTH_KEY = 'tribu_admin_auth'

export default function PartnersManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [qrPartner, setQrPartner] = useState<Partner | null>(null)
  const [deleteError, setDeleteError] = useState<string>('')
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    tier: 'freemium' as 'freemium' | 'pro' | 'ambassador',
    description: '',
    location: '',
    logo_url: '',
  })

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY)
    if (auth !== 'true') {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
      setChecking(false)
      loadPartners()
    }
  }, [router])

  const loadPartners = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false })
    
    setPartners(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingPartner) {
      await supabase
        .from('partners')
        .update(formData)
        .eq('id', editingPartner.id)
    } else {
      await supabase
        .from('partners')
        .insert([formData])
    }

    resetForm()
    loadPartners()
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData({
      slug: partner.slug,
      name: partner.name,
      tier: partner.tier,
      description: partner.description || '',
      location: partner.location || '',
      logo_url: partner.logo_url || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (partner: Partner) => {
    const confirmMessage = `⚠️ ATTENZIONE!\n\nStai per eliminare:\n\n"${partner.name}" (${partner.slug})\n\nQuesta azione è IRREVERSIBILE.\n\nSei sicuro di voler procedere?`
    
    if (!window.confirm(confirmMessage)) {
      return
    }

    setDeleteError('')

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', partner.id)

      if (error) {
        console.error('Delete error:', error)
        setDeleteError(`Errore eliminazione: ${error.message}`)
        alert(`❌ Errore: ${error.message}`)
        return
      }

      // Successo
      alert('✅ Partner eliminato con successo!')
      loadPartners()
    } catch (err) {
      console.error('Delete error:', err)
      const errorMsg = err instanceof Error ? err.message : 'Errore sconosciuto'
      setDeleteError(errorMsg)
      alert(`❌ Errore: ${errorMsg}`)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingPartner(null)
    setFormData({
      slug: '',
      name: '',
      tier: 'freemium',
      description: '',
      location: '',
      logo_url: '',
    })
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

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <div className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Gestione Partner</h2>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Nuovo Partner
          </button>
        </div>

        {/* Error Alert */}
        {deleteError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
            <span>{deleteError}</span>
            <button onClick={() => setDeleteError('')} className="text-red-900 font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="card mb-8">
            <h3 className="text-xl font-bold mb-4">
              {editingPartner ? 'Modifica Partner' : 'Nuovo Partner'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="hotel-verona"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Hotel Verona"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Tier *</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({...formData, tier: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="freemium">Freemium</option>
                    <option value="pro">Pro</option>
                    <option value="ambassador">Ambassador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Verona, VR"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Descrizione</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Logo URL</label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingPartner ? 'Aggiorna' : 'Crea'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Annulla
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista Partner */}
        <div className="space-y-4">
          {loading ? (
            <p>Caricamento...</p>
          ) : partners.length === 0 ? (
            <p className="text-gray-500">Nessun partner ancora.</p>
          ) : (
            partners.map((partner) => (
              <div key={partner.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{partner.name}</h3>
                  <p className="text-sm text-gray-600">
                    /{partner.slug} • {partner.tier} • {partner.location || 'N/A'}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setQrPartner(partner)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm flex items-center gap-2"
                  >
                    <QrCode size={16} />
                    QR Code
                  </button>
                  <Link
                    href={`/admin/dashboard/analytics/${partner.slug}`}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 text-sm flex items-center gap-2"
                  >
                    <BarChart3 size={16} />
                    Analytics
                  </Link>
                  <a
                    href={`/partner/${partner.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Vedi
                  </a>
                  <button
                    onClick={() => handleEdit(partner)}
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(partner)}
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
      {qrPartner && (
        <QRCodeGenerator
          partner={qrPartner}
          onClose={() => setQrPartner(null)}
        />
      )}
    </div>
  )
}