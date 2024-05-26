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
      className="pt-4"
      defaultValue={icon.type}
      onValueChange={onChange}
      type="single"
    >
      <ToggleGroupItem value="infantry" aria-label="Toggle infantry">
        <Icons color={icon.color} iconType="infantry" />
      </ToggleGroupItem>
      <ToggleGroupItem value="hab" aria-label="Toggle hab">
        <Icons color={icon.color} iconType="hab" />
      </ToggleGroupItem>
      <ToggleGroupItem value="fob" aria-label="Toggle fob">
        <Icons color={icon.color} iconType="fob" />
      </ToggleGroupItem>
      <ToggleGroupItem value="rally" aria-label="Toggle rally">
        <Icons color={icon.color} iconType="rally" />
      </ToggleGroupItem>
      <ToggleGroupItem value="mortar" aria-label="Toggle mortar">
        <Icons color={icon.color} iconType="mortar" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
