import { addUser, getUsers } from "../models/users.model.js"
import type { Request, Response } from "express"

async function httpAddUser(req:Request, res:Response) {
    const user = req.body

    if (!user.username || !user.instrument) {
        return res.status(400).json({ error: "Missing required user fields" })
    }

    if (Object.keys(user).length > 2) {
        return res.status(400).json({ error: "Too many fields in user object" })
    }

    return res.status(200).json(await addUser(user))
}

async function httpGetUsers(req:Request, res:Response) {
    return res.status(200).json(await getUsers())
}

export {
    httpAddUser,
    httpGetUsers,
}