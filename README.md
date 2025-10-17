\# Tribu Wellness



PWA che connette il mondo turistico (hotel, B\&B, resort) con fitness e benessere locale.



\## 🎯 Concept



Sistema basato su \*\*QR code intelligenti\*\* che apre landing personalizzate per ogni partner, permettendo agli ospiti di:

\- Richiedere allenamenti personalizzati

\- Scoprire esperienze wellness locali

\- Ottenere vantaggi esclusivi



\## 🚀 Tech Stack



\- \*\*Frontend\*\*: Next.js 14 (App Router)

\- \*\*Styling\*\*: Tailwind CSS

\- \*\*Database\*\*: Supabase (PostgreSQL)

\- \*\*Hosting\*\*: Vercel

\- \*\*Icons\*\*: Lucide React



\## 📁 Struttura Progetto



```

tribuwellness/

├── src/

│   ├── app/

│   │   ├── layout.tsx          # Layout globale

│   │   ├── page.tsx            # Homepage

│   │   ├── partner/\[slug]/     # Landing dinamica partner

│   │   ├── esperienze/         # Pagina esperienze

│   │   └── api/

│   │       ├── analytics/      # Tracking eventi

│   │       └── lead/           # Richieste partnership

│   ├── components/

│   │   ├── WhatsAppCTA.tsx     # Bottone WhatsApp riusabile

│   │   ├── Footer.tsx          # Footer

│   │   ├── PartnerHero.tsx     # Hero section partner

│   │   └── ExperienceCard.tsx  # Card esperienza

│   ├── lib/

│   │   ├── supabase.ts         # Client Supabase

│   │   └── constants.ts        # Costanti app

│   └── types/

│       └── index.ts            # TypeScript types

├── supabase/

│   └── schema.sql              # Schema database

└── public/                     # Assets statici

```



\## 🗄️ Database Schema



\*\*Tables:\*\*

\- `partners` - Hotel, B\&B, Resort

\- `activities` - Esperienze locali (spa, outdoor, food, wellness, fitness)

\- `analytics\_events` - Tracking scansioni QR e interazioni

\- `partner\_leads` - Richieste partnership



\## 🔧 Setup Locale



1\. \*\*Clone repo:\*\*

```bash

git clone https://github.com/Padu76/tribuwellness.git

cd tribuwellness

```



2\. \*\*Installa dipendenze:\*\*

```bash

npm install

```



3\. \*\*Configura env variables:\*\*

Crea `.env.local`:

```env

NEXT\_PUBLIC\_SUPABASE\_URL=your\_supabase\_url

NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=your\_supabase\_anon\_key

NEXT\_PUBLIC\_WHATSAPP\_NUMBER=393478881515

NEXT\_PUBLIC\_SITE\_URL=http://localhost:3000

```



4\. \*\*Setup database:\*\*

\- Vai su \[Supabase](https://supabase.com)

\- Crea un nuovo progetto

\- Vai su SQL Editor

\- Esegui il contenuto di `supabase/schema.sql`



5\. \*\*Run dev:\*\*

```bash

npm run dev

```



Apri \[http://localhost:3000](http://localhost:3000)



\## 🌐 Deploy su Vercel



1\. Push su GitHub

2\. Importa progetto su \[Vercel](https://vercel.com)

3\. Aggiungi Environment Variables

4\. Deploy automatico!



\*\*Live URL:\*\* \[tribuwellness.vercel.app](https://tribuwellness.vercel.app)



\## 📊 Flusso Utente



\### Per Ospiti Hotel:

1\. Scansiona QR in hotel

2\. Apre landing personalizzata (`/partner/hotel-slug`)

3\. Richiede sessione via WhatsApp

4\. Esplora esperienze locali



\### Per Partner (Hotel):

1\. Riceve QR code personalizzato

2\. Lo espone in reception/camere

3\. Monitora analytics (scansioni, richieste)

4\. Zero gestione necessaria



\### Per Admin (Tu):

1\. Aggiungi partner al database

2\. Genera QR code

3\. Inserisci esperienze locali

4\. Monitora analytics

5\. Gestisci richieste partnership



\## 🔑 Tier Partner



\- \*\*Freemium\*\*: Landing generica, tracking base

\- \*\*Pro\*\*: Pagina brandizzata, logo, analytics dettagliate (€250/anno)

\- \*\*Ambassador\*\*: Visibilità prioritaria, materiali custom (€490-1000/anno)



\## 📱 API Routes



\### POST `/api/analytics`

Tracking eventi (visit, whatsapp\_click, activity\_view)



```json

{

&nbsp; "partner\_slug": "hotel-verona",

&nbsp; "event\_type": "whatsapp\_click"

}

```



\### POST `/api/lead`

Richieste partnership



```json

{

&nbsp; "hotel\_name": "Hotel Verona",

&nbsp; "contact\_name": "Mario Rossi",

&nbsp; "email": "info@hotel.it",

&nbsp; "phone": "045123456",

&nbsp; "message": "Vorrei info"

}

```



\## 🎨 Personalizzazione Brand



Colori in `tailwind.config.js`:

\- \*\*Primary\*\*: Verde wellness

\- \*\*Accent\*\*: Arancione/giallo energy



\## 📈 Roadmap



\- \[ ] Dashboard admin per gestione partner

\- \[ ] Sistema crediti/pass turistici

\- \[ ] Mappa interattiva esperienze

\- \[ ] Integrazione CRM

\- \[ ] Multi-città (Verona → Garda → Milano)

\- \[ ] App mobile nativa



\## 📞 Contatti



\- \*\*WhatsApp\*\*: +39 347 888 1515

\- \*\*Website\*\*: \[personaltrainerverona.it](https://www.personaltrainerverona.it)

\- \*\*Instagram\*\*: \[@tribustudio](https://www.instagram.com/tribustudio)



---



Made with 💪 by Tribu Wellness

