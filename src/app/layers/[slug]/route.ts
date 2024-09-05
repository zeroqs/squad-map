import { unstable_cache } from 'next/cache'

import { prisma } from '@/shared/api'

const getMap = unstable_cache(
  async (id: string) => {
    return await prisma.userMap.findUnique({
      where: {
        id,
      },
    })
  },
  ['map'],
  { revalidate: 3600, tags: ['map'] },
)

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug // 'a', 'b', or 'c'
  const map = await getMap(slug)

  if (!map) {
    return Response.json({ error: 'Map not found' })
  }

  return Response.json(map)
}
