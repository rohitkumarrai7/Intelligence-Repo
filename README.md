# Intelligence Repo

AI Workflows & Voice Agents Marketplace - The evolution of God of Prompt into the automation era.

## Features

- **15 Production-Ready n8n Workflows** across Voice Agents, Marketing, and Business Operations
- **Voice Agent Kits** for Plumber, Dental, Real Estate, Restaurant, HVAC, Cleaning, Fitness
- **Premium Dark Design** with mesh gradients, glassmorphism, and glow effects
- **Admin Dashboard** for product management
- **Supabase Backend** ready for integration

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Pages

- `/` - Homepage with hero, features, product packs, testimonials
- `/workflows` - n8n workflow gallery
- `/voice-agents` - Voice agent kits
- `/products` - All products with search/filter
- `/pricing` - Pricing tiers and product packs
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/products/new` - Add new product

## Workflows Included

1. Plumber Voice Agent
2. Dental Appointment Booking
3. Real Estate Lead Qualification
4. Restaurant WhatsApp Order
5. HVAC Emergency Dispatch
6. Cleaning Service Quote
7. Fitness Coach Follow-Up
8. Content Repurposing
9. Lead Magnet Generator
10. Meeting Summarizer
11. Cold Email Personalizer
12. Support Ticket Router
13. Competitor Price Monitor
14. Resume Screening
15. Social Comment Responder

## Design System

- Background: #0B0F1A
- Surface: #111827
- Primary: #6366F1
- Accent: #F59E0B
- Success: #10B981
- Error: #EF4444

## Supabase Database Schema

Run the Prisma schema against your Supabase instance:

```bash
npx prisma db push
```

## Notes

- Supabase API key needs to be configured for seeding
- Polar.sh integration ready for payments
- Images served from `/public/workflow/images/`
- Logo at `/public/logo.svg`