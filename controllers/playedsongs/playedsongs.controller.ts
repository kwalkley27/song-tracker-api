import {
    addPlayedSong,
    getPlayedSongs,
    getLatestPlayedSongs,
} from "../../models/playedsongs.model.js"
import type { Request, Response } from "express"
import { createPlayedSongSchema } from "../../schemas/validation.js"
import { ZodError } from "zod"

async function httpAddPlayedSong(req:Request, res:Response) {
    try {
        // Validate request body with Zod
        const validatedPlayedSong = createPlayedSongSchema.parse(req.body);

        // Add timestamp (server-controlled, not user input)
        const new_playedsong = {
            ...validatedPlayedSong,
            timePlayed: new Date().toISOString(),
        };

        // Add the played song to the database
        const result = await addPlayedSong(new_playedsong);

        return res.status(201).json(result);
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

async function httpGetPlayedSongs(_req:Request, res:Response) {
    return res.status(200).json(await getPlayedSongs())
}

// Gets the latest played songs for a user, limited by the specified number
// of songs (default is 5). Returns [] if user is not found or has no played songs.
async function httpGetLatestPlayedSongs(req:Request, res:Response) {
    const userId = parseInt(req.params['userId'] as string);
    const limit = parseInt(req.query['limit'] as string) || 5;

    // Validate input
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: "Invalid userId" });
    }
    if (isNaN(limit) || limit <= 0 || limit > 100) {
        return res.status(400).json({ error: "Invalid limit (must be 1-100)" });
    }

    return res.status(200).json(await getLatestPlayedSongs(userId, limit));
}

export {
    httpAddPlayedSong,
    httpGetPlayedSongs,
    httpGetLatestPlayedSongs,
}