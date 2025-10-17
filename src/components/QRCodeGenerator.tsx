'use client'

import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { X, Download, ExternalLink } from 'lucide-react'
import type { Partner } from '@/types'

interface QRCodeGeneratorProps {
  partner: Partner
  onClose: () => void
}

export default function QRCodeGenerator({ partner, onClose }: QRCodeGeneratorProps) {
  const [qrDataUrl, setQrDataUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const partnerUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tribuwellness.vercel.app'}/partner/${partner.slug}`

  useEffect(() => {
    generateQR()
  }, [partner.slug])

  const generateQR = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(partnerUrl, {
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
        await QRCode.toCanvas(canvasRef.current, partnerUrl, {
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
    link.download = `qr-${partner.slug}.png`
    link.href = qrDataUrl
    link.click()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">QR Code {partner.name}</h2>
          <p className="text-gray-600 text-sm">
            Scarica e stampa questo QR code per il tuo partner
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
          <label className="block text-sm font-semibold mb-2">URL Landing</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={partnerUrl}
              readOnly
              className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-sm"
            />
            <a
              href={partnerUrl}
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
            <li>✓ Stampalo su materiali fisici (flyer, cartelli, welcome booklet)</li>
            <li>✓ Esponi in reception, camere o aree comuni</li>
            <li>✓ Gli ospiti scansioneranno e accederanno alla landing personalizzata</li>
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