import Group from '#src/groups/models/group'

export type GetGroupsType = {
  id: string
  name: string
  createdAt: string
  creator: {
    id: string
    surname: string
  }
}

export class GetGroupsPresenter {
  toJson(groups: Group[]) {
    return {
      data: groups.map(
        (group) =>
          ({
            id: group.id,
            name: group.name,
            createdAt: group.createdAt.toFormat('dd/MM/yy HH:mm'),
            creator: {
              id: group.creator.id,
              surname: group.creator.surname,
            },
          }) as GetGroupsType
      ),
    }
  }
}
