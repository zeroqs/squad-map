'use client'

import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'

import { IconPicker } from '@/app/layer/components/ControlsPanel/IconPicker/IconPicker'
import { Icons } from '@/shared/icons/Icons'
import { Button } from '@/shared/ui/button'
import { GradientPicker } from '@/shared/ui/color-picker'
import { PageLoader } from '@/shared/ui/PageLoader'
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
  const [map, setMap] = useState<AvailableMap | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSave = <T,>(data: T) => {
    try {
      const res = fetch(`${window.location.origin}/layers/${params.slug}`)
    } catch (error) {
      console.error(error)
    } finally {
      console.log('1')
    }
  }

  useEffect(() => {
    const fetchMap = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `${window.location.origin}/layers/${params.slug}`,
        )
        const data = await res.json()
        setMap(data)
        setError(null)
      } catch (error) {
        console.error(error)
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchMap()
  }, [params.slug])

  if (loading) return <PageLoader />
  if (error) return <div>{error}</div>

  return (
    <>
      <div className="flex justify-between">
        <Map
          mapSrc={map?.mapUrl || ''}
          selectedIcon={selectedIcon}
          actionIsDelete={actionIsDelete}
        />

        <div className="p-4 animate-fade animate-delay-200">
          <div className="flex gap-4 items-center">
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

            <div className="flex-[1_1_auto] text-right">
              <Button>Save</Button>
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
