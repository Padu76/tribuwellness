export interface Partner {
  id: string
  slug: string
  name: string
  tier: 'freemium' | 'pro' | 'ambassador'
  logo_url?: string
  description?: string
  location?: string
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface Activity {
  id: string
  title: string
  category: 'spa' | 'outdoor' | 'food' | 'wellness' | 'fitness'
  description: string
  location: string
  image_url?: string
  website_url?: string
  maps_url?: string
  created_at: string
  is_active: boolean
}

export interface AnalyticsEvent {
  id: string
  partner_slug: string
  event_type: 'visit' | 'whatsapp_click' | 'activity_view'
  timestamp: string
  user_agent?: string
  ip_address?: string
}

export interface PartnerLead {
  id: string
  hotel_name: string
  contact_name: string
  email: string
  phone?: string
  message?: string
  created_at: string
  status: 'new' | 'contacted' | 'converted' | 'rejected'
}