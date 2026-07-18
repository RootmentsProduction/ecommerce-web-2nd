# e-commerce_jewel

A full-stack e-commerce platform for jewellery — Next.js frontend with a NestJS + Prisma backend.

## Project Structure

```
e-commerce_jewel/
├── frontend/    # Next.js 16 — customer storefront & admin panel
├── backend/     # NestJS — REST API, Prisma ORM, PostgreSQL
├── .gitignore
└── README.md
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npm run start:dev    # http://localhost:7001
```

## Build

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

## Environment Files

| File | Purpose |
|---|---|
| `frontend/.env.local` | Frontend env — `NEXT_PUBLIC_API_BASE_URL` |
| `backend/.env` | Backend env — database, JWT, AWS, CloudFront |

> **Never** commit real secrets. See `backend/.env.example` for the template.

## Deployment

### Vercel (Frontend)

Set **Root Directory** to `frontend` in the Vercel project settings.

Build Command: `npm run build`  
Output Directory: Next.js default (`.next`)

### Backend

The NestJS backend runs from `backend/`. Update your hosting provider's root directory to `backend/` if required.

### Database

```bash
cd backend
npx prisma migrate deploy    # run pending migrations
npx prisma generate          # regenerate Prisma client
```
