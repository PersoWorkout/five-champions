import { Link, usePage } from '@inertiajs/react'
import type Player from '#src/players/models/players'

export function UserDrawer() {
  const page = usePage()
  const user = page.props.user as Player

  return (
    <div className="user-dropdown">
      <details>
        <summary>{user?.surname}</summary>
        <div className="user-dropdown-content">
          <Link href="/auth/me">Account</Link>
          <Link href="/auth/me">My Stats</Link>
          <Link href="/auth/logout" method="post">
            Logout
          </Link>
        </div>
      </details>
    </div>
  )
}
