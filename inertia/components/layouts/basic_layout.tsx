import { ReactNode } from 'react'
import { Logo } from '../logo'
import { Link, usePage } from '@inertiajs/react'
import { UserDrawer } from './user_drawer'
import type Player from '#src/players/models/players'

interface Props {
  children: ReactNode
}

export function BasicLayout({ children }: Props) {
  const page = usePage()

  const user = page.props.user as Player

  return (
    <>
      <header className="page-header">
        <Logo />
        {/* <h3 style={{ textAlign: 'center' }}>Five Champions</h3> */}
        {user ? <UserDrawer /> : <LoginLink />}
      </header>

      {children}

      <footer className="page-footer">Footer</footer>
    </>
  )
}

const LoginLink = () => (
  <Link href="/auth/login" method="get" as="button" className="login-link">
    Login
  </Link>
)
