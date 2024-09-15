import { Link } from '@inertiajs/react'

interface Props {
  groupId: string
  seasons: Array<{
    id: string
    name: string
  }>
}

export function SeasonContainer({ groupId, seasons }: Props) {
  return (
    <section>
      <header>
        <h5>Saisons: </h5>
        <div>
          <Link
            href={`/groups/${groupId}/seasons/create`}
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
          {seasons.map((season) => (
            <li key={season.id}>{season.name}</li>
          ))}
        </ul>
      </figure>
    </section>
  )
}
