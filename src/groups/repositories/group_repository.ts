import Group from '#src/groups/models/group'

export default class GroupRepository {
  async getAllByPlayer(playerId: string) {
    return Group.query()
      .whereHas('groupPlayer', (groupPlayer) => {
        groupPlayer.where({ playerId })
      })
      .preload('creator', (creator) => {
        creator.select(['id', 'surname'])
      })
      .select(['id', 'name', 'createdAt', 'playerId'])
      .orderBy('createdAt')
  }

  getById(playerId: string, groupId: string) {
    return Group.findBy({ playerId, id: groupId })
  }
}
