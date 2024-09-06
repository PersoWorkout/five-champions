import { GetGroupByIdType } from '#src/groups/presenter/get_group_by_id_presenter'
import { Head, Link } from '@inertiajs/react'
import { BasicLayout } from '~/components/layouts/basic_layout'

export default function GroupDetailsPage({ group }: GetGroupByIdType) {
  return (
    <>
      <Head title="Group detail" />

      <BasicLayout>
        <main className="card-container">
          <article className="card">
            <header>
              <h2>Group: {group.name}</h2>
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
                  <Link href={`/groups/${group.id}/invitations/create`} method="get">
                    Invite New User
                  </Link>
                </div>
              </header>
              <figure>
                <ul>
                  {group.players.map((player) => (
                    <li key={player.id}>{player.surname}</li>
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
