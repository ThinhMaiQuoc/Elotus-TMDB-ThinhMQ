# Movies - React SPA with TypeScript

A modern, full-stack movie discovery application built with React and Express, powered by The Movie Database (TMDB) API.

## 🎯 Overview

This is a production-ready single-page application featuring a clean separation between client and server, proper error handling, pagination, and URL-based state management. The application demonstrates best practices in React development, TypeScript usage, and API design.

**Tech Stack:**
- **Frontend:** React 18, TypeScript, Vite, React Router, TanStack Query, SCSS Modules
- **Backend:** Express, TypeScript, with proper MVC architecture
- **API:** The Movie Database (TMDB) API v3

## ✨ Features

### Required Features
- ✅ Now Playing movies list with async image loading
- ✅ Top Rated movies tab navigation
- ✅ Debounced search functionality
- ✅ Detailed movie view with comprehensive information
- ✅ Loading states with skeleton screens
- ✅ Error handling with user-friendly messages
- ✅ Responsive design for all screen sizes

### Optional Features
- ✅ Grid/List view toggle with URL persistence
- ✅ Smooth fade-in animations for images
- ✅ Lazy-loaded poster images
- ✅ Custom hover and selection effects
- ✅ Enhanced skeleton loading states
- ✅ Fully responsive across breakpoints

### Additional Features
- ✅ **Pagination:** Navigate through pages of results with Previous/Next buttons
- ✅ **URL State Management:** All filters and pages persist in URL for shareable links
- ✅ **Error Boundaries:** Graceful error handling with recovery options
- ✅ **Rate Limiting:** API protection against abuse
- ✅ **Input Validation:** Both client and server-side validation
- ✅ **Type Safety:** Comprehensive TypeScript coverage
- ✅ **Code Quality:** ESLint and Prettier configured
- ✅ **Architecture:** Proper separation of concerns (MVC pattern on backend)

## 🎥 Video Walkthrough

[App Demo](https://jam.dev/c/669bf67c-5ad9-4adb-909a-5b53159d12a0)

## 📁 Project Structure

```
Elotus-TMDB-ThinhMQ/
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── MovieGrid.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── ViewToggle.tsx
│   │   │   └── skeletons/
│   │   ├── pages/               # Route components
│   │   │   ├── MoviesPage.tsx   # Unified Now Playing/Top Rated
│   │   │   ├── Search.tsx
│   │   │   └── MovieDetails.tsx
│   │   ├── lib/                 # Core utilities
│   │   │   ├── api.ts           # API client
│   │   │   ├── queries.ts       # TanStack Query hooks
│   │   │   └── types.ts         # TypeScript definitions
│   │   ├── providers/           # Context providers
│   │   ├── shared/              # Shared constants
│   │   └── styles/              # Global styles
│   └── vite.config.ts
│
└── server/                      # Express backend
    ├── src/
    │   ├── config/              # Configuration management
    │   ├── controllers/         # Request handlers
    │   ├── middleware/          # Express middleware
    │   ├── routes/              # API routes
    │   ├── services/            # Business logic
    │   ├── types/               # TypeScript definitions
    │   └── index.ts             # Application entry
    └── tsconfig.json
```

## 🏗️ Architecture

### Frontend Architecture

**State Management:**
- TanStack Query for server state with 5-minute cache
- React Router's `useSearchParams` for URL state (pagination, filters, search)
- Local component state for UI interactions

**Component Patterns:**
- Functional components with TypeScript
- Custom hooks for data fetching (`useNowPlaying`, `useTopRated`, `useSearchMovies`)
- SCSS modules for component-scoped styling
- Error boundaries for graceful failure handling

**Data Flow:**
1. User interaction triggers URL update
2. URL change triggers React Query refetch
3. Query hooks manage loading/error/success states
4. Components render based on query state

### Backend Architecture

**Layered Architecture:**
```
Routes → Controllers → Services → External API
          ↓
      Middleware (error handling, rate limiting, CORS)
```

**Key Design Decisions:**
- **Config Layer:** Centralized environment variable management with validation
- **Service Layer:** Encapsulates TMDB API communication
- **Controller Layer:** Request validation and response formatting
- **Error Handling:** Custom `AppError` class for operational errors
- **Security:** CORS restrictions, rate limiting, input validation

## 🔌 API Endpoints

The server provides the following REST endpoints:

| Endpoint | Method | Query Parameters | Description |
|----------|--------|------------------|-------------|
| `/api/now-playing` | GET | `page` (optional, default: 1, range: 1-500) | Get currently playing movies |
| `/api/top-rated` | GET | `page` (optional, default: 1, range: 1-500) | Get top rated movies |
| `/api/search` | GET | `q` (required, max 100 chars)<br>`page` (optional, range: 1-500) | Search movies by title |
| `/api/movie/:id` | GET | - | Get detailed movie information by ID |
| `/health` | GET | - | Server health check |

**Response Format:**
All movie list endpoints return JSON with pagination metadata:
```json
{
  "page": 1,
  "results": [...],
  "total_pages": 100,
  "total_results": 2000
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd Elotus-TMDB-ThinhMQ
   ```

2. **Set up the server:**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env and add your TMDB_BEARER token
   npm install
   npm run dev
   ```
   Server runs at `http://localhost:3001`

3. **Set up the client (in a new terminal):**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   App runs at `http://localhost:5173`

The Vite dev server proxies `/api/*` requests to the Express server automatically.

## 🛠️ Development

### Available Scripts

**Client:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
```

**Server:**
```bash
npm run dev          # Start with hot reload
npm run build        # Compile TypeScript
npm start            # Run compiled code
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
```

### Code Quality

- **TypeScript:** Strict mode enabled for maximum type safety
- **ESLint:** Configured with TypeScript and React best practices
- **Prettier:** Consistent code formatting across the project
- **SCSS Modules:** Scoped styling to prevent conflicts

## 📦 Production Build

```bash
# Build server
cd server
npm run build
npm start

# Build client
cd client
npm run build
npm run preview
```

The client builds to `client/dist/` and can be served statically or via the preview server.

## 🔒 Security

- **API Key Protection:** TMDB token never exposed to client
- **CORS:** Restricted to localhost in development, configurable for production
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Input Validation:** Query parameters validated on server
- **Error Sanitization:** Internal errors hidden in production

## 🎨 Design Decisions

### Why This Architecture?

1. **Unified MoviesPage Component:** Eliminated code duplication between Now Playing and Top Rated pages by using a single component with type props

2. **URL-Based State:** Makes the app shareable and bookmarkable - users can share exact search results or specific pages

3. **TanStack Query:** Provides caching, background refetching, and loading/error state management out of the box

4. **MVC on Backend:** Separates concerns for easier testing and maintenance as the app grows

5. **SCSS Modules:** Component-scoped styling without the runtime cost of CSS-in-JS

### Trade-offs

- **No Database:** Uses TMDB API directly; in production, you'd cache responses
- **Simple Pagination:** "Load More" wasn't implemented to avoid complexity; clean prev/next pattern instead
- **No Tests:** Focused on clean architecture and functionality given time constraints

## 📝 Environment Variables

**Server (.env):**
```env
TMDB_BEARER=your_tmdb_read_access_token
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🐛 Troubleshooting

**Server won't start:**
- Ensure `TMDB_BEARER` is set in `server/.env`
- Check that port 3001 isn't in use

**Client can't connect to API:**
- Verify server is running on port 3001
- Check Vite proxy configuration in `client/vite.config.ts`

**TypeScript errors:**
- Run `npm install` in both client and server
- Delete `node_modules` and reinstall if issues persist

## 📄 License

Copyright 2025 ThinhMQ

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

---

**Built with ❤️ using React, TypeScript, and Express**
