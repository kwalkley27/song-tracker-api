import prisma from "./prisma.js"

type User = {
    username:string
    instrument:string
    lastPlayed?:string
}

async function addUser(user:Omit<User, 'lastPlayed'>) {
    const new_user = {
        ...user,
        lastPlayed: new Date().toISOString()
    };

    return prisma.user.create({
        data: new_user,
    });

}

async function getUsers(limit: number = 20, offset: number = 0) {
    const [users, total] = await Promise.all([
        prisma.user.findMany({
            skip: offset,
            take: limit,
        }),
        prisma.user.count()
    ]);

    return {
        data: users,
        pagination: {
            total,
            limit,
            offset,
            hasMore: offset + limit < total
        }
    };
}

export {
    addUser,
    getUsers,
}