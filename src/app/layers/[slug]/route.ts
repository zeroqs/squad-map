import { prisma } from '@/shared/api'

const getMap = async (id: string) => {
  return await prisma.userMap.findUnique({
    where: {
      id,
    },
  })
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug
  const map = await getMap(slug)

  if (!map) {
    return Response.json({ error: 'Map not found' })
  }

  return Response.json(map)
}

export async function POST(req: Request) {
  const { id, data, notes } = await req.json()

  const updatedMap = await prisma.userMap.update({
    where: {
      id,
    },
    data: {
      mapData: data,
      notes,
    },
  })

  return Response.json(updatedMap)
}
