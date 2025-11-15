# 🎵 Song Tracker API

A TypeScript REST API for musicians to track songs, manage repertoire, and generate dynamic setlists.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/Tests-23%20passing-brightgreen.svg)](https://jestjs.io/)

## Overview

Song Tracker helps musicians catalog their repertoire, track practice sessions with performance scores, and generate randomized setlists for performances.

**Key Features:**
- Song management with metadata (artist, length, genre)
- User profiles with instrument tracking
- Performance recording with 0-100 scoring system
- Dynamic setlist generation from played songs
- Comprehensive input validation with detailed error messages
- Interactive API documentation via Swagger

## Tech Stack

- **TypeScript 5.9** - Strict type safety with no implicit any
- **Express 5** - Web framework
- **Prisma 6** - Type-safe ORM with SQLite
- **Zod** - Runtime validation with TypeScript inference
- **Jest + Supertest** - Testing (23 tests, all passing)
- **Swagger/OpenAPI** - Interactive API documentation

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Generate SSL certificates (for HTTPS)
mkdir -p certs
openssl req -x509 -newkey rsa:4096 -keyout certs/server.key \
  -out certs/server.crt -days 365 -nodes

# Set up database
npx prisma migrate dev
npx prisma generate

# Build and start
npm run build
npm start
```

Server runs at `https://localhost:3000`

## API Documentation

Visit `https://localhost:3000/api-docs` for the interactive Swagger UI.

**Endpoints:**
- `GET/POST /songs` - Manage songs
- `GET/POST /users` - Manage users
- `GET/POST /playedsongs` - Track performances
- `GET /playedsongs/latest/:userId` - Get recent performances
- `GET /setlist/:userId` - Generate random setlist

## Architecture

```
├── controllers/          # Route handlers with Swagger docs
│   ├── songs/
│   ├── users/
│   ├── playedsongs/
│   └── setlist/
├── models/              # Data access layer (Prisma)
├── schemas/             # Zod validation schemas
├── prisma/              # Database schema & migrations
└── server.ts            # Express app configuration
```

**Three-layer architecture:**
1. **Router** - Express routes with OpenAPI documentation
2. **Controller** - Request validation and response handling
3. **Model** - Database operations via Prisma ORM

## Database Schema

```prisma
model User {
  id          Int          @id @default(autoincrement())
  username    String       @unique
  instrument  String
  lastPlayed  DateTime     @default(now())
  playedSongs PlayedSong[]
}

model Song {
  id          Int          @id @default(autoincrement())
  title       String
  artist      String
  length      Int
  genre       String
  playedSongs PlayedSong[]
}

model PlayedSong {
  id         Int      @id @default(autoincrement())
  timePlayed DateTime @default(now())
  score      Int      // 0-100
  songId     Int
  userId     Int
  song       Song     @relation(...)
  user       User     @relation(...)
}
```

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

**Test coverage:** 23 tests across all endpoints
- Songs: GET, POST, validation
- Users: GET, POST, validation (including unique username)
- PlayedSongs: GET, POST, latest by user
- Setlist: Generation with configurable limits

## Development

```bash
# Build
npm run build

# Run tests
npm test

# Generate Prisma client
npx prisma generate

# View database
npx prisma studio
```

## Key Design Decisions

**TypeScript Strictness** - Full strict mode enabled (`noImplicitAny`, `noUnusedLocals`, `noUncheckedIndexedAccess`) for maximum type safety

**Zod Validation** - Runtime validation with TypeScript type inference, providing detailed error messages to clients

**Prisma ORM** - Type-safe database queries with automatic SQL injection prevention and TypeScript integration

**Error Handling** - Proper HTTP status codes (201 Created, 400 Bad Request, 404 Not Found, 409 Conflict) with consistent error response format

**Security** - Helmet for security headers, parameterized queries via Prisma, input validation on all endpoints

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
NODE_PORT=3000
SSL_KEY_PATH=/path/to/server.key  # Optional
SSL_CERT_PATH=/path/to/server.crt # Optional
```

## License

MIT

## Author

Kyle Walkley - [@kwalkley27](https://github.com/kwalkley27)
