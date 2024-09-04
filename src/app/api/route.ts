import { currentUser } from '@clerk/nextjs/server'
import { unstable_cache } from 'next/cache'

import { prisma } from '@/shared/api'

const getUserMaps = unstable_cache(
  async (id: string) => {
    return await prisma.userMap.findMany({
      where: {
        userId: id,
      },
    })
  },
  ['userMaps'],
  { revalidate: 3600, tags: ['userMaps'] },
)

export async function GET() {
  const user = await currentUser()

  if (!user) {
    return Response.json({ error: 'User not found' })
  }

  const allMaps = await getUserMaps(user.id)

  return Response.json(allMaps)
}
