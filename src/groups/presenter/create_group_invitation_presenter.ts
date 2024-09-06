import Player from '#src/players/models/players'

export type AskableUsersType = {
  players: Array<{
    id: string
    surname: string
  }>
}
export class CreateGroupInvitationPresenter {
  toJson(players: Player[]) {
    return {
      players: players.map((player) => ({
        id: player.id,
        surname: player.surname,
      })),
    } as AskableUsersType
  }
}
