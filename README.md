# ☕ GitHub Coffee API

A lightweight, unified mock API server for the GitHub Coffee ecosystem. Providing dynamic and static JSON mocks for ESM, PMP, and Foresight platforms.

## 🚀 Features

- **Next.js App Router**: High-performance API routes.
- **REST Endpoints**: Simple, predictable endpoints for each platform.
- **GraphQL API**: Dynamic, granular data fetching with GraphQL Yoga.
- **TypeScript**: Full type safety for all mock data.

## 🛠️ API Reference

### REST
- `GET /api/esm`: Energy Storage Management data.
- `GET /api/pmp`: Piscada Management Platform data.
- `GET /api/foresight`: Facilities Management data.

### GraphQL
- Endpoint: `/api/graphql`
- Includes a built-in playground for exploring the schema and running queries.

## 📂 Project Structure

- `src/app/api`: API route definitions (REST & GraphQL).
- `src/lib/mock-data.ts`: Centralized mock data generators.
- `src/app/page.tsx`: Simple API status landing page.

## 💻 Local Development

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see the status page and links to the GraphQL explorer.
