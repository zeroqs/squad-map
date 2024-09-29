import { RefObject } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import { IconDto } from '@/app/layer/[slug]/page'
import { IconPicker } from '@/app/layer/components/ControlsPanel/IconPicker/IconPicker'
import { Icons } from '@/shared/icons/Icons'
import { Button } from '@/shared/ui/button'
import { GradientPicker } from '@/shared/ui/color-picker'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Toggle } from '@/shared/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'

interface LayerControlsProps {
  layers: MapIcons[]
  activeLayer: string
  setActiveLayer: (value: string) => void
  selectedIcon: IconDto
  selectedColor: string
  setSelectedColor: (value: string) => void
  handleOpenModal: () => void
  handleDelete: () => void
  handleSave: () => void
  onChangeIcon: (value: IconType) => void
  onChangeIconColor: (value: string) => void
  actionIsDelete: boolean
  mapSaveLoading: boolean
  notesRef: RefObject<HTMLTextAreaElement>
  notes: string
}

export const LayerControls = ({
  layers,
  activeLayer,
  setActiveLayer,
  selectedIcon,
  selectedColor,
  handleOpenModal,
  handleDelete,
  handleSave,
  onChangeIcon,
  onChangeIconColor,
  mapSaveLoading,
  notesRef,
  notes,
}: LayerControlsProps) => {
  return (
    <div className="p-4 animate-fade animate-delay-200">
      <div className="flex items-center gap-4">
        <ToggleGroup
          type="single"
          className="justify-start"
          onValueChange={(value) => {
            if (value) setActiveLayer(value)
          }}
          value={activeLayer}
        >
          {layers.map((layer) => (
            <ToggleGroupItem key={layer.title} value={layer.title}>
              {layer.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Button onClick={handleOpenModal} size="icon">
          <IoMdAdd className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div>
          <h1>Action</h1>
          <Toggle onClick={handleDelete} variant="outline">
            <MdDelete size={18} aria-label="Delete" />
          </Toggle>
        </div>

        <div>
          <h1>Current color</h1>
          <GradientPicker
            background={selectedColor}
            setBackground={onChangeIconColor}
          />
        </div>

        <div>
          <h1>Current icon</h1>
          <div className="h-[50px] flex justify-center py-2">
            <Icons iconType={selectedIcon.type} color={selectedIcon.color} />
          </div>
        </div>

        <div className="flex-[1_1_auto] text-right">
          <Button onClick={handleSave} loading={mapSaveLoading}>
            Save
          </Button>
        </div>
      </div>

      <div className="flex justify-start">
        <IconPicker icon={selectedIcon} onChange={onChangeIcon} />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="notes">Your notes</Label>
        <Textarea
          ref={notesRef}
          defaultValue={notes}
          placeholder="Type your notes for this layer here."
          id="notes"
        />
      </div>
    </div>
  )
}
