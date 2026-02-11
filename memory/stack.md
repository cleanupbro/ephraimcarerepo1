# Tech Stack

## Runtime
- Language: TypeScript
- Runtime: Node.js 18+
- Package manager: npm

## Framework
- Next.js 14 (App Router)
- React 18

## Styling
- Tailwind CSS 3.4
- Radix UI (accessible component primitives)
- CVA (class-variance-authority)
- Motion (animations)
- Lucide React (icons)

## Database
- Supabase (PostgreSQL)
- Supabase Auth (email/password)
- Row-Level Security (RLS) enabled

## APIs & Services
| Service | Purpose | Auth Method |
|---------|---------|-------------|
| Supabase | Database + Auth | Anon Key / Service Role Key |
| n8n | Workflow automation (webhooks) | Webhook URL |
| ElevenLabs | Voice AI widget | API Key |
| Twilio | SMS notifications | Account SID + Auth Token |
| WhatsApp Business | WhatsApp notifications | Access Token |
| Google Places | Live reviews | API Key |
| Vercel | Hosting & deployment | Token (dashboard) |
| GoDaddy | Domain DNS | API Key + Secret |

## Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.2.35 | React framework |
| react | ^18 | UI library |
| @supabase/supabase-js | ^2.89.0 | Supabase client |
| @supabase/ssr | ^0.8.0 | SSR auth helpers |
| tailwindcss | ^3.4.1 | Utility-first CSS |
| motion | ^12.23.26 | Animations |
| react-hook-form | ^7.69.0 | Form handling |
| zod | ^4.2.1 | Validation |
| lucide-react | ^0.562.0 | Icons |

## Environment Variables Needed
| Variable | Purpose |
|----------|---------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase public key |
| SUPABASE_SERVICE_ROLE_KEY | Supabase admin key |
| NEXT_PUBLIC_SITE_URL | Site URL |
| ADMIN_API_KEY | Admin auth |
| WEBHOOK_REFERRAL | n8n referral webhook |
| WEBHOOK_CONTACT | n8n contact webhook |
