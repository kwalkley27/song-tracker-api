import express from "express";
import type { Request, Response, NextFunction } from "express";
import morgan from 'morgan'
import helmet from 'helmet'
import https from "https"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
import { usersRouter } from "./controllers/users/users.router.js"
import { songsRouter } from "./controllers/songs/songs.router.js"
import { playedSongsRouter } from "./controllers/playedsongs/playedsongs.router.js"
import { setlistRouter } from "./controllers/setlist/setlist.router.js"

const PORT = process.env.NODE_PORT || 3000

const app = express()

app.use(helmet())
app.use(morgan('combined'))
app.use(express.json())
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use('/users', usersRouter)
app.use('/songs', songsRouter)
app.use('/playedsongs', playedSongsRouter)
app.use('/setlist', setlistRouter)
app.get('/', (req:Request, res:Response) => {
    res.send('Song Tracker API to help musicians keep track of and manage songs they know and build dynamic setlists')
});

// __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// SSL options
const keyPath = process.env.SSL_KEY_PATH || path.join(__dirname, '..', 'certs', 'server.key');
const certPath = process.env.SSL_CERT_PATH || path.join(__dirname, '..', 'certs', 'server.crt');

const sslOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});
