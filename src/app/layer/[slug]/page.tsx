/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Map } from '@/widgets/layer/Map'

export default function Layer({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Map />
    </div>
  )
}
