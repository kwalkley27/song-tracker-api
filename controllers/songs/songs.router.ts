import express from "express";
import { httpAddSong, httpGetSongs } from "../songs/songs.controller.js"

const songsRouter = express.Router()

songsRouter.get('/', httpGetSongs)
songsRouter.post('/', httpAddSong)

export { songsRouter };