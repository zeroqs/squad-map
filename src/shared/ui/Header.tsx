import { ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="p-4 flex items-center justify-between">
      {children}
    </header>
  )
}

const LeftSide = ({ children }: { children: ReactNode }) => {
  return <div className="animate-fade-left animate-delay-200">{children}</div>
}

const RightSide = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-4 items-center animate-fade-right animate-delay-200">
      {children}
    </div>
  )
}

Header.LeftSide = LeftSide
Header.RightSide = RightSide
