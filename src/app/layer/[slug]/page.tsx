'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import { IconPicker } from '@/app/layer/components/ControlsPanel/IconPicker/IconPicker'
import { useFetch } from '@/shared/hooks/useFetch'
import { Icons } from '@/shared/icons/Icons'
import { Button } from '@/shared/ui/button'
import { GradientPicker } from '@/shared/ui/color-picker'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { PageLoader } from '@/shared/ui/PageLoader'
import { Textarea } from '@/shared/ui/textarea'
import { Toggle } from '@/shared/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
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
  const [activeLayer, setActiveLayer] = useState('Layer 1')
  const [modalOpened, setModalOpen] = useState(false)
  const [newLayerTitle, setNewLayerTitle] = useState('')
  const notesRef = useRef<HTMLTextAreaElement | null>(null)

  const map = useFetch<AvailableMap | null>({
    input: `/layers/${params.slug}`,
    initialValue: null,
    config: {
      method: 'GET',
      cache: 'reload',
    },
  })

  const [layers, setLayers] = useState<MapIcons[]>([
    {
      title: 'Layer 1',
      icons: [],
      text: [],
    },
  ])

  const mapSave = useFetch<AvailableMap | null>({
    input: `/layers/${params.slug}`,
    initialValue: null,
    config: {
      method: 'POST',
      body: JSON.stringify({
        id: params.slug,
        data: layers,
      }),
    },
  })

  const updateLayerIcons = (payload: Pick<MapIcons, 'icons' | 'text'>) => {
    setLayers((prevValues) =>
      prevValues.map((layer) => {
        if (layer.title === activeLayer) {
          return {
            title: activeLayer,
            icons: payload.icons || layer.icons,
            text: payload.text || layer.text,
          }
        }
        return layer
      }),
    )
  }

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

  const handleAddLayer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isLayerExist = layers.find((layer) => layer.title === newLayerTitle)

    if (!isLayerExist) {
      setLayers((prevValues) => [
        ...prevValues,
        {
          title: newLayerTitle,
          icons: [],
          text: [],
        },
      ])
      setModalOpen(false)
      setNewLayerTitle('')
    }
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  useEffect(() => {
    map.handleFetch().then((data) => {
      if (data?.mapData) {
        setLayers(data.mapData)
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
          data={layers.find((el) => el.title === activeLayer)!}
          updateIcons={updateLayerIcons}
          mapSrc={map.data?.mapUrl || ''}
          selectedIcon={selectedIcon}
          actionIsDelete={actionIsDelete}
          activeLayer={activeLayer}
        />

        <div className="p-4 animate-fade animate-delay-200">
          <div className="flex items-center gap-4">
            <ToggleGroup
              type="single"
              className="justify-start"
              defaultValue="Layer 1"
              onValueChange={(value) => {
                if (value) {
                  setActiveLayer(value)
                }
              }}
              value={activeLayer}
            >
              {layers.map((layer) => (
                <ToggleGroupItem
                  key={layer.title}
                  value={layer.title}
                  aria-label="Toggle bold"
                >
                  {layer.title}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <Button onClick={handleOpenModal} size="icon">
              <IoMdAdd className="w-4 h-4" />
            </Button>
          </div>

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

      <Dialog open={modalOpened} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddLayer} className="contents">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Type layer title here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex flex-col items-start gap-2 ">
                <Label htmlFor="layer">Layer</Label>
                <Input
                  value={newLayerTitle}
                  onChange={(e) => setNewLayerTitle(e.target.value)}
                  id="layer"
                  placeholder="Layer 2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
