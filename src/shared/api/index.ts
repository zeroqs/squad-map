import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())
