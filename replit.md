# MORENA - South African AI Assistant

## Overview

MORENA is a culturally-aware AI chatbot designed specifically for South Africa, supporting all 11 official languages. The application provides a warm, ubuntu-inspired conversational experience with deep understanding of South African culture, history, and context while maintaining universal knowledge capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom African-themed color palette and design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Cultural Design**: African-inspired color scheme with gold, brown, and earth tones, featuring cultural patterns and imagery

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for conversation and message management
- **Development**: Hot module replacement with Vite in development mode
- **Error Handling**: Centralized error middleware with structured JSON responses
- **Storage Abstraction**: Interface-based storage system with in-memory implementation

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Normalized structure with conversations and messages tables
- **Migrations**: Drizzle Kit for schema management and database migrations
- **Connection**: Neon Database serverless PostgreSQL integration
- **Development Storage**: In-memory storage implementation for development/testing

### Authentication and Authorization
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session storage
- **Current State**: No authentication implemented (ready for future integration)

### External Dependencies
- **AI Service**: OpenAI GPT-4o integration for multilingual conversation capabilities
- **Database**: Neon Database (serverless PostgreSQL)
- **Form Handling**: React Hook Form with Zod validation
- **Multi-language Support**: Custom language system supporting 11 South African official languages
- **Development Tools**: Replit integration with development banners and error overlays

### Key Architectural Decisions

**Monorepo Structure**: Single repository with shared schema between client and server, enabling type safety across the full stack.

**Cultural Localization**: Built-in support for South African languages with greeting carousel, cultural imagery, and ubuntu-inspired design philosophy.

**Type Safety**: End-to-end TypeScript implementation with Zod schemas for runtime validation and Drizzle for compile-time database type safety.

**Component Architecture**: Modular React components with separation between UI components, business logic components, and page-level components.

**Development Experience**: Hot reload, error overlays, and Replit-specific tooling for enhanced developer productivity.

**Scalable Storage**: Interface-based storage design allows easy switching between in-memory development storage and production PostgreSQL.

**AI Integration**: Structured conversation management with context-aware responses that understand South African culture while maintaining global knowledge capabilities.