import { Link } from '@inertiajs/react'
import { GroupPlayerItem } from '~/components/groups/group_player_item'

interface Props {
  groupId: string
  players: Array<{
    id: string
    surname: string
    status: number
    invitationId: string | null
  }>
}

export function GroupPlayersContainer({ groupId, players }: Props) {
  return (
    <section>
      <header>
        <h5>Joueurs: </h5>
        <div>
          <Link
            href={`/groups/${groupId}/invitations/create`}
            method="get"
            as="button"
            className="button-secondary"
          >
            Invite Player
          </Link>
        </div>
      </header>
      <figure>
        <ul>
          {players.map((player) => (
            <GroupPlayerItem key={player.id} player={player} groupId={groupId} />
          ))}
        </ul>
      </figure>
    </section>
  )
}
