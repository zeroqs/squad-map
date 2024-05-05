import Link from 'next/link'

import { Button } from '@/shared/ui/button'
import { Header } from '@/shared/ui/Header'
import { ModeToggle } from '@/shared/ui/ModeToggle'
import { Content } from '@/widgets/landing/Content'

// eslint-disable-next-line import/no-default-export
export default function Home() {
  return (
    <>
      <Header>
        <Header.LeftSide>
          <Link href="/">SquadTactics</Link>
        </Header.LeftSide>
        <Header.RightSide>
          <ModeToggle />
          <Button asChild>
            <Link href="/dashboard">Let's go</Link>
          </Button>
        </Header.RightSide>
      </Header>
      <Content />
    </>
  )
}
