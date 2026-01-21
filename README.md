# Ephraim Care Website

> NDIS Disability & Mental Health Support Services | Western & Southwestern Sydney

**Live Site:** [www.ephraimcare.com.au](https://www.ephraimcare.com.au)

**Current Version:** v2.3.1

---

## About

Ephraim Care provides compassionate, person-centred disability and mental health support services across Western & Southwestern Sydney. This repository contains the company's official website built with Next.js 14.

### Services Offered
- Daily Living Support
- Community Access & Participation
- Supported Independent Living (SIL)
- Psychosocial Recovery Support
- Mental Health Support
- Transport Services
- Short-Term Accommodation (STA)
- Personal Care & Hygiene

---

## Project Structure

```
./
├── STATUS.md           # Current state (read first)
├── PLAN.md             # Project roadmap
├── LOG.md              # Activity history
├── CLAUDE.md           # Claude Code protocol
├── GEMINI.md           # Gemini protocol
├── README.md           # This file
│
├── src/                # Next.js application
│   ├── app/            # App Router pages
│   ├── components/     # React components
│   ├── data/           # Static data & content
│   ├── lib/            # Utilities & helpers
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types
│   └── public/         # Static assets
│
├── agents/             # Automation workflows
├── docs/               # Documentation
└── ops/                # Operations scripts
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Radix UI** | Accessible component primitives |
| **Lucide Icons** | Icon library |
| **Supabase** | Backend & authentication |
| **Vercel** | Hosting & deployment |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cleanupbro/ephraimcarerepo1.git
cd ephraimcarerepo1

# Navigate to app directory
cd src

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
cd src
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deployment

The site is deployed on **Vercel** with automatic deployments on push to `main`.

- **Production:** https://www.ephraimcare.com.au
- **Admin:** https://www.ephraimcare.com.au/admin

---

## Contact

**Ephraim Care Pty Ltd**
- Phone: 0426 800 901
- Email: contact@ephraimcare.com.au
- Location: Western & Southwestern Sydney, NSW

---

## License

Private repository. All rights reserved.

---

*Built by [OpBros.AI](mailto:theopbros.ai@gmail.com)*
