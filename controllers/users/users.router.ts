import express from "express";
import { httpAddUser, httpGetUsers } from "./users.controller.js"

const usersRouter = express.Router()

usersRouter.get('/', httpGetUsers)
usersRouter.post('/', httpAddUser)

export { usersRouter };