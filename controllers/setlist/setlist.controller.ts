import type { Request, Response } from "express"
import prisma from "../../models/prisma.js"

//TODO: Create based on number of songs or length of set
//TODO: Take genre into account
//TODO: Generate setlist based on location/vibe/mood via LLM

async function httpGetSetlist(req:Request, res:Response) {
    // Placeholder implementation TODO: Replace with real data fetching logic
    // Provided number of songs in the setlist and the user details, create the setlist
    // const setlist = [
    //     { id: 1, song: "Song A", artist: "Artist A" },
    //     { id: 2, song: "Song B", artist: "Artist B" },
    // ];

    const userId = parseInt(req.params.userId as string);
    const limit = parseInt(req.query.limit as string) || 5;

    const setlist = await prisma.$queryRaw<
      { id: number; userId: number; data: string; createdAt: string }[]
    >`
      SELECT *
      FROM playedSong
      WHERE userId = ${userId}
      ORDER BY RANDOM()
      LIMIT ${limit};
    `;

    return res.status(200).json(setlist);
}

export {
    httpGetSetlist,
}