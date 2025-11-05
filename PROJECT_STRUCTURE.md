# CUET CAD Club - Project Structure

## Complete Folder Structure

```
cuet-cad-club/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── hero-cad.jpg
│   │
│   ├── components/
│   │   ├── ui/                    # Shadcn UI components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ... (all shadcn components)
│   │   │
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Layout.tsx             # Main layout wrapper
│   │   └── Navigation.tsx         # Top navigation bar
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile detection hook
│   │   └── use-toast.ts           # Toast notifications hook
│   │
│   ├── lib/
│   │   ├── sanity.ts              # Sanity client & data fetching
│   │   └── utils.ts               # Utility functions
│   │
│   ├── pages/
│   │   ├── About.tsx              # About page
│   │   ├── Alumni.tsx             # Alumni page (Sanity CMS)
│   │   ├── Committee.tsx          # Committee page (Sanity CMS)
│   │   ├── Events.tsx             # Events page (Sanity CMS)
│   │   ├── Home.tsx               # Homepage
│   │   ├── Join.tsx               # Membership page
│   │   ├── NotFound.tsx           # 404 page
│   │   └── Workshops.tsx          # Workshops page (Sanity CMS)
│   │
│   ├── types/
│   │   └── sanity.ts              # TypeScript types for Sanity data
│   │
│   ├── App.css                    # Global styles
│   ├── App.tsx                    # Main app component
│   ├── index.css                  # Tailwind & design system
│   ├── main.tsx                   # App entry point
│   └── vite-env.d.ts              # Vite types
│
├── sanity/
│   └── schema.ts                  # Sanity content schemas
│
├── .gitignore
├── components.json                # Shadcn config
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── sanity.config.ts               # Sanity studio config
├── SANITY_SETUP.md                # Sanity setup guide
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling framework
- **Shadcn UI** - UI component library
- **Lucide React** - Icon library

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### CMS & Backend
- **Sanity CMS** - Headless CMS
- **@sanity/client** - Sanity API client

## Pages with Sanity Integration

### 1. Events Page (`src/pages/Events.tsx`)
- Fetches events from Sanity CMS
- Displays upcoming and past events
- Schema: `event` (defined in `sanity/schema.ts`)

### 2. Workshops Page (`src/pages/Workshops.tsx`)
- Fetches workshops from Sanity CMS
- Shows upcoming and completed workshops
- Schema: `workshop` (defined in `sanity/schema.ts`)

### 3. Committee Page (`src/pages/Committee.tsx`)
- Fetches committee members from Sanity CMS
- Displays faculty advisor, executive board, and team members
- Schema: `committeeMember` (defined in `sanity/schema.ts`)

### 4. Alumni Page (`src/pages/Alumni.tsx`)
- Fetches alumni profiles from Sanity CMS
- Shows featured alumni and graduation stats
- Schema: `alumniProfile` (defined in `sanity/schema.ts`)

## Data Flow

```
Sanity Studio
    ↓
Sanity API
    ↓
src/lib/sanity.ts (Client & Query Functions)
    ↓
TanStack Query (Caching & State)
    ↓
Page Components (Alumni, Events, Workshops, Committee)
    ↓
UI Rendering
```

## Key Files

### Content Management
- `sanity.config.ts` - Sanity Studio configuration
- `sanity/schema.ts` - Content type definitions
- `src/lib/sanity.ts` - API client & data fetching functions
- `src/types/sanity.ts` - TypeScript interfaces

### Styling & Design
- `src/index.css` - Design system tokens (colors, gradients, shadows)
- `tailwind.config.ts` - Tailwind configuration
- Green & yellow color scheme matching logo

### Routing
- `src/App.tsx` - Route definitions
- All page components in `src/pages/`

## Design System

### Colors
- **Primary**: Green (#22c55e)
- **Accent**: Yellow (#ffd600)
- Semantic tokens defined in `src/index.css`
- Full dark mode support

### Components
- All UI components from Shadcn UI
- Custom styling via design tokens
- Glass morphism effects
- Smooth animations

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Sanity CMS**
   - Follow instructions in `SANITY_SETUP.md`
   - Get your Sanity Project ID
   - Update `sanity.config.ts` and `src/lib/sanity.ts`

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Deploy Sanity Studio**
   ```bash
   sanity deploy
   ```

## Environment Variables

Create a `.env` file (if needed):
```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

## Build & Deploy

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## Notes

- All pages use responsive design
- Loading states implemented for all Sanity data
- Error handling for missing data
- TypeScript strict mode enabled
- SEO-friendly structure
