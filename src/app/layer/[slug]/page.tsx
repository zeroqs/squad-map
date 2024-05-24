/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import { useState } from 'react'

import { IconPicker } from '@/app/layer/components/ControlsPanel/IconPicker/IconPicker'
import { Icons } from '@/shared/icons/Icons'
import { Map } from '@/widgets/layer/Map'

export default function Layer({ params }: { params: { slug: string } }) {
  const [selectedIcon, setSelectedIcon] = useState<IconType>('infantry')
  const [selectedColor, setSelectedColor] = useState('#fff')

  const onChangeIcon = (value: IconType) => {
    setSelectedIcon(value)
  }

  return (
    <>
      <div className="flex justify-between">
        <Map selectedIcon={selectedIcon} />

        <div className="p-4 ">
          <div>
            <h1>Current icon</h1>
          </div>
          <div className="h-[50px] flex justify-center py-2">
            <Icons iconType={selectedIcon} />
          </div>

          <IconPicker icon={selectedIcon} onChange={onChangeIcon} />
        </div>
      </div>
    </>
  )
}
