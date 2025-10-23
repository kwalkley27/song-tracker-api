import express from "express";
import { httpAddSongs, httpGetSongs } from "controllers/songs.controller"

const songsRouter = express.Router()

songsRouter.get('/', httpGetSongs)
songsRouter.post('/', httpAddSongs)

module.exports = songsRouter