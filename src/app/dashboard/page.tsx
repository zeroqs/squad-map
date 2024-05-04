import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import { Content } from '@/domains/dashboard/Content'
import { Header } from '@/shared/ui/Header'
import { ModeToggle } from '@/shared/ui/ModeToggle'

export default function Dashboard() {
  return (
    <>
      <Header>
        <Header.LeftSide>
          <Link href="/">SquadTactics</Link>
          <Link href="/dashboard"> / Dashboard</Link>
        </Header.LeftSide>
        <Header.RightSide>
          <ModeToggle />
          <UserButton />
        </Header.RightSide>
      </Header>

      <Content />
    </>
  )
}
