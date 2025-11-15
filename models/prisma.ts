import { PrismaClient } from "@prisma/client";


declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Single PrismaClient instance
const prisma = global.prisma ?? new PrismaClient();

// In development, attach to global to prevent multiple instances (hot reload)
if (process.env['NODE_ENV'] !== "production") global.prisma = prisma;

export default prisma;
