import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tribuwellness.vercel.app'

  // Pagine statiche
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/esperienze`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch tutti i partner attivi
  const { data: partners } = await supabase
    .from('partners')
    .select('slug, updated_at')
    .eq('is_active', true)

  const partnerPages: MetadataRoute.Sitemap = partners
    ? partners.map((partner) => ({
        url: `${baseUrl}/partner/${partner.slug}`,
        lastModified: new Date(partner.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      }))
    : []

  return [...staticPages, ...partnerPages]
}