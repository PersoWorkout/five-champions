import { GetGroupsType } from '#src/groups/presenter/get_groups_presenter'

interface GroupBoxProps {
  group: GetGroupsType
}

export function GroupBox({ group }: GroupBoxProps) {
  return (
    <>
      <article className="box">
        <header className="box-header">
          <p>{group.name}</p>
        </header>
        <figure>
          <b>Nb Players: {group.count}</b>
          {group.players.map((player) => (
            <p key={player.id}>{player.surname}</p>
          ))}
          <p>...</p>
        </figure>
        <footer className="box-footer">
          <p>{group.createdAt.toString()}</p>
          <p>{group.creator.surname}</p>
        </footer>
      </article>
    </>
  )
}
