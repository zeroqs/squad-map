import React, { useState } from 'react'
import { Image as KonvaImage, Layer, Stage } from 'react-konva'
import useImage from 'use-image'

import layer from '@/../public/Narva.webp'
import { IconDto } from '@/app/layer/[slug]/page'
import { Icons, IconsString } from '@/shared/icons/Icons'

interface MapProps {
  selectedIcon: IconDto
  actionIsDelete: boolean
}

interface Icons {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: IconType
  color: string
}

export const Map = ({ selectedIcon, actionIsDelete }: MapProps) => {
  const [image] = useImage(layer.src)
  const [icons, setIcons] = useState<Icons[]>([])

  const handleClick = (e: any) => {
    const { x, y } = e.target.getStage().getPointerPosition()

    if (actionIsDelete) {
      setIcons((prevIcons) =>
        prevIcons.filter(
          (icon) =>
            !(
              x >= icon.x &&
              x <= icon.x + icon.width &&
              y >= icon.y &&
              y <= icon.y + icon.height
            ),
        ),
      )
    } else {
      const newIcon = {
        id: `${icons.length + 1}`,
        x: x - 15,
        y: y - 15,
        width: 30,
        height: 30,
        type: selectedIcon.type,
        color: selectedIcon.color,
      }

      setIcons([...icons, newIcon])
    }
  }

  return (
    <Stage width={800} height={800} onClick={handleClick}>
      <Layer>
        <KonvaImage image={image} width={800} height={800} />

        {icons.map((el) => (
          <KonvaImage
            key={el.id}
            x={el.x}
            y={el.y}
            draggable
            image={createImageFromSVG(el.type, el.color)}
          />
        ))}
      </Layer>
    </Stage>
  )
}

const createImageFromSVG = (iconType: IconType, color: string) => {
  const svgString = IconsString({ iconType, color })
  const svgBase64 = `data:image/svg+xml;base64,${btoa(svgString)}`
  const img = new Image()
  img.src = svgBase64

  return img
}
