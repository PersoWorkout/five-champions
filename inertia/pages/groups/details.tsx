import { GetGroupByIdType } from '#src/groups/presenter/get_group_by_id_presenter'
import Player from '#src/players/models/players'
import { Head, Link, usePage } from '@inertiajs/react'
import { GroupPlayerItem } from '~/components/groups/group_player_item'
import { BasicLayout } from '~/components/layouts/basic_layout'

export default function GroupDetailsPage({ group }: GetGroupByIdType) {
  const page = usePage()
  const currentPlayer = page.props.user as Player

  return (
    <>
      <Head title="Group detail" />

      <BasicLayout>
        <main className="card-container">
          <article className="card">
            <header>
              <h2>Group: {group.name}</h2>
              <Link
                href={`/groups/${group.id}/players/${currentPlayer.id}`}
                method="delete"
                as="button"
                className="button-secondary"
              >
                Leave
              </Link>
            </header>
            <section>
              <h5>Informations</h5>
              <figure>
                <div>
                  <label>Nom: </label>
                  <span>{group.name}</span>
                </div>
                <div>
                  <label>Createur: </label>
                  <span>{group.creator.surname}</span>
                </div>
                <div>
                  <label>Date de création: </label>
                  <span>{group.createdAt}</span>
                </div>
              </figure>
            </section>
            <section>
              <header>
                <h5>Joueurs: </h5>
                <div>
                  <Link
                    href={`/groups/${group.id}/invitations/create`}
                    method="get"
                    as="button"
                    className="button-secondary"
                  >
                    Invite New User
                  </Link>
                </div>
              </header>
              <figure>
                <ul>
                  {group.players.map((player) => (
                    <GroupPlayerItem
                      key={player.id}
                      groupId={group.id}
                      invitationId={player.invitationId}
                      player={player}
                    />
                  ))}
                </ul>
              </figure>
            </section>
            <section>
              <header>
                <h5>Saisons: </h5>
                <div>
                  <Link
                    href={`/groups/${group.id}/seasons/create`}
                    method="get"
                    as="button"
                    className="button-secondary"
                  >
                    Create Season
                  </Link>
                </div>
              </header>
              <figure>
                <ul>
                  {group.seasons.map((season) => (
                    <li key={season.id}>{season.name}</li>
                  ))}
                </ul>
              </figure>
            </section>
          </article>
        </main>
      </BasicLayout>
    </>
  )
}
