# AppImmobil — Full-Stack Project

This repository contains both the frontend (React + Vite + TypeScript) and the backend (Fastify + TypeScript + MySQL) for a simple real-estate management platform.

The goal of this README is to help you understand, run, and extend the entire project.

## Quick Start

### 1. Requirements

- Node.js: recommended ≥ 18
- MySQL: local or remote instance
- NPM or Yarn

### 2. Setup & Installation

#### Clone the repository

```bash
git clone <repo-url>
cd appimmobil
```

#### Install dependencies

The repo has separate folders (`frontend/`, `backend/`), install in each:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Environment variables

#### Frontend (`frontend/.env`)

Create:

```env
VITE_API_URL=http://localhost:3001/api
```

The app defaults to this URL if not set.

#### Backend (`backend/.env`)

Create:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=appimmobil
FRONTEND_URL=http://localhost:5173
PORT=3001
```

On backend startup, the server auto-creates the database/table if they don't exist (dev only).

### 4. Running the project

#### Frontend (Vite React app)

```bash
npm run dev
```

#### Backend (Fastify API server)

```bash
npm run dev
```

The backend exposes REST API endpoints under `/api`.

## Architecture Overview

The platform uses a clean full-stack modular architecture, where frontend and backend are clearly separated, typed, and organized.

### Frontend Architecture

A small, modular React + Vite + TypeScript application.

**Main layers:**

- **Routing:** `src/App.tsx`, powered by `react-router-dom`
- **Pages:** `src/pages` (PropertyList, PropertyForm, PropertyDetail)
- **Components:** `src/components`, including form sections (`property-form/`)
- **State management:** zustand store in `src/stores/propertyStore.ts`
- **HTTP Layer:** centralized Axios client in `src/services/api.service.ts`
- **Hooks:** logic such as `usePropertyForm` for validation and form behavior
- **Types:** DTOs and API response shapes in `src/types`
- **Utils:** validation and parsing helpers in `src/utils`

**Why this frontend architecture?**

- Simplicity & clarity with React, TS, Vite
- Lightweight global state using zustand
- Thin, centralized API layer for consistency
- Modularity and future scaling in mind
- Performance-first defaults (pagination, small bundles)

### Backend Architecture

A layered Fastify + TypeScript + MySQL REST API.

**Main layers:**

- **Routes:** define endpoints and wire validation
- **Services:** business logic and domain rules
- **Models:** SQL queries and DB interaction
- **Config:** MySQL pool and global config
- **Schemas:** zod validation for params/body/query
- **Types:** DTOs, domain interfaces

**Why this backend architecture?**

- Separation of concerns → easy to test and extend
- Fast & efficient runtime with Fastify
- Predictable structure for adding new entities
- Validation at boundaries keeps data safe

## Role of Each Part in the System

### Frontend

- `src/main.tsx` — App bootstrap, global providers
- `src/App.tsx` — Routing layer
- `src/pages/*` — Page containers orchestrating data and UI
- `src/components/*` — Reusable presentational components
- `src/services/api.service.ts` — Axios client, interceptors, errors
- `src/stores/propertyStore.ts` — Global state, pagination, filters
- `src/hooks/*` — Encapsulated logic (e.g., form validation)
- `src/types/*` — DTOs and shared TS types
- `src/utils/*` — Helpers for validation/formatting

### Backend

- `src/server.ts` — Fastify app entry point, routes, plugins, global errors
- `src/config/database.ts` — MySQL pool + initialization
- `src/models/*` — SQL queries and DB mapping
- `src/services/*` — Business logic and domain validation
- `src/routes/*` — HTTP endpoints and schema validation
- `src/schemas/*` — Zod definitions for request validation
- `src/types/*` — Shared interfaces/DTOs

## What Could Be Added With More Time (Full-Stack)

- Request cancellation + debouncing
- Code-splitting / lazy-loading routes
- Error boundaries + toast notifications
- Monitoring (Sentry)
- Tests + CI/CD pipeline
- Docker + docker-compose for consistent environments
- Redis caching layer
- Clustering / PM2 / Kubernetes
- Cursor pagination
- Observability (metrics, structured logs, tracing)
- Centralized error handling with domain errors
- Authentication/Authorization (JWT/OAuth)

## Summary

This project demonstrates a clean, modern full-stack architecture using:

- **React + Vite + TypeScript** for a fast, modular frontend
- **Fastify + TypeScript + MySQL** for a performant backend
- Clear separation of concerns on both sides
- Lightweight but scalable patterns for state, routing, validation, and data access
