import prisma from "./prisma.js"

type PlayedSong = {
    userId:number
    songId:number
    timePlayed:string
    score:number
}

const PlayedSongs = [
    { userId:1, songId:1, timePlayed:new Date().toISOString(), score:3},
]

async function addPlayedSong(playedSong:PlayedSong) {
    return prisma.playedSong.create({
        data: playedSong,
    });
}

async function getPlayedSongs() {
    return prisma.playedSong.findMany();
}

export {
    addPlayedSong,
    getPlayedSongs,
}