import { GetGroupByIdType } from '#src/groups/presenter/get_group_by_id_presenter'
import Player from '#src/players/models/players'
import { Head, Link, usePage } from '@inertiajs/react'
import { GroupPlayersContainer } from '~/components/groups/group_players_container'
import { SeasonContainer } from '~/components/groups/season_container'
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
            <GroupPlayersContainer groupId={group.id} players={group.players} />
            <SeasonContainer groupId={group.id} seasons={group.seasons} />
          </article>
        </main>
      </BasicLayout>
    </>
  )
}
