/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import { StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import layer from '@/../public/FoolsRoad.webp'

interface MapProps {
  selectedIcon: StaticImageData | null
}

export const Map = ({ selectedIcon }: MapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [clickedPoint, setClickedPoint] = useState<{
    x: number
    y: number
  } | null>(null)
  const [icons, setIcons] = useState<{ x: number; y: number }[]>([])
  const [movingIconIndex, setMovingIconIndex] = useState<number | null>(null)

  useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e: any) => {
      // prevent the right-click menu from appearing
      e.preventDefault()
    }

    // attach the event listener to
    // the document object
    document.addEventListener('contextmenu', handleContextMenu)

    // clean up the event listener when
    // the component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Устанавливаем размеры canvas равными размерам его контейнера
    const container = canvas.parentElement
    canvas.width = container!.clientWidth
    canvas.height = container!.clientHeight

    // Перерисовываем изображение при изменении размеров
    const context = canvas.getContext('2d')
    const image = new Image()
    image.src = layer.src
    image.addEventListener('load', () => {
      context!.drawImage(image, 0, 0, canvas.width, canvas.height)
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !selectedIcon || !clickedPoint) return

    const context = canvas.getContext('2d')
    const iconImage = new Image()
    iconImage.src = selectedIcon.src
    iconImage.addEventListener('load', () => {
      context!.drawImage(
        iconImage,
        clickedPoint.x - 20,
        clickedPoint.y - 20,
        30,
        30,
      )
    })
  }, [selectedIcon, clickedPoint, icons, movingIconIndex])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !selectedIcon) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const offsetX = rect.left
    const offsetY = rect.top
    const x = (e.clientX - offsetX) * scaleX
    const y = (e.clientY - offsetY) * scaleY

    // Проверяем, попал ли клик внутрь какой-либо из существующих иконок
    const iconIndex = icons.findIndex((icon) => {
      return (
        x >= icon.x - 15 &&
        x <= icon.x + 15 &&
        y >= icon.y - 15 &&
        y <= icon.y + 15
      )
    })

    if (iconIndex !== -1) {
      setMovingIconIndex(iconIndex)
    } else {
      setClickedPoint({ x, y })
      setIcons([...icons, { x, y }])
    }
  }

  return (
    <TransformWrapper>
      <TransformComponent>
        <div
          style={{ width: '800px', height: '800px' }}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.button === 0) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <canvas
            className="rounded-2xl"
            ref={canvasRef}
            onClick={handleCanvasClick}
          />
        </div>
      </TransformComponent>
    </TransformWrapper>
  )
}
