import Player from '#src/players/models/players'
import { usePage } from '@inertiajs/react'
import { ReactNode } from 'react'

interface AuthenticatedProps {
  children: ReactNode
}

export function Authenticated({ children }: AuthenticatedProps) {
  const page = usePage()
  const user = page.props.user as Player | undefined

  return <>{user ? children : null}</>
}
