import { KonvaEventObject } from 'konva/lib/Node'
import { Stage as KonvaStage } from 'konva/lib/Stage'
import { SetStateAction, useRef, useState } from 'react'
import { Image as KonvaImage, Layer, Stage, Text } from 'react-konva'
import useImage from 'use-image'

import { IconDto } from '@/app/layer/[slug]/page'
import { iconsString } from '@/shared/icons/Icons'

interface MapProps {
  selectedIcon: IconDto
  actionIsDelete: boolean
  mapSrc: string
  updateIcons: (value: SetStateAction<MapIcons>) => void
  data: MapIcons
}

const FIXED_ICON_SIZE = 25

export const Map = ({
  selectedIcon,
  actionIsDelete,
  mapSrc,
  updateIcons,
  data,
}: MapProps) => {
  const [image] = useImage(mapSrc)
  const [stage, setStage] = useState({ scale: 1, x: 0, y: 0 })
  const mapStageRef = useRef<KonvaStage | null>(null)

  const updateIconsData = (type: 'text' | 'icons', updatedItems: any) => {
    updateIcons((prevIcons) => ({
      ...prevIcons,
      [type]: updatedItems,
    }))
  }

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    if (actionIsDelete || (event.target.x() && event.target.y())) return

    const stage = event.target.getStage()!
    const pointerPosition = stage.getPointerPosition()!
    const scale = stage.scaleX()
    const newIconX = (pointerPosition.x - stage.x()) / scale
    const newIconY = (pointerPosition.y - stage.y() - 5) / scale

    if (selectedIcon.type === 'text') {
      const newText = {
        id: `${data.text.length + 1}`,
        x: newIconX,
        y: newIconY,
        text: 'Text',
        color: selectedIcon.color,
      }
      updateIconsData('text', [...data.text, newText])
    } else {
      const newIcon = {
        id: `${data.icons.length + 1}`,
        x: newIconX,
        y: newIconY,
        width: FIXED_ICON_SIZE,
        height: FIXED_ICON_SIZE,
        type: selectedIcon.type,
        color: selectedIcon.color,
      }
      updateIconsData('icons', [...data.icons, newIcon])
    }
  }

  const handleDelete = (id: string, type: 'text' | 'icons') => {
    if (!actionIsDelete) return
    updateIconsData(
      type,
      data[type].filter((el: any) => el.id !== id),
    )
  }

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()

    const scaleBy = 1.05
    const stage = e.target.getStage()!
    const oldScale = stage.scaleX()
    const mousePointTo = {
      x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
    }

    let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy

    if (newScale < 1) {
      newScale = 1
    }

    const newPos = {
      x: stage.getPointerPosition()!.x - mousePointTo.x * newScale,
      y: stage.getPointerPosition()!.y - mousePointTo.y * newScale,
    }

    setStage({
      scale: newScale,
      x: newPos.x,
      y: newPos.y,
    })
  }

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage()!
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

  const handleMouseUp = (
    event: KonvaEventObject<MouseEvent>,
    id: string,
    type: 'text' | 'icons',
  ) => {
    const updatedItems = data[type].map((el: any) =>
      el.id === id ? { ...el, x: event.target.x(), y: event.target.y() } : el,
    )
    updateIconsData(type, updatedItems)
  }

  const handleTextEdit = (event: KonvaEventObject<MouseEvent>, id: string) => {
    // https://konvajs.org/docs/sandbox/Editable_Text.html
    const textPosition = event.target.getAbsolutePosition()
    const stageBox = mapStageRef.current!.container().getBoundingClientRect()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const initialText = event.target.textArr[0].text

    const areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    }

    const textarea = document.createElement('textarea')
    document.body.append(textarea)

    textarea.value = initialText
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    textarea.value = event.target.textArr[0].text
    textarea.style.position = 'absolute'
    textarea.style.top = areaPosition.y + 'px'
    textarea.style.left = areaPosition.x + 'px'
    textarea.style.width = event.target.width() as unknown as string

    textarea.focus()

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.target.textArr[0].text = textarea.value
        event.target.attrs.text = textarea.value
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.target._partialText = textarea.value
        const width = event.target.width()
        const height = event.target.height()

        updateIconsData(
          'text',
          data.text.map((el) =>
            el.id === id ? { ...el, text: textarea.value, width, height } : el,
          ),
        )

        textarea.remove()
        textarea.removeEventListener('keydown', () => {})
        window.requestAnimationFrame(() => event.target.getLayer()!.draw())
      }
      if (e.key === 'Escape') {
        textarea.remove()
        textarea.removeEventListener('keydown', () => {})
      }
    })
  }
  console.log(data.text)
  return (
    <Stage
      ref={mapStageRef}
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

        {data.icons.map((el) => (
          <KonvaImage
            key={el.id}
            x={el.x}
            y={el.y}
            draggable
            onDragEnd={(e) => handleMouseUp(e, el.id, 'icons')}
            onClick={() => handleDelete(el.id, 'icons')}
            image={createImageFromSVG(el.type, el.color)}
            width={el.width / stage.scale}
            height={el.height / stage.scale}
            offsetX={el.width / stage.scale / 2}
            offsetY={el.height / stage.scale / 2}
          />
        ))}

        {data.text.map((el) => (
          <Text
            key={el.id}
            x={el.x}
            y={el.y}
            text={el.text}
            draggable
            fill={el.color}
            fontSize={20 / stage.scale}
            onDblClick={(event) => handleTextEdit(event, el.id)}
            onClick={() => handleDelete(el.id, 'text')}
            onDragEnd={(e) => handleMouseUp(e, el.id, 'text')}
            offsetX={el.width / stage.scale / 2}
            offsetY={el.height / stage.scale / 2}
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
