# Architecture - GitHub Coffee API

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **API Layers**: 
  - REST Endpoints
  - GraphQL (Yoga + Envelop)
- **Language**: TypeScript
- **Data Source**: Centralized mock data generators

## Project Structure
- `src/app/api/`: Contains route handlers for both REST and GraphQL.
- `src/lib/mock-data.ts`: The "Core" where all mock data is generated and maintained.
- `src/app/page.tsx`: A status dashboard and explorer link page.

## Data Flow
Clients request data via specific platform endpoints or GraphQL. The API handlers call the centralized mock data generators in `lib/` to return consistent, type-safe JSON responses.
