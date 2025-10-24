import { PrismaClient } from "@prisma/client";

// 1️⃣ Module augmentation for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 2️⃣ Single PrismaClient instance
const prisma = global.prisma ?? new PrismaClient();

// 3️⃣ In development, attach to global to prevent multiple instances (hot reload)
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
