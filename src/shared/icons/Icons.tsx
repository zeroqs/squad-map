import { MdDelete } from 'react-icons/md'

import { FobIcon } from '@/shared/icons/FobIcon'
import { HabIcon } from '@/shared/icons/HabIcon'
import { InfantryIcon } from '@/shared/icons/InfantryIcon'
import { MortarIcon } from '@/shared/icons/MortarIcon'
import { RallyIcon } from '@/shared/icons/RallyIcon'

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
    case 'rally':
      currentIcon = <RallyIcon fill={color} />
      break
    case 'mortar':
      currentIcon = <MortarIcon fill={color} />
      break
    default:
      currentIcon = <InfantryIcon fill={color} />
      break
  }

  return currentIcon
}
