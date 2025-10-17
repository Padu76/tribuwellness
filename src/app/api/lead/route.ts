import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { hotel_name, contact_name, email, phone, message } = body

    // Validation
    if (!hotel_name || !contact_name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: hotel_name, contact_name, email' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert lead
    const { data, error } = await supabase
      .from('partner_leads')
      .insert({
        hotel_name,
        contact_name,
        email,
        phone: phone || null,
        message: message || null,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save partnership request' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Partnership request received successfully',
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}