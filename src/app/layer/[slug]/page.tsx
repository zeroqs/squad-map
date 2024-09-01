'use client'

import { useState } from 'react'
import { MdDelete } from 'react-icons/md'

import { IconPicker } from '@/app/layer/components/ControlsPanel/IconPicker/IconPicker'
import { Icons } from '@/shared/icons/Icons'
import { GradientPicker } from '@/shared/ui/color-picker'
import { Toggle } from '@/shared/ui/toggle'
import { Map } from '@/widgets/layer/Map'

export interface IconDto {
  type: IconType
  color: string
}

const defaultState: IconDto = {
  type: 'infantry',
  color: '#fff',
}

export default function Layer({ params }: { params: { slug: string } }) {
  const [selectedIcon, setSelectedIcon] = useState<IconDto>(defaultState)
  const [selectedColor, setSelectedColor] = useState('#fff')
  const [actionIsDelete, setActionDelete] = useState(false)

  const onChangeIcon = (value: IconType) => {
    setSelectedIcon({
      type: value,
      color: selectedIcon.color,
    })
  }

  const onChangeIconColor = (value: string) => {
    setSelectedColor(value)

    setSelectedIcon({
      type: selectedIcon.type,
      color: value,
    })
  }

  const handleDelete = () => {
    setActionDelete(!actionIsDelete)
  }

  return (
    <>
      <div className="flex justify-between">
        <Map selectedIcon={selectedIcon} actionIsDelete={actionIsDelete} />

        <div className="p-4 animate-fade animate-delay-200">
          <div className="flex gap-4">
            <div>
              <h1>Action</h1>
              <Toggle onClick={handleDelete} variant="outline">
                <MdDelete size={18} aria-label="Delete" />
              </Toggle>
            </div>

            <div>
              <h1>Current color</h1>

              <GradientPicker
                background={selectedColor}
                setBackground={onChangeIconColor}
              />
            </div>

            <div>
              <h1>Current icon</h1>
              <div className="h-[50px] flex justify-center py-2">
                <Icons
                  iconType={selectedIcon.type}
                  color={selectedIcon.color}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <IconPicker icon={selectedIcon} onChange={onChangeIcon} />
          </div>
        </div>
      </div>
    </>
  )
}
