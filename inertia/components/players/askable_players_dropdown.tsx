import type { AskableUsersType } from '#src/groups/presenter/create_group_invitation_presenter'
import { ChangeEventHandler } from 'react'

interface Props {
  data: AskableUsersType
  onChange: ChangeEventHandler<HTMLSelectElement>
}

export function AskablePlayersDropdown({ data, onChange }: Props) {
  const { players } = data
  return (
    <>
      <div>
        <label htmlFor="askable-players">Players: </label>
        <select name="askable-players" defaultValue={0} onChange={onChange}>
          <option value={0} disabled={true}>
            Select player
          </option>
          {players.map((player) => (
            <option value={player.id} key={player.id}>
              {player.surname}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
