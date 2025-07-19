# Poorvam Care & Hearing Solutions - Child Development Services Platform

## Overview

Poorvam Care & Hearing Solutions is a comprehensive web application for a child development service organization specializing in communication and developmental disorders. The platform provides information about services, allows contact form submissions, newsletter subscriptions, and includes authentication functionality for parents and employees.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with custom color scheme for child-friendly design
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with JSON responses
- **Data Validation**: Zod schemas for request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple

### Data Storage
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM for type-safe database queries
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Fallback Storage**: In-memory storage implementation for development

## Key Components

### Database Schema
The application uses three main tables:
- **users**: Authentication for parents and employees with role-based access
- **contact_submissions**: Contact form data including child information and service requests
- **newsletter_subscriptions**: Email subscriptions for marketing communications

### Authentication System
- Role-based authentication (parent/employee)
- Simple credential-based login system
- Session management for maintaining user state

### Contact Management
- Multi-step contact form with child-specific information
- Service type selection and detailed messaging
- Consent tracking for data processing compliance

### Content Management
- Service information for various developmental disorders
- Team member profiles and specializations
- Resource downloads and educational materials
- Hearing center services categorized by age groups

## Data Flow

1. **User Interaction**: Users interact with React components styled with Tailwind CSS
2. **Form Submission**: Forms use React Hook Form with Zod validation before API calls
3. **API Processing**: Express server validates data and processes requests
4. **Database Operations**: Drizzle ORM handles database interactions with PostgreSQL
5. **Response Handling**: TanStack Query manages API responses and caching
6. **UI Updates**: React components update based on query results and toast notifications

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: @neondatabase/serverless for database connectivity

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel functionality for team showcase
- **Date-fns**: Date manipulation utilities

### Development Tools
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Type safety across the entire stack

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React application to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static assets served from build directory

### Environment Configuration
- **Development**: Hot reloading with Vite middleware
- **Production**: Static file serving with Express
- **Database**: Environment-based connection string configuration

### Development Workflow
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm run db:push`: Database schema synchronization
- `npm start`: Production server startup

The application is designed for easy deployment on platforms like Replit with built-in support for development tools and environment detection.