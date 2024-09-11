import { GroupInvitationStatus } from '#src/groups/enums/group_invitation_status'
import Player from '#src/players/models/players'
import { Link, usePage } from '@inertiajs/react'

interface GroupPlayerItemProps {
  groupId: string
  player: {
    id: string
    surname: string
    status: number
  }
}

export function GroupPlayerItem({ groupId, player }: GroupPlayerItemProps) {
  const page = usePage().props
  const currentPlayer = page.user as Player

  return (
    <li>
      <div style={{ display: 'flex', gap: '10px' }}>
        {player.surname}
        {player.status === GroupInvitationStatus.Pending && currentPlayer.id === player.id ? (
          <>
            <Link href={`/groups/${groupId}/invitations/accept`} method="put">
              <button className="button-secondary">Accept</button>
            </Link>
            <Link href={`/groups/${groupId}/invitations/reject`} method="put">
              <button className="button-secondary">Reject</button>
            </Link>
          </>
        ) : (
          ''
        )}
      </div>
    </li>
  )
}
