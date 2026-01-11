# Development Guide
> Setting up the development environment

---

## Prerequisites

- Node.js 18+
- npm 9+
- Git

---

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/cleanupbro/ephraimcarerepo1.git
cd ephraimcarerepo1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create `.env.local` from example:

```bash
cp .env.example .env.local
```

Fill in the values (see docs/technical/ENV_VARS.md).

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Development Workflow

### Making Changes

1. Create a branch (optional for small changes):
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make changes

3. Test locally:
   ```bash
   npm run dev
   ```

4. Build test:
   ```bash
   npm run build
   ```

5. Commit:
   ```bash
   git add -A
   git commit -m "feat: description"
   ```

6. Push:
   ```bash
   git push origin main
   ```

---

## Project Structure

```
ephraim-care-app/
├── src/
│   ├── app/          # Pages (App Router)
│   ├── components/   # React components
│   ├── data/         # Static data
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities
│   └── types/        # TypeScript types
├── public/           # Static files
├── .env.local        # Environment variables
└── package.json      # Dependencies
```

---

## Code Style

- TypeScript strict mode
- Functional components with hooks
- Tailwind CSS for styling
- Import paths use `@/` alias
