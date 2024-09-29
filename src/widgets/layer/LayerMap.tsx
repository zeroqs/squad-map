import { IconDto } from '@/app/layer/[slug]/page'
import { Map } from '@/widgets/layer/Map'

interface LayerMapProps {
  layers: MapIcons[]
  activeLayer: string
  selectedIcon: IconDto
  actionIsDelete: boolean
  mapSrc: string
  updateLayerIcons: (payload: Pick<MapIcons, 'icons' | 'text'>) => void
}

export const LayerMap = ({
  layers,
  activeLayer,
  selectedIcon,
  actionIsDelete,
  mapSrc,
  updateLayerIcons,
}: LayerMapProps) => {
  const activeLayerData = layers.find((el) => el.title === activeLayer)!

  return (
    <Map
      data={activeLayerData}
      updateIcons={updateLayerIcons}
      mapSrc={mapSrc}
      selectedIcon={selectedIcon}
      actionIsDelete={actionIsDelete}
      activeLayer={activeLayer}
    />
  )
}
