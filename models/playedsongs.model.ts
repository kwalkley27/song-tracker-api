import prisma from "./prisma.js"

type PlayedSong = {
    userId:number
    songId:number
    timePlayed:string
    score:number
}

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