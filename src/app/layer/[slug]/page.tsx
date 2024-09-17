'use client'

import { useEffect, useRef, useState } from 'react'
import { MdDelete } from 'react-icons/md'

import { IconPicker } from '@/app/layer/components/ControlsPanel/IconPicker/IconPicker'
import { useFetch } from '@/shared/hooks/useFetch'
import { Icons } from '@/shared/icons/Icons'
import { Button } from '@/shared/ui/button'
import { GradientPicker } from '@/shared/ui/color-picker'
import { Label } from '@/shared/ui/label'
import { PageLoader } from '@/shared/ui/PageLoader'
import { Textarea } from '@/shared/ui/textarea'
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
  const notesRef = useRef<HTMLTextAreaElement | null>(null)

  const map = useFetch<AvailableMap | null>({
    input: `/layers/${params.slug}`,
    initialValue: null,
    config: {
      method: 'GET',
      cache: 'reload',
    },
  })

  const [data, setData] = useState<MapIcons>({
    icons: [],
    text: [],
  })

  const mapSave = useFetch<AvailableMap | null>({
    input: `/layers/${params.slug}`,
    initialValue: null,
    config: {
      method: 'POST',
      body: JSON.stringify({
        id: params.slug,
        data,
      }),
    },
  })

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

  const handleSave = () => {
    mapSave.handleFetch()
  }

  useEffect(() => {
    map.handleFetch().then((data) => {
      if (data?.mapData) {
        setData(data.mapData)
      }
    })
  }, [params.slug])

  useEffect(() => {
    const handleSaveShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        mapSave.handleFetch()
      }
    }

    window.addEventListener('keydown', handleSaveShortcut)

    return () => {
      window.removeEventListener('keydown', handleSaveShortcut)
    }
  }, [])

  if (map.isLoading) return <PageLoader />
  if (map.error) return <div>{map.error}</div>

  return (
    <>
      <div className="animate-fade animate-delay-200 pb-5">
        <span>Layer:</span>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-5 inline pl-2">
          {map.data?.title}
        </h3>
      </div>

      <div className="flex justify-between">
        <Map
          data={data}
          updateIcons={setData}
          mapSrc={map.data?.mapUrl || ''}
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
              <Button onClick={handleSave} loading={mapSave.isLoading}>
                Save
              </Button>
            </div>
          </div>

          <div className="flex justify-start">
            <IconPicker icon={selectedIcon} onChange={onChangeIcon} />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="notes">Your notes</Label>
            <Textarea
              ref={notesRef}
              defaultValue={map.data?.notes || ''}
              placeholder="Type your notes for this layer here."
              id="notes"
            />
          </div>
        </div>
      </div>
    </>
  )
}
