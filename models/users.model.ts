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

async function getUsers() {
    return prisma.user.findMany();
}

export {
    addUser,
    getUsers,
}