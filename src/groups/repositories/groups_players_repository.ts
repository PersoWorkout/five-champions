import GroupsPlayers from '../models/groups_players.js'

export class GroupsPlayersRepository {
  getByPlayerAndGroup(groupId: string, playerId: string) {
    return GroupsPlayers.findBy({ groupId, playerId })
  }

  getPlayersByGroup(groupId: string, limit: number = 0) {
    return GroupsPlayers.query()
      .where({ groupId })
      .preload('player', (player) => {
        player.select(['surname'])
      })
      .select(['playerId', 'surname'])
      .orderBy('surname')
      .paginate(1, limit)
  }

  async create(groupId: string, playerId: string) {
    const groupPlayer = await GroupsPlayers.create({ groupId, playerId })
    return groupPlayer.save()
  }

  delete(groupPlayer: GroupsPlayers) {
    return groupPlayer.delete()
  }
}
