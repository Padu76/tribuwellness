import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { partner_slug, event_type } = body

    // Validation
    if (!partner_slug || !event_type) {
      return NextResponse.json(
        { error: 'Missing required fields: partner_slug, event_type' },
        { status: 400 }
      )
    }

    const validEventTypes = ['visit', 'whatsapp_click', 'activity_view']
    if (!validEventTypes.includes(event_type)) {
      return NextResponse.json(
        { error: 'Invalid event_type. Must be: visit, whatsapp_click, or activity_view' },
        { status: 400 }
      )
    }

    // Get user agent and IP
    const user_agent = request.headers.get('user-agent') || undefined
    const ip_address = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                       request.headers.get('x-real-ip') || 
                       undefined

    // Insert event
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        partner_slug,
        event_type,
        user_agent,
        ip_address,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save analytics event' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}