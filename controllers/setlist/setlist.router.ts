import express from "express";
import { httpGetSetlist } from "../setlist/setlist.controller.js"

const setlistRouter = express.Router()

setlistRouter.get('/:userId', httpGetSetlist)

export { 
    setlistRouter,
}