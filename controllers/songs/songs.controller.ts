import { addSong, getSongs } from "../../models/songs.model.js"
import type { Request, Response } from "express"
import { createSongSchema } from "../../schemas/validation.js"
import { ZodError } from "zod"

//TODO: Recommend song to learn based on instrument, recently played songs, top charts, etc.

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

async function httpGetSongs(_req:Request, res:Response) {
    return res.status(200).json(await getSongs())
}

export {
    httpAddSong,
    httpGetSongs,
}