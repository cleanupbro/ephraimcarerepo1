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
cd ephraim-care-app

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
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
ephraim-care/
├── ephraim-care-app/        # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── data/            # Static data & content
│   │   └── lib/             # Utilities & helpers
│   ├── public/              # Static assets
│   └── package.json
├── AI_CONFIG/               # AI assistant configurations
├── skills/                  # Claude Code skills
├── docs/                    # Documentation
└── README.md                # This file
```

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| [v2.3.1](https://github.com/cleanupbro/ephraimcarerepo1/releases/tag/v2.3.1) | 2026-01-16 | Version sync, capitalized slogan |
| [v2.3.0](https://github.com/cleanupbro/ephraimcarerepo1/releases/tag/v2.3.0) | 2026-01-15 | Updated slogan, refined backgrounds |
| [v2.2.2](https://github.com/cleanupbro/ephraimcarerepo1/releases/tag/v2.2.2) | 2026-01-15 | Restored two-toned mint backgrounds |
| [v2.1.0](https://github.com/cleanupbro/ephraimcarerepo1/releases/tag/v2.1.0) | 2026-01-14 | FAQ page, unique hero images |

See [CHANGELOG.md](ephraim-care-app/CHANGELOG.md) for full history.

### Rolling Back to Previous Versions

```bash
# View all available versions
git tag -l

# Checkout a specific version
git checkout v2.2.2

# Return to latest
git checkout main
```

---

## Deployment

The site is deployed on **Vercel** with automatic deployments on push to `main`.

- **Production:** https://www.ephraimcare.com.au
- **Preview:** Auto-generated for each PR

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

*Built by [OpBros.Automation](mailto:theopbros.ai@gmail.com)*
