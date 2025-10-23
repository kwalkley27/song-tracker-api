import express from "express";
import { httpGetSetlist } from "controllers/setlist.controller"

const setlistRouter = express.Router()

setlistRouter.get('/', httpGetSetlist)

module.exports = setlistRouter