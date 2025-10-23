import { addSong, getSongs } from "../models/songs.model.js"
import type { Request, Response } from "express"

async function httpAddSong(req:Request, res:Response) {
    const song = req.body
    return res.status(200).json(await addSong(song))
}

async function httpGetSongs(req:Request, res:Response) {
    return res.status(200).json(await getSongs())
}

// module.exports = {
//     httpAddSong,
//     httpGetSongs,
// }

export {
    httpAddSong,
    httpGetSongs,
}