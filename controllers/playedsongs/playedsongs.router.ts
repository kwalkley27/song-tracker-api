import express from "express";
import { httpGetPlayedSongs, httpAddPlayedSong } from "./playedsongs.controller.js"

const playedSongsRouter = express.Router()

playedSongsRouter.get('/', httpGetPlayedSongs)
playedSongsRouter.post('/', httpAddPlayedSong)

export {
    playedSongsRouter,
}