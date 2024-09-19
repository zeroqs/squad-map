import { currentUser } from '@clerk/nextjs/server'

import { prisma } from '@/shared/api'

const getUserMaps = async (id: string) => {
  return await prisma.userMap.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export async function GET() {
  const user = await currentUser()

  if (!user) {
    return Response.json({ error: 'User not found' })
  }

  const allMaps = await getUserMaps(user.id)

  return Response.json(allMaps)
}
