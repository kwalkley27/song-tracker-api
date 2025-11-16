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

async function getPlayedSongs(limit: number = 20, offset: number = 0) {
    const [playedSongs, total] = await Promise.all([
        prisma.playedSong.findMany({
            skip: offset,
            take: limit,
        }),
        prisma.playedSong.count()
    ]);

    return {
        data: playedSongs,
        pagination: {
            total,
            limit,
            offset,
            hasMore: offset + limit < total
        }
    };
}

async function getLatestPlayedSongs(userId:number, limit:number) {
    return await prisma.playedSong.findMany({
        where: { userId },
        orderBy: { timePlayed: 'desc' },
        take: limit,
    });
}

export {
    addPlayedSong,
    getPlayedSongs,
    getLatestPlayedSongs
}