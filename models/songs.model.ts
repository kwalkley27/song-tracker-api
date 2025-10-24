
// id:number
// artist:string
// title:string
// length:number
// genre:string

type Song = {
    artist:string
    title:string
    length:number
    genre:string
}

const Songs = [
    { id:1, artist:"jimi hendrix", title:"purple haze", length: 240, genre:"rock"},
]

let highestId = 1

async function addSong(song:Song) {
    const new_song = Object.assign({
        id: highestId+1,
    }, song)

    Songs.push(new_song)
    highestId+=1
    return song
}

async function getSongs() {
    return Songs
}

export {
    addSong,
    getSongs,
}