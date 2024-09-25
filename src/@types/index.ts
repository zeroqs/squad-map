interface AvailableMap {
  id: string
  title: string

  mapUrl: string
  previewMapUrl: string

  mapData: MapIcons | null
  notes: string | null
}

interface Texts {
  id: string
  x: number
  y: number

  text: string
  color: string

  width: number
  height: number
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

interface MapIcons {
  icons: Icon[]
  text: Texts[]
}
