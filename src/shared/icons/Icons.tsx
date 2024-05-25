import { MdDelete } from 'react-icons/md'

import { FobIcon } from '@/shared/icons/FobIcon'
import { HabIcon } from '@/shared/icons/HabIcon'
import { InfantryIcon } from '@/shared/icons/InfantryIcon'

interface IconsProps {
  iconType: IconType
  color: string
}

export const Icons = ({ iconType, color }: IconsProps) => {
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
    case 'delete':
      currentIcon = <MdDelete />
      break
    default:
      currentIcon = <InfantryIcon fill={color} />
      break
  }

  return currentIcon
}
