
//id:string
//username:string
//instrument:string
//lastPlayed:timestamp

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
        id: highestId+1,
        lastPlayed: new Date().toISOString()
    }, user)

    Users.push(new_user)
    highestId+=1
    return user
}

async function getUsers() {
    return Users
}

export {
    addUser,
    getUsers,
}