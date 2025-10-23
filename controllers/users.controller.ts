import { addUser, getUsers } from "./../models/users.model.ts"
import type { Request, Response } from "express"

async function httpAddUser(req:Request, res:Response) {
    const user = req.body
    return res.status(200).json(await addUser(user))
}

async function httpGetUsers(req:Request, res:Response) {
    return res.status(200).json(await getUsers())
}

// module.exports = {
//     httpAddUser,
//     httpGetUsers,
// }

export {
    httpAddUser,
    httpGetUsers,
}