import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/constants'

interface WhatsAppCTAProps {
  message: string
  label?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function WhatsAppCTA({ 
  message, 
  label = 'Contattaci su WhatsApp',
  variant = 'primary',
  className = ''
}: WhatsAppCTAProps) {
  const whatsappUrl = getWhatsAppLink(message)
  
  const baseClasses = variant === 'primary' 
    ? 'btn-primary' 
    : 'btn-secondary'

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} inline-flex items-center gap-2 ${className}`}
    >
      <MessageCircle size={20} />
      <span>{label}</span>
    </a>
  )
}