import { IoText } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

import { bradleyIconString, BredlyIcon } from '@/shared/icons/BradleyIcon'
import {
  ClosedMrapIcon,
  closedMrapIconString,
} from '@/shared/icons/ClosedMrapIcon'
import { FobIcon, fobIconString } from '@/shared/icons/FobIcon'
import { HabIcon, habIconString } from '@/shared/icons/HabIcon'
import { InfantryIcon, infantryIconString } from '@/shared/icons/InfantryIcon'
import { MortarIcon, mortarIconString } from '@/shared/icons/MortarIcon'
import { MrapIcon, mrapIconString } from '@/shared/icons/MrapIcon'
import { RallyIcon, rallyIconString } from '@/shared/icons/RallyIcon'
import { StrikerIcon, strikerIconString } from '@/shared/icons/StrikerIcon'
import { TruckIcon, truckIconString } from '@/shared/icons/TruckIcon'
import {
  TruckSupplyIcon,
  truckSupplyIconString,
} from '@/shared/icons/TruckSupplyIcon'

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
    case 'text':
      currentIcon = <IoText size={20} fill={color} />
      break
    default:
      currentIcon = <InfantryIcon fill={color} />
      break
  }

  return currentIcon
}

export const iconsString = ({ iconType, color }: IconsProps) => {
  switch (iconType) {
    case 'infantry':
      return infantryIconString(color)
    case 'hab':
      return habIconString(color)
    case 'fob':
      return fobIconString(color)
    case 'rally':
      return rallyIconString(color)
    case 'mortar':
      return mortarIconString(color)
    case 'truck':
      return truckIconString(color)
    case 'truck-supply':
      return truckSupplyIconString(color)
    case 'mrap':
      return mrapIconString(color)
    case 'closed-mrap':
      return closedMrapIconString(color)
    case 'striker':
      return strikerIconString(color)
    case 'bradley':
      return bradleyIconString(color)
    default:
      return infantryIconString(color)
  }
}
