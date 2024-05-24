import { useTheme } from 'next-themes'

import { FobIcon } from '@/shared/icons/FobIcon'
import { HabIcon } from '@/shared/icons/HabIcon'
import { InfantryIcon } from '@/shared/icons/InfantryIcon'

export const Icons = ({ iconType }: { iconType: IconType }) => {
    const { theme } = useTheme()

    const isLightTheme = theme === 'light'
    const lightBgColor = isLightTheme ? '#09090B' : '#f8f8f8'
    let currentIcon: JSX.Element

    switch (iconType) {
        case 'infantry':
            currentIcon = <InfantryIcon fill={lightBgColor} />
            break
        case 'hab':
            currentIcon = <HabIcon fill={lightBgColor} />
            break
        case 'fob':
            currentIcon = <FobIcon fill={lightBgColor} />
            break
        default:
            currentIcon = <InfantryIcon fill={lightBgColor} />
            break
    }

    return currentIcon
}
