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

async function getSongs(limit: number = 20, offset: number = 0) {
    const [songs, total] = await Promise.all([
        prisma.song.findMany({
            skip: offset,
            take: limit,
        }),
        prisma.song.count()
    ]);

    return {
        data: songs,
        pagination: {
            total,
            limit,
            offset,
            hasMore: offset + limit < total
        }
    };
}

export {
    addSong,
    getSongs,
}