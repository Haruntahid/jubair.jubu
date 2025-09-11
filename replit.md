# Overview

This is a modern QA Engineer portfolio website built with React and Express.js. The application showcases professional QA expertise, skills, testing processes, and project experience through an interactive, responsive web interface. It features a clean, technical design with dark/light theme support and smooth animations to present a comprehensive professional portfolio for quality assurance professionals.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript as the main UI framework
- **Vite** as the build tool and development server for fast hot module replacement
- **Tailwind CSS** for utility-first styling with custom design system
- **shadcn/ui** component library built on Radix UI primitives for consistent, accessible components
- **Framer Motion** for smooth animations and transitions throughout the portfolio
- **React Hook Form** for contact form handling with validation
- **TanStack React Query** for server state management and API calls
- **Wouter** as a lightweight client-side router
- Custom theme system with light/dark mode toggle functionality

## Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **RESTful API** design with a single contact form endpoint (`POST /api/contact`)
- Simple in-memory storage implementation for demonstration purposes
- Express middleware for request logging, JSON parsing, and error handling
- Development and production build configurations with proper static file serving

## Database Layer
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Neon Database** as the serverless PostgreSQL provider
- Database migrations managed through Drizzle Kit
- User schema with basic authentication structure (username/password)
- Connection pooling through `@neondatabase/serverless` for optimal performance

## Styling and Design System
- **Tailwind CSS** with custom configuration for design tokens
- **CSS custom properties** for theme variables (colors, spacing, typography)
- **Responsive design** with mobile-first approach
- **Inter and Roboto** font families for professional typography
- **Remix Icons** for consistent iconography throughout the application

## Development Workflow
- **TypeScript** for type safety across frontend and backend
- **ESLint and Prettier** integration through VS Code/editor configuration
- **Path aliases** for clean imports (`@/` for client, `@shared/` for shared code)
- **Hot module replacement** in development with Vite
- **Build optimization** with separate client and server bundles

# External Dependencies

## Core Framework Dependencies
- **React 18** and **ReactDOM** for UI rendering and component management
- **Express.js** for server-side API and static file serving
- **TypeScript** for type safety and improved developer experience
- **Vite** for build tooling and development server

## Database and ORM
- **Drizzle ORM** (`drizzle-orm`, `drizzle-zod`) for type-safe database operations
- **Neon Database** (`@neondatabase/serverless`) for serverless PostgreSQL hosting
- **PostgreSQL** as the underlying database system

## UI and Styling
- **Tailwind CSS** for utility-first CSS framework
- **Radix UI** components (`@radix-ui/react-*`) for accessible, unstyled UI primitives
- **shadcn/ui** design system built on top of Radix UI
- **Framer Motion** for animations and page transitions
- **Remix Icons** via CDN for iconography

## Form Management and Validation
- **React Hook Form** (`react-hook-form`) for form state management
- **Hookform Resolvers** (`@hookform/resolvers`) for validation integration
- **Zod** (via `drizzle-zod`) for schema validation

## State Management and Data Fetching
- **TanStack React Query** (`@tanstack/react-query`) for server state management
- **Wouter** for lightweight client-side routing

## Development and Build Tools
- **tsx** for TypeScript execution in development
- **esbuild** for server-side bundling in production
- **PostCSS** and **Autoprefixer** for CSS processing
- **Replit-specific plugins** for development environment integration

## External Services
- **Google Fonts** (Inter, Roboto, Roboto Mono) loaded via CDN
- **Remix Icons** CSS loaded via CDN
- **Replit badge** integration for platform branding