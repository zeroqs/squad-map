import { UserButton } from '@clerk/nextjs'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Header } from '@/shared/ui/Header'
import { ModeToggle } from '@/shared/ui/ModeToggle'

export const metadata: Metadata = {
  title: 'Layer',
  description: 'Creating strategy',
}

export default function LayerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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

      <main className="max-w-[1800px] m-auto p-4">{children}</main>
    </>
  )
}
