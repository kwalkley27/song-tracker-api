import type { Request, Response } from "express"
import prisma from "../../models/prisma.js"

//TODO: Create based on length of set
//TODO: Take genre into account
//TODO: Generate setlist based on location/vibe/mood via LLM

// Generate a random setlist of played songs for a user
async function httpGetSetlist(req:Request, res:Response) {
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