import express from "express";
import type { Request, Response } from "express";
import { usersRouter } from "./controllers/users/users.router.js"
import { songsRouter } from "./controllers/songs/songs.router.js"

const PORT = process.env.NODE_PORT || 3000

const app = express()

//TODO: Add security middleware
//TODO: Add logging middleware
//TODO: Add error handling middleware
//TODO: Add SSL/TLS

app.use(express.json())

app.use('/users', usersRouter)
app.use('/songs', songsRouter)
app.get('/', (req:Request, res:Response) => {
    res.send('Hello')  //TODO: UPDATE ROUTE
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


