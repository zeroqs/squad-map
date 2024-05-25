/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import layer from '@/../public/FoolsRoad.webp'
import { IconDto } from '@/app/layer/[slug]/page'
import { Icons } from '@/shared/icons/Icons'

interface MapProps {
  selectedIcon: IconDto
}

interface Icon {
  id: string
  x: number
  y: number
  iconType: IconType
  color: string
}

export const Map = ({ selectedIcon }: MapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [icons, setIcons] = useState<Icon[]>([])
  const [scale, setScale] = useState(1)
  const [movingIconIndex, setMovingIconIndex] = useState<number | null>(null)
  const [startPosition, setStartPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [movingIconPosition, setMovingIconPosition] = useState<{
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
    const x = (e.clientX - rect.left - 5) / scale
    const y = (e.clientY - rect.top - 5) / scale

    setIcons([
      ...icons,
      {
        x,
        y,
        iconType: selectedIcon.type,
        id: crypto.randomUUID(),
        color: selectedIcon.color,
      },
    ])
  }

  const handleMouseDown = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault()
    setMovingIconIndex(index)
    setStartPosition({ x: e.clientX, y: e.clientY })
    setMovingIconPosition({ x: icons[index].x, y: icons[index].y })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (movingIconIndex === null || !startPosition || !movingIconPosition)
        return

      const dx = (e.clientX - startPosition.x) / scale
      const dy = (e.clientY - startPosition.y) / scale

      setMovingIconPosition({
        x: movingIconPosition.x + dx,
        y: movingIconPosition.y + dy,
      })

      setStartPosition({ x: e.clientX, y: e.clientY })
    },
    [movingIconIndex, startPosition, movingIconPosition, scale],
  )

  const handleMouseUp = () => {
    if (movingIconIndex !== null && movingIconPosition) {
      setIcons((prevIcons) =>
        prevIcons.map((icon, index) =>
          index === movingIconIndex
            ? { ...icon, x: movingIconPosition.x, y: movingIconPosition.y }
            : icon,
        ),
      )
    }
    setMovingIconIndex(null)
    setStartPosition(null)
    setMovingIconPosition(null)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove])

  const MemoizedIcon = memo(
    ({ icon, index }: { icon: Icon; index: number }) => (
      <div
        className="absolute"
        style={{
          left:
            (movingIconIndex === index && movingIconPosition
              ? movingIconPosition.x
              : icon.x) - 10,
          top:
            (movingIconIndex === index && movingIconPosition
              ? movingIconPosition.y
              : icon.y) - 10,
          cursor: 'grab',
        }}
        onMouseDown={(e) => handleMouseDown(index, e)}
      >
        <Icons color={icon.color} iconType={icon.iconType} />
      </div>
    ),
  )

  return (
    <TransformWrapper onTransformed={(e) => setScale(e.state.scale)}>
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
            <MemoizedIcon key={icon.id} icon={icon} index={index} />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  )
}
