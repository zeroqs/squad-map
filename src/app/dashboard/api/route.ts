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
