'use client'

import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { X, Download, ExternalLink } from 'lucide-react'
import type { Partner, Activity } from '@/types'

interface QRCodeGeneratorProps {
  partner?: Partner
  activity?: Activity
  onClose: () => void
}

export default function QRCodeGenerator({ partner, activity, onClose }: QRCodeGeneratorProps) {
  const [qrDataUrl, setQrDataUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Determina URL in base al tipo
  const getTargetUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tribuwellness.vercel.app'
    
    if (partner) {
      return `${baseUrl}/partner/${partner.slug}`
    }
    
    if (activity) {
      // Se è Tribù Studio, punta a /studio
      if (activity.title.toLowerCase().includes('tribù studio')) {
        return `${baseUrl}/studio`
      }
      // Altrimenti punta a /esperienze
      return `${baseUrl}/esperienze`
    }
    
    return baseUrl
  }

  const targetUrl = getTargetUrl()
  const title = partner ? partner.name : activity ? activity.title : 'Tribu Wellness'
  const filename = partner 
    ? `qr-${partner.slug}.png` 
    : activity 
      ? `qr-${activity.title.toLowerCase().replace(/\s+/g, '-')}.png`
      : 'qr-tribu.png'

  useEffect(() => {
    generateQR()
  }, [targetUrl])

  const generateQR = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(targetUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
      setQrDataUrl(dataUrl)

      // Genera anche su canvas per download
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, targetUrl, {
          width: 400,
          margin: 2,
        })
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = filename
    link.href = qrDataUrl
    link.click()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">QR Code {title}</h2>
          <p className="text-gray-600 text-sm">
            {partner 
              ? 'Scarica e stampa questo QR code per il tuo partner hotel'
              : 'Scarica e stampa questo QR code per promuovere l\'esperienza'}
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-gray-50 rounded-lg p-6 flex justify-center mb-6">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code" className="w-full max-w-sm" />
          ) : (
            <p className="text-gray-500">Generazione QR code...</p>
          )}
        </div>

        {/* Canvas nascosto per download */}
        <canvas ref={canvasRef} className="hidden" />

        {/* URL */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">URL Destinazione</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={targetUrl}
              readOnly
              className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-sm"
            />
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Come utilizzare:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Scarica il QR code in formato PNG</li>
            {partner ? (
              <>
                <li>✓ Stampalo su materiali fisici (flyer, cartelli, welcome booklet)</li>
                <li>✓ Esponi in reception, camere o aree comuni</li>
                <li>✓ Gli ospiti scansioneranno e accederanno alla landing personalizzata</li>
              </>
            ) : (
              <>
                <li>✓ Stampalo su volantini, locandine o cartelli</li>
                <li>✓ Esponi nel tuo locale o in hotel partner</li>
                <li>✓ Gli ospiti scansioneranno e scopriranno l'esperienza</li>
              </>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="btn-primary flex-1 justify-center flex items-center gap-2"
            disabled={!qrDataUrl}
          >
            <Download size={20} />
            Scarica PNG
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  )
}