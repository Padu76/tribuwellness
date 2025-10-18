import Link from 'next/link'
import Footer from '@/components/Footer'
import { Check, Smartphone, TrendingUp, Users, Zap, Crown, Star, BarChart3, Globe, Award, Package, Dumbbell, Home, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Diventa Partner | Tribù Wellness',
  description: 'Offri esperienze wellness ai tuoi ospiti senza alcuno sforzo. QR code personalizzato, landing page brandizzata, zero gestione.',
}

const freemiumFeatures = [
  'QR code personalizzato',
  'Landing page con logo hotel',
  'Esperienze wellness esterne',
  'Link WhatsApp precompilato',
  'Setup in 5 minuti',
]

const proFeatures = [
  'Tutto del Freemium +',
  'Esperienze interne hotel (spa, massaggi, ristorante)',
  'Analytics dashboard completa',
  'Report mensili automatici PDF',
  'Posizionamento prioritario',
  'Branding avanzato (colori custom)',
  'Sconti esclusivi maggiorati (30-40%)',
  'Supporto prioritario (24h)',
]

const ambassadorFeatures = [
  'Tutto del PRO +',
  'Pacchetti combo personalizzati',
  'Partner Manager dedicato (call mensile)',
  'Landing multi-lingua (IT/EN/DE)',
  'Badge esclusivo "Ambassador"',
  'Export dati illimitato (CSV storico)',
]

export default function PartnerInfoPage() {
  return (
    <>
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                <Dumbbell className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                Tribù Wellness
              </span>
            </Link>

            <nav className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <Home size={18} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link 
                href="/#partnership" 
                className="btn-primary text-sm"
              >
                Richiedi Demo
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50">
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🏨 Per Hotel & Strutture Ricettive
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Offri Esperienze Wellness<br />Senza Alcuno Sforzo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Un QR code in reception. L'ospite scansiona. Vede fitness, spa e attività benessere della zona. 
            <strong> Zero gestione per te.</strong>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#pricing" className="btn-primary text-lg">
              Vedi i Piani
            </a>
            <a href="#demo" className="btn-secondary text-lg">
              Guarda la Demo
            </a>
          </div>
        </section>

        {/* Come Funziona */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Come Funziona</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Crei Account</h3>
              <p className="text-gray-600">Setup in 5 minuti. Personalizzi logo e colori.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Ricevi QR Code</h3>
              <p className="text-gray-600">Scarichi e stampi il QR personalizzato.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Esponi</h3>
              <p className="text-gray-600">In reception, camere, o welcome booklet.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Fine!</h3>
              <p className="text-gray-600">Gli ospiti scansionano e prenotano. Tu non fai nulla.</p>
            </div>
          </div>
        </section>

        {/* Demo Visuale */}
        <section id="demo" className="container mx-auto px-4 py-16">
          <div className="card max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50">
            <h2 className="text-3xl font-bold text-center mb-8">Cosa Vede l'Ospite</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-primary-200">
                  {/* Header con logo hotel */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                    <div className="w-10 h-10 bg-primary-600 rounded flex items-center justify-center text-white font-bold">H</div>
                    <div>
                      <div className="font-bold text-sm">Hotel Verona</div>
                      <div className="text-xs text-gray-500">Partner Wellness</div>
                    </div>
                  </div>
                  
                  {/* Card Tribù Studio */}
                  <div className="mb-3 bg-gradient-to-br from-primary-50 to-accent-50 p-3 rounded-lg border-2 border-primary-200 relative">
                    <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-bold">-20%</div>
                    <div className="h-20 bg-primary-200 rounded mb-2 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop" 
                        alt="Fitness"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-bold text-xs mb-1">💪 Tribù Studio</div>
                    <div className="text-xs text-gray-600 mb-2">Personal training con sconto 20%</div>
                    <div className="bg-primary-600 text-white text-xs py-1 rounded text-center font-semibold">Prenota</div>
                  </div>

                  {/* Card Eventi */}
                  <div className="mb-3 bg-purple-50 p-3 rounded-lg">
                    <div className="font-bold text-xs mb-2">📅 Eventi Oggi</div>
                    <div className="space-y-2">
                      <div className="flex gap-2 text-xs">
                        <div className="w-12 h-12 bg-purple-200 rounded flex-shrink-0 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1574784914708-4c5a0f7d78b1?w=100&h=100&fit=crop" 
                            alt="Opera"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Opera Arena</div>
                          <div className="text-gray-600 text-xs">Questa sera</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Esperienze */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-bold text-xs mb-2">🧘 Altre Esperienze</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 bg-blue-100 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=100&fit=crop" 
                          alt="Spa"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-16 bg-green-100 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=100&fit=crop" 
                          alt="Food"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Landing Personalizzata</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Check className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Logo del tuo hotel</strong> in alto</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Tribù Studio</strong> con sconto 20% ospiti</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Eventi Verona Daily</strong> cosa fare oggi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Spa, ristoranti healthy, outdoor</strong> della zona</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Prenotazione WhatsApp</strong> con 1 click</span>
                  </li>
                </ul>
                
                <a 
                  href="/partner/hotel-esempio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <ExternalLink size={20} />
                  Vedi Esempio Live
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefici */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Perché Scegliere Tribù Wellness</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card text-center">
              <div className="bg-accent-100 text-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Gestione</h3>
              <p className="text-gray-600">
                Non devi cercare spa, rispondere a domande, o organizzare nulla. Tutto automatico.
              </p>
            </div>
            <div className="card text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Valore Aggiunto</h3>
              <p className="text-gray-600">
                Gli ospiti percepiscono un servizio premium. Ti distingui dalla concorrenza.
              </p>
            </div>
            <div className="card text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Ospiti Più Felici</h3>
              <p className="text-gray-600">
                Esperienza di soggiorno completa. Più probabilità di tornare e consigliare.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-4">Scegli il Tuo Piano</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Inizia gratis. Upgrade quando vuoi. Nessun contratto vincolante.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Freemium */}
            <div className="card border-2 border-gray-200 hover:border-gray-300 transition-all">
              <div className="text-center mb-6">
                <Star className="text-gray-400 mx-auto mb-3" size={40} />
                <h3 className="text-2xl font-bold mb-2">Freemium</h3>
                <div className="text-4xl font-bold mb-2">Gratis</div>
                <p className="text-gray-600">Per sempre</p>
              </div>
              <ul className="space-y-3 mb-8">
                {freemiumFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-primary-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/#partnership" className="btn-secondary w-full justify-center">
                Inizia Gratis
              </a>
            </div>

            {/* PRO */}
            <div className="card border-2 border-primary-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                ⭐ Più Popolare
              </div>
              <div className="text-center mb-6">
                <BarChart3 className="text-primary-600 mx-auto mb-3" size={40} />
                <h3 className="text-2xl font-bold mb-2">PRO</h3>
                <div className="text-4xl font-bold mb-2">€49<span className="text-xl text-gray-600">/mese</span></div>
                <p className="text-gray-600">Analytics + Personalizzazione</p>
              </div>
              <ul className="space-y-3 mb-8">
                {proFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-primary-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/#partnership" className="btn-primary w-full justify-center">
                Richiedi Demo
              </a>
            </div>

            {/* Ambassador */}
            <div className="card border-2 border-accent-500 bg-gradient-to-br from-white to-accent-50">
              <div className="text-center mb-6">
                <Crown className="text-accent-600 mx-auto mb-3" size={40} />
                <h3 className="text-2xl font-bold mb-2">Ambassador</h3>
                <div className="text-4xl font-bold mb-2">€99<span className="text-xl text-gray-600">/mese</span></div>
                <p className="text-gray-600">Massima personalizzazione</p>
              </div>
              <ul className="space-y-3 mb-8">
                {ambassadorFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-accent-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/#partnership" className="btn-primary bg-accent-600 hover:bg-accent-700 w-full justify-center">
                Contattaci
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Domande Frequenti</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold mb-2">Come funziona il piano gratuito?</h3>
              <p className="text-gray-600">
                Il piano Freemium è completamente gratuito per sempre. Ricevi un QR code personalizzato e una landing page con il tuo logo. 
                Gli ospiti vedono tutte le esperienze wellness esterne (Tribù Studio + partner zona).
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">Posso cambiare piano in qualsiasi momento?</h3>
              <p className="text-gray-600">
                Sì! Puoi fare upgrade o downgrade quando vuoi. Non ci sono contratti vincolanti. 
                Se fai downgrade, le funzionalità premium verranno disattivate ma i tuoi dati restano.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">Cosa sono le "esperienze interne hotel"?</h3>
              <p className="text-gray-600">
                Con il piano PRO puoi aggiungere i TUOI servizi nella landing (spa del tuo hotel, massaggi, ristorante, miniclass). 
                Gli ospiti vedono sia esperienze esterne che quelle interne al tuo hotel.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">Devo pagare commissioni sulle prenotazioni?</h3>
              <p className="text-gray-600">
                No! Non prendiamo commissioni sulle prenotazioni generate tramite la piattaforma. 
                Paghi solo il canone mensile del piano scelto (o niente se usi Freemium).
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">Quanto tempo ci vuole per il setup?</h3>
              <p className="text-gray-600">
                5 minuti! Crei l'account, carichi il logo, generi il QR e sei online. 
                Se scegli PRO o Ambassador, ti aiutiamo noi con la personalizzazione avanzata.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Finale */}
        <section className="container mx-auto px-4 py-16">
          <div className="card max-w-3xl mx-auto text-center bg-gradient-to-r from-primary-600 to-accent-600 text-white">
            <h2 className="text-4xl font-bold mb-4">Pronto a Iniziare?</h2>
            <p className="text-xl mb-8 text-white/90">
              Offri esperienze wellness ai tuoi ospiti in 5 minuti. Zero rischi, nessun contratto.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/#partnership" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
                Inizia Gratis
              </a>
              <a 
                href="https://wa.me/393478881515?text=Ciao! Vorrei una demo di Tribù Wellness per il mio hotel" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
              >
                Richiedi Demo
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}