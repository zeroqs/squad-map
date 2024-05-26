import { MdDelete } from 'react-icons/md'

import { BredlyIcon } from '@/shared/icons/BradleyIcon'
import { ClosedMrapIcon } from '@/shared/icons/ClosedMrapIcon'
import { FobIcon } from '@/shared/icons/FobIcon'
import { HabIcon } from '@/shared/icons/HabIcon'
import { InfantryIcon } from '@/shared/icons/InfantryIcon'
import { MortarIcon } from '@/shared/icons/MortarIcon'
import { MrapIcon } from '@/shared/icons/MrapIcon'
import { RallyIcon } from '@/shared/icons/RallyIcon'
import { StrikerIcon } from '@/shared/icons/StrikerIcon'
import { TruckIcon } from '@/shared/icons/TruckIcon'
import { TruckSupplyIcon } from '@/shared/icons/TruckSupplyIcon'

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
    case 'truck':
      currentIcon = <TruckIcon fill={color} />
      break
    case 'truck-supply':
      currentIcon = <TruckSupplyIcon fill={color} />
      break
    case 'mrap':
      currentIcon = <MrapIcon fill={color} />
      break
    case 'closed-mrap':
      currentIcon = <ClosedMrapIcon fill={color} />
      break
    case 'striker':
      currentIcon = <StrikerIcon fill={color} />
      break
    case 'bradley':
      currentIcon = <BredlyIcon fill={color} />
      break
    default:
      currentIcon = <InfantryIcon fill={color} />
      break
  }

  return currentIcon
}
