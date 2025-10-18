import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { hotel_name, contact_name, email, phone, message } = body

    // Validazione
    if (!hotel_name || !contact_name || !email) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      )
    }

    // Salva lead nel database
    const { data: lead, error: dbError } = await supabase
      .from('partner_leads')
      .insert([
        {
          hotel_name,
          contact_name,
          email,
          phone: phone || null,
          message: message || null,
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Errore salvataggio nel database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Richiesta inviata con successo!',
      lead,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Errore del server' },
      { status: 500 }
    )
  }
}