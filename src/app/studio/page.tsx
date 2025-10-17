import Image from 'next/image'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import Footer from '@/components/Footer'
import { WHATSAPP_MESSAGES } from '@/lib/constants'
import { Dumbbell, Users, Heart, Sparkles, Clock, MapPin, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'Tribù Studio - Personal Training Verona',
  description: 'Studio di Personal Training a Verona. Lezioni individuali, di coppia e miniclass con personal trainer qualificati. Allenamenti personalizzati per ogni livello.',
}

export default function StudioPage() {
  const services = [
    {
      icon: Dumbbell,
      title: 'Personal Training 1-1',
      description: 'Allenamento individuale con personal trainer dedicato. Programma completamente personalizzato sulle tue esigenze.',
      image: '/images/studio/personal.jpg',
    },
    {
      icon: Users,
      title: 'Sessioni di Coppia',
      description: 'Coinvolgi il tuo partner o amico. Allenatevi insieme con il supporto del personal trainer dedicato.',
      image: '/images/studio/couple.jpg',
    },
    {
      icon: Heart,
      title: 'Pilates & Posturale',
      description: 'Migliora postura, flessibilità e rinforza il core con esercizi mirati e supervisionati.',
      image: '/images/studio/group.jpg',
    },
    {
      icon: Sparkles,
      title: 'Functional Training',
      description: 'Allenamento funzionale con corpo libero, kettlebell, bilancieri e attrezzi professionali.',
      image: '/images/studio/functional.jpg',
    },
  ]

  return (
    <>
      <div>
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[500px]">
          <Image
            src="/images/studio/interior.jpg"
            alt="Tribù Studio Verona"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <Image
                src="/images/logos/logo-white.png"
                alt="Tribù Logo"
                width={200}
                height={100}
                className="mx-auto mb-6 h-20 w-auto"
              />
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Tribù Studio
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Personal Training a Verona<br />
                Allenati, mangia bene e vivi meglio
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Chi Siamo */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Chi Siamo</h2>
            <div className="card bg-gradient-to-br from-primary-50 to-accent-50">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Tribù è uno studio di Personal Training dove facciamo <strong>esclusivamente lezioni individuali, di coppia e miniclass</strong>, sempre supervisionate da un Personal Trainer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Nessun abbonamento, niente accesso libero: ogni sessione è su appuntamento e seguita da un professionista. Questo significa <strong>più personalizzazione, motivazione e risultati concreti</strong>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Il vero motivo per cui fare attività fisica è la <strong>salute</strong>. Il resto è dettaglio.
              </p>
            </div>
          </section>

          {/* Servizi */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">I Nostri Servizi</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <div key={index} className="card overflow-hidden">
                    <div className="relative h-64 -mx-6 -mt-6 mb-6">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                        <Icon className="text-primary-600" size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Metodo */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Il Nostro Metodo</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Personalizzazione</h3>
                <p className="text-gray-600">
                  Ogni programma è studiato sulle tue esigenze specifiche e obiettivi personali
                </p>
              </div>
              <div className="card text-center">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-3">Supervisione Costante</h3>
                <p className="text-gray-600">
                  Il personal trainer ti segue durante tutta la sessione per esecuzione corretta
                </p>
              </div>
              <div className="card text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-3">Risultati Concreti</h3>
                <p className="text-gray-600">
                  Monitoriamo i progressi e adattiamo il programma per massimizzare i risultati
                </p>
              </div>
            </div>
          </section>

          {/* Perché Tribù */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Perché Scegliere Tribù</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold text-lg mb-2">✓ Team Qualificato</h3>
                <p className="text-gray-600 text-sm">Personal trainer certificati CONI con specializzazioni in nutrizione sportiva e functional training</p>
              </div>
              <div className="card">
                <h3 className="font-bold text-lg mb-2">✓ Ambiente Raccolto</h3>
                <p className="text-gray-600 text-sm">Studio privato, lontano dal caos delle palestre tradizionali</p>
              </div>
              <div className="card">
                <h3 className="font-bold text-lg mb-2">✓ Attrezzature Complete</h3>
                <p className="text-gray-600 text-sm">Bilancieri, kettlebell, TRX, palle mediche e tutto il necessario per un allenamento efficace</p>
              </div>
              <div className="card">
                <h3 className="font-bold text-lg mb-2">✓ Orari Flessibili</h3>
                <p className="text-gray-600 text-sm">Aperto dalle 7:00 alle 21:00, scegli l'orario più comodo per te</p>
              </div>
              <div className="card">
                <h3 className="font-bold text-lg mb-2">✓ Parcheggio Gratuito</h3>
                <p className="text-gray-600 text-sm">Ampio parcheggio disponibile, accessibile ai disabili</p>
              </div>
              <div className="card">
                <h3 className="font-bold text-lg mb-2">✓ Prima Lezione con Massaggio</h3>
                <p className="text-gray-600 text-sm">Prova l'esperienza completa: allenamento + massaggio post-lezione</p>
              </div>
            </div>
          </section>

          {/* Contatti */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Dove Siamo</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="card">
                <h3 className="text-2xl font-bold mb-6">Informazioni</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold">Indirizzo</p>
                      <p className="text-gray-600">Via Albere 27/B, 37138 Verona</p>
                      <p className="text-sm text-gray-500 mt-1">
                        A 2 minuti dalla tangenziale Nord<br />
                        A 5 minuti dal centro<br />
                        Fermata bus linea 11 e 12 a 30 metri
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold">Orari</p>
                      <p className="text-gray-600">Lun-Ven: 7:00 - 21:00</p>
                      <p className="text-gray-600">Sabato: solo mattina</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold">Telefono</p>
                      <a href="tel:3478881515" className="text-primary-600 hover:underline">
                        347 888 1515
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:info@tribustudio.it" className="text-primary-600 hover:underline">
                        info@tribustudio.it
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-primary-50 to-accent-50">
                <h3 className="text-2xl font-bold mb-4">Prenota la Tua Prima Lezione</h3>
                <p className="text-gray-700 mb-6">
                  Non aspettare domani per iniziare a cambiare la tua vita. Contattaci ora su WhatsApp per una risposta immediata!
                </p>
                <WhatsAppCTA
                  message={WHATSAPP_MESSAGES.requestInfo()}
                  label="Prenota su WhatsApp"
                  className="w-full justify-center"
                />
                <p className="text-sm text-gray-600 text-center mt-4">
                  Risposta immediata garantita!<br />
                  Online dalle 7:00 alle 21:00
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  )
}