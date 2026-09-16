import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be configured before creating the Prisma client.");
}

const requiredDatabaseUrl = databaseUrl;

function createPrismaClient() {
  if (requiredDatabaseUrl.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: requiredDatabaseUrl });
  }

  const adapter = new PrismaPg({ connectionString: requiredDatabaseUrl });
  return new PrismaClient({ adapter });
}

type PrismaClientInstance = ReturnType<typeof createPrismaClient>;

type PrismaGlobal = typeof globalThis & {
  prisma?: PrismaClientInstance;
};

const globalForPrisma = globalThis as PrismaGlobal;

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
