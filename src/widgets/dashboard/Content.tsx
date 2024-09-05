'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Separator } from '@/shared/ui/separator'
import { CreateLayer } from '@/widgets/dashboard/CreateLayer'

export const Content = () => {
  const [maps, setMaps] = useState<AvailableMap[]>([])

  useEffect(() => {
    const fetchMaps = async () => {
      const res = await fetch('http://localhost:3000/api', {
        cache: 'reload',
      })
      const data = await res.json()
      setMaps(data)
    }

    fetchMaps()
  }, [])

  return (
    <div>
      <h4 className="animate-fade animate-delay-300 scroll-m-20 text-xl font-semibold tracking-tight pb-4">
        Your layers
      </h4>
      <Separator className="animate-fade animate-delay-300" />
      <div className="animate-fade animate-delay-300 grid grid-cols-layouts gap-4 mt-10">
        <CreateLayer />

        {maps.map((map) => (
          <Link
            key={map.id}
            href={`/layer/${map.id}`}
            className="relative border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:cursor-pointer gap-4 "
          >
            <Image
              className="absolute w-full h-full"
              src={map.previewMapUrl}
              alt={map.title}
              width={200}
              height={190}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
