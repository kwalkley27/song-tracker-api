import { z } from "zod";

// User validation schemas
export const createUserSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be at most 50 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
    instrument: z.string()
        .min(1, "Instrument is required")
        .max(100, "Instrument name must be at most 100 characters")
});

export const userIdSchema = z.object({
    userId: z.string()
        .regex(/^\d+$/, "User ID must be a number")
        .transform(Number)
        .refine(val => val > 0, "User ID must be greater than 0")
});

// Song validation schemas
export const createSongSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(200, "Title must be at most 200 characters"),
    artist: z.string()
        .min(1, "Artist is required")
        .max(200, "Artist name must be at most 200 characters"),
    length: z.number()
        .int("Length must be an integer")
        .positive("Length must be positive")
        .max(7200, "Length must be less than 2 hours (7200 seconds)"),
    genre: z.string()
        .min(1, "Genre is required")
        .max(50, "Genre must be at most 50 characters")
});

export const songIdSchema = z.object({
    songId: z.string()
        .regex(/^\d+$/, "Song ID must be a number")
        .transform(Number)
        .refine(val => val > 0, "Song ID must be greater than 0")
});

// PlayedSong validation schemas
export const createPlayedSongSchema = z.object({
    songId: z.number()
        .int("Song ID must be an integer")
        .positive("Song ID must be positive"),
    userId: z.number()
        .int("User ID must be an integer")
        .positive("User ID must be positive"),
    score: z.number()
        .int("Score must be an integer")
        .min(0, "Score must be at least 0")
        .max(100, "Score must be at most 100")
});

export const playedSongIdSchema = z.object({
    playedSongId: z.string()
        .regex(/^\d+$/, "Played song ID must be a number")
        .transform(Number)
        .refine(val => val > 0, "Played song ID must be greater than 0")
});

// Setlist query validation
export const setlistQuerySchema = z.object({
    userId: z.string()
        .regex(/^\d+$/, "User ID must be a number")
        .transform(Number)
        .refine(val => val > 0, "User ID must be greater than 0"),
    limit: z.string()
        .regex(/^\d+$/, "Limit must be a number")
        .transform(Number)
        .refine(val => val > 0 && val <= 100, "Limit must be between 1 and 100")
        .optional()
        .default(5)
});

// Pagination query validation
export const paginationQuerySchema = z.object({
    limit: z.string()
        .regex(/^\d+$/, "Limit must be a number")
        .transform(Number)
        .refine(val => val > 0 && val <= 100, "Limit must be between 1 and 100")
        .optional()
        .default(20),
    offset: z.string()
        .regex(/^\d+$/, "Offset must be a number")
        .transform(Number)
        .refine(val => val >= 0, "Offset must be 0 or greater")
        .optional()
        .default(0)
});

// Type exports for use in controllers
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateSongInput = z.infer<typeof createSongSchema>;
export type CreatePlayedSongInput = z.infer<typeof createPlayedSongSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
