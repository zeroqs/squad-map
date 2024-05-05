/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import { useEffect, useRef } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import layer from '@/../public/FoolsRoad.webp'

export const Map = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
          <canvas className="rounded-2xl" ref={canvasRef} />
        </div>
      </TransformComponent>
    </TransformWrapper>
  )
}
