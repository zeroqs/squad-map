/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import icon from '@/../public/infantry.png'
import { Button } from '@/shared/ui/button'
import { Map } from '@/widgets/layer/Map'

export default function Layer({ params }: { params: { slug: string } }) {
  const [selectedIcon, setSelectedIcon] = useState<StaticImageData | null>(null)

  return (
    <div className="flex justify-between">
      <Map selectedIcon={selectedIcon} />
      <div className="p-4">
        <Button
          onClick={() => setSelectedIcon(icon)}
          variant="outline"
          size="icon"
          className="p-2"
        >
          <Image width={30} height={30} src={icon} alt="infantry" />
        </Button>
      </div>
    </div>
  )
}
