import { addPlayedSong, getPlayedSongs } from "../../models/playedsongs.model.js"
import type { Request, Response } from "express"

async function httpAddPlayedSong(req:Request, res:Response) {
    const playedsong = req.body

    if (!playedsong.userId || !playedsong.songId || !playedsong.score) {
        return res.status(400).json({ error: "Missing required played song fields" })
    }

    if (Object.keys(playedsong).length > 3) {
        return res.status(400).json({ error: "Too many fields in object" })
    }

    const new_playedsong = {
        userId: playedsong.userId,
        songId: playedsong.songId,
        timePlayed: new Date().toISOString(),
        score: playedsong.score,
    }

    return res.status(200).json(await addPlayedSong(new_playedsong))
}

async function httpGetPlayedSongs(req:Request, res:Response) {
    return res.status(200).json(await getPlayedSongs())
}

export {
    httpAddPlayedSong,
    httpGetPlayedSongs,
}