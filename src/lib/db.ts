import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getOrganization(id: string) {
  return prisma.organization.findUnique({
    where: { id },
    include: {
      users: true,
      products: true,
      subscription: true,
    },
  })
}

export async function getUser(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      organization: true,
    },
  })
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      organization: true,
    },
  })
} 