'use client'

import { useState } from 'react'
import { Mail, Phone, Building2, User, MessageSquare, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function PartnershipForm() {
  const [formData, setFormData] = useState({
    hotel_name: '',
    contact_name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // STEP 1: Salva nel database
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante l\'invio')
      }

      // STEP 2: Invia email notifica con EmailJS
      try {
        const emailParams = {
          hotel_name: formData.hotel_name,
          contact_name: formData.contact_name,
          email: formData.email,
          phone: formData.phone || 'Non fornito',
          message: formData.message || 'Nessun messaggio',
          date: new Date().toLocaleString('it-IT', {
            dateStyle: 'full',
            timeStyle: 'short',
          }),
        }

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          emailParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )

        console.log('✅ Email notifica inviata con successo')
      } catch (emailError) {
        // Log errore ma non bloccare il successo
        // Il lead è comunque salvato nel DB
        console.error('❌ Errore invio email:', emailError)
      }

      setSubmitted(true)
      setFormData({
        hotel_name: '',
        contact_name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante l\'invio')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="card max-w-2xl mx-auto text-center bg-gradient-to-r from-primary-50 to-accent-50">
        <CheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3">Richiesta Inviata!</h3>
        <p className="text-gray-600 mb-6">
          Grazie per il tuo interesse. Ti contatteremo a breve per discutere della partnership.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary"
        >
          Invia Altra Richiesta
        </button>
      </div>
    )
  }

  return (
    <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-accent-50">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Diventa Partner Tribù Wellness
      </h2>
      <p className="text-gray-700 mb-6 text-center">
        Offri ai tuoi ospiti un servizio wellness esclusivo senza costi di gestione
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome Hotel */}
        <div>
          <label htmlFor="hotel_name" className="block text-sm font-semibold mb-2">
            Nome Hotel / Struttura *
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              id="hotel_name"
              name="hotel_name"
              required
              value={formData.hotel_name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Es. Hotel Verona"
            />
          </div>
        </div>

        {/* Nome Contatto */}
        <div>
          <label htmlFor="contact_name" className="block text-sm font-semibold mb-2">
            Nome e Cognome *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              required
              value={formData.contact_name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Mario Rossi"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="info@hotel.it"
            />
          </div>
        </div>

        {/* Telefono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            Telefono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="045 123456"
            />
          </div>
        </div>

        {/* Messaggio */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2">
            Messaggio (opzionale)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Vorrei maggiori informazioni sulla partnership..."
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Invio in corso...' : 'Invia Richiesta'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          * Campi obbligatori
        </p>
      </form>
    </div>
  )
}