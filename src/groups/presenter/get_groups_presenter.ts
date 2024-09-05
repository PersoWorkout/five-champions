import type Group from '#src/groups/models/group'

export type GetGroupsType = {
  id: string
  name: string
  createdAt: string
  creator: {
    id: string
    surname: string
  }
  count: number
  players: {
    id: string
    surname: string
  }[]
}

export class GetGroupsPresenter {
  toJson(groups: Group[]) {
    return {
      data: groups.map(
        (group) =>
          ({
            id: group.id,
            name: group.name,
            createdAt: group.createdAt.toFormat('dd/MM/yy'),
            creator: {
              id: group.creator?.id,
              surname: group.creator?.surname,
            },
            count: group.groupPlayer.length,
            players: group.groupPlayer.map((el) => ({
              id: el.player.id,
              surname: el.player.surname,
            })),
          }) as GetGroupsType
      ),
    }
  }
}
