import { HabIcon } from '@/shared/icons/HabIcon'
import { InfantryIcon } from '@/shared/icons/InfantryIcon'

export const Icons = ({ iconType }: { iconType: IconType }) => {
    let currentIcon: JSX.Element

    switch (iconType) {
        case 'infantry':
            currentIcon = <InfantryIcon />
            break
        case 'hab':
            currentIcon = <HabIcon />
            break
        default:
            currentIcon = <InfantryIcon />
            break
    }

    return currentIcon
}
