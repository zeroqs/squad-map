import { Icons } from '@/shared/icons/Icons'
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
                <Icons iconType="infantry" />
            </ToggleGroupItem>
            <ToggleGroupItem value="hab" aria-label="Toggle hab">
                <Icons iconType="hab" />
            </ToggleGroupItem>
            <ToggleGroupItem value="fob" aria-label="Toggle fob">
                <Icons iconType="fob" />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
