import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import emailjs from '@emailjs/browser'

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

    // Invia notifica email con EmailJS
    try {
      const emailParams = {
        hotel_name,
        contact_name,
        email,
        phone: phone || 'Non fornito',
        message: message || 'Nessun messaggio',
        date: new Date().toLocaleString('it-IT', {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      }

      // EmailJS - inizializza e invia
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailParams
      )

      console.log('✅ Email notifica inviata con successo')
    } catch (emailError) {
      // Log errore ma non bloccare la response
      // Il lead è comunque salvato nel DB
      console.error('❌ Errore invio email:', emailError)
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