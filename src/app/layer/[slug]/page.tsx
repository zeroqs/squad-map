'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

import { useFetch } from '@/shared/hooks/useFetch'
import { PageLoader } from '@/shared/ui/PageLoader'
import { LayerControls } from '@/widgets/layer/LayerControls'
import { LayerDialog } from '@/widgets/layer/LayerDialog'
import { LayerMap } from '@/widgets/layer/LayerMap'

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
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            icons: payload.icons || layer.icons,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            text: payload.text || layer.text,
          }
        }
        return layer
      }),
    )
  }

  const handleAddLayer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!layers.find((layer) => layer.title === newLayerTitle)) {
      setLayers((prev) => [
        ...prev,
        { title: newLayerTitle, icons: [], text: [] },
      ])
      setModalOpen(false)
      setNewLayerTitle('')
    }
  }

  const handleSaveShortcut = useCallback(
    (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        mapSave.handleFetch()
      }
    },
    [mapSave],
  )

  useEffect(() => {
    map.handleFetch().then((data) => {
      if (data?.mapData) {
        setLayers(data.mapData)
      }
    })
  }, [params.slug])

  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut)

    return () => {
      window.removeEventListener('keydown', handleSaveShortcut)
    }
  }, [handleSaveShortcut])

  if (map.isLoading) return <PageLoader />
  if (map.error) return <div>{map.error}</div>
  if (!map.data) return <div>Unexpected error</div>

  return (
    <>
      <div className="animate-fade animate-delay-200 pb-5">
        <span>Layer:</span>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-5 inline pl-2">
          {map.data.title}
        </h3>
      </div>

      <div className="flex justify-between">
        <LayerMap
          layers={layers}
          activeLayer={activeLayer}
          selectedIcon={selectedIcon}
          actionIsDelete={actionIsDelete}
          mapSrc={map.data.mapUrl || ''}
          updateLayerIcons={updateLayerIcons}
        />

        <LayerControls
          layers={layers}
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
          selectedIcon={selectedIcon}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          handleOpenModal={() => setModalOpen(true)}
          handleDelete={() => setActionDelete(!actionIsDelete)}
          handleSave={mapSave.handleFetch}
          onChangeIcon={(value) =>
            setSelectedIcon((prev) => ({ ...prev, type: value }))
          }
          onChangeIconColor={(value) =>
            setSelectedIcon((prev) => ({ ...prev, color: value }))
          }
          actionIsDelete={actionIsDelete}
          mapSaveLoading={mapSave.isLoading}
          notesRef={notesRef}
          notes={map.data.notes || ''}
        />
      </div>

      <LayerDialog
        modalOpened={modalOpened}
        setModalOpen={setModalOpen}
        newLayerTitle={newLayerTitle}
        setNewLayerTitle={setNewLayerTitle}
        handleAddLayer={handleAddLayer}
      />
    </>
  )
}
