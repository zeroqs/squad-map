'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { useFetch } from '@/shared/hooks/useFetch'
import { Separator } from '@/shared/ui/separator'
import { CreateLayer } from '@/widgets/dashboard/CreateLayer'

export const Content = () => {
  const { data, isLoading, error, handleFetch } = useFetch<AvailableMap[]>({
    input: '/api',
    initialValue: [],
    config: { cache: 'no-cache' },
  })

  useEffect(() => {
    handleFetch()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h4 className="animate-fade animate-delay-300 scroll-m-20 text-xl font-semibold tracking-tight pb-4">
        Your layers
      </h4>
      <Separator className="animate-fade animate-delay-300" />
      <div className="animate-fade animate-delay-300 grid grid-cols-layouts gap-4 mt-10">
        <CreateLayer />

        {data.map((map) => (
          <Link
            key={map.id}
            href={`/layer/${map.id}`}
            className="relative group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:cursor-pointer gap-4"
          >
            <Image
              className="absolute w-full h-full object-cover"
              src={map.previewMapUrl}
              alt={map.title}
              width={200}
              height={190}
            />

            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-bold">{map.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
