import React, { useState } from 'react'
import { Image as KonvaImage, Layer, Stage } from 'react-konva'
import useImage from 'use-image'

import layer from '@/../public/Narva.webp'
import { IconDto } from '@/app/layer/[slug]/page'
import { iconsString } from '@/shared/icons/Icons'

interface MapProps {
  selectedIcon: IconDto
  actionIsDelete: boolean
}

interface Icon {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: IconType
  color: string
}

const FIXED_ICON_SIZE = 25

export const Map = ({ selectedIcon, actionIsDelete }: MapProps) => {
  const [image] = useImage(layer.src)
  const [icons, setIcons] = useState<Icon[]>([])
  const [stage, setStage] = useState({ scale: 1, x: 0, y: 0 })

  const handleClick = (e: any) => {
    if (actionIsDelete) return

    const stage = e.target.getStage()
    const pointerPosition = stage.getPointerPosition()
    const scale = stage.scaleX()

    const newIconX = (pointerPosition.x - stage.x() - 15) / scale
    const newIconY = (pointerPosition.y - stage.y() - 15) / scale

    const newIcon = {
      id: `${icons.length + 1}`,
      x: newIconX,
      y: newIconY,
      width: FIXED_ICON_SIZE,
      height: FIXED_ICON_SIZE,
      type: selectedIcon.type,
      color: selectedIcon.color,
    }

    setIcons([...icons, newIcon])
  }

  const handleDelete = (iconId: string) => {
    console.log(icons.filter((el) => el.id !== iconId))
    if (actionIsDelete) {
      setIcons((prevIcons) => prevIcons.filter((el) => el.id !== iconId))
    }
  }

  const handleWheel = (e: any) => {
    e.evt.preventDefault()

    const scaleBy = 1.05
    const stage = e.target.getStage()
    const oldScale = stage.scaleX()
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    }

    let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy

    if (newScale < 1) {
      newScale = 1
    }

    const newPos = {
      x: stage.getPointerPosition().x - mousePointTo.x * newScale,
      y: stage.getPointerPosition().y - mousePointTo.y * newScale,
    }

    setStage({
      scale: newScale,
      x: newPos.x,
      y: newPos.y,
    })
  }

  const handleDragMove = (e: any) => {
    const stage = e.target.getStage()
    const scale = stage.scaleX()
    const stageWidth = stage.width()
    const stageHeight = stage.height()
    const mapWidth = 800 * scale
    const mapHeight = 800 * scale

    let newX = stage.x()
    if (newX > 0) {
      newX = 0
    } else if (newX < stageWidth - mapWidth) {
      newX = stageWidth - mapWidth
    }

    let newY = stage.y()
    if (newY > 0) {
      newY = 0
    } else if (newY < stageHeight - mapHeight) {
      newY = stageHeight - mapHeight
    }

    stage.position({ x: newX, y: newY })
  }

  return (
    <Stage
      onWheel={handleWheel}
      scaleX={stage.scale}
      scaleY={stage.scale}
      x={stage.x}
      y={stage.y}
      width={800}
      height={800}
      draggable
      onClick={handleClick}
      onDragMove={handleDragMove}
    >
      <Layer>
        <KonvaImage image={image} width={800} height={800} />

        {icons.map((el) => (
          <KonvaImage
            key={el.id}
            x={el.x}
            y={el.y}
            draggable
            onClick={() => handleDelete(el.id)}
            image={createImageFromSVG(el.type, el.color)}
            width={el.width / stage.scale}
            height={el.height / stage.scale}
          />
        ))}
      </Layer>
    </Stage>
  )
}

const createImageFromSVG = (iconType: IconType, color: string) => {
  const svgString = iconsString({ iconType, color })
  const svgBase64 = `data:image/svg+xml;base64,${btoa(svgString)}`
  const img = new Image()
  img.src = svgBase64

  return img
}
