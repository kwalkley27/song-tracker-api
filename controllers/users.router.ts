import express from "express";
import { httpAddUser, httpGetUsers } from "controllers/users.controller.ts"

const usersRouter = express.Router()

usersRouter.get('/', httpGetUsers)
usersRouter.post('/', httpAddUser)

//module.exports = usersRouter

export { usersRouter };