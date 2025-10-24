import prisma from "./prisma.js"

type User = {
    username:string
    instrument:string
    lastPlayed:string
}

const Users = [
    { id:1, username:"bob", instrument:"guitar", lastPlayed: new Date().toISOString()},
]

let highestId = 1

async function addUser(user:User) {
    const new_user = Object.assign({
        //id: highestId+1,
        lastPlayed: new Date().toISOString()
    }, user)

    //Users.push(new_user)
    //highestId+=1
    //return user

    return prisma.user.create({
        data: new_user,
    });

}

async function getUsers() {
    //return Users
    return prisma.user.findMany();
}

export {
    addUser,
    getUsers,
}