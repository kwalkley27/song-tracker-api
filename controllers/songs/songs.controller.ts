import { addSong, getSongs } from "../../models/songs.model.js"
import type { Request, Response } from "express"
import { createSongSchema, paginationQuerySchema } from "../../schemas/validation.js"
import { ZodError } from "zod"

async function httpAddSong(req:Request, res:Response) {
    try {
        // Validate request body with Zod
        const validatedSong = createSongSchema.parse(req.body);

        // Add the song to the database
        const newSong = await addSong(validatedSong);

        return res.status(201).json(newSong);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.issues
            });
        }
        throw error; // Re-throw for global error handler
    }
}

async function httpGetSongs(req:Request, res:Response) {
    try {
        // Validate pagination query parameters
        const { limit, offset } = paginationQuerySchema.parse(req.query);

        // Get songs with pagination
        const result = await getSongs(limit, offset);

        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: "Invalid query parameters",
                details: error.issues
            });
        }
        throw error;
    }
}

export {
    httpAddSong,
    httpGetSongs,
}