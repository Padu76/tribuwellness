export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393478881515'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tribuwellness.it'

export const WHATSAPP_MESSAGES = {
  requestSession: (partnerName: string) => 
    `Ciao! Sono ospite di ${partnerName} e vorrei informazioni sulla disponibilità per una sessione di allenamento.`,
  
  requestInfo: () => 
    `Ciao! Vorrei maggiori informazioni sui servizi Tribu Wellness.`,
  
  partnershipRequest: (hotelName: string, contactName: string) => 
    `Ciao! Sono ${contactName} di ${hotelName}. Vorrei informazioni sulla partnership Tribu Wellness.`,
}

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export const PARTNER_TIERS = {
  FREEMIUM: 'freemium',
  PRO: 'pro',
  AMBASSADOR: 'ambassador',
} as const

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/tribustudio',
  facebook: 'https://www.facebook.com/tribustudio',
  website: 'https://www.personaltrainerverona.it',
}