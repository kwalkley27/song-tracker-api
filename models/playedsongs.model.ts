import prisma from "./prisma.js"

//userId:string
//songId:string
//timePlayed:timestamp
//score:int

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

    // PlayedSongs.push(playedSong)
    // return playedSong

    return prisma.playedSong.create({
        data: playedSong,
    });
}

async function getPlayedSongs() {
    //return PlayedSongs
    return prisma.playedSong.findMany();
}

export {
    addPlayedSong,
    getPlayedSongs,
}