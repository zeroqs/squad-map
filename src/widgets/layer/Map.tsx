/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import NextImage, { StaticImageData } from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import layer from '@/../public/FoolsRoad.webp'
import IconInf from '@/../public/infantry.png'

interface MapProps {
  selectedIcon: StaticImageData | null
}

export const Map = ({ selectedIcon }: MapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [icons, setIcons] = useState<{ x: number; y: number }[]>([])
  const [movingIconIndex, setMovingIconIndex] = useState<number | null>(null)
  const [startPosition, setStartPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement
    canvas.width = container!.clientWidth
    canvas.height = container!.clientHeight

    const context = canvas.getContext('2d')
    const image = new Image()
    image.src = layer.src
    image.addEventListener('load', () => {
      context!.drawImage(image, 0, 0, canvas.width, canvas.height)
    })
  }, [])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIcons([...icons, { x, y }])
  }

  const handleMouseDown = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault()
    setMovingIconIndex(index)
    setStartPosition({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (movingIconIndex === null || !startPosition) return

      const dx = e.clientX - startPosition.x
      const dy = e.clientY - startPosition.y

      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()

      setIcons((prevIcons) =>
        prevIcons.map((icon, index) => {
          if (index === movingIconIndex) {
            let newX = icon.x + dx
            let newY = icon.y + dy

            // Ensure the icon stays within the bounds of the container
            newX = Math.max(10, Math.min(newX, rect.width - 10))
            newY = Math.max(10, Math.min(newY, rect.height))

            return { x: newX, y: newY }
          }
          return icon
        }),
      )

      setStartPosition({ x: e.clientX, y: e.clientY })
    },
    [movingIconIndex, startPosition],
  )

  const handleMouseUp = () => {
    setMovingIconIndex(null)
    setStartPosition(null)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove])

  return (
    <TransformWrapper>
      <TransformComponent>
        <div
          ref={containerRef}
          style={{ width: '800px', height: '800px', position: 'relative' }}
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
          {icons.map((icon, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: icon.x - 10,
                top: icon.y - 10,
                cursor: 'grab',
              }}
              onMouseDown={(e) => handleMouseDown(index, e)}
            >
              <NextImage width={20} height={20} src={IconInf} alt="infantry" />
            </div>
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  )
}
