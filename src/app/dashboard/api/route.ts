import { currentUser } from '@clerk/nextjs/server'

import { prisma } from '@/shared/api'

const getAvailableMapList = async () => {
  return await prisma.map.findMany()
}

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
