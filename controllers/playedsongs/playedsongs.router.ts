import express from "express";
import { 
    httpGetPlayedSongs, 
    httpAddPlayedSong, 
    httpGetLatestPlayedSongs,
 } from "./playedsongs.controller.js"

const playedSongsRouter = express.Router()

playedSongsRouter.get('/', httpGetPlayedSongs)
playedSongsRouter.get('/latest/:userId', httpGetLatestPlayedSongs)
playedSongsRouter.post('/', httpAddPlayedSong)

export {
    playedSongsRouter,
}