import prisma from "./prisma.js"

type Song = {
    artist:string
    title:string
    length:number
    genre:string
}

async function addSong(song:Song) {
    return prisma.song.create({
        data: song,
    });
}

async function getSongs() {
    return prisma.song.findMany();
}

export {
    addSong,
    getSongs,
}