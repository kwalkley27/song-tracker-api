import { addSong, getSongs } from "../../models/songs.model.js"
import type { Request, Response } from "express"

//TODO: Recommend song to learn based on instrument, recently played songs, top charts, etc.

async function httpAddSong(req:Request, res:Response) {
    const song = req.body

    if (!song.artist || !song.title || !song.length || !song.genre) {
        return res.status(400).json({ error: "Missing required song fields" })
    }

    if (Object.keys(song).length > 4) {
        return res.status(400).json({ error: "Too many fields in song object" })
    }

    return res.status(200).json(await addSong(song))
}

async function httpGetSongs(req:Request, res:Response) {
    return res.status(200).json(await getSongs())
}

export {
    httpAddSong,
    httpGetSongs,
}