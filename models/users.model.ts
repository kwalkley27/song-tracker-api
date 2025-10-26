import prisma from "./prisma.js"

type User = {
    username:string
    instrument:string
    lastPlayed:string
}

async function addUser(user:User) {
    const new_user = Object.assign({
        lastPlayed: new Date().toISOString()
    }, user)

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