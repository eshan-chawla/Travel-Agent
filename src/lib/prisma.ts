import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasourceUrl: process.env.POSTGRES_PRISMA_URL // Use connection pooling for the app
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
