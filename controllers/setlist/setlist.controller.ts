import type { Request, Response } from "express"
import prisma from "../../models/prisma.js"

// Generate a random setlist of played songs for a user
async function httpGetSetlist(req:Request, res:Response) {
    const userId = parseInt(req.params['userId'] as string);
    const limit = parseInt(req.query['limit'] as string) || 5;

    // Validate input
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: "Invalid userId" });
    }
    if (isNaN(limit) || limit <= 0 || limit > 100) {
        return res.status(400).json({ error: "Invalid limit (must be 1-100)" });
    }

    // Fetch all played songs for the user with song details
    const playedSongs = await prisma.playedSong.findMany({
        where: { userId },
        include: {
            song: true
        }
    });

    // Shuffle the array using Fisher-Yates algorithm for randomization
    const shuffled = [...playedSongs];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        if (temp !== undefined && shuffled[j] !== undefined) {
            shuffled[i] = shuffled[j]!;
            shuffled[j] = temp;
        }
    }

    // Take the first 'limit' items
    const setlist = shuffled.slice(0, limit);

    return res.status(200).json(setlist);
}

export {
    httpGetSetlist,
}