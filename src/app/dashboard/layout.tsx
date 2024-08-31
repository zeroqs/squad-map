import { UserButton } from '@clerk/nextjs'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Header } from '@/shared/ui/Header'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Create and share squad tactics',
}

export default function DashboardLayout({
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
          <UserButton />
        </Header.RightSide>
      </Header>

      <main className="max-w-7xl m-auto p-4">{children}</main>
    </>
  )
}
