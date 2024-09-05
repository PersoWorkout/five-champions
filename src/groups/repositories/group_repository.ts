import Group from '#src/groups/models/group'

interface CreateGroupDTO {
  name: string
  playerId: string
}

export default class GroupRepository {
  getGroupsByPlayer(playerId: string) {
    return Group.query()
      .preload('groupPlayer', (groupPlayer) => {
        groupPlayer.where({ playerId })
      })
      .preload('groupPlayer', (groupPlayer) => {
        groupPlayer.preload('player', (player) => {
          player.select(['id', 'surname'])
        })
      })
      .preload('creator', (creator) => {
        creator.select(['id', 'surname'])
      })
      .orderBy('createdAt')
  }

  getById(playerId: string, groupId: string) {
    return Group.findBy({ playerId, id: groupId })
  }

  async create(payload: CreateGroupDTO) {
    const group = await Group.create({ ...payload })
    return group.save()
  }
}
