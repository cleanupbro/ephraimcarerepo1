# Component Library
> All reusable components

---

## UI Components
Location: `src/components/ui/`

| Component | File | Props |
|-----------|------|-------|
| Button | button.tsx | variant, size, disabled, asChild |
| Card | card.tsx | - |
| Input | input.tsx | type, placeholder, className |
| Dialog | dialog.tsx | open, onOpenChange |
| Select | select.tsx | options, value, onChange |
| Checkbox | checkbox.tsx | checked, onChange |
| Toast | toast.tsx | - |
| Label | label.tsx | htmlFor |

---

## Layout Components
Location: `src/components/layout/`

| Component | File | Purpose |
|-----------|------|---------|
| Header | header.tsx | Site header with navigation |
| Footer | footer.tsx | Site footer with links |
| ConditionalLayout | conditional-layout.tsx | Wrapper for pages |
| AdminNav | admin-nav.tsx | Admin sidebar navigation |
| MobileNav | mobile-nav.tsx | Mobile hamburger menu |

---

## Section Components
Location: `src/components/sections/`

| Component | Purpose |
|-----------|---------|
| Hero | Homepage hero section |
| ServicesGrid | Grid of service cards |
| CTABanner | Call-to-action banner |
| FAQ | FAQ accordion |
| TrustSignals | Trust badges section |
| AboutPreview | About section preview |

---

## Animation Components
Location: `src/components/animations/`

| Component | Purpose |
|-----------|---------|
| FadeIn | Fade in on mount |
| StaggerContainer | Container for staggered children |
| StaggerItem | Individual staggered item |
| CountUp | Animated number counter |
| Floating | Floating hover animation |

---

## Admin Components
Location: `src/components/admin/`

| Component | Purpose |
|-----------|---------|
| StatsCard | Dashboard stat display |
| ReferralCard | Referral item card |
| ContactCard | Contact item card |

---

## Import Examples

```typescript
// UI
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Layout
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

// Sections
import { Hero } from '@/components/sections/hero'
import { ServicesGrid } from '@/components/sections/services-grid'

// Animations
import { FadeIn } from '@/components/animations/fade-in'
import { StaggerContainer } from '@/components/animations/stagger-container'
```
