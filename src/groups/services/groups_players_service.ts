import { GroupsPlayersRepository } from '../repositories/groups_players_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export class GroupsPlayersService {
  constructor(private repository: GroupsPlayersRepository) {}
  getPlayersByGroup(groupId: string, limit: number = 0) {
    return this.repository.getPlayersByGroup(groupId, limit)
  }

  async create(groupId: string, playerId: string) {
    const exist = await this.repository.getByPlayerAndGroup(groupId, playerId)
    if (exist) {
      return null
    }

    return this.repository.create(groupId, playerId)
  }

  async delete(groupId: string, playerId: string) {
    const groupPlayer = await this.repository.getByPlayerAndGroup(groupId, playerId)
    if (!groupPlayer) {
      return null
    }

    return this.repository.delete(groupPlayer)
  }
}
