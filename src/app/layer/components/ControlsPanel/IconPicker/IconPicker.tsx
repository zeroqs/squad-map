import { HabIcon } from '@/shared/icons/HabIcon'
import { InfantryIcon } from '@/shared/icons/InfantryIcon'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'

interface IconPickerProps {
    onChange: (value: IconType) => void
    icon: IconType
}

export const IconPicker = ({ icon, onChange }: IconPickerProps) => {
    return (
        <ToggleGroup
            className="pt-4"
            defaultValue={icon}
            onValueChange={onChange}
            type="single"
        >
            <ToggleGroupItem value="infantry" aria-label="Toggle infantry">
                <InfantryIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="hab" aria-label="Toggle hab">
                <HabIcon />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
