import { useTheme } from 'next-themes'

import { FobIcon } from '@/shared/icons/FobIcon'
import { HabIcon } from '@/shared/icons/HabIcon'
import { InfantryIcon } from '@/shared/icons/InfantryIcon'

interface IconsProps {
  iconType: IconType
  color: string
}

export const Icons = ({ iconType, color }: IconsProps) => {
  const { theme } = useTheme()

  const isLightTheme = theme === 'light'
  const lightBgColor = isLightTheme ? '#09090B' : '#f8f8f8'
  let currentIcon: JSX.Element

  switch (iconType) {
    case 'infantry':
      currentIcon = <InfantryIcon fill={color} />
      break
    case 'hab':
      currentIcon = <HabIcon fill={color} />
      break
    case 'fob':
      currentIcon = <FobIcon fill={color} />
      break
    default:
      currentIcon = <InfantryIcon fill={color} />
      break
  }

  return currentIcon
}
