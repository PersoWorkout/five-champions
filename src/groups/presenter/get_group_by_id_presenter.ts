import Group from '../models/group.js'

export type GetGroupByIdType = {
  group: {
    id: string
    name: string
    createdAt: string
    creator: {
      id: string
      surname: string
    }
    players: Array<{
      id: string
      surname: string
    }>
  }
}

export class GetGroupByIdPresenter {
  toJson(group: Group) {
    return {
      group: {
        id: group.id,
        name: group.name,
        createdAt: group.createdAt.toFormat('dd/MM/yyyy HH:mm'),
        creator: {
          id: group.creator.id,
          surname: group.creator.surname,
        },
        players: group.groupPlayer.map((groupPlayer) => ({
          id: groupPlayer.playerId,
          surname: groupPlayer.player.surname,
        })),
      },
    } as GetGroupByIdType
  }
}
