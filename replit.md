# LaptopMatch - Laptop Specification Matching Platform

## Overview

LaptopMatch is a web application that helps users find their perfect laptop by matching their requirements against a comprehensive database of laptop specifications. The platform uses an intelligent matching algorithm to compare user criteria (CPU, GPU, RAM, storage, screen specs, weight, price, use case, and tier) with available laptops, returning ranked results even when users provide only partial specifications.

The application is built as a full-stack solution with a React frontend using shadcn/ui components for a clean, functional interface, and an Express backend with PostgreSQL database storage via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Design System**: shadcn/ui (New York variant) with Tailwind CSS for styling. This choice was made to prioritize clarity and functionality over creativity, providing pre-built, accessible components optimized for forms and data display - essential for the spec matching workflow.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router.

**State Management**: TanStack Query (React Query) for server state management, handling data fetching, caching, and synchronization with the backend.

**Component Structure**: 
- Atomic design pattern with reusable UI components in `client/src/components/ui/`
- Page components in `client/src/pages/` for route-level views (Home, About, Matching, NotFound)
- Layout component providing consistent navigation header and footer across all pages

**Styling Approach**:
- Tailwind utility-first CSS with custom design tokens
- CSS variables for theming (light/dark mode support)
- Inter font family from Google Fonts for professional typography
- Consistent spacing scale using Tailwind units (2, 4, 6, 8, 12, 16)

### Backend Architecture

**Framework**: Express.js with TypeScript, running on Node.js.

**API Design**: RESTful API with the following endpoints:
- `GET /api/laptops` - Retrieve all laptops
- `GET /api/laptops/:id` - Retrieve single laptop by ID
- `POST /api/laptops` - Create new laptop entry
- `PUT /api/laptops/:id` - Update existing laptop
- `DELETE /api/laptops/:id` - Delete laptop
- `POST /api/laptops/match` - Match laptops based on search criteria

**Data Validation**: Zod schemas for runtime type validation and data integrity, with human-readable error messages via zod-validation-error.

**Matching Algorithm**: Server-side implementation that:
- Accepts partial search criteria (all fields optional)
- Calculates similarity scores across specifications
- Returns ranked results with match scores
- Handles text matching for CPU/GPU/storage/RAM specifications
- Compares numerical values for weight and price
- Matches categorical fields like use case and tier

**Storage Layer**: Database abstraction through an `IStorage` interface, with `DatabaseStorage` implementation providing separation between business logic and data access.

### Data Storage

**Database**: PostgreSQL (via Neon serverless)

**ORM**: Drizzle ORM for type-safe database operations and schema management.

**Schema Design**: Single `laptops` table with the following structure:
- `id` (UUID, primary key)
- `name` (text)
- `storage` (text) - e.g., "512GB SSD"
- `ram` (text) - e.g., "16GB DDR4"
- `cpu` (text) - e.g., "Intel Core i7-12700H"
- `gpu` (text) - e.g., "NVIDIA RTX 3060"
- `screenSpecs` (text) - e.g., "15.6\" FHD 144Hz"
- `weight` (decimal) - in kg
- `price` (decimal) - in USD
- `useCase` (text) - e.g., "Gaming", "Business", "Content Creation"
- `tier` (text) - e.g., "Budget", "Mid-Range", "Premium", "Flagship"

**Migration Strategy**: Drizzle Kit for schema migrations, with configuration in `drizzle.config.ts`.

### Development & Build Process

**Development Server**: Vite dev server with HMR for fast frontend development, proxying API requests to Express backend.

**Production Build**:
- Frontend: Vite builds static assets to `dist/public`
- Backend: esbuild bundles server code to `dist` directory
- Single production server serves both static files and API

**Type Safety**: Shared TypeScript types between frontend and backend via `shared/schema.ts`, ensuring consistency across the full stack.

**Code Organization**:
- `client/` - Frontend React application
- `server/` - Backend Express application
- `shared/` - Shared types and schemas
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

## External Dependencies

### Database Service
- **Neon Database**: Serverless PostgreSQL database with WebSocket support for optimal performance in serverless environments.

### UI Component Libraries
- **Radix UI**: Headless, accessible component primitives (accordion, dialog, dropdown, select, etc.) forming the foundation of shadcn/ui components.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn/ui**: Pre-built, customizable component collection built on Radix UI and Tailwind.

### Form & Validation
- **React Hook Form**: Form state management and validation.
- **Zod**: Schema validation for both frontend forms and backend API endpoints.
- **@hookform/resolvers**: Bridges Zod schemas with React Hook Form.

### Data Fetching & State
- **TanStack Query**: Server state management with automatic caching, background updates, and request deduplication.

### Utilities
- **clsx & class-variance-authority**: Conditional className composition and variant generation.
- **date-fns**: Date manipulation and formatting.
- **lucide-react**: Icon library providing consistent, customizable icons.

### Development Tools
- **Replit Vite Plugins**: Development banner, error overlay, and cartographer for enhanced Replit integration.
- **TypeScript**: Static type checking across the entire codebase.
- **esbuild**: Fast bundler for production server code.