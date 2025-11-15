import express from "express";
import type { Request, Response, NextFunction } from "express";
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import https from "https"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import { usersRouter } from "./controllers/users/users.router.js"
import { songsRouter } from "./controllers/songs/songs.router.js"
import { playedSongsRouter } from "./controllers/playedsongs/playedsongs.router.js"
import { setlistRouter } from "./controllers/setlist/setlist.router.js"

const PORT = process.env['NODE_PORT'] || 3000

const app = express()

// CORS configuration
const allowedOrigins = process.env['CORS_ORIGIN']
  ? process.env['CORS_ORIGIN'].split(',').map(origin => origin.trim())
  : ['https://localhost:3000', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet({
  contentSecurityPolicy: false, // Disable for Swagger UI to work
}))
app.use(morgan('combined'))
app.use(express.json())

// Rate limiting configuration
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '60000'), // 1 minute default
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // 100 requests per window
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

const strictLimiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '60000'), // 1 minute default
  max: parseInt(process.env['RATE_LIMIT_MAX_WRITES'] || '20'), // 20 write requests per window
  message: { error: 'Too many write requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  // Only apply to POST/PUT/DELETE methods
  skip: (req) => !['POST', 'PUT', 'DELETE'].includes(req.method),
});

// Apply general rate limiting to all requests
app.use(generalLimiter);

// Apply stricter rate limiting to write operations
app.use(strictLimiter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Song Tracker API Documentation',
}))

app.use('/users', usersRouter)
app.use('/songs', songsRouter)
app.use('/playedsongs', playedSongsRouter)
app.use('/setlist', setlistRouter)
app.get('/', (_req:Request, res:Response) => {
    res.send('Song Tracker API to help musicians keep track of and manage songs they know and build dynamic setlists. Visit /api-docs for API documentation.')
});

// 404 handler - must come before error handler
app.use((_req:Request, res:Response) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Global error handler - must be last
app.use((err:unknown, _req:Request, res:Response, _next:NextFunction) => {
  console.error('Error:', err);

  // Handle Prisma errors
  if (err && typeof err === 'object' && 'code' in err) {
    const prismaError = err as { code: string; meta?: unknown };

    // Unique constraint violation
    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        error: 'Conflict: Resource already exists',
        details: 'A record with this unique field already exists'
      });
    }

    // Foreign key constraint violation
    if (prismaError.code === 'P2003') {
      return res.status(400).json({
        error: 'Invalid reference: Referenced record does not exist'
      });
    }

    // Record not found
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        error: 'Resource not found'
      });
    }
  }

  // Default error response
  return res.status(500).json({ error: 'Internal server error' });
});

// __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// SSL options
const keyPath = process.env['SSL_KEY_PATH'] || path.join(__dirname, '..', 'certs', 'server.key');
const certPath = process.env['SSL_CERT_PATH'] || path.join(__dirname, '..', 'certs', 'server.crt');

const sslOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});
