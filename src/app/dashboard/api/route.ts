import { currentUser } from '@clerk/nextjs/server'
import { unstable_cache } from 'next/cache'

import { prisma } from '@/shared/api'

const getAvailableMapList = unstable_cache(
  async () => {
    return await prisma.map.findMany()
  },
  ['availableMaps'],
  { revalidate: 3600, tags: ['availableMaps'] },
)

export async function GET() {
  const allMaps = await getAvailableMapList()

  return Response.json(allMaps)
}

export async function POST(req: Request) {
  const user = await currentUser()
  const { id, ...body } = await req.json()

  if (!user) {
    return Response.json({ error: 'User not found' })
  }

  const createdMap = await prisma.userMap.create({
    data: {
      ...body,
      userId: user.id,
    },
  })

  return Response.json(createdMap)
}
