import Group from '#src/groups/models/group'

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
              id: group.creator.id,
              surname: group.creator.surname,
            },
            count: 10,
            players: [
              { surname: 'YaskoShot10' },
              { surname: 'Sephiroth' },
              { surname: 'TimotarLeTocard' },
            ],
          }) as GetGroupsType
      ),
    }
  }
}
