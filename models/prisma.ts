import { PrismaClient } from "@prisma/client";


declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

let prisma: any;

if (process.env['NODE_ENV'] === 'test') {
  // Simple in-memory stores with auto-increment ids
  const users: any[] = [
    { id: 1, username: 'test-user-1', instrument: 'Guitar', lastPlayed: new Date().toISOString() },
  ];
  const songs: any[] = [
    { id: 1, title: 'Test Song 1', artist: 'Artist A', length: 180, genre: 'Rock' },
    { id: 2, title: 'Test Song 2', artist: 'Artist B', length: 200, genre: 'Jazz' },
  ];
  const playedSongs: any[] = [
    { id: 1, userId: 1, songId: 1, timePlayed: new Date().toISOString(), score: 90, song: songs[0] },
    { id: 2, userId: 1, songId: 2, timePlayed: new Date().toISOString(), score: 80, song: songs[1] },
  ];

  prisma = {
    user: {
      create: async ({ data }: any) => {
        const id = users.length + 1;
        const created = { id, ...data };
        users.push(created);
        return created;
      },
      findMany: async ({ skip = 0, take = 20 } = {}) => users.slice(skip, skip + take),
      count: async () => users.length,
    },
    song: {
      create: async ({ data }: any) => {
        const id = songs.length + 1;
        const created = { id, ...data };
        songs.push(created);
        return created;
      },
      findMany: async ({ skip = 0, take = 20 } = {}) => songs.slice(skip, skip + take),
      count: async () => songs.length,
    },
    playedSong: {
      create: async ({ data }: any) => {
        const id = playedSongs.length + 1;
        const song = songs.find(s => s.id === data.songId) || null;
        const created = { id, ...data, song };
        playedSongs.push(created);
        return created;
      },
      findMany: async (opts: any = {}) => {
        let results = [...playedSongs];
        if (opts.where && typeof opts.where.userId !== 'undefined') {
          results = results.filter(r => r.userId === opts.where.userId);
        }
        if (opts.orderBy && opts.orderBy.timePlayed === 'desc') {
          results.sort((a, b) => (a.timePlayed < b.timePlayed ? 1 : -1));
        }
        if (typeof opts.skip === 'number' || typeof opts.take === 'number') {
          const skip = opts.skip ?? 0;
          const take = opts.take ?? results.length;
          results = results.slice(skip, skip + take);
        }
        if (opts.include && opts.include.song) {
          results = results.map(r => ({ ...r, song: songs.find(s => s.id === r.songId) }));
        }
        return results;
      },
      count: async () => playedSongs.length,
    },
  };
} else {
  // Real Prisma client for non-test environments
  prisma = global.prisma ?? new PrismaClient();

  // In development, attach to global to prevent multiple instances (hot reload)
  if (process.env['NODE_ENV'] !== "production") global.prisma = prisma;
}

export default prisma;
