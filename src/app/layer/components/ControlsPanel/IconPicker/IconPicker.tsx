import { IconDto } from '@/app/layer/[slug]/page'
import { Icons } from '@/shared/icons/Icons'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'

interface IconPickerProps {
  onChange: (value: IconType) => void
  icon: IconDto
}

export const IconPicker = ({ icon, onChange }: IconPickerProps) => {
  return (
    <ToggleGroup
      className="pt-2"
      defaultValue={icon.type}
      onValueChange={onChange}
      type="single"
    >
      <div className="flex flex-col">
        <h1>Ammo icons</h1>
        <div className="flex items-center gap-2 mb-4">
          <ToggleGroupItem value="infantry" aria-label="Toggle infantry">
            <Icons color="#fff" iconType="infantry" />
          </ToggleGroupItem>

          <ToggleGroupItem value="hab" aria-label="Toggle hab">
            <Icons color="#fff" iconType="hab" />
          </ToggleGroupItem>

          <ToggleGroupItem value="fob" aria-label="Toggle fob">
            <Icons color="#fff" iconType="fob" />
          </ToggleGroupItem>

          <ToggleGroupItem value="rally" aria-label="Toggle rally">
            <Icons color="#fff" iconType="rally" />
          </ToggleGroupItem>

          <ToggleGroupItem value="mortar" aria-label="Toggle mortar">
            <Icons color="#fff" iconType="mortar" />
          </ToggleGroupItem>

          <ToggleGroupItem value="truck" aria-label="Toggle truck">
            <Icons color="#fff" iconType="truck" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="truck-supply"
            aria-label="Toggle truck-supply"
          >
            <Icons color="#fff" iconType="truck-supply" />
          </ToggleGroupItem>

          <ToggleGroupItem value="mrap" aria-label="Toggle mrap">
            <Icons color="#fff" iconType="mrap" />
          </ToggleGroupItem>

          <ToggleGroupItem value="closed-mrap" aria-label="Toggle closed-mrap">
            <Icons color="#fff" iconType="closed-mrap" />
          </ToggleGroupItem>

          <ToggleGroupItem value="striker" aria-label="Toggle striker">
            <Icons color="#fff" iconType="striker" />
          </ToggleGroupItem>
          <ToggleGroupItem value="bradley" aria-label="Toggle bradley">
            <Icons color="#fff" iconType="bradley" />
          </ToggleGroupItem>
        </div>

        <h1>Other tools</h1>
        <div className="flex items-center gap-2 mb-4">
          <ToggleGroupItem value="text" aria-label="Toggle text">
            <Icons color="#fff" iconType="text" />
          </ToggleGroupItem>
        </div>
      </div>
    </ToggleGroup>
  )
}
